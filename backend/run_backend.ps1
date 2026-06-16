$host.UI.RawUI.WindowTitle = "Backend - http://localhost:8000"
Set-Location -LiteralPath "E:\7-RSI-P\Respositories\PRAK4-RSI\backend"
& "E:\7-RSI-P\Respositories\PRAK4-RSI\backend\venv\Scripts\python.exe" -m uvicorn src.app:app --reload --host 0.0.0.0 --port 8000
Read-Host "Tekan Enter untuk menutup..."
