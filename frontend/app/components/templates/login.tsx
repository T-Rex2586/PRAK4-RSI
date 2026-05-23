"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginTemplate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (typeof data.detail === "string") {
          setError(data.detail);
        } else if (Array.isArray(data.detail)) {
          setError(data.detail.map((d: any) => d.msg).join(", "));
        } else {
          setError("Login gagal. Periksa email dan password.");
        }
        return;
      }

      // Simpan token dan info user
localStorage.setItem("access_token", data.access_token);
localStorage.setItem("role", data.role);
localStorage.setItem("account_id", String(data.account_id));

      // Routing berdasarkan role
if (data.role === "superadmin") {
  router.push("/admin/events");
} else if (data.role === "admin") {
  router.push("/admin/events");
} else {
  router.push("/events");
}
    } catch (err) {
      setError("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-bold text-gray-900 text-base">App</span>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-800 transition">Browse Event</Link>
            <Link href="#" className="hover:text-gray-800 transition">Features</Link>
            <Link href="#" className="hover:text-gray-800 transition">Schedule</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm text-gray-700 font-medium hover:text-gray-900 transition px-3 py-1.5"
          >
            Log In
          </Link>
          <Link
            href="/auth/register"
            className="text-sm text-white font-semibold px-4 py-1.5 rounded-lg bg-gray-900 hover:bg-gray-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Log In</h1>
            <p className="text-gray-500 text-sm">Masukkan kredensial Anda.</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="aanindya05@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 pr-10 rounded-lg border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-purple-400">*Min. 8 characters & 1 Uppercase Letter</p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm tracking-wide transition-opacity hover:opacity-90 mt-2 disabled:opacity-60"
              style={{
                background: "linear-gradient(to right, #7c3aed, #ec4899)",
              }}
            >
              {loading ? "Memuat..." : "Log In"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}