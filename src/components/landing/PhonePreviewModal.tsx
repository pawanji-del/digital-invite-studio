"use client";

import React from "react";
import { X, ExternalLink, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PhonePreviewModalProps {
  slug: string;
  title: string;
  onClose: () => void;
}

export function PhonePreviewModal({ slug, title, onClose }: PhonePreviewModalProps) {
  const url = `/invite/${slug}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4"
        onClick={onClose}
      >
        <div
          className="relative flex flex-col items-center max-h-[96vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar with Controls */}
          <div className="w-full max-w-[390px] mb-2 flex items-center justify-between px-2 text-white">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
              <Smartphone className="h-4 w-4" />
              <span>Mobile Simulation: {title}</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs inline-flex items-center gap-1 transition"
                title="Open in new window"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                title="Close Preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Realistic iPhone Bezel Mockup */}
          <div className="relative w-[360px] sm:w-[380px] h-[720px] sm:h-[760px] rounded-[50px] border-[10px] border-stone-800 bg-stone-900 shadow-2xl overflow-hidden ring-1 ring-white/20 flex flex-col">
            {/* Dynamic Island / Speaker Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-end pr-3">
              <span className="h-2.5 w-2.5 rounded-full bg-stone-800 border border-stone-700" />
            </div>

            {/* Embedded Live Iframe */}
            <iframe
              src={url}
              title={title}
              className="w-full h-full border-0 rounded-[40px] bg-stone-950"
            />
          </div>

          <p className="text-[11px] text-stone-400 mt-2 text-center">
            Tip: Click the wax seal or tap the screen to experience all 3D animations and audio!
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
