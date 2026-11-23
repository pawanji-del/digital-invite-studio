"use client";

import React, { useState } from "react";
import { GalleryItem } from "@/lib/types";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoryGalleryProps {
  gallery: GalleryItem[];
}

export function StoryGallery({ gallery }: StoryGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const current = gallery[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : gallery.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < gallery.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative my-10 px-4 flex flex-col items-center text-center">
      <div className="mb-4">
        <span className="font-cinzel text-[10.5px] tracking-[0.3em] font-bold text-stone-500 uppercase block">
          Moments & Memories
        </span>
        <h2 className="font-playfair text-3xl font-bold text-burgundy-950 mt-1">
          Our Story
        </h2>
      </div>

      {/* Arched Photo Card Carousel */}
      <div className="group relative w-full max-w-[290px] aspect-[3.2/4.3] rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white p-1 bg-gradient-to-b from-rose-50 to-amber-50">
        <div className="w-full h-full rounded-t-[136px] rounded-b-xl overflow-hidden relative cursor-pointer" onClick={() => setLightboxItem(current)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.url}
            alt={current.caption || "Couple Moment"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

          {/* Tap-to-zoom Lightbox Indicator */}
          <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-80 group-hover:opacity-100 transition shadow-sm">
            <Maximize2 className="h-4 w-4" />
          </div>

          {/* Caption Tag at Bottom */}
          {current.caption && (
            <div className="absolute bottom-4 left-3 right-3 text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md font-playfair italic text-burgundy-950 text-sm font-bold shadow-md">
                {current.caption}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="mt-4 flex items-center justify-between w-full max-w-[290px]">
        <button
          onClick={handlePrev}
          title="Previous Photo"
          className="p-2 rounded-full bg-white shadow-md text-stone-700 hover:text-burgundy-950 transition active:scale-95"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {gallery.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 rounded-full transition-all ${
                activeIdx === idx
                  ? "w-6 bg-burgundy-900"
                  : "w-2 bg-stone-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          title="Next Photo"
          className="p-2 rounded-full bg-white shadow-md text-stone-700 hover:text-burgundy-950 transition active:scale-95"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Lightbox Modal (Tap-to-Zoom Fullscreen) */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setLightboxItem(null)}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition z-50"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="relative max-w-lg w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxItem.url}
                alt={lightboxItem.caption || "Zoomed Photo"}
                className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border-2 border-white/20"
              />
              {lightboxItem.caption && (
                <p className="font-playfair italic text-white text-base text-center mt-3 font-semibold drop-shadow">
                  {lightboxItem.caption}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
