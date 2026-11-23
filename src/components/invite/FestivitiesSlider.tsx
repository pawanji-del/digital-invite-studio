"use client";

import React, { useState } from "react";
import { SubEvent } from "@/lib/types";
import {
  Sparkles,
  Flame,
  Music,
  Sun,
  Wine,
  HeartHandshake,
  MapPin,
  Utensils,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { playClickPopSound } from "@/lib/soundFx";

interface FestivitiesSliderProps {
  subEvents: SubEvent[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="h-5 w-5" />,
  Flame: <Flame className="h-5 w-5" />,
  Music: <Music className="h-5 w-5" />,
  Sun: <Sun className="h-5 w-5" />,
  Wine: <Wine className="h-5 w-5" />,
  HeartHandshake: <HeartHandshake className="h-5 w-5" />,
  Utensils: <Utensils className="h-5 w-5" />,
};

export function FestivitiesSlider({ subEvents }: FestivitiesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!subEvents || subEvents.length === 0) return null;

  const currentEvent = subEvents[currentIndex];

  const handlePrev = () => {
    playClickPopSound();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : subEvents.length - 1));
  };

  const handleNext = () => {
    playClickPopSound();
    setCurrentIndex((prev) => (prev < subEvents.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative my-10 px-4 flex flex-col items-center">
      <div className="text-center mb-4">
        <span className="font-cinzel text-[10.5px] tracking-[0.3em] font-bold text-stone-500 uppercase block">
          Swipe Through The Celebrations
        </span>
        <h2 className="font-playfair text-3xl font-bold text-burgundy-950 mt-1">
          Wedding Festivities
        </h2>
      </div>

      {/* Main Swipeable 3D Card Container */}
      <div className="relative w-full max-w-[320px] aspect-[3.2/4.4] rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between transition-all duration-300 border border-stone-200/80 bg-white">
        {/* Soft themed header gradient background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundColor: currentEvent.dressCodeColorHex || "#6B0F2B",
          }}
        />

        {/* Top Header & Icon */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg text-white mb-3"
            style={{
              backgroundColor: currentEvent.dressCodeColorHex || "#6B0F2B",
            }}
          >
            {ICON_MAP[currentEvent.iconName || "Sparkles"] || (
              <Sparkles className="h-5 w-5" />
            )}
          </div>

          <span className="font-sans text-xs uppercase tracking-wider font-bold text-stone-500">
            {currentEvent.date} • {currentEvent.time}
          </span>
          <h3 className="font-playfair text-2xl font-bold text-burgundy-950 mt-1">
            {currentEvent.title}
          </h3>
        </div>

        {/* Middle Venue Info */}
        <div className="relative z-10 text-center my-auto">
          <div className="inline-flex items-center gap-1.5 text-stone-600 text-xs font-medium">
            <MapPin className="h-4 w-4 text-amber-700 shrink-0" />
            <span>{currentEvent.venue}</span>
          </div>
        </div>

        {/* Bottom Dress Code Badge with Swatch */}
        {currentEvent.dressCode && (
          <div className="relative z-10 pt-3 border-t border-stone-200/80">
            <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-stone-50 border border-stone-200/60">
              <span
                className="h-6 w-6 rounded-lg shadow-sm border border-black/10 shrink-0"
                style={{
                  backgroundColor: currentEvent.dressCodeColorHex || "#EAB308",
                }}
              />
              <div className="text-left">
                <span className="block font-cinzel text-[8.5px] uppercase tracking-wider font-bold text-stone-400">
                  Dress Code
                </span>
                <span className="block font-sans text-xs font-bold text-stone-800 truncate max-w-[200px]">
                  {currentEvent.dressCode}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Arrows & Dot Indicators */}
      <div className="mt-4 flex items-center justify-between w-full max-w-[320px]">
        <button
          onClick={handlePrev}
          title="Previous Event"
          className="p-2.5 rounded-full bg-white shadow-md text-stone-700 hover:text-burgundy-950 transition active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5">
          {subEvents.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === idx
                  ? "w-6 bg-burgundy-900"
                  : "w-2 bg-stone-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          title="Next Event"
          className="p-2.5 rounded-full bg-white shadow-md text-stone-700 hover:text-burgundy-950 transition active:scale-95"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <p className="font-cinzel text-[9.5px] tracking-wider uppercase text-stone-400 mt-2 font-bold">
        &lt; &gt; Swipe or click to view every function
      </p>
    </div>
  );
}
