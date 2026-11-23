"use client";

import React from "react";
import Link from "next/link";
import { Invitation } from "@/lib/types";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

interface UnavailableScreenProps {
  invite: Invitation;
}

export function UnavailableScreen({ invite }: UnavailableScreenProps) {
  return (
    <div className="min-h-screen w-full bg-[#0d0b0a] flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-[400px] rounded-[32px] border border-stone-800 bg-stone-900/90 p-8 shadow-2xl backdrop-blur-xl text-center text-stone-100 flex flex-col justify-between min-h-[440px]">
        <div className="pt-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-800 border border-stone-700 text-amber-400">
            <Lock className="h-6 w-6" />
          </div>

          <span className="font-cinzel text-[10px] tracking-[0.25em] uppercase text-amber-400 font-bold block mt-5">
            Private Access
          </span>
          <h1 className="font-playfair text-2xl font-bold text-white mt-1">
            Invitation Not Yet Public
          </h1>
          <p className="font-sans text-xs text-stone-400 mt-3 leading-relaxed">
            This invitation ({invite.title}) is currently in private draft or archived status. If you are the event host or administrator, please log in to the admin portal to manage or publish it.
          </p>
        </div>

        <div className="pt-6 border-t border-stone-800 space-y-3">
          <Link
            href="/admin"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95"
          >
            <ShieldCheck className="h-4 w-4" />
            Admin Studio Login
          </Link>

          <Link
            href="/"
            className="block text-xs text-stone-400 hover:text-stone-200 transition"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
