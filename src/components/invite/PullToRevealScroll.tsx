"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { Calendar, Download, Sparkles, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { playTasselPullSound, playClickPopSound } from "@/lib/soundFx";

interface PullToRevealScrollProps {
  eventDate: string; // ISO string e.g. "2027-02-12T22:30:00"
  eventDateDisplay: string;
  venueName?: string;
  slug: string;
}

export function PullToRevealScroll({
  eventDate,
  eventDateDisplay,
  venueName,
  slug,
}: PullToRevealScrollProps) {
  const [isUnrolled, setIsUnrolled] = useState(false);
  const [pullProgress, setPullProgress] = useState(0); // 0 to 100
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);

  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date(eventDate).getTime();
    const calculate = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  const triggerReveal = () => {
    if (isUnrolled) return;
    setIsUnrolled(true);
    setPullProgress(100);
    playTasselPullSound();

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ["#D4AF37", "#6B0F2B", "#F59E0B", "#FDE047"],
    });
  };

  // Pointer drag handling for physical pull
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isUnrolled) return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || isUnrolled) return;
    const deltaY = e.clientY - startYRef.current;
    if (deltaY > 0) {
      const progress = Math.min(100, Math.floor((deltaY / 120) * 100));
      setPullProgress(progress);
      if (progress >= 85) {
        isDraggingRef.current = false;
        triggerReveal();
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (pullProgress > 40) {
      triggerReveal();
    } else {
      setPullProgress(0);
    }
  };

  return (
    <div className="relative my-10 px-5 flex flex-col items-center text-center select-none">
      {/* Outer Scroll Container */}
      <div className="relative w-full max-w-[340px] flex flex-col items-center">
        {/* Top Golden Rod */}
        <div className="relative z-20 w-full h-5 rounded-full bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700 shadow-lg flex items-center justify-between px-1.5 border border-amber-900/40">
          <span className="h-5 w-5 -ml-3 rounded-full bg-gradient-to-tr from-amber-800 to-amber-400 border-2 border-amber-200 shadow-md" />
          <span className="h-2 w-16 bg-amber-200/50 rounded-full" />
          <span className="h-5 w-5 -mr-3 rounded-full bg-gradient-to-tr from-amber-800 to-amber-400 border-2 border-amber-200 shadow-md" />
        </div>

        {/* Parchment Paper Body (Animates Open) */}
        <motion.div
          animate={isUnrolled ? { height: "auto", opacity: 1 } : { height: 75 + pullProgress * 0.5, opacity: 0.95 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          className="relative z-10 w-[94%] overflow-hidden bg-[#fffaf2] border-x-2 border-amber-300/60 shadow-xl px-5 py-4"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 80%), url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h30v30H0z' fill='%23faf5ec'/%3E%3Cpath d='M15 0l15 15-15 15L0 15z' fill='%23f3ead7' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        >
          {/* Unrolled Content */}
          <div className="pt-2 pb-2">
            <span className="font-cinzel text-[10.5px] tracking-[0.3em] font-bold text-amber-800 uppercase block">
              Save The Auspicious Date
            </span>

            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-burgundy-950 mt-1.5">
              {eventDateDisplay}
            </h3>

            {venueName && (
              <p className="font-sans text-xs text-stone-600 mt-1 font-medium tracking-wide">
                Pheras at 10:30 PM • {venueName}
              </p>
            )}

            {/* Countdown Flip Cards */}
            <div className="mt-5 pt-4 border-t border-amber-900/10">
              <span className="font-cinzel text-[9.5px] uppercase tracking-widest text-stone-400 font-bold block mb-2">
                Time Remaining
              </span>

              <div className="flex items-center justify-center gap-2 font-serif text-stone-800">
                <div className="flex flex-col items-center bg-white/80 border border-amber-200/70 px-2.5 py-1.5 rounded-xl shadow-xs min-w-[50px]">
                  <span className="font-playfair text-xl sm:text-2xl font-bold text-burgundy-900">
                    {String(timeLeft.days).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-sans font-semibold">
                    Days
                  </span>
                </div>
                <span className="text-stone-400 font-sans font-bold">:</span>
                <div className="flex flex-col items-center bg-white/80 border border-amber-200/70 px-2.5 py-1.5 rounded-xl shadow-xs min-w-[50px]">
                  <span className="font-playfair text-xl sm:text-2xl font-bold text-burgundy-900">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-sans font-semibold">
                    Hours
                  </span>
                </div>
                <span className="text-stone-400 font-sans font-bold">:</span>
                <div className="flex flex-col items-center bg-white/80 border border-amber-200/70 px-2.5 py-1.5 rounded-xl shadow-xs min-w-[50px]">
                  <span className="font-playfair text-xl sm:text-2xl font-bold text-burgundy-900">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-sans font-semibold">
                    Mins
                  </span>
                </div>
                <span className="text-stone-400 font-sans font-bold">:</span>
                <div className="flex flex-col items-center bg-white/80 border border-amber-200/70 px-2.5 py-1.5 rounded-xl shadow-xs min-w-[50px]">
                  <span className="font-playfair text-xl sm:text-2xl font-bold text-burgundy-900">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-stone-500 font-sans font-semibold">
                    Secs
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Calendar Button */}
            <div className="mt-5">
              <a
                href={`/api/calendar/${slug}`}
                download={`${slug}-invite.ics`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-burgundy-900 bg-white shadow-sm text-burgundy-950 font-sans text-xs font-bold tracking-wider uppercase transition hover:bg-burgundy-900 hover:text-white active:scale-95"
              >
                <Calendar className="h-3.5 w-3.5" />
                Add to Calendar
                <Download className="h-3 w-3 opacity-60" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Golden Rod */}
        <div className="relative z-20 w-full h-5 rounded-full bg-gradient-to-r from-amber-700 via-amber-300 to-amber-700 shadow-lg flex items-center justify-between px-1.5 border border-amber-900/40">
          <span className="h-5 w-5 -ml-3 rounded-full bg-gradient-to-tr from-amber-800 to-amber-400 border-2 border-amber-200 shadow-md" />
          <span className="h-2 w-16 bg-amber-200/50 rounded-full" />
          <span className="h-5 w-5 -mr-3 rounded-full bg-gradient-to-tr from-amber-800 to-amber-400 border-2 border-amber-200 shadow-md" />
        </div>

        {/* The Hanging Tassel (Interactive Drag / Pull Mechanism) */}
        {!isUnrolled && (
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={triggerReveal}
            className="cursor-grab active:cursor-grabbing flex flex-col items-center pt-1 z-30 transition-transform active:scale-105"
          >
            {/* Cord */}
            <div className="w-1 h-4 bg-burgundy-800" />
            {/* Golden Bead */}
            <div className="h-3.5 w-3.5 rounded-full bg-amber-400 border-2 border-amber-200 shadow-sm" />
            {/* Silken Tassel Brush */}
            <div className="w-2.5 h-6 bg-gradient-to-b from-burgundy-800 to-burgundy-950 rounded-b-md shadow-md flex items-end justify-center pb-0.5">
              <ChevronDown className="h-2.5 w-2.5 text-amber-300 animate-bounce" />
            </div>

            <span className="mt-2 text-[10px] tracking-wider uppercase font-bold text-amber-900 bg-amber-100/90 px-3 py-1 rounded-full shadow-xs border border-amber-300/60 animate-pulse">
              Pull Tassel or Tap to Unroll
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
