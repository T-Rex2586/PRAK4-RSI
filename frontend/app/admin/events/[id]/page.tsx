"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getAuthHeaders, API_BASE_URL } from "@/lib/auth";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`, {
          headers: getAuthHeaders(),
        });
        if (res.ok) {
          const data = await res.json();
          const formattedData = {
            ...data,
            started_at: data.started_at ? new Date(data.started_at).toISOString().slice(0, 16) : "",
            ended_at: data.ended_at ? new Date(data.ended_at).toISOString().slice(0, 16) : "",
          };
          setFormData(formattedData);
        }
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchEvent();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "PUT",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Data event berhasil diperbarui.");
        router.push("/admin/events");
      } else {
        alert("Gagal memperbarui event. Periksa kembali isian Anda.");
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi ke server.");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center font-display italic text-zinc-400">
      Memuat data event...
    </div>
  );

  if (!formData) return (
    <div className="min-h-screen flex items-center justify-center font-body text-red-500">
      Event tidak ditemukan.
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col py-10 px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          color: white;
          transition: all 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
      `}</style>

      <div className="max-w-2xl w-full mx-auto">
        <Link
          href="/admin/events"
          className="text-sm text-zinc-500 hover:text-indigo-600 mb-6 inline-block"
        >
          &larr; Batal dan Kembali
        </Link>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8">
          <h1 className="font-display text-3xl text-zinc-900 mb-2">
            Edit <span className="italic text-indigo-600">Event</span>
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            Perbarui detail acara agar peserta mendapatkan informasi yang tepat.
          </p>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Event</label>
              <input
                type="text"
                value={formData.name}
                required
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Deskripsi</label>
              <textarea
                value={formData.description}
                required
                rows={4}
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Waktu Mulai</label>
                <input
                  type="datetime-local"
                  value={formData.started_at}
                  required
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({ ...formData, started_at: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Waktu Selesai</label>
                <input
                  type="datetime-local"
                  value={formData.ended_at}
                  required
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({ ...formData, ended_at: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Kuota Peserta</label>
              <input
                type="number"
                value={formData.quota}
                required
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, quota: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
              <Link
                href="/admin/events"
                className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
              >
                Batal
              </Link>
              <button
                type="submit"
                className="btn-primary px-8 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-500/20"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}