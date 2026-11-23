"use client";

import React from "react";

export function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="rotate-[-35deg] select-none text-center opacity-25">
        <p className="text-3xl font-black tracking-widest text-red-600 sm:text-4xl drop-shadow-md border-y-4 border-dashed border-red-500 py-2 px-8 uppercase">
          DEMO PREVIEW • NOT PAID
        </p>
        <p className="text-xs font-semibold tracking-wider text-red-700 mt-1">
          UNOFFICIAL WATERMARK • STUDIO PREVIEW ONLY
        </p>
      </div>
    </div>
  );
}
