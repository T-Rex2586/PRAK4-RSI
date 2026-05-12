"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAuthHeaders, API_BASE_URL } from "@/lib/auth";
import Link from "next/link";

export default function EventDetailPage() {
  const params = useParams();
  const eventId = Number(params.id);

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          throw new Error("Event tidak ditemukan");
        }

        const data = await res.json();
        setEvent(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (eventId) fetchEvent();
  }, [eventId]);

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
          flex-shrink: 0;
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

        .meta-card {
          background: linear-gradient(135deg, #f8f9ff, #fff5fb);
          border: 1px solid rgba(99,102,241,0.08);
          border-radius: 12px;
          padding: 14px 18px;
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

        .gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,0.15), rgba(236,72,153,0.15), transparent);
        }
      `}</style>

      <div className="blob-1" />
      <div className="blob-2" />

      <main className="relative flex-1 flex items-center justify-center px-4 py-16">
        {/* LOADING */}
        {loading && (
          <p className="font-body text-zinc-400">Memuat data event...</p>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="text-center space-y-4">
            <h1 className="font-display text-4xl text-zinc-900">
              Event tidak <span className="italic gradient-text">ditemukan.</span>
            </h1>
            <p className="font-body text-sm text-zinc-400">
              {error || "ID event tidak tersedia atau sudah dihapus."}
            </p>
            <Link href="/" className="btn-primary mt-2 mx-auto">
              Kembali ke Home Page
            </Link>
          </div>
        )}

        {/* EVENT DETAIL */}
        {!loading && event && (
          <div className="w-full max-w-lg">
            <Link
              href="/"
              className="font-body text-sm text-zinc-400 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 mb-8"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M6 11L2 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kembali ke Home Page
            </Link>

            <div className="bg-white border border-zinc-100 rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.07)] p-8">
              {/* Judul Event */}
              <h1 className="font-display text-4xl sm:text-5xl leading-[1.1] text-zinc-900 mb-3">
                {event.name.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="italic gradient-text">
                  {event.name.split(" ").slice(-1)[0]}
                </span>
              </h1>

              <p className="font-body text-sm text-zinc-500 leading-relaxed mb-6">
                {event.description}
              </p>

              <div className="divider mb-6" />

              {/* Meta cards */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="meta-card">
                  <div className="meta-label">Mulai</div>
                  <div className="meta-value">
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
                    })}{" "}WIB
                  </div>
                </div>
                <div className="meta-card">
                  <div className="meta-label">Selesai</div>
                  <div className="meta-value">
                    {new Date(event.ended_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="font-body text-xs text-pink-400 mt-0.5">
                    {new Date(event.ended_at).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}WIB
                  </div>
                </div>
                <div className="meta-card">
                  <div className="meta-label">Kuota</div>
                  <div className="meta-value gradient-text">{event.quota}</div>
                  <div className="font-body text-xs text-zinc-400 mt-0.5">peserta</div>
                </div>
              </div>

              {/* Tombol */}
              <div className="flex justify-between items-center">
                <Link href={`/events/${eventId}/register`} className="btn-primary">
                  Registrasi
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/" className="btn-secondary">
                  Kembali
                </Link>
              </div>
            </div>
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