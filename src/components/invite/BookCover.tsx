"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Home, Flame } from "lucide-react";
import { playBookFlipSound } from "@/lib/soundFx";
import { DhammaChakraSvg, KalashSvg } from "@/lib/templateRegistry";

interface BookCoverProps {
  title?: string;
  isBuddhist?: boolean;
  templateId?: string;
  onOpen: () => void;
}

export function BookCover({
  title = "Auspicious Invitation",
  isBuddhist = false,
  templateId = "hindu-royal-palace",
  onOpen,
}: BookCoverProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    playBookFlipSound();
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  const isGrihaPravesh = templateId === "ceremony-griha-pravesh";

  const bookBg = isBuddhist
    ? "linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 60%, #0f172a 100%)"
    : isGrihaPravesh
    ? "linear-gradient(135deg, #9a3412 0%, #7c2d12 50%, #451a03 100%)"
    : "linear-gradient(135deg, #78350f 0%, #451a03 50%, #290f02 100%)";

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="3d-book-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.7, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/95 backdrop-blur-md px-4 select-none"
        >
          {/* 3D Perspective Stage */}
          <div
            onClick={handleOpen}
            className="group relative cursor-pointer w-full max-w-[320px] aspect-[3.4/5] rounded-r-3xl rounded-l-md shadow-2xl p-7 flex flex-col justify-between border-y-2 border-r-2 border-amber-400/50"
            style={{
              perspective: "1400px",
              background: bookBg,
              boxShadow: "15px 30px 60px rgba(0,0,0,0.85), inset 6px 0 20px rgba(0,0,0,0.6)",
            }}
          >
            {/* 3D Flipping Front Cover */}
            <motion.div
              animate={isOpen ? { rotateY: -135 } : { rotateY: 0 }}
              transition={{ duration: 0.85, ease: [0.77, 0, 0.175, 1] }}
              style={{
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                background: bookBg,
              }}
              className="absolute inset-0 rounded-r-3xl rounded-l-md p-6 flex flex-col justify-between border border-amber-400/40 shadow-2xl z-20"
            >
              {/* Book Spine Shadow simulation */}
              <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/80 via-black/30 to-transparent border-r border-amber-500/30" />

              {/* Gold Foil Ornate Border */}
              <div className="absolute inset-4 rounded-r-2xl rounded-l-sm border-2 border-amber-400/40 pointer-events-none" />

              {/* Title & Emblem */}
              <div className="relative z-10 text-center pt-8">
                <div className="mx-auto w-14 h-14 rounded-full border-2 border-amber-400/60 bg-black/40 flex items-center justify-center mb-4 text-amber-300 shadow-lg">
                  {isBuddhist ? (
                    <DhammaChakraSvg className="h-8 w-8 text-amber-300" />
                  ) : isGrihaPravesh ? (
                    <KalashSvg className="h-8 w-8 text-amber-400" />
                  ) : (
                    <BookOpen className="h-7 w-7 text-amber-400" />
                  )}
                </div>
                <span className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-amber-300 font-bold block">
                  {isBuddhist
                    ? "Dhamma Parinay"
                    : isGrihaPravesh
                    ? "Griha Pravesh & Hawan"
                    : "Shubh Vivaah"}
                </span>
                <h2 className="font-playfair text-3xl font-bold text-amber-100 tracking-wide mt-2 leading-tight">
                  {title}
                </h2>
              </div>

              {/* Bottom Touch Cue */}
              <div className="relative z-10 text-center pb-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-200 text-xs font-semibold tracking-wider">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" />
                  Tap cover to open
                </span>
              </div>
            </motion.div>

            {/* Inner Golden Page revealed underneath when cover flips */}
            <div className="absolute inset-0 rounded-r-3xl rounded-l-md bg-[#fffbeb] p-6 flex flex-col items-center justify-center text-center z-10">
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-800 font-bold">
                Opening Invitation...
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
