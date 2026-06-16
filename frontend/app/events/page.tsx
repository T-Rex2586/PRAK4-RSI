"use client";

import { useEffect, useState } from "react";
import { getAuthHeaders, API_BASE_URL } from "@/lib/auth";
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
        const res = await fetch(`${API_BASE_URL}/events/`, {
          headers: getAuthHeaders(),
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
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.10)_0%,transparent_70%)] top-[-100px] right-[-80px] pointer-events-none" />
      <div className="fixed w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.08)_0%,transparent_70%)] bottom-[-60px] left-[20%] pointer-events-none" />

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

        {loading && (
          <p className="font-body text-zinc-400">Memuat daftar event...</p>
        )}

        {!loading && error && (
          <div className="text-center py-12">
            <p className="font-body text-red-500 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary hover:opacity-90 hover:-translate-y-px">
              Coba Lagi
            </button>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="font-body text-zinc-400">Belum ada event yang tersedia.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-white border border-zinc-100 rounded-2xl p-6 flex flex-col transition-all duration-200 hover:shadow-[0_8px_24px_rgba(99,102,241,0.08)] hover:-translate-y-0.5">
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

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
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
                      })} WIB
                    </div>
                  </div>
                  <div>
                    <div className="font-body text-[11px] text-indigo-300 uppercase tracking-widest mb-1">Kuota</div>
                    <div className="font-body text-sm font-semibold gradient-text">{event.quota}</div>
                    <div className="font-body text-xs text-zinc-400 mt-0.5">peserta</div>
                  </div>
                </div>

                <Link
                  href={`/events/${event.id}`}
                  className="btn-primary w-full justify-center mt-auto hover:opacity-90 hover:-translate-y-px"
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
          <span className="nav-logo !text-lg">EventApp</span>
          <p className="font-body text-xs text-zinc-400">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}