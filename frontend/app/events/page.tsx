"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Event = {
  id: number;
  name: string;
  description: string;
  started_at: string;
  ended_at: string;
  quota: number;
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        // Ganti dengan helper getAuthHeaders() nanti
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMSIsInVzZXJfaWQiOjExLCJyb2xlIjoidXNlciIsImV4cCI6MTc3ODA3NTE2NX0.BswMH9nlKG_gy2LNHptTNpo_ZdV9OTtOhLey_yZ1aPE";
        const res = await fetch(`http://localhost:8000/events/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error("Gagal memuat daftar event");
        const data = await res.json();
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }

        .nav-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 22px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .blob-1 {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%);
          top: -100px;
          right: -80px;
          pointer-events: none;
        }
        .blob-2 {
          position: fixed;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%);
          bottom: -60px;
          left: 20%;
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
          border: none;
          cursor: pointer;
        }
        .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }

        .event-card {
          background: white;
          border: 1px solid #f1f5f9;
          border-radius: 16px;
          padding: 24px;
          transition: box-shadow 0.2s, transform 0.2s;
          display: flex;
          flex-direction: column;
        }
        .event-card:hover {
          box-shadow: 0 8px 24px rgba(99,102,241,0.08);
          transform: translateY(-2px);
        }
        .meta-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          color: #a5b4fc;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }
        .meta-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1e1b4b;
        }
        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.15), rgba(236,72,153,0.15), transparent);
        }
      `}</style>

      <div className="blob-1" />
      <div className="blob-2" />

      <main className="relative flex-1 max-w-5xl w-full mx-auto px-4 py-16">
        <Link
          href="/"
          className="font-body text-sm text-zinc-400 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 7H2M6 11L2 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Kembali ke Home Page
        </Link>

        <h1 className="font-display text-4xl sm:text-5xl text-zinc-900 mb-4">
          Daftar Event
        </h1>

        {/* Loading */}
        {loading && (
          <p className="font-body text-zinc-400">Memuat daftar event...</p>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12">
            <p className="font-body text-red-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">
              Coba Lagi
            </button>
          </div>
        )}

        {/* Grid Event */}
        {!loading && !error && events.length === 0 && (
          <p className="font-body text-zinc-400">Belum ada event yang tersedia.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                {/* Judul */}
                <h2 className="font-display text-2xl leading-snug text-zinc-900 mb-2">
                  {event.name.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic gradient-text">
                    {event.name.split(" ").slice(-1)[0]}
                  </span>
                </h2>
                <p className="font-body text-sm text-zinc-500 leading-relaxed mb-4 flex-1">
                  {event.description}
                </p>

                <div className="divider mb-4" />

                {/* Meta ringkas */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="meta-label">Mulai</div>
                    <div className="meta-value text-sm">
                      {new Date(event.started_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                    <div className="font-body text-xs text-indigo-400 mt-0.5">
                      {new Date(event.started_at).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} WIB
                    </div>
                  </div>
                  <div>
                    <div className="meta-label">Kuota</div>
                    <div className="meta-value text-sm gradient-text">{event.quota}</div>
                    <div className="font-body text-xs text-zinc-400 mt-0.5">peserta</div>
                  </div>
                </div>

                {/* Tombol detail */}
                <Link
                  href={`/events/${event.id}`}
                  className="btn-primary w-full justify-center mt-auto"
                >
                  Detail Event
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="relative border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="nav-logo" style={{ fontSize: "18px" }}>EventApp</span>
          <p className="font-body text-xs text-zinc-400">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}