"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Invitation } from "@/lib/types";
import { TEMPLATES } from "@/lib/templateRegistry";
import { CoverInteraction } from "@/components/invite/CoverInteraction";
import { FallingPetals } from "@/components/invite/FallingPetals";
import { PoppableBalloons } from "@/components/effects/PoppableBalloons";
import { MusicPlayer } from "@/components/invite/MusicPlayer";
import { Watermark } from "@/components/invite/Watermark";
import { HeroSection } from "@/components/invite/HeroSection";
import { PullToRevealScroll } from "@/components/invite/PullToRevealScroll";
import { FestivitiesSlider } from "@/components/invite/FestivitiesSlider";
import { StoryGallery } from "@/components/invite/StoryGallery";
import { LocationMap } from "@/components/invite/LocationMap";
import { RSVPSection } from "@/components/invite/RSVPSection";
import { WhatsAppShareBanner } from "@/components/invite/WhatsAppShareBanner";

interface InviteViewClientProps {
  invite: Invitation;
}

export function InviteViewClient({ invite }: InviteViewClientProps) {
  const [hasOpenedCover, setHasOpenedCover] = useState(false);
  const tpl = TEMPLATES[invite.templateId] || TEMPLATES["hindu-royal-palace"];

  const isBuddhist =
    invite.category === "buddhist-wedding" ||
    (invite.templateId && invite.templateId.startsWith("buddhist"));

  const isBirthday =
    invite.category === "birthday" ||
    (invite.templateId && invite.templateId.startsWith("birthday"));

  // Increment view counter on mount
  useEffect(() => {
    fetch(`/api/invitations/${invite.slug}/view`, { method: "POST" }).catch(() => {});
  }, [invite.slug]);

  const handleCoverOpen = () => {
    setHasOpenedCover(true);

    // Blast celebratory confetti on cover opening
    confetti({
      particleCount: isBirthday ? 70 : 55,
      spread: isBirthday ? 90 : 75,
      origin: { y: 0.6 },
      colors: isBuddhist
        ? ["#1E3A8A", "#3B82F6", "#D4AF37", "#FFFFFF"]
        : isBirthday
        ? ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"]
        : ["#6B0F2B", "#D4AF37", "#F59E0B", "#F43F5E"],
    });
  };

  const coupleNames =
    invite.hero.brideOrCelebrant && invite.hero.groomOrHost
      ? `${invite.hero.groomOrHost} & ${invite.hero.brideOrCelebrant}`
      : invite.hero.groomOrHost || invite.title;

  return (
    <div className="relative min-h-screen w-full bg-[#0d0b0a] flex items-center justify-center py-0 sm:py-8 px-0 sm:px-4 selection:bg-amber-200 selection:text-stone-900">
      {/* Subtle Ambient Desktop Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 bg-cover bg-center"
        style={{
          backgroundImage: `url("${invite.hero.heroImage || invite.ogImage}")`,
          filter: "blur(60px) brightness(0.18)",
        }}
      />

      {/* Watermark for demo/unpaid mode */}
      {invite.isUnpaidDemo && <Watermark />}

      {/* Cover Opening Screen (3D Book / Wax Seal / Curtains / Ribbon Cut) */}
      <CoverInteraction
        coverStyle={invite.coverStyle || tpl.defaultCover}
        title={invite.title}
        hostNames={coupleNames}
        isBuddhist={isBuddhist}
        templateId={invite.templateId}
        onOpened={handleCoverOpen}
      />

      {/* Mobile Device Frame Container (max-w-430px centered) */}
      <main
        className={`relative z-10 w-full max-w-[430px] min-h-screen sm:min-h-[920px] rounded-none sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col justify-between border-0 sm:border-[8px] sm:border-stone-800/80 bg-gradient-to-b ${tpl.bgGradient}`}
        style={{
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2)",
        }}
      >
        {/* Subtle Dhamma Chakra Watermark for Buddhist Templates */}
        {isBuddhist && (
          <div className="absolute top-28 left-1/2 -translate-x-1/2 opacity-[0.06] pointer-events-none w-72 h-72">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-blue-900">
              <circle cx="50" cy="50" r="46" strokeWidth="2" />
              <circle cx="50" cy="50" r="10" strokeWidth="2" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="5"
                  strokeWidth="1.2"
                  transform={`rotate(${i * 15} 50 50)`}
                />
              ))}
            </svg>
          </div>
        )}

        {/* Interactive Floating Poppable Balloons for Birthday or Balloon Theme */}
        {(isBirthday || (invite.particleEffect || tpl.defaultParticle) === "floating-balloons") && (
          <PoppableBalloons count={5} className="absolute inset-0 z-20 pointer-events-none" />
        )}

        {/* Ambient Particles Canvas */}
        <FallingPetals particleEffect={invite.particleEffect || tpl.defaultParticle} />

        {/* Floating Music Disc Player */}
        <MusicPlayer
          audioUrl={invite.audioUrl || tpl.defaultMusic}
          autoPlayTrigger={hasOpenedCover}
        />

        {/* Main Invitation Flow */}
        <div className="relative z-10 flex flex-col">
          {/* Section 1: Hero Section */}
          <HeroSection hero={invite.hero} templateId={invite.templateId} />

          {/* Section 2: Interactive Pull-to-Reveal Save The Date Scroll & Live Flip Countdown */}
          <PullToRevealScroll
            eventDate={invite.eventDate}
            eventDateDisplay={invite.eventDateDisplay}
            venueName={invite.venue.name}
            slug={invite.slug}
          />

          {/* Section 3: Festivities & Sub-events Slider with Dress Code Swatch */}
          <FestivitiesSlider subEvents={invite.subEvents} />

          {/* Section 4: Our Story Photo Gallery with Tap-to-Zoom Lightbox */}
          {invite.gallery && invite.gallery.length > 0 && (
            <StoryGallery gallery={invite.gallery} />
          )}

          {/* Section 5: Venue Map, Route & One-Tap Directions */}
          <LocationMap venue={invite.venue} />

          {/* Section 6: Interactive WhatsApp RSVP Form */}
          <RSVPSection rsvp={invite.rsvp} coupleNames={coupleNames} />

          {/* Section 7: Quick WhatsApp Forward Message Banner */}
          <WhatsAppShareBanner
            title={invite.title}
            hostNames={coupleNames}
            eventDateDisplay={invite.eventDateDisplay}
            venueName={invite.venue.name}
            slug={invite.slug}
          />
        </div>
      </main>
    </div>
  );
}
