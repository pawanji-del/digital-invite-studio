"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  dRotation: number;
}

const SPARKLE_COLORS = [
  "#ffd700", // Gold
  "#fbbf24", // Warm Amber
  "#f472b6", // Pastel Pink
  "#60a5fa", // Sky Blue
  "#34d399", // Emerald
  "#e879f9", // Lilac
];

export function CelebrationCursorTrail() {
  const [enabled, setEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("celebration-sparkles-enabled");
      if (saved !== null) {
        setEnabled(saved === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleSparkles = () => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("celebration-sparkles-enabled", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    if (!enabled) {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      particlesRef.current = [];
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.dRotation;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;

        // Draw 4-pointed star sparkle
        const r = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -r);
        ctx.quadraticCurveTo(0, 0, r, 0);
        ctx.quadraticCurveTo(0, 0, 0, r);
        ctx.quadraticCurveTo(0, 0, -r, 0);
        ctx.quadraticCurveTo(0, 0, 0, -r);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }

      if (particles.length > 0) {
        animFrameIdRef.current = requestAnimationFrame(render);
      } else {
        animFrameIdRef.current = null;
      }
    };

    const spawnSparkles = (x: number, y: number) => {
      const now = performance.now();
      // Throttle spawn to every 35ms for 60fps buttery smoothness
      if (now - lastSpawnTimeRef.current < 35) return;
      lastSpawnTimeRef.current = now;

      // Keep pool small (<= 25 active particles)
      if (particlesRef.current.length < 25) {
        const count = 2;
        for (let i = 0; i < count; i++) {
          const color =
            SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)];
          particlesRef.current.push({
            x: x + (Math.random() * 8 - 4),
            y: y + (Math.random() * 8 - 4),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.4, // Slight upward drift
            size: Math.random() * 4 + 3,
            color,
            alpha: 1,
            decay: Math.random() * 0.03 + 0.025,
            rotation: Math.random() * Math.PI,
            dRotation: (Math.random() - 0.5) * 0.1,
          });
        }
      }

      if (!animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(render);
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e) {
        if (e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          return;
        }
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      spawnSparkles(clientX, clientY);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [enabled]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        aria-hidden="true"
      />
      {/* Subtle sparkle trail toggle button in bottom corner */}
      <button
        onClick={toggleSparkles}
        type="button"
        data-no-popper="true"
        title={enabled ? "Turn Off Sparkle Trail" : "Turn On Festive Sparkle Trail"}
        aria-label={enabled ? "Turn Off Sparkle Trail" : "Turn On Festive Sparkle Trail"}
        className={`fixed bottom-4 left-4 z-50 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium shadow-md backdrop-blur-md transition-all duration-300 border ${
          enabled
            ? "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/25"
            : "bg-stone-200/50 dark:bg-stone-800/50 border-stone-300/40 dark:border-stone-700/40 text-stone-500 dark:text-stone-400 hover:bg-stone-300/60"
        }`}
      >
        <Sparkles className={`w-3.5 h-3.5 ${enabled ? "text-amber-500 animate-spin" : "opacity-50"}`} />
        <span className="hidden sm:inline">{enabled ? "Sparkles On" : "Sparkles Off"}</span>
      </button>
    </>
  );
}
