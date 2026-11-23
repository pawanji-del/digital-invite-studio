"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Download } from "lucide-react";

interface CountdownTimerProps {
  eventDate: string; // ISO string e.g. "2027-02-12T22:30:00"
  eventDateDisplay: string; // e.g. "Friday, 12 February 2027"
  venueName?: string;
  slug: string;
}

export function CountdownTimer({
  eventDate,
  eventDateDisplay,
  venueName,
  slug,
}: CountdownTimerProps) {
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

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div className="relative my-8 px-5 flex flex-col items-center text-center">
      {/* Royal Scroll / Farman Header Banner */}
      <div className="relative w-full max-w-xs bg-[#fffaf5] rounded-xl border border-amber-300/60 shadow-lg p-5">
        {/* Golden Rod Top simulation */}
        <div className="absolute -top-3 left-3 right-3 h-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-md flex items-center justify-between px-1">
          <span className="h-4 w-4 -ml-2 rounded-full bg-amber-500 border border-amber-200" />
          <span className="h-4 w-4 -mr-2 rounded-full bg-amber-500 border border-amber-200" />
        </div>

        <div className="pt-2">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-800 uppercase block">
            Save The Auspicious Date
          </span>
          <h3 className="font-serif text-2xl font-bold text-burgundy-950 mt-1">
            {eventDateDisplay}
          </h3>
          {venueName && (
            <p className="text-xs text-stone-500 mt-1 font-medium">{venueName}</p>
          )}
        </div>

        {/* Golden Rod Bottom simulation with tassel */}
        <div className="absolute -bottom-3 left-3 right-3 h-3 rounded-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-md flex items-center justify-between px-1">
          <span className="h-4 w-4 -ml-2 rounded-full bg-amber-500 border border-amber-200" />
          <span className="h-4 w-4 -mr-2 rounded-full bg-amber-500 border border-amber-200" />
        </div>

        {/* Center hanging decorative tassel */}
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
          <div className="w-0.5 h-2 bg-burgundy-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-200" />
          <div className="w-1.5 h-3 bg-burgundy-700 rounded-b-md" />
        </div>
      </div>

      {/* Countdown Values */}
      <div className="mt-10 mb-4 flex items-center justify-center gap-2 sm:gap-3 text-stone-800 font-serif">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-bold text-burgundy-900">
            {String(timeLeft.days).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-stone-500 font-sans">
            Days
          </span>
        </div>
        <span className="text-stone-300 font-sans">•</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-bold text-burgundy-900">
            {String(timeLeft.hours).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-stone-500 font-sans">
            Hrs
          </span>
        </div>
        <span className="text-stone-300 font-sans">•</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-bold text-burgundy-900">
            {String(timeLeft.minutes).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-stone-500 font-sans">
            Min
          </span>
        </div>
        <span className="text-stone-300 font-sans">•</span>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl sm:text-3xl font-bold text-burgundy-900">
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
          <span className="text-[10px] tracking-wider uppercase text-stone-500 font-sans">
            Sec
          </span>
        </div>
      </div>

      {/* Add to Calendar Button */}
      <a
        href={`/api/calendar/${slug}`}
        download={`${slug}-invite.ics`}
        className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-burgundy-800/40 bg-white/80 backdrop-blur-sm text-burgundy-900 text-xs font-semibold tracking-wider uppercase shadow-sm transition hover:bg-burgundy-900 hover:text-white hover:border-transparent active:scale-95"
      >
        <Calendar className="h-3.5 w-3.5" />
        Add to Calendar
        <Download className="h-3 w-3 opacity-60" />
      </a>
    </div>
  );
}
