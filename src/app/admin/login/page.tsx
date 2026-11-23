"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Sparkles, KeyRound } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Invalid PIN");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-stone-900 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-stone-950 border border-stone-800 p-8 shadow-2xl text-center">
        {/* Studio Branding */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 shadow-lg mb-4">
          <Sparkles className="h-7 w-7" />
        </div>

        <h1 className="text-xl font-bold text-white tracking-wide">
          Studio Admin Access
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Enter your studio security PIN to manage invitations
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/80 border border-red-800/60 text-red-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
            <input
              type="password"
              required
              maxLength={8}
              autoFocus
              placeholder="Enter PIN (Default: 7788)"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-900 border border-stone-700 text-white placeholder-stone-500 text-sm tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !pin}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider transition active:scale-95 disabled:opacity-50 shadow-lg shadow-amber-500/20"
          >
            {loading ? "Verifying PIN..." : "Unlock Dashboard"}
          </button>
        </form>

        <p className="text-[11px] text-stone-500 mt-6">
          Default Studio Security PIN: <span className="font-mono text-amber-400">7788</span>
        </p>
      </div>
    </div>
  );
}
