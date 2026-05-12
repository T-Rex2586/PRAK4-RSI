"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search, Edit, Trash2, Plus,
  ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight
} from "lucide-react";
import { getAuthHeaders, API_BASE_URL } from "@/lib/auth";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/events/`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Gagal memuat data event.");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus event "${name}"?`)) {
      try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders(),
        });

        if (res.ok) {
          alert("Event berhasil dihapus.");
          setEvents(events.filter(e => e.id !== id));
        } else {
          alert("Gagal menghapus event. Pastikan tidak ada peserta yang terdaftar.");
        }
      } catch (err) {
        alert("Terjadi kesalahan koneksi saat menghapus.");
      }
    }
  };

  const filteredEvents = events.filter(event =>
    event.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEvents.length / rowsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col py-10 px-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .font-display { font-family: 'Instrument Serif', Georgia, serif; }
        .font-body    { font-family: 'DM Sans', sans-serif; }
        .gradient-text {
          background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .btn-primary {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          color: white;
          transition: all 0.2s;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
      `}</style>

      <div className="max-w-6xl w-full mx-auto font-body">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <Link href="/admin" className="text-sm text-zinc-400 hover:text-indigo-600 mb-2 inline-block">
              &larr; Kembali ke Dashboard
            </Link>
            <h1 className="font-display text-4xl text-zinc-900">
              Management <span className="italic gradient-text">Events</span>
            </h1>
          </div>
          <Link
            href="/admin/events/create"
            className="btn-primary px-5 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg shadow-indigo-500/20"
          >
            <Plus size={18} /> Add Event
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Top Bar */}
          <div className="p-4 border-b border-zinc-200 flex justify-between bg-zinc-50/50">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input
                type="text"
                placeholder="Cari event..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-900 border-b border-zinc-200 font-semibold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Event Name</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Started At</th>
                  <th className="px-6 py-4">Ended At</th>
                  <th className="px-6 py-4">Quota</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-zinc-400 animate-pulse font-display italic text-lg">
                      Memuat data event...
                    </td>
                  </tr>
                ) : paginatedEvents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-10 text-center text-zinc-400">
                      Tidak ada event yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  paginatedEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-zinc-50/50 group transition-colors">
                      <td className="px-6 py-4 text-zinc-400 font-mono text-xs">#{event.id}</td>
                      <td className="px-6 py-4 font-medium text-zinc-900">{event.name}</td>
                      <td className="px-6 py-4 text-zinc-500 max-w-[200px] truncate" title={event.description}>
                        {event.description || "-"}
                      </td>
                      <td className="px-6 py-4 text-zinc-500">
                        <div className="text-sm">
                          {new Date(event.started_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-xs text-indigo-400">
                          {new Date(event.started_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-500">
                        <div className="text-sm">
                          {new Date(event.ended_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                        <div className="text-xs text-pink-400">
                          {new Date(event.ended_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full text-xs border border-indigo-100 font-semibold">
                          {event.quota} slots
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/events/${event.id}`} className="text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg" title="Edit Event">
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(event.id, event.name)}
                            className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus Event"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="p-4 border-t border-zinc-200 flex items-center justify-between bg-zinc-50/50 text-zinc-500 text-xs">
            <div className="flex items-center gap-2">
              <span>Row per page:</span>
              <select
                className="border border-zinc-200 rounded px-1 py-0.5 bg-white"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div className="flex items-center gap-4">
              <span>Page {currentPage} of {totalPages || 1}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-1 border border-zinc-200 rounded bg-white disabled:opacity-50">
                  <ChevronsLeft size={16} />
                </button>
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-1 border border-zinc-200 rounded bg-white disabled:opacity-50">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="p-1 border border-zinc-200 rounded bg-white disabled:opacity-50">
                  <ChevronRight size={16} />
                </button>
                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className="p-1 border border-zinc-200 rounded bg-white disabled:opacity-50">
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}