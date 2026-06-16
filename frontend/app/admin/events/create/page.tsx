"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAuthHeaders, API_BASE_URL } from "@/lib/auth";
import { toast } from "sonner";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    started_at: "",
    ended_at: "",
    quota: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toDbFormat = (dateStr: string) => {
      const d = new Date(dateStr);
      const pad = (n: number) => n.toString().padStart(2, "0");
      return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:00`;
    };

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        quota: Number(formData.quota),
        started_at: toDbFormat(formData.started_at),
        ended_at: toDbFormat(formData.ended_at),
      };

      const res = await fetch(`${API_BASE_URL}/events/`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Event baru berhasil dibuat.");
        router.push("/admin/events");
      } else {
        const errorData = await res.json();
        toast.error("Gagal menyimpan event: " + JSON.stringify(errorData.detail));
      }
    } catch (err) {
      toast.error("Terjadi kesalahan koneksi ke server. Pastikan backend menyala.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col py-10 px-6">
      <div className="max-w-2xl w-full mx-auto">
        <Link href="/admin/events" className="text-sm text-zinc-500 hover:text-indigo-600 mb-6 inline-block">
          &larr; Batal dan Kembali
        </Link>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8">
          <h1 className="font-display text-3xl text-zinc-900 mb-2">
            Buat <span className="italic text-indigo-600">Event Baru</span>
          </h1>
          <p className="text-zinc-500 text-sm mb-8">
            Isi detail acara yang akan ditampilkan kepada peserta.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Event</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Deskripsi</label>
              <textarea
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
                  required
                  className="w-full px-4 py-2 border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  onChange={(e) => setFormData({ ...formData, started_at: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Waktu Selesai</label>
                <input
                  type="datetime-local"
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
                required
                className="w-full px-4 py-2 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                onChange={(e) => setFormData({ ...formData, quota: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100">
              <Link href="/admin/events" className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
                Batal
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary shadow-lg shadow-indigo-500/20 hover:opacity-90 hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Menyimpan..." : "Simpan Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}