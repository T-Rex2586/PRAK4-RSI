"use client";

import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* template */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .blob-1 {
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
          top: -150px;
          right: -100px;
          pointer-events: none;
        }
        .blob-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%);
          bottom: -100px;
          left: 10%;
          pointer-events: none;
        }

        .gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          color: white;
          border-radius: 12px;
          padding: 12px 28px;
          transition: opacity 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        
        .btn-secondary {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          background: white;
          color: #6366f1;
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 12px;
          padding: 12px 28px;
          transition: background 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
        }
        .btn-secondary:hover { background: #f8fafc; transform: translateY(-1px); }
      `}</style>

      {/* Gelembung Latar Belakang */}
      <div className="blob-1" />
      <div className="blob-2" />

      {/* Bagian Navigasi Singkat Khusus Admin */}
      <nav className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-zinc-900 tracking-wide">
          Admin<span className="gradient-text">Panel</span>
        </span>
        <Link href="/" className="font-body text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
          Lihat Halaman User
        </Link>
      </nav>

      {/* Bagian Utama (Hero Section) */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto -mt-20">
        <h1 className="font-display text-6xl sm:text-7xl text-zinc-900 mb-4 tracking-tight leading-[1.1]">
          Control everything <br />
          <span className="italic gradient-text">effortlessly.</span>
        </h1>
        
        <p className="font-body text-zinc-500 mb-10 text-lg sm:text-xl">
          Pusat kendali untuk mengelola, menambah, dan mengatur seluruh event.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/admin/events" className="btn-primary shadow-lg shadow-indigo-500/20">
            Management Events
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button className="btn-secondary">
            Pengaturan
          </button>
        </div>
      </main>
    </div>
  );
}