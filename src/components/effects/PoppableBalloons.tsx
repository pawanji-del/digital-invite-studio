"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface BalloonItem {
  id: number;
  xPercent: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
  stringColor: string;
  popped: boolean;
  swayAmount: number;
}

const BALLOON_PALETTES = [
  { fill: "#ef4444", string: "#b91c1c" }, // Crimson Red
  { fill: "#f59e0b", string: "#d97706" }, // Golden Amber
  { fill: "#3b82f6", string: "#2563eb" }, // Royal Blue
  { fill: "#ec4899", string: "#db2777" }, // Vivid Pink
  { fill: "#10b981", string: "#059669" }, // Emerald Green
  { fill: "#8b5cf6", string: "#7c3aed" }, // Violet Purple
  { fill: "#06b6d4", string: "#0891b2" }, // Sky Cyan
  { fill: "#f97316", string: "#ea580c" }, // Tangerine
];

export function PoppableBalloons({
  count = 9,
  interactive = true,
  className = "",
}: {
  count?: number;
  interactive?: boolean;
  className?: string;
}) {
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);
  const [popStats, setPopStats] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const list: BalloonItem[] = [];
    for (let i = 0; i < count; i++) {
      const palette = BALLOON_PALETTES[i % BALLOON_PALETTES.length];
      list.push({
        id: i,
        xPercent: 8 + (i * (84 / count)) + (Math.random() * 6 - 3),
        duration: 14 + Math.random() * 8, // 14 to 22 seconds float
        delay: Math.random() * 5,
        size: 44 + Math.random() * 20, // 44px to 64px
        color: palette.fill,
        stringColor: palette.string,
        popped: false,
        swayAmount: 18 + Math.random() * 24,
      });
    }
    setBalloons(list);
  }, [count]);

  const popBalloon = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    let clientX = 0;
    let clientY = 0;

    if ("clientX" in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if ("touches" in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    // Mini confetti burst exactly at balloon position
    const normX = clientX > 0 ? clientX / window.innerWidth : 0.5;
    const normY = clientY > 0 ? clientY / window.innerHeight : 0.5;

    confetti({
      particleCount: 35,
      spread: 70,
      startVelocity: 26,
      origin: { x: normX, y: normY },
      colors: ["#ef4444", "#f59e0b", "#10b981", "#3b82f6", "#ec4899", "#ffd700"],
      ticks: 100,
      gravity: 1.2,
      scalar: 0.9,
    });

    // Mark popped
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    // Show floating "+1 Popped!" indicator
    const newStat = { id: Date.now(), x: clientX, y: clientY };
    setPopStats((prev) => [...prev, newStat]);
    setTimeout(() => {
      setPopStats((prev) => prev.filter((s) => s.id !== newStat.id));
    }, 1200);

    // Respawn after 3 seconds
    setTimeout(() => {
      setBalloons((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                popped: false,
                delay: 0,
                xPercent: 8 + Math.random() * 84,
              }
            : b
        )
      );
    }, 3200);
  };

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-20 ${className}`}
      aria-hidden="true"
    >
      {balloons.map((balloon) => {
        if (balloon.popped) return null;

        return (
          <motion.div
            key={balloon.id}
            initial={{
              y: "115vh",
              x: `${balloon.xPercent}vw`,
              opacity: 0,
            }}
            animate={{
              y: "-20vh",
              x: [
                `${balloon.xPercent - balloon.swayAmount / 20}vw`,
                `${balloon.xPercent + balloon.swayAmount / 20}vw`,
                `${balloon.xPercent - balloon.swayAmount / 20}vw`,
              ],
              opacity: [0, 0.92, 0.95, 0],
            }}
            transition={{
              y: {
                duration: balloon.duration,
                repeat: Infinity,
                delay: balloon.delay,
                ease: "linear",
              },
              x: {
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
              opacity: {
                duration: balloon.duration,
                repeat: Infinity,
                delay: balloon.delay,
                ease: "linear",
              },
            }}
            className="absolute bottom-0"
            style={{
              width: balloon.size,
              height: balloon.size * 1.5,
              pointerEvents: interactive ? "auto" : "none",
            }}
          >
            <button
              type="button"
              onClick={(e) => popBalloon(balloon.id, e)}
              className="relative w-full h-full cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-full"
              title="Click or Tap to POP!"
              aria-label="Click to pop celebration balloon"
              data-no-popper="true"
            >
              {/* Balloon Oval SVG */}
              <svg
                viewBox="0 0 100 150"
                className="w-full h-full drop-shadow-md transition-transform duration-200 group-hover:scale-110 active:scale-95"
              >
                <defs>
                  <radialGradient
                    id={`balloonGrad-${balloon.id}`}
                    cx="35%"
                    cy="35%"
                    r="65%"
                  >
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.65" />
                    <stop offset="35%" stopColor={balloon.color} />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
                  </radialGradient>
                  <filter id={`glow-${balloon.id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* String */}
                <path
                  d="M 50 102 Q 44 118 52 132 T 48 150"
                  fill="none"
                  stroke={balloon.stringColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.75"
                />

                {/* Knot */}
                <polygon
                  points="46,100 54,100 50,105"
                  fill={balloon.color}
                />

                {/* Main Body */}
                <path
                  d="M 50 2 C 22 2 12 30 12 55 C 12 78 28 98 48 101 C 49 101 51 101 52 101 C 72 98 88 78 88 55 C 88 30 78 2 50 2 Z"
                  fill={`url(#balloonGrad-${balloon.id})`}
                  filter={`url(#glow-${balloon.id})`}
                />

                {/* Specular Highlight */}
                <ellipse
                  cx="36"
                  cy="28"
                  rx="10"
                  ry="18"
                  fill="#ffffff"
                  opacity="0.45"
                  transform="rotate(-25 36 28)"
                />
              </svg>
            </button>
          </motion.div>
        );
      })}

      {/* Pop Floating Indicator */}
      <AnimatePresence>
        {popStats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 1, scale: 0.6, y: stat.y, x: stat.x - 30 }}
            animate={{ opacity: 0, scale: 1.3, y: stat.y - 70 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="fixed pointer-events-none z-50 text-xs font-extrabold px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-lg tracking-wider"
          >
            POP! 💥
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
