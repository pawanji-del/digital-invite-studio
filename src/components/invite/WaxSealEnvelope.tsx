"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { playEnvelopeOpenSound } from "@/lib/soundFx";
import { DhammaChakraSvg } from "@/lib/templateRegistry";

interface WaxSealEnvelopeProps {
  monogram?: string;
  hostNames?: string;
  isBuddhist?: boolean;
  templateId?: string;
  onOpen: () => void;
}

export function WaxSealEnvelope({
  monogram = "A & A",
  hostNames = "Aarav & Ananya",
  isBuddhist = false,
  templateId,
  onOpen,
}: WaxSealEnvelopeProps) {
  const [stage, setStage] = useState<"sealed" | "opening" | "opened">("sealed");

  const isHydrangea = templateId === "engagement-pastel-hydrangea";

  const handleOpen = () => {
    if (stage !== "sealed") return;
    setStage("opening");
    playEnvelopeOpenSound();

    setTimeout(() => {
      setStage("opened");
      onOpen();
    }, 1100);
  };

  const envelopeBg = isHydrangea
    ? "linear-gradient(145deg, #f0f7ff 0%, #dbeafe 50%, #eff6ff 100%)"
    : isBuddhist
    ? "linear-gradient(145deg, #eff6ff 0%, #dbeafe 50%, #bfdbfe 100%)"
    : "linear-gradient(145deg, #fdfbf7 0%, #f4ede4 50%, #e9ded4 100%)";

  const sealBg = isHydrangea
    ? "radial-gradient(circle at 35% 35%, #bfdbfe 0%, #93c5fd 40%, #60a5fa 75%, #2563eb 100%)"
    : isBuddhist
    ? "radial-gradient(circle at 35% 35%, #1e3a8a 0%, #1e40af 60%, #172554 100%)"
    : "radial-gradient(circle at 35% 35%, #b91c1c 0%, #881337 60%, #4c0519 100%)";

  return (
    <AnimatePresence>
      {stage !== "opened" && (
        <motion.div
          key="wax-seal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/90 backdrop-blur-md px-4 select-none"
        >
          {/* 3D Envelope Container */}
          <div
            onClick={handleOpen}
            className={`group relative cursor-pointer w-full max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between p-7 border ${
              isHydrangea ? "border-blue-300/60" : "border-amber-200/50"
            }`}
            style={{
              perspective: "1000px",
              background: envelopeBg,
              boxShadow: "0 30px 60px -12px rgba(20, 30, 60, 0.6), inset 0 2px 6px rgba(255,255,255,0.8)",
            }}
          >
            {/* Top Flap with 3D Flip Animation */}
            <motion.div
              animate={stage === "opening" ? { rotateX: 180, zIndex: 1 } : { rotateX: 0, zIndex: 20 }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 68%)",
                transformOrigin: "top center",
                background: isHydrangea
                  ? "linear-gradient(180deg, #eff6ff 0%, #bfdbfe 100%)"
                  : isBuddhist
                  ? "linear-gradient(180deg, #f0f7ff 0%, #dbeafe 100%)"
                  : "linear-gradient(180deg, #fdf8f4 0%, #ece0d7 100%)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
              }}
              className="absolute top-0 left-0 right-0 h-1/2"
            />

            {/* Sliding Invitation Card Inside */}
            <motion.div
              animate={stage === "opening" ? { y: -80, opacity: 1 } : { y: 0, opacity: 0.9 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className={`relative z-10 w-full h-full border-2 rounded-2xl flex flex-col items-center justify-between py-6 px-4 bg-white/60 backdrop-blur-xs ${
                isHydrangea ? "border-blue-300/40" : "border-amber-900/15"
              }`}
            >
              {/* Header */}
              <div className="text-center pt-2">
                <span className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-stone-600 font-bold block">
                  {isHydrangea ? "Engagement Party" : isBuddhist ? "Dhamma Invitation" : "Royal Invitation"}
                </span>
                <p className="font-playfair text-2xl text-stone-900 tracking-wide mt-1.5 italic font-bold">
                  {hostNames}
                </p>
                <div
                  className={`mx-auto w-10 h-0.5 mt-1.5 ${
                    isHydrangea ? "bg-blue-400" : "bg-amber-500/50"
                  }`}
                />
              </div>

              {/* 3D Wax Seal Button with Break/Pop Effect */}
              <motion.div
                animate={
                  stage === "opening"
                    ? { scale: [1, 1.25, 0], rotate: [0, 15, -15], opacity: 0 }
                    : { scale: [1, 1.03, 1] }
                }
                transition={
                  stage === "opening"
                    ? { duration: 0.45 }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
                className="relative z-30 my-auto flex h-24 w-24 items-center justify-center rounded-full cursor-pointer shadow-2xl transition-transform hover:scale-110 active:scale-95"
                style={{
                  background: sealBg,
                  boxShadow: isHydrangea
                    ? "0 15px 30px rgba(37, 99, 235, 0.45), inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -3px 6px rgba(30, 58, 138, 0.5)"
                    : "0 15px 30px rgba(10, 20, 50, 0.7), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)",
                }}
              >
                {/* Gold Rim Border */}
                <div className="absolute inset-1.5 rounded-full border border-amber-300/70 opacity-80" />

                {isBuddhist ? (
                  <div className="flex flex-col items-center justify-center text-amber-200">
                    <DhammaChakraSvg className="h-10 w-10 text-amber-200 drop-shadow-md" />
                    <span className="text-[7px] uppercase tracking-widest text-amber-300 font-bold -mt-0.5">
                      DHAMMA
                    </span>
                  </div>
                ) : isHydrangea ? (
                  <div className="text-center select-none flex flex-col items-center">
                    <span className="font-cinzel block text-xl font-extrabold tracking-tight text-amber-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      {monogram}
                    </span>
                    <span className="text-[7px] uppercase tracking-[0.2em] text-amber-200 font-bold block -mt-0.5">
                      FLORAL SEAL
                    </span>
                  </div>
                ) : (
                  <div className="text-center select-none">
                    <span className="font-cinzel block text-xl font-bold tracking-tight text-amber-200 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                      {monogram}
                    </span>
                    <span className="text-[7.5px] uppercase tracking-widest text-amber-300 font-bold block -mt-0.5">
                      SEAL
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Tap Cue */}
              <div className="text-center pb-2 z-10">
                <div
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full backdrop-blur-sm text-xs font-semibold tracking-wide ${
                    isHydrangea
                      ? "bg-blue-100/70 text-blue-900 border border-blue-200/60"
                      : "bg-stone-900/10 text-stone-800"
                  }`}
                >
                  <Sparkles
                    className={`h-3.5 w-3.5 animate-spin ${
                      isHydrangea ? "text-blue-600" : "text-amber-700"
                    }`}
                  />
                  Tap seal to open
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
