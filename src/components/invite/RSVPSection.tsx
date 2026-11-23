"use client";

import React, { useState } from "react";
import { RSVPDetails } from "@/lib/types";
import { MessageSquareText, Heart, CheckCircle2, XCircle, Send } from "lucide-react";

interface RSVPSectionProps {
  rsvp: RSVPDetails;
  coupleNames?: string;
}

export function RSVPSection({ rsvp, coupleNames }: RSVPSectionProps) {
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<"attending" | "declined">("attending");
  const [guestCount, setGuestCount] = useState("2");
  const [blessing, setBlessing] = useState("");

  const cleanPhone = rsvp.whatsappNumber.replace(/[^0-9]/g, "");

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      alert("Please enter your name for the RSVP");
      return;
    }

    const eventName = coupleNames || "the wedding";
    const statusText =
      status === "attending"
        ? `✅ Attending with Joy (${guestCount} Guest${Number(guestCount) > 1 ? "s" : ""})`
        : "❌ Regretfully Unable to Attend (Sending Warm Blessings)";

    const formattedMessage = [
      `✨ *RSVP for ${eventName}*`,
      `👤 *Guest Name:* ${guestName.trim()}`,
      `📋 *Status:* ${statusText}`,
      blessing.trim() ? `💌 *Blessings & Wishes:* "${blessing.trim()}"` : null,
      `\nSent via Digital Invitation Studio 💍`,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      formattedMessage
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="relative my-10 px-5 pb-16 flex flex-col items-center text-center">
      <div className="mb-4">
        <span className="font-cinzel text-[10.5px] tracking-[0.3em] font-bold text-stone-500 uppercase block">
          Kindly Respond
        </span>
        <h2 className="font-playfair text-3xl font-bold text-burgundy-950 mt-1">
          Will You Join Us?
        </h2>
      </div>

      <div className="w-full max-w-sm rounded-3xl bg-white border border-stone-200/80 shadow-2xl p-6 flex flex-col items-center text-left">
        <p className="text-xs text-stone-600 text-center leading-relaxed mb-5 font-sans">
          Your presence will make our celebrations complete! Kindly confirm your attendance below:
        </p>

        <form onSubmit={handleSubmitRSVP} className="w-full space-y-4">
          {/* Guest Name */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-sans">
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul & Sneha Sharma"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Attending / Decline Toggle */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-sans">
              Will You Attend?
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus("attending")}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition ${
                  status === "attending"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                Joyfully Accept
              </button>
              <button
                type="button"
                onClick={() => setStatus("declined")}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition ${
                  status === "declined"
                    ? "bg-stone-800 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                <XCircle className="h-4 w-4" />
                Decline with Love
              </button>
            </div>
          </div>

          {/* Number of Guests (Only if attending) */}
          {status === "attending" && (
            <div>
              <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-sans">
                Number of Guests Attending
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="1">1 Person</option>
                <option value="2">2 Persons (Couple)</option>
                <option value="3">3 Persons (Family)</option>
                <option value="4">4 Persons (Family)</option>
                <option value="5">5+ Persons (Family)</option>
              </select>
            </div>
          )}

          {/* Optional Blessings Message */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-sans">
              Personal Blessing / Wishes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Wishing you a lifetime of love and joy..."
              value={blessing}
              onChange={(e) => setBlessing(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Send RSVP Button */}
          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white text-xs font-bold tracking-wider uppercase shadow-lg transition hover:bg-emerald-700 active:scale-95"
          >
            <MessageSquareText className="h-4 w-4" />
            Send RSVP on WhatsApp
            <Send className="h-3.5 w-3.5 opacity-80" />
          </button>
        </form>

        {rsvp.contactPerson && (
          <p className="text-[11px] text-stone-500 text-center mt-4 font-medium w-full">
            Host Contact: <span className="text-stone-800 font-bold">{rsvp.contactPerson}</span>
          </p>
        )}

        {/* Heartfelt signoff footer */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-center gap-1.5 text-stone-400 text-xs w-full">
          <span>Crafted with</span>
          <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
          <span>for a lifetime of celebrations</span>
        </div>
      </div>
    </div>
  );
}
