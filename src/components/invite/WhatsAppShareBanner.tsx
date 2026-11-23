"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { playClickPopSound } from "@/lib/soundFx";

interface WhatsAppShareBannerProps {
  title: string;
  hostNames?: string;
  eventDateDisplay: string;
  venueName: string;
  slug: string;
}

export function WhatsAppShareBanner({
  title,
  hostNames,
  eventDateDisplay,
  venueName,
  slug,
}: WhatsAppShareBannerProps) {
  const [copied, setCopied] = useState(false);

  const getShareText = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const inviteUrl = `${origin}/invite/${slug}`;
    const name = hostNames || title;

    return `💍 *You're Cordially Invited!*\n\n✨ *${name}*\n📅 *Date:* ${eventDateDisplay}\n📍 *Venue:* ${venueName}\n\n👉 *Open 3D Living Invitation:* ${inviteUrl}\n\n_With warm regards & blessings!_`;
  };

  const handleCopyForward = () => {
    playClickPopSound();
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleDirectWhatsApp = () => {
    playClickPopSound();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(getShareText())}`;
    window.open(url, "_blank");
  };

  return (
    <div className="relative my-8 px-5 flex flex-col items-center text-center">
      <div className="w-full max-w-sm rounded-2xl bg-gradient-to-r from-emerald-950/80 via-emerald-900/80 to-emerald-950/80 border border-emerald-500/40 p-4 shadow-xl text-white">
        <div className="flex items-center justify-center gap-2 mb-2 text-emerald-300">
          <Share2 className="h-4 w-4" />
          <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
            Share with Family & Friends
          </span>
        </div>

        <p className="text-[11px] text-stone-300 mb-3 font-sans">
          Forward this interactive invitation to your loved ones in 1 click!
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyForward}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white text-emerald-950 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-emerald-50 transition active:scale-95"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Copied Message!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-emerald-900" />
                Copy Forward Message
              </>
            )}
          </button>

          <button
            onClick={handleDirectWhatsApp}
            title="Open WhatsApp"
            className="inline-flex items-center justify-center gap-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-md transition active:scale-95"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
