"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    // --- TACTICAL VALIDATION LAYER ---
    if (!email.includes("@")) {
      setIsLoading(false);
      return setErrorMsg("Email tidak valid.");
    }
    if (password.length < 8) {
      setIsLoading(false);
      return setErrorMsg("Password minimal 8 karakter.");
    }
    // UPPERCASE CHECK PROTOCOL
    if (!/[A-Z]/.test(password)) {
      setIsLoading(false);
      return setErrorMsg("Password harus mengandung minimal satu huruf kapital.");
    }

    try {
      // --- BREACHING BACKEND API ---
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      // Validasi apakah responsnya JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Backend tidak merespons dengan JSON. Cek CORS/Server.");
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || data.message || "Gagal melakukan registrasi.");
      }

      setSuccessMsg("Registrasi Berhasil! Data sudah masuk ke PostgreSQL.");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error: any) {
      setErrorMsg(error.message === "Failed to fetch" ? "Koneksi ke Backend terputus (Offline)." : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] p-4">
      <Card className="w-full max-w-md shadow-2xl border-none rounded-3xl bg-white/90 backdrop-blur-sm">
        <CardHeader className="space-y-2 pt-8">
          <CardTitle className="text-4xl font-serif font-bold text-center text-slate-800">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-slate-500 text-base">
            Create an account to browse and join events.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <form onSubmit={handleRegister} className="space-y-5">
            {errorMsg && (
              <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-100 rounded-xl">
                <AlertDescription>{errorMsg}</AlertDescription>
              </Alert>
            )}
            {successMsg && (
              <Alert className="bg-green-50 text-green-700 border-green-100 rounded-xl">
                <AlertDescription>{successMsg}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-700 font-medium ml-1">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="e.g. : Rover"
                className="rounded-xl border-slate-200 focus:ring-purple-500 py-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-medium ml-1">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. : rover@gmail.com"
                className="rounded-xl border-slate-200 focus:ring-purple-500 py-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" title="password" className="text-slate-700 font-medium ml-1">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Silahkan diisi...."
                className="rounded-xl border-slate-200 focus:ring-purple-500 py-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <p className="text-[11px] text-slate-400 italic ml-1">
                *Min. 8 characters & 1 Uppercase Letter
              </p>
            </div>

            <Button
              type="submit"
              className="w-full mt-4 py-7 text-lg font-bold rounded-2xl transition-all duration-300
                bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] 
                hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]
                shadow-lg shadow-purple-500/25 text-white border-none"
              disabled={isLoading}
            >
              {isLoading ? "Compiling..." : "Execute Register"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center pb-8 pt-4">
          <p className="text-sm text-slate-500">
            Sudah punya akses? <span className="text-purple-600 font-bold cursor-pointer hover:text-purple-700 transition-colors">Login</span>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}