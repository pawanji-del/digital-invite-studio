"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Scissors, Sparkles } from "lucide-react";
import { playRibbonCutSound } from "@/lib/soundFx";

interface RibbonCutCoverProps {
  title?: string;
  onOpen: () => void;
}

export function RibbonCutCover({ title = "Grand Opening Ceremony", onOpen }: RibbonCutCoverProps) {
  const [isCut, setIsCut] = useState(false);

  const handleCut = () => {
    if (isCut) return;
    setIsCut(true);
    playRibbonCutSound();

    confetti({
      particleCount: 65,
      spread: 80,
      origin: { y: 0.5 },
      colors: ["#DC2626", "#D4AF37", "#F59E0B", "#FFFFFF"],
    });

    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <AnimatePresence>
      {!isCut && (
        <motion.div
          key="ribbon-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md px-4 select-none"
        >
          {/* Background Satin Drapes */}
          <div className="absolute inset-0 bg-radial from-stone-900 to-black pointer-events-none opacity-80" />

          {/* Left Ribbon Piece */}
          <motion.div
            animate={isCut ? { x: "-120%", rotate: -25, opacity: 0 } : { x: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-16 sm:h-20 bg-gradient-to-r from-red-800 via-red-600 to-red-500 shadow-2xl border-y-2 border-amber-300 flex items-center justify-end z-20"
            style={{
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            }}
          >
            <div className="w-full h-1 bg-amber-300/60 my-auto" />
          </motion.div>

          {/* Right Ribbon Piece */}
          <motion.div
            animate={isCut ? { x: "120%", rotate: 25, opacity: 0 } : { x: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-16 sm:h-20 bg-gradient-to-l from-red-800 via-red-600 to-red-500 shadow-2xl border-y-2 border-amber-300 flex items-center justify-start z-20"
            style={{
              boxShadow: "0 10px 25px rgba(0,0,0,0.6)",
            }}
          >
            <div className="w-full h-1 bg-amber-300/60 my-auto" />
          </motion.div>

          {/* Center Medallion & Golden Scissors Button */}
          <motion.div
            onClick={handleCut}
            animate={isCut ? { scale: 0.7, opacity: 0 } : { scale: [1, 1.05, 1] }}
            transition={isCut ? { duration: 0.3 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-30 cursor-pointer flex flex-col items-center justify-center rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 p-6 shadow-2xl border-4 border-white text-stone-950 max-w-xs text-center active:scale-95"
            style={{
              boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 30px rgba(212, 175, 55, 0.6)",
            }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-950 text-amber-300 shadow-md mb-2 animate-bounce">
              <Scissors className="h-7 w-7 rotate-90" />
            </div>
            <span className="font-cinzel text-[10px] tracking-[0.3em] font-extrabold uppercase text-stone-900 block">
              Inauguration Ceremony
            </span>
            <h3 className="font-playfair text-xl font-bold mt-1 text-stone-950">
              {title}
            </h3>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-950/15 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-stone-900" />
              Tap to Cut Ribbon
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
