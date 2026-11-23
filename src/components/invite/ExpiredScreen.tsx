"use client";

import React from "react";
import Link from "next/link";
import { Invitation } from "@/lib/types";
import { Heart, Calendar, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface ExpiredScreenProps {
  invite: Invitation;
}

export function ExpiredScreen({ invite }: ExpiredScreenProps) {
  const hostNames =
    invite.hero.brideOrCelebrant && invite.hero.groomOrHost
      ? `${invite.hero.groomOrHost} & ${invite.hero.brideOrCelebrant}`
      : invite.hero.groomOrHost || invite.title;

  return (
    <div className="min-h-screen w-full bg-[#0d0b0a] flex items-center justify-center p-4">
      {/* Ambient Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center"
        style={{
          backgroundImage: `url("${invite.hero.heroImage || invite.ogImage}")`,
          filter: "blur(50px) brightness(0.2)",
        }}
      />

      <div className="relative z-10 w-full max-w-[430px] rounded-[36px] border border-stone-800 bg-stone-900/95 p-8 shadow-2xl backdrop-blur-xl text-center text-stone-100 flex flex-col justify-between min-h-[580px]">
        {/* Top Icon */}
        <div className="pt-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-800/80 border border-stone-700 text-stone-400 shadow-md">
            <Heart className="h-7 w-7 text-rose-500/80 fill-rose-500/30" />
          </div>

          <span className="font-cinzel text-[11px] tracking-[0.25em] uppercase text-stone-400 font-bold block mt-6">
            Celebration Concluded
          </span>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-white mt-1.5 leading-snug">
            {hostNames}
          </h1>

          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-400 mt-2">
            <Calendar className="h-3.5 w-3.5 text-amber-500/70" />
            <span>Celebrated on <strong>{invite.eventDateDisplay}</strong></span>
          </div>

          <p className="font-sans text-xs text-stone-300 mt-4 leading-relaxed max-w-xs mx-auto">
            This digital invitation link has completed its scheduled active period. Thank you to all family, friends, and guests for your warm presence and blessings!
          </p>
        </div>

        {/* Commercial Promotion / Conversion Card */}
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-b from-stone-800/90 to-stone-950/90 border border-amber-500/30 shadow-lg text-left">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-cinzel text-xs font-bold text-amber-200">
              Planning Your Special Event?
            </span>
          </div>

          <p className="font-sans text-xs text-stone-300 leading-relaxed">
            Create living 3D interactive invitations with wax seals, music, live countdown, Google Maps & WhatsApp RSVP for your celebration!
          </p>

          <Link
            href="/order"
            className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-sans text-xs font-bold uppercase tracking-wider transition shadow-md shadow-amber-500/20 active:scale-95"
          >
            <span>Order Your Invitation Now</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Footer */}
        <div className="pb-2">
          <Link
            href="/"
            className="text-[11px] text-stone-400 hover:text-white transition tracking-wide"
          >
            ← Return to Digital Studio Home
          </Link>
        </div>
      </div>
    </div>
  );
}
