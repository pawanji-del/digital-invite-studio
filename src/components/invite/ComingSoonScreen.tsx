"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Invitation } from "@/lib/types";
import { Sparkles, Calendar, Clock, ArrowRight } from "lucide-react";

interface ComingSoonScreenProps {
  invite: Invitation;
}

export function ComingSoonScreen({ invite }: ComingSoonScreenProps) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const activeDate = invite.activeFrom ? new Date(invite.activeFrom) : new Date(invite.eventDate);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = activeDate.getTime() - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [invite.activeFrom, invite.eventDate]);

  const hostNames =
    invite.hero.brideOrCelebrant && invite.hero.groomOrHost
      ? `${invite.hero.groomOrHost} & ${invite.hero.brideOrCelebrant}`
      : invite.hero.groomOrHost || invite.title;

  return (
    <div className="min-h-screen w-full bg-[#0d0b0a] flex items-center justify-center p-4">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-black to-black" />

      <div className="relative z-10 w-full max-w-[430px] rounded-[36px] border border-amber-500/30 bg-stone-900/90 p-8 shadow-2xl backdrop-blur-xl text-center text-stone-100 flex flex-col justify-between min-h-[580px]">
        {/* Top Emblem */}
        <div className="pt-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-300 shadow-lg shadow-amber-500/10">
            <Sparkles className="h-8 w-8 animate-pulse text-amber-400" />
          </div>

          <span className="font-cinzel text-[11px] tracking-[0.3em] uppercase text-amber-300 font-bold block mt-6">
            Auspicious Invitation
          </span>
          <h1 className="font-playfair text-3xl font-bold text-white mt-2 leading-tight">
            {hostNames}
          </h1>
          <p className="font-sans text-xs text-stone-400 mt-2 max-w-xs mx-auto">
            This digital interactive invitation is being crafted and will go live shortly.
          </p>
        </div>

        {/* Live Countdown */}
        <div className="my-6 p-5 rounded-2xl bg-black/50 border border-stone-800">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block mb-3">
            Invitation Unlocks In
          </span>

          <div className="grid grid-cols-4 gap-2">
            {[
              { val: timeLeft.days, label: "Days" },
              { val: timeLeft.hours, label: "Hours" },
              { val: timeLeft.minutes, label: "Mins" },
              { val: timeLeft.seconds, label: "Secs" },
            ].map((slot, i) => (
              <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-stone-900/90 border border-stone-700/60 shadow-inner">
                <span className="font-mono text-xl font-bold text-amber-200">
                  {String(slot.val).padStart(2, "0")}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-stone-400 mt-0.5">
                  {slot.label}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mt-4 pt-3 border-t border-stone-800/80">
            <Calendar className="h-3.5 w-3.5 text-amber-400" />
            <span>Event Date: <strong>{invite.eventDateDisplay}</strong></span>
          </div>
        </div>

        {/* Bottom studio branding */}
        <div className="pb-2">
          <p className="text-[10px] text-stone-500 uppercase tracking-widest">
            Powered by Digital Invitation Studio
          </p>
          <Link
            href="/"
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition"
          >
            Explore Studio <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
