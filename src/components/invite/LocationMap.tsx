"use client";

import React, { useState } from "react";
import { VenueDetails } from "@/lib/types";
import { Navigation, Copy, Check, MapPin } from "lucide-react";

interface LocationMapProps {
  venue: VenueDetails;
}

export function LocationMap({ venue }: LocationMapProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${venue.name}, ${venue.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative my-10 px-5 flex flex-col items-center text-center">
      <div className="mb-4">
        <span className="font-cinzel text-[10.5px] tracking-[0.3em] font-bold text-stone-500 uppercase block">
          Venue & Directions
        </span>
        <h2 className="font-playfair text-3xl font-bold text-burgundy-950 mt-1">
          How To Reach
        </h2>
      </div>

      {/* Styled Map Card */}
      <div className="w-full max-w-sm rounded-3xl bg-white border border-stone-200/80 shadow-2xl overflow-hidden p-5 flex flex-col items-center">
        {/* Map Preview Graphic */}
        <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-amber-50 border border-amber-200/60 flex flex-col items-center justify-center p-4">
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#b45309 1.5px, transparent 1.5px)`,
              backgroundSize: "16px 16px",
            }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-burgundy-900 text-white shadow-xl animate-bounce">
              <MapPin className="h-6 w-6 text-amber-300" />
            </div>
            <span className="mt-2 text-xs font-bold text-burgundy-950 tracking-wide bg-white/95 px-3 py-1 rounded-full shadow-sm font-sans">
              {venue.name}
            </span>
          </div>
        </div>

        {/* Venue Address */}
        <div className="mt-4 text-center">
          <h3 className="font-playfair text-2xl font-bold text-burgundy-950">
            {venue.name}
          </h3>
          <p className="font-sans text-xs text-stone-600 mt-1 max-w-xs leading-relaxed font-medium">
            {venue.address}
          </p>
        </div>

        {/* Action Buttons: Get Directions & Copy Address */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 w-full">
          <a
            href={venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-burgundy-900 text-white font-sans text-xs font-bold tracking-wider uppercase shadow-md transition hover:bg-burgundy-950 active:scale-95 min-w-[130px]"
          >
            <Navigation className="h-3.5 w-3.5" />
            Get Directions
          </a>

          <button
            onClick={handleCopy}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-stone-300 bg-stone-50 text-stone-700 font-sans text-xs font-bold tracking-wider uppercase transition hover:bg-stone-100 active:scale-95 min-w-[130px]"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Address Copied!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy Address
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
