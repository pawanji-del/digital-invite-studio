"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function GlobalPartyPopper() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if user is clicking inside an input or textarea
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Check if clicked element or parent has data-no-popper
      if (target?.closest("[data-no-popper]")) {
        return;
      }

      // Coordinates in 0..1 normalized canvas space
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Festive party popper burst!
      confetti({
        particleCount: 28,
        spread: 60,
        startVelocity: 22,
        origin: { x, y },
        colors: [
          "#f59e0b", // Amber gold
          "#ec4899", // Festive pink
          "#8b5cf6", // Royal violet
          "#10b981", // Emerald
          "#ef4444", // Crimson red
          "#ffd700", // Gold foil
          "#06b6d4", // Cyan celebration
        ],
        ticks: 120,
        gravity: 1.1,
        scalar: 0.85,
        shapes: ["circle", "square"],
        disableForReducedMotion: true,
      });
    };

    window.addEventListener("click", handleClick, { passive: true });
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
