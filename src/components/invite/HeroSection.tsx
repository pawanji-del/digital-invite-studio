"use client";

import React from "react";
import { motion } from "framer-motion";
import { HeroDetails, TemplateId } from "@/lib/types";
import { TEMPLATES } from "@/lib/templateRegistry";

interface HeroSectionProps {
  hero: HeroDetails;
  templateId?: TemplateId;
}

export function HeroSection({ hero, templateId = "hindu-royal-palace" }: HeroSectionProps) {
  const tpl = TEMPLATES[templateId] || TEMPLATES["hindu-royal-palace"];
  const HeaderIcon = tpl.HeaderIconSvg;
  const ArchFrame = tpl.ArchFrameSvg;
  const CornerDecor = tpl.CornerSvg;

  return (
    <div className="relative flex flex-col items-center text-center px-6 pt-9 pb-6 overflow-hidden">
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
          className="mb-2 px-3 py-1 rounded-full bg-white/70 border border-amber-300/40 shadow-xs backdrop-blur-xs"
        >
          <span className="font-serif italic text-xs sm:text-[13px] font-bold tracking-wide text-amber-950">
            {hero.mangalacharan}
          </span>
        </motion.div>
      )}

      {/* Auspicious Sacred Icon Badge */}
      {hero.sacredSymbol !== "none" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="my-2.5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-400/80 bg-white/90 shadow-md backdrop-blur-xs"
        >
          <HeaderIcon symbol={hero.sacredSymbol} />
        </motion.div>
      )}

      {/* Primary Invitation Subheader */}
      {hero.primaryTitle && (
        <span className="font-cinzel text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500 mb-2.5 block">
          {hero.primaryTitle}
        </span>
      )}

      {/* Groom / Primary Host */}
      <div className="mb-2">
        <h1 className={`text-4xl sm:text-5xl font-bold ${tpl.textHeading} tracking-wide drop-shadow-xs font-playfair`}>
          {hero.groomOrHost}
        </h1>
        {hero.groomParents && (
          <p className="font-sans text-[11px] tracking-wider uppercase text-stone-600 mt-1 font-semibold">
            {hero.groomParents}
          </p>
        )}
      </div>

      {/* Ampersand separator */}
      {hero.brideOrCelebrant && (
        <>
          <div className="my-1 flex items-center justify-center">
            <span className="font-script text-3xl text-amber-600 drop-shadow-xs">&</span>
          </div>

          {/* Bride / Celebrant */}
          <div className="mb-3">
            <h2 className={`text-4xl sm:text-5xl font-bold ${tpl.textHeading} tracking-wide drop-shadow-xs font-playfair`}>
              {hero.brideOrCelebrant}
            </h2>
            {hero.brideParents && (
              <p className="font-sans text-[11px] tracking-wider uppercase text-stone-600 mt-1 font-semibold">
                {hero.brideParents}
              </p>
            )}
          </div>
        </>
      )}

      {/* Arched Couple / Hero Image Frame with Ken Burns Animation */}
      {hero.heroImage && (
        <ArchFrame className="my-3">
          <motion.img
            src={hero.heroImage}
            alt={hero.groomOrHost}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
            className="w-full h-full object-cover"
          />
        </ArchFrame>
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
