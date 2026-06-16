"use client";

import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,transparent_70%)] top-[-150px] right-[-100px] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.08)_0%,transparent_70%)] bottom-[-100px] left-[10%] pointer-events-none" />

      <nav className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-zinc-900 tracking-wide">
          Admin<span className="gradient-text">Panel</span>
        </span>
        <Link href="/" className="font-body text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
          Lihat Halaman User
        </Link>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 max-w-3xl mx-auto -mt-20">
        <h1 className="font-display text-6xl sm:text-7xl text-zinc-900 mb-4 tracking-tight leading-[1.1]">
          Control everything <br />
          <span className="italic gradient-text">effortlessly.</span>
        </h1>

        <p className="font-body text-zinc-500 mb-10 text-lg sm:text-xl">
          Pusat kendali untuk mengelola, menambah, dan mengatur seluruh event.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/admin/events" className="btn-primary shadow-lg shadow-indigo-500/20 hover:opacity-90 hover:-translate-y-px">
            Management Events
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button className="btn-secondary hover:bg-zinc-50 hover:-translate-y-px">
            Pengaturan
          </button>
        </div>
      </main>
    </div>
  );
}