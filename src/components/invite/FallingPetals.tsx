"use client";

import React, { useEffect, useRef } from "react";
import { ParticleEffect } from "@/lib/types";

interface FallingPetalsProps {
  particleEffect?: ParticleEffect;
}

export function FallingPetals({ particleEffect = "rose-petals" }: FallingPetalsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (particleEffect === "none") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const count = particleEffect === "floating-balloons" ? 14 : 24;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      color: string;
      alpha: number;
      pulse: number;
    }> = [];

    // Palette per particle type
    const roseColors = ["#E11D48", "#F43F5E", "#FB7185", "#FDA4AF", "#D4AF37", "#FBBF24"];
    const lotusColors = ["#F472B6", "#FBCFE8", "#FFFFFF", "#F43F5E", "#E0E7FF"];
    const sparkleColors = ["#F59E0B", "#FBBF24", "#D4AF37", "#FEF08A", "#FFFFFF"];
    const balloonColors = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"];

    for (let i = 0; i < count; i++) {
      let colorPalette = roseColors;
      if (particleEffect === "lotus-petals") colorPalette = lotusColors;
      if (particleEffect === "golden-sparkles") colorPalette = sparkleColors;
      if (particleEffect === "floating-balloons") colorPalette = balloonColors;

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size:
          particleEffect === "floating-balloons"
            ? Math.random() * 10 + 12
            : particleEffect === "golden-sparkles"
            ? Math.random() * 4 + 2
            : Math.random() * 6 + 4,
        speedY:
          particleEffect === "floating-balloons"
            ? -(Math.random() * 0.7 + 0.4) // Balloons float UPWARDS
            : Math.random() * 0.8 + 0.5,   // Petals fall DOWNWARDS
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 0.04 - 0.02,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        alpha: Math.random() * 0.45 + 0.4,
        pulse: Math.random() * Math.PI,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < count; i++) {
        const p = particles[i];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (particleEffect === "golden-sparkles") {
          // 4-Point Celestial Star
          const s = p.size * (0.8 + 0.3 * Math.sin(p.pulse));
          ctx.beginPath();
          ctx.moveTo(0, -s * 2);
          ctx.quadraticCurveTo(0, 0, s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 2);
          ctx.quadraticCurveTo(0, 0, -s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 2);
          ctx.fill();
        } else if (particleEffect === "floating-balloons") {
          // Balloon Oval + String
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.8, p.size, 0, 0, Math.PI * 2);
          ctx.fill();
          // Little tie knot at bottom
          ctx.beginPath();
          ctx.moveTo(-2, p.size);
          ctx.lineTo(2, p.size);
          ctx.lineTo(0, p.size + 3);
          ctx.fill();
          // Balloon string
          ctx.strokeStyle = "rgba(100, 100, 100, 0.4)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, p.size + 3);
          ctx.quadraticCurveTo(Math.sin(p.pulse) * 4, p.size + 12, 0, p.size + 20);
          ctx.stroke();
        } else {
          // Organic Floral Petal (Rose or Lotus)
          ctx.beginPath();
          ctx.scale(1, 0.65);
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Update physics
        p.rotation += p.rotSpeed;
        p.pulse += 0.05;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.pulse) * 0.35;

        // Reset boundaries
        if (particleEffect === "floating-balloons") {
          if (p.y < -30) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleEffect]);

  if (particleEffect === "none") return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
    />
  );
}
