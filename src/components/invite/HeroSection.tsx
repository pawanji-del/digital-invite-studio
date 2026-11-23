"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HeroDetails, TemplateId } from "@/lib/types";
import { TEMPLATES } from "@/lib/templateRegistry";
import { Video, Image as ImageIcon, Sparkles, Calendar, Clock, MapPin } from "lucide-react";

interface HeroSectionProps {
  hero: HeroDetails;
  templateId?: TemplateId;
}

export function HeroSection({ hero, templateId = "hindu-royal-palace" }: HeroSectionProps) {
  const tpl = TEMPLATES[templateId] || TEMPLATES["hindu-royal-palace"];
  const HeaderIcon = tpl.HeaderIconSvg;
  const ArchFrame = tpl.ArchFrameSvg;
  const CornerDecor = tpl.CornerSvg;

  const isHydrangea = templateId === "engagement-pastel-hydrangea";
  const hasVideo = Boolean(hero.heroVideo);
  const [showVideo, setShowVideo] = useState(hasVideo);

  return (
    <div className="relative flex flex-col items-center text-center px-5 pt-8 pb-6 overflow-hidden">
      {/* Decorative Corner Ornaments */}
      {CornerDecor && (
        <>
          <div className="absolute top-2 left-2 text-amber-600/50 pointer-events-none">
            <CornerDecor />
          </div>
          <div className="absolute top-2 right-2 text-amber-600/50 pointer-events-none -scale-x-100">
            <CornerDecor />
          </div>
        </>
      )}

      {/* Sacred Mangalacharan / Opening Chant */}
      {hero.mangalacharan && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-2 px-3 py-1 rounded-full border shadow-xs backdrop-blur-xs ${
            isHydrangea
              ? "bg-blue-50/80 border-blue-200 text-blue-900"
              : "bg-white/70 border-amber-300/40 text-amber-950"
          }`}
        >
          <span className="font-serif italic text-xs sm:text-[13px] font-bold tracking-wide">
            {hero.mangalacharan}
          </span>
        </motion.div>
      )}

      {/* Sacred Icon / Laurel Monogram Badge */}
      {hero.sacredSymbol !== "none" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`my-2 flex h-14 w-14 items-center justify-center rounded-full border-2 shadow-md backdrop-blur-xs ${
            isHydrangea
              ? "border-blue-400 bg-white/95 text-blue-800"
              : "border-amber-400/80 bg-white/90 text-amber-600"
          }`}
        >
          <HeaderIcon symbol={hero.sacredSymbol} />
        </motion.div>
      )}

      {/* Primary Invitation Subheader */}
      {hero.primaryTitle && (
        <span
          className={`font-cinzel text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase mb-2 block ${
            isHydrangea ? "text-blue-800" : "text-stone-500"
          }`}
        >
          {hero.primaryTitle}
        </span>
      )}

      {/* Groom & Bride Calligraphy Names */}
      <div className="mb-2">
        {isHydrangea ? (
          /* Romantic French Calligraphy Style from Reference Video */
          <div className="space-y-1">
            <h1 className="text-5xl sm:text-6xl font-script text-[#1E3A8A] font-bold drop-shadow-sm tracking-wide">
              {hero.groomOrHost}
            </h1>
            <span className="font-serif italic text-2xl text-blue-500 block">&</span>
            <h2 className="text-5xl sm:text-6xl font-script text-[#1E3A8A] font-bold drop-shadow-sm tracking-wide">
              {hero.brideOrCelebrant}
            </h2>
          </div>
        ) : (
          <div>
            <h1 className={`text-4xl sm:text-5xl font-bold ${tpl.textHeading} tracking-wide drop-shadow-xs font-playfair`}>
              {hero.groomOrHost}
            </h1>
            {hero.groomParents && (
              <p className="font-sans text-[11px] tracking-wider uppercase text-stone-600 mt-1 font-semibold">
                {hero.groomParents}
              </p>
            )}

            {hero.brideOrCelebrant && (
              <>
                <div className="my-1 flex items-center justify-center">
                  <span className="font-script text-3xl text-amber-600 drop-shadow-xs">&</span>
                </div>
                <h2 className={`text-4xl sm:text-5xl font-bold ${tpl.textHeading} tracking-wide drop-shadow-xs font-playfair`}>
                  {hero.brideOrCelebrant}
                </h2>
                {hero.brideParents && (
                  <p className="font-sans text-[11px] tracking-wider uppercase text-stone-600 mt-1 font-semibold">
                    {hero.brideParents}
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Media Frame: Video Mode or Ken Burns Photo */}
      {(hero.heroVideo || hero.heroImage) && (
        <div className="relative w-full my-3 flex flex-col items-center">
          <ArchFrame className="w-full">
            {showVideo && hero.heroVideo ? (
              <div className="relative w-full h-full overflow-hidden bg-black">
                <video
                  src={hero.heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[9px] font-bold uppercase tracking-wider text-white flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-blue-400" />
                  Live Motion
                </div>
              </div>
            ) : (
              <motion.img
                src={hero.heroImage}
                alt={hero.groomOrHost}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: "easeOut" }}
                className="w-full h-full object-cover"
              />
            )}
          </ArchFrame>

          {/* Toggle Video/Photo if video exists */}
          {hasVideo && (
            <button
              type="button"
              onClick={() => setShowVideo(!showVideo)}
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10.5px] font-bold uppercase tracking-wider bg-white/90 border border-blue-200 text-blue-900 shadow-sm hover:bg-blue-50 transition active:scale-95"
            >
              {showVideo ? (
                <>
                  <ImageIcon className="w-3 h-3 text-blue-600" />
                  Switch to Photo View
                </>
              ) : (
                <>
                  <Video className="w-3 h-3 text-blue-600" />
                  Watch Couple Motion Video
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Invitation Text */}
      {hero.invitationText && (
        <p className="font-playfair italic text-stone-700 text-xs sm:text-sm max-w-xs mt-3 leading-relaxed font-medium">
          {hero.invitationText}
        </p>
      )}

      {/* Family Closing Sign-off */}
      {hero.closingLine && (
        <p className="font-sans text-[11px] uppercase tracking-wider text-stone-500 font-bold mt-4 border-t border-amber-900/10 pt-3">
          {hero.closingLine}
        </p>
      )}
    </div>
  );
}
