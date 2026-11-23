import React from "react";
import { EventTheme } from "./types";

export interface ThemeConfig {
  name: string;
  primaryColor: string;
  accentGold: string;
  bgGradient: string;
  cardBg: string;
  textHeading: string;
  textBody: string;
  badgeBg: string;
  badgeText: string;
  particleType: "petals" | "sparkles";
  CornerDecor: React.FC<{ className?: string }>;
}

// Decorative Corner 1: Ornate Indian Mandala for Royal Wedding
const WeddingCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-14 h-14 pointer-events-none fill-none stroke-current opacity-30 ${className || ""}`}
    strokeWidth="1.5"
  >
    <path d="M0,0 Q50,0 50,50 Q0,50 0,0" />
    <circle cx="20" cy="20" r="10" />
    <circle cx="20" cy="20" r="5" />
    <path d="M0,20 Q20,20 20,0" />
    <path d="M10,0 C10,30 30,10 30,0" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
);

// Decorative Corner 2: Festive Stars & Sparkles for Birthday
const BirthdayCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-12 h-12 pointer-events-none fill-current opacity-35 ${className || ""}`}
  >
    <path d="M25,0 L30,18 L48,25 L30,32 L25,50 L20,32 L2,25 L20,18 Z" />
    <circle cx="45" cy="12" r="3" />
    <circle cx="12" cy="45" r="2" />
  </svg>
);

// Decorative Corner 3: Auspicious Kalash & Toran for Traditional Ceremony
const CeremonyCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-14 h-14 pointer-events-none fill-none stroke-current opacity-35 ${className || ""}`}
    strokeWidth="1.5"
  >
    <path d="M0,5 Q25,5 25,30 Q25,55 0,55" />
    <path d="M5,0 Q5,25 30,25 Q55,25 55,0" />
    <circle cx="20" cy="20" r="6" />
    <path d="M15,15 L25,25 M15,25 L25,15" />
  </svg>
);

// Decorative Corner 4: Elegant Art-Deco Geometric Lines for Anniversary
const AnniversaryCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-14 h-14 pointer-events-none fill-none stroke-current opacity-30 ${className || ""}`}
    strokeWidth="1.2"
  >
    <path d="M0,0 L60,0 L0,60 Z" />
    <path d="M0,10 L50,10 L0,50 Z" />
    <path d="M0,20 L40,20 L0,40 Z" />
    <line x1="0" y1="0" x2="45" y2="45" />
  </svg>
);

export const THEMES: Record<EventTheme, ThemeConfig> = {
  "royal-wedding": {
    name: "Royal Indian Wedding",
    primaryColor: "#6B0F2B", // Deep Maroon
    accentGold: "#D4AF37",   // Champagne Gold
    bgGradient: "from-[#FDF6F0] via-[#FAF0E6] to-[#F5E6D8]", // Blush Ivory
    cardBg: "#FFFFFF",
    textHeading: "text-[#6B0F2B]",
    textBody: "text-stone-700",
    badgeBg: "bg-[#6B0F2B]",
    badgeText: "text-amber-100",
    particleType: "petals",
    CornerDecor: WeddingCorner,
  },
  "luxury-birthday": {
    name: "Luxury Birthday",
    primaryColor: "#2E1065", // Midnight Violet
    accentGold: "#F59E0B",   // Electric Gold
    bgGradient: "from-[#F5F3FF] via-[#EDE9FE] to-[#E0E7FF]", // Soft Lavender
    cardBg: "#FFFFFF",
    textHeading: "text-[#2E1065]",
    textBody: "text-stone-700",
    badgeBg: "bg-[#2E1065]",
    badgeText: "text-amber-300",
    particleType: "sparkles",
    CornerDecor: BirthdayCorner,
  },
  "traditional-ceremony": {
    name: "Traditional Ceremony",
    primaryColor: "#9A3412", // Auspicious Vermilion
    accentGold: "#EAB308",   // Marigold Gold
    bgGradient: "from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/40", // Warm Cream
    cardBg: "#FFFFFF",
    textHeading: "text-[#9A3412]",
    textBody: "text-stone-800",
    badgeBg: "bg-[#9A3412]",
    badgeText: "text-amber-100",
    particleType: "petals",
    CornerDecor: CeremonyCorner,
  },
  "modern-anniversary": {
    name: "Modern Anniversary",
    primaryColor: "#064E3B", // Emerald Green
    accentGold: "#E0A899",   // Rose Gold
    bgGradient: "from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]", // Pearl White
    cardBg: "#FFFFFF",
    textHeading: "text-[#064E3B]",
    textBody: "text-stone-700",
    badgeBg: "bg-[#064E3B]",
    badgeText: "text-emerald-100",
    particleType: "sparkles",
    CornerDecor: AnniversaryCorner,
  },
};
