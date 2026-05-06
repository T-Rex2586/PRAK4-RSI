import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .hero-blob-1 {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          top: -80px;
          right: -60px;
          pointer-events: none;
        }
        .hero-blob-2 {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%);
          bottom: 0px;
          left: 30%;
          pointer-events: none;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #eef2ff, #fce7f3);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 999px;
          padding: 4px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #6366f1;
          letter-spacing: 0.04em;
        }
        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          display: inline-block;
        }

        .btn-primary {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          color: white;
          border-radius: 10px;
          padding: 11px 24px;
          transition: opacity 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-secondary {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          background: white;
          color: #6366f1;
          border: 1.5px solid rgba(99,102,241,0.3);
          border-radius: 10px;
          padding: 11px 24px;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .btn-secondary:hover {
          background: #eef2ff;
          border-color: #6366f1;
          transform: translateY(-1px);
        }

        .stat-card {
          background: white;
          border: 1.5px solid #f1f5f9;
          border-radius: 14px;
          padding: 18px 24px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(99,102,241,0.06);
        }
        .stat-value {
          font-family: 'Instrument Serif', serif;
          font-size: 28px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .stat-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .nav-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* HERO */}
      <main className="flex-1 flex items-center relative overflow-hidden">
        <div className="hero-blob-1" />
        <div className="hero-blob-2" />

        <div className="relative max-w-5xl mx-auto px-6 py-24 sm:py-32 w-full">

          <h1 className="font-display text-5xl sm:text-6xl lg:text-[72px] leading-[1.08] text-zinc-900 mb-6 max-w-2xl">
            Moments worth<br />
            <span className="italic" style={{
              background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              remembering.
            </span>
          </h1>

          <p className="font-body text-base text-zinc-500 max-w-md leading-relaxed mb-10">
            Discover and join curated events.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <Link href="/events" className="btn-primary">
              Browse Events
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/register" className="btn-secondary">
              Create Account
            </Link>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="nav-logo" style={{ fontSize: "18px" }}>EventApp</span>
          <p className="font-body text-xs text-zinc-400">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}