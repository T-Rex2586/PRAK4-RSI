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
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.10)_0%,transparent_70%)] top-[-100px] right-[-80px] pointer-events-none" />
      <div className="fixed w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.08)_0%,transparent_70%)] bottom-[-60px] left-[20%] pointer-events-none" />

      <main className="relative flex-1 flex items-center justify-center px-4 py-16">
        {loading && (
          <p className="font-body text-zinc-400">Memuat data event...</p>
        )}

        {!loading && error && (
          <div className="text-center space-y-4">
            <h1 className="font-display text-4xl text-zinc-900">
              Event tidak <span className="italic gradient-text">ditemukan.</span>
            </h1>
            <p className="font-body text-sm text-zinc-400">
              {error || "ID event tidak tersedia atau sudah dihapus."}
            </p>
            <Link href="/" className="btn-primary mt-2 mx-auto hover:opacity-90 hover:-translate-y-px">
              Kembali ke Home Page
            </Link>
          </div>
        )}

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

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-gradient-to-br from-indigo-50/50 to-pink-50/50 border border-indigo-500/10 rounded-xl p-3.5">
                  <div className="font-body text-[11px] text-indigo-300 uppercase tracking-widest mb-1">Mulai</div>
                  <div className="font-body text-sm font-semibold text-indigo-950">
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
                <div className="bg-gradient-to-br from-indigo-50/50 to-pink-50/50 border border-indigo-500/10 rounded-xl p-3.5">
                  <div className="font-body text-[11px] text-indigo-300 uppercase tracking-widest mb-1">Selesai</div>
                  <div className="font-body text-sm font-semibold text-indigo-950">
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
                <div className="bg-gradient-to-br from-indigo-50/50 to-pink-50/50 border border-indigo-500/10 rounded-xl p-3.5">
                  <div className="font-body text-[11px] text-indigo-300 uppercase tracking-widest mb-1">Kuota</div>
                  <div className="font-body text-sm font-semibold gradient-text">{event.quota}</div>
                  <div className="font-body text-xs text-zinc-400 mt-0.5">peserta</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Link href={`/events/${eventId}/register`} className="btn-primary hover:opacity-90 hover:-translate-y-px">
                  Registrasi
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link href="/" className="btn-secondary hover:bg-indigo-50 hover:border-indigo-500 hover:-translate-y-px">
                  Kembali
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="relative border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="nav-logo !text-lg">EventApp</span>
          <p className="font-body text-xs text-zinc-400">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}