param(
    [switch]$Seed,
    [switch]$ResetDB,
    [switch]$Help
)

$Red   = @{ForegroundColor = "Red"   }
$Green = @{ForegroundColor = "Green" }
$Cyan  = @{ForegroundColor = "Cyan"  }
$Yellow= @{ForegroundColor = "Yellow"}
$None  = @{}

function Title { Write-Host @Cyan "=== $args ===" }
function Ok    { Write-Host @Green "[OK] $args" }
function Warn  { Write-Host @Yellow "[!] $args" }

if ($Help) {
    Write-Host @Cyan @"
Usage:  .\start.ps1 [options]

Options:
  -Seed      Jalankan seeder setelah DB siap
  -ResetDB   Hapus semua tabel & buat ulang
  -Help      Tampilkan panduan ini

Menjalankan 3 komponen secara bersamaan:
  1. PostgreSQL      (Docker)    port 5433
  2. Backend FastAPI  (Uvicorn)  port 8000
  3. Frontend Next.js (Next.js)  port 3000
"@
    exit
}

Title "Memeriksa Prasyarat"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Backend = Join-Path $Root "backend"
$Frontend = Join-Path $Root "frontend"

# Cek Docker
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host @Red "[ERROR] Docker tidak ditemukan. Install Docker Desktop."
    exit 1
}
Ok "Docker tersedia"

# Cek Node.js
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host @Red "[ERROR] Node.js tidak ditemukan."
    exit 1
}
Ok "Node.js $(node -v)"

# Cek Python / venv
$VenvDir = Join-Path $Backend "venv"
$VenvPython = Join-Path $VenvDir "Scripts\python.exe"
$PythonCmd = "python"

if (Test-Path $VenvPython) {
    $PythonCmd = $VenvPython
    Ok "Virtual env ditemukan"
} else {
    Warn "Virtual env tidak ditemukan. Setup otomatis..."
    Push-Location $Backend
    python -m venv venv
    if ($LASTEXITCODE -eq 0) {
        $PythonCmd = $VenvPython
        Ok "Virtual env dibuat"
        Write-Host @Yellow "Menginstall dependencies backend..."
        & $VenvPython -m pip install -q "fastapi[standard]" uvicorn sqlmodel psycopg2-binary alembic "python-jose[cryptography]" bcrypt "pydantic[email]" python-dotenv
        if ($LASTEXITCODE -eq 0) { Ok "Dependencies backend terinstall" }
    } else {
        Warn "Gagal bikin venv, pakai python PATH"
    }
    Pop-Location
}

Title "Menjalankan PostgreSQL (Docker)"
Set-Location -LiteralPath $Backend
docker-compose up -d --remove-orphans
if ($LASTEXITCODE -eq 0) {
    Ok "PostgreSQL berjalan di port 5433"
} else {
    Write-Host @Red "[ERROR] Gagal menjalankan docker-compose."
}

if ($ResetDB) {
    Title "Mereset Database"
    $ResetSql = "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
    docker exec -i docker-rsi-tugas-3 psql -U postgres -d acara_rsi -c $ResetSql
    if ($LASTEXITCODE -eq 0) {
        Ok "Database direset. Tabel akan dibuat ulang saat backend pertama kali jalan."
    } else {
        Warn "Gagal reset DB. Cek koneksi Docker."
    }
}

$RunBackend = Join-Path $Backend "run_backend.ps1"
Title "Menjalankan Backend (Uvicorn)"
$BackendArgs = @{
    FilePath          = "powershell"
    ArgumentList      = "-NoExit", "-ExecutionPolicy", "Bypass", "-File", $RunBackend
    WindowStyle       = "Normal"
}
$BackendProc = Start-Process @BackendArgs
Ok "Backend dimulai (port 8000)"

if ($Seed) {
    Title "Menunggu backend siap..."
    Start-Sleep -Seconds 3
    $Retries = 40
    $Ready = $false
    Write-Host @Yellow "  Menunggu (maks $($Retries * 2) detik)..."
    for ($i = 0; $i -lt $Retries; $i++) {
        try {
            $null = Invoke-WebRequest -Uri "http://127.0.0.1:8000/" -TimeoutSec 2 -UseBasicParsing
            $Ready = $true
            break
        } catch {
            if ($i % 5 -eq 0 -and $i -gt 0) { Write-Host @Yellow "  masih menunggu... ($($i * 2)s)" }
            Start-Sleep -Seconds 2
        }
    }
    if ($Ready) {
        Ok "Backend siap"
        Title "Menjalankan Seeder"
        & $PythonCmd -m src.seed
        if ($LASTEXITCODE -eq 0) {
            Ok "Seeder selesai"
        }
    } else {
        Warn "Backend tidak merespon dalam 30 detik. Seed dilewati."
    }
}

$NodeModules = Join-Path $Frontend "node_modules"
if (!(Test-Path $NodeModules)) {
    Write-Host @Yellow "Menginstall dependencies frontend..."
    Push-Location $Frontend
    npm install --silent
    Pop-Location
    Ok "Dependencies frontend terinstall"
}
Ok "Frontend dependencies siap"

$RunFrontend = Join-Path $Frontend "run_frontend.ps1"
Title "Menjalankan Frontend (Next.js)"
$FrontendArgs = @{
    FilePath          = "powershell"
    ArgumentList      = "-NoExit", "-ExecutionPolicy", "Bypass", "-File", $RunFrontend
    WindowStyle       = "Normal"
}
$FrontendProc = Start-Process @FrontendArgs
Ok "Frontend dimulai (port 3000)"

Write-Host @Green @"
Semua komponen berjalan

  Backend   -> http://localhost:8000
  Frontend  -> http://localhost:3000
  Docs API  -> http://localhost:8000/docs
"@

try { Read-Host "Tekan Enter untuk keluar (proses tetap jalan)" } catch { }
