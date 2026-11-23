"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { playCurtainSwooshSound } from "@/lib/soundFx";

interface CurtainRevealProps {
  title?: string;
  isBuddhist?: boolean;
  onOpen: () => void;
}

export function CurtainReveal({ title = "Celebration", isBuddhist = false, onOpen }: CurtainRevealProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    playCurtainSwooshSound();
    setTimeout(() => {
      onOpen();
    }, 950);
  };

  const leftCurtainBg = isBuddhist
    ? `repeating-linear-gradient(90deg, #0f172a 0px, #1e3a8a 25px, #1e40af 45px, #172554 75px)`
    : `repeating-linear-gradient(90deg, #450a0a 0px, #881337 25px, #9f1239 45px, #4c0519 75px)`;

  const rightCurtainBg = isBuddhist
    ? `repeating-linear-gradient(90deg, #172554 0px, #1e40af 30px, #1e3a8a 50px, #0f172a 75px)`
    : `repeating-linear-gradient(90deg, #4c0519 0px, #9f1239 30px, #881337 50px, #450a0a 75px)`;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="curtain-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black select-none px-4"
        >
          {/* Left Velvet Curtain */}
          <motion.div
            animate={isOpen ? { x: "-105%" } : { x: 0 }}
            transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
            className="absolute left-0 top-0 bottom-0 w-1/2 z-10 shadow-2xl"
            style={{
              background: leftCurtainBg,
              boxShadow: "10px 0 30px rgba(0,0,0,0.8)",
            }}
          />

          {/* Right Velvet Curtain */}
          <motion.div
            animate={isOpen ? { x: "105%" } : { x: 0 }}
            transition={{ duration: 1.0, ease: [0.77, 0, 0.175, 1] }}
            className="absolute right-0 top-0 bottom-0 w-1/2 z-10 shadow-2xl"
            style={{
              background: rightCurtainBg,
              boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
            }}
          />

          {/* Center Royal Medallion */}
          <motion.div
            onClick={handleOpen}
            animate={isOpen ? { scale: 0.8, opacity: 0 } : { scale: [1, 1.03, 1] }}
            transition={isOpen ? { duration: 0.4 } : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-30 cursor-pointer text-center bg-stone-900/95 border-2 border-amber-400 p-6 rounded-3xl shadow-2xl max-w-xs transition-transform hover:scale-105 active:scale-95"
            style={{
              boxShadow: "0 20px 40px rgba(0,0,0,0.8), 0 0 25px rgba(212, 175, 55, 0.4)",
            }}
          >
            <Sparkles className="mx-auto h-8 w-8 text-amber-400 animate-spin mb-2" />
            <span className="font-cinzel text-[10px] tracking-[0.3em] uppercase text-amber-300 font-bold block">
              {isBuddhist ? "Dhamma Pravesh" : "The Grand Reveal"}
            </span>
            <h3 className="font-playfair text-2xl text-amber-100 font-bold mt-1">
              {title}
            </h3>
            <p className="font-sans text-xs text-stone-300 mt-2 font-medium">
              Tap to draw curtains open
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
