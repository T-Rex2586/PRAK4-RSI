"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getAuthHeaders, getUserIdFromToken, API_BASE_URL } from "@/lib/auth";
import Link from "next/link";


export default function RegisterEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = Number(params.id);
  
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchEvent() {
        try {
        const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
          headers: getAuthHeaders(),
        });
        if (!res.ok) throw new Error("Event tidak ditemukan");
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
        const res = await fetch(`${API_BASE_URL}/registrations`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            user_id: getUserIdFromToken(),
            event_id: eventId,
          }),
        });

        if (!res.ok) {
        const data = await res.json();
        const message = Array.isArray(data.detail)
            ? data.detail.map((e: any) => e.msg).join(", ")
            : data.detail || "Registrasi gagal";
        throw new Error(message);
        }

        setSuccess(true);
    } catch (err: any) {
        setError(err.message || "Registrasi gagal. Silakan coba lagi.");
        setSuccess(false);
    } finally {
        setSubmitting(false);
        setShowModal(true);
    }
    };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="fixed w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.10)_0%,transparent_70%)] top-[-100px] right-[-80px] pointer-events-none" />
      <div className="fixed w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.08)_0%,transparent_70%)] bottom-[-60px] left-[20%] pointer-events-none" />

      <main className="relative flex-1 flex items-center justify-center px-4 py-16">
        {!event ? (
          <div className="text-center space-y-4">
            <h1 className="font-display text-4xl text-zinc-900">
              Event tidak ditemukan
            </h1>
            <p className="font-body text-sm text-zinc-400">
              ID event tidak tersedia atau sudah dihapus.
            </p>
            <Link href="/events" className="btn-primary mt-2 mx-auto hover:opacity-90 hover:-translate-y-px">
              Kembali ke Events
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg">
            <Link
              href={`/events/${eventId}`}
              className="font-body text-sm text-zinc-400 hover:text-indigo-600 transition-colors inline-flex items-center gap-1.5 mb-8"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M12 7H2M6 11L2 7l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Kembali ke detail event
            </Link>

            <div className="bg-white border border-zinc-100 rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.07)] p-8">
              <h1 className="font-display text-3xl sm:text-4xl leading-tight text-zinc-900 mb-3">
                Registrasi Event
              </h1>
              <p className="font-body text-sm text-zinc-500 mb-6">
                Anda akan mendaftar ke:
              </p>

              <div className="rounded-xl bg-gradient-to-br from-[#f8f9ff] to-[#fff5fb] border border-zinc-100 p-5 mb-6">
                <h2 className="font-display text-2xl leading-snug text-zinc-900">
                  {event.name.split(" ").slice(0, -1).join(" ")}{" "}
                  <span className="italic gradient-text">
                    {event.name.split(" ").slice(-1)[0]}
                  </span>
                </h2>
                <p className="font-body text-xs text-zinc-500 mt-2">
                  {new Date(event.started_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  WIB
                </p>
              </div>

              {error && (
                <div className="mb-5 rounded-xl bg-red-50 border border-red-100 p-3.5 text-sm text-red-500 font-body flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="shrink-0"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="6"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7 4v3M7 9.5v.5"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleRegister} className="flex justify-between items-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Memproses...
                    </>
                  ) : (
                    <>
                      Konfirmasi
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M2 7h10M8 3l4 4-4 4"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>
                <Link
                  href={`/events/${eventId}`}
                  className="btn-secondary hover:bg-indigo-50 hover:border-indigo-500 hover:-translate-y-px"
                >
                  Batal
                </Link>
              </form>
            </div>
          </div>
        )}

        {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 p-8 max-w-sm w-full mx-4 text-center">
            {success ? (
                <>
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="#16a34a" strokeWidth="1.5"/>
                    <path d="M4.5 7l2 2 3-3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <h3 className="font-display text-2xl text-zinc-900 mb-2">Pendaftaran Berhasil</h3>
                <p className="font-body text-sm text-zinc-500 mb-6">
                    Anda telah terdaftar untuk event ini.
                </p>
                </>
            ) : (
                <>
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                    <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="#ef4444" strokeWidth="1.5"/>
                    <path d="M7 4v3M7 9.5v.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                </div>
                <h3 className="font-display text-2xl text-zinc-900 mb-2">Pendaftaran Gagal</h3>
                <p className="font-body text-sm text-zinc-500 mb-6">
                    {error || "Terjadi kesalahan. Silakan coba lagi."}
                </p>
                </>
            )}

            <button
                onClick={() => {
                setShowModal(false);
                if (success) {
                    router.push(`/events/${eventId}`);
                }
                }}
                className="btn-primary mx-auto hover:opacity-90 hover:-translate-y-px"
            >
                {success ? 'Kembali' : 'Coba Lagi'}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            </div>
        </div>
        )}
      </main>

      <footer className="relative border-t border-zinc-100">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <span className="nav-logo !text-lg">
            EventApp
          </span>
          <p className="font-body text-xs text-zinc-400">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}