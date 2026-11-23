import React from "react";
import { TemplateId, SacredSymbol, CoverStyle, ParticleEffect } from "./types";

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  defaultCover: CoverStyle;
  defaultParticle: ParticleEffect;
  defaultMusic: string;
  primaryColor: string;
  accentGold: string;
  bgGradient: string;
  cardBg: string;
  textHeading: string;
  textBody: string;
  badgeBg: string;
  badgeText: string;
  fontHeading: string;
  fontBody: string;
  HeaderIconSvg: React.FC<{ symbol?: SacredSymbol; className?: string }>;
  ArchFrameSvg: React.FC<{ children: React.ReactNode; className?: string }>;
  CornerSvg: React.FC<{ className?: string }>;
}

// -------------------------------------------------------------
// SACRED ICONS & MOTIFS SVGS
// -------------------------------------------------------------

// 1. Lord Ganesha Icon (Hindu)
export const GaneshaIconSvg: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-amber-700" }) => (
  <svg viewBox="0 0 100 100" className={`fill-current ${className}`}>
    <path d="M50 15 C40 15 35 25 35 35 C35 45 42 50 50 52 C58 50 65 45 65 35 C65 25 60 15 50 15 Z" opacity="0.9" />
    <path d="M50 52 C45 60 42 70 42 80 C42 84 50 86 52 80 C54 75 52 65 50 52 Z" />
    <circle cx="35" cy="40" r="10" opacity="0.75" />
    <circle cx="65" cy="40" r="10" opacity="0.75" />
    <path d="M48 25 L52 25 L50 20 Z" fill="#b45309" />
  </svg>
);

// 2. Ashoka Chakra / Dhamma Wheel (Buddhist / Ambedkarite - 24 Spokes)
export const DhammaChakraSvg: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-blue-700" }) => (
  <svg viewBox="0 0 100 100" className={`stroke-current fill-none ${className}`}>
    <circle cx="50" cy="50" r="44" strokeWidth="3" />
    <circle cx="50" cy="50" r="38" strokeWidth="1.5" />
    <circle cx="50" cy="50" r="9" strokeWidth="2" fill="currentColor" opacity="0.15" />
    <circle cx="50" cy="50" r="4" fill="currentColor" />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2="50"
        y2="12"
        strokeWidth="1.5"
        transform={`rotate(${i * 15} 50 50)`}
      />
    ))}
  </svg>
);

// 3. Tathagata Gautam Buddha Silhouette (Buddhist)
export const BuddhaSilhouetteSvg: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-amber-500" }) => (
  <svg viewBox="0 0 100 100" className={`fill-current ${className}`}>
    {/* Meditating Buddha seated in Dhyana Mudra */}
    <ellipse cx="50" cy="24" rx="9" ry="11" />
    <circle cx="50" cy="12" r="3.5" />
    <path d="M38 34 C42 32 58 32 62 34 C67 36 69 46 68 56 C67 66 64 74 61 78 C56 79 44 79 39 78 C36 74 33 66 32 56 C31 46 33 36 38 34 Z" opacity="0.95" />
    <ellipse cx="50" cy="80" rx="26" ry="6" opacity="0.9" />
    {/* Halo ring */}
    <circle cx="50" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

// 4. Dr. B.R. Ambedkar Emblem (Ambedkarite)
export const AmbedkarEmblemSvg: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-blue-700" }) => (
  <svg viewBox="0 0 100 100" className={`fill-current ${className}`}>
    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    {/* Stylized Bust profile with spectacles and open book of constitution */}
    <ellipse cx="50" cy="34" rx="14" ry="16" opacity="0.9" />
    <rect x="42" y="32" width="16" height="5" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
    <path d="M30 68 C34 54 66 54 70 68 C70 78 30 78 30 68 Z" />
    <path d="M42 66 L50 62 L58 66 L58 74 L42 74 Z" fill="#EAB308" />
  </svg>
);

// 5. Traditional Kalash with Coconut & Mango leaves (Hindu)
export const KalashSvg: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-amber-600" }) => (
  <svg viewBox="0 0 100 100" className={`fill-current ${className}`}>
    <ellipse cx="50" cy="68" rx="22" ry="18" />
    <rect x="40" y="46" width="20" height="6" rx="2" />
    <path d="M35 48 C42 36 46 30 50 25 C54 30 58 36 65 48 Z" fill="#ca8a04" />
    <circle cx="50" cy="38" r="8" fill="#78350f" />
    {/* Swastik / Shubh mark */}
    <circle cx="50" cy="68" r="3" fill="#ffffff" />
  </svg>
);

// 6. Bodhi Leaf (Buddhist Serenity)
export const BodhiLeafSvg: React.FC<{ className?: string }> = ({ className = "h-8 w-8 text-emerald-600" }) => (
  <svg viewBox="0 0 100 100" className={`fill-current ${className}`}>
    <path d="M50 8 C40 28 15 36 15 58 C15 78 35 92 50 90 C65 92 85 78 85 58 C85 36 60 28 50 8 Z" opacity="0.9" />
    <line x1="50" y1="20" x2="50" y2="88" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
    <line x1="50" y1="45" x2="32" y2="40" stroke="#ffffff" strokeWidth="1.2" opacity="0.5" />
    <line x1="50" y1="45" x2="68" y2="40" stroke="#ffffff" strokeWidth="1.2" opacity="0.5" />
    <line x1="50" y1="60" x2="30" y2="58" stroke="#ffffff" strokeWidth="1.2" opacity="0.5" />
    <line x1="50" y1="60" x2="70" y2="58" stroke="#ffffff" strokeWidth="1.2" opacity="0.5" />
  </svg>
);

// -------------------------------------------------------------
// ARCH FRAMES & CORNERS
// -------------------------------------------------------------

// Rajasthani Jharokha Arch Frame
const RajasthaniJharokhaFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`relative w-full max-w-[285px] aspect-[3.2/4.2] rounded-t-[142px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-amber-300/80 p-1 bg-gradient-to-b from-amber-200 via-rose-100 to-amber-100 ${className || ""}`}>
    {/* Scalloped Arch Top */}
    <div className="w-full h-full rounded-t-[138px] rounded-b-xl overflow-hidden relative">
      {children}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  </div>
);

// Sanchi Stupa / Pillar Arch Frame (Buddhist)
const BuddhistStupaArchFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`relative w-full max-w-[285px] aspect-[3.2/4.2] rounded-t-[140px] rounded-b-xl overflow-hidden shadow-2xl border-4 border-blue-400/70 p-1 bg-gradient-to-b from-blue-100 via-sky-50 to-amber-100 ${className || ""}`}>
    <div className="w-full h-full rounded-t-[136px] rounded-b-lg overflow-hidden relative">
      {children}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/40 via-transparent to-transparent pointer-events-none" />
    </div>
  </div>
);

// Watercolor Floral Oval Arch
const FloralPastelFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`relative w-full max-w-[280px] aspect-[3.2/4.2] rounded-full overflow-hidden shadow-2xl border-4 border-white p-1 bg-gradient-to-b from-rose-100 via-pink-50 to-teal-100 ${className || ""}`}>
    <div className="w-full h-full rounded-full overflow-hidden relative">
      {children}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 via-transparent to-transparent pointer-events-none" />
    </div>
  </div>
);

// Modern Geometric Arch Frame
const ModernGeometricFrame: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`relative w-full max-w-[285px] aspect-[3.2/4.2] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/80 p-1.5 bg-stone-900 ${className || ""}`}>
    <div className="w-full h-full rounded-xl overflow-hidden relative border border-amber-300/40">
      {children}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
    </div>
  </div>
);

// -------------------------------------------------------------
// CORNER SVGS
// -------------------------------------------------------------
const IndianMandalaCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-14 h-14 pointer-events-none fill-none stroke-current opacity-35 ${className || ""}`} strokeWidth="1.5">
    <path d="M0,0 Q50,0 50,50 Q0,50 0,0" />
    <circle cx="20" cy="20" r="10" />
    <path d="M0,20 Q20,20 20,0" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
  </svg>
);

const DhammaCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-14 h-14 pointer-events-none fill-none stroke-current opacity-35 ${className || ""}`} strokeWidth="1.5">
    <circle cx="25" cy="25" r="18" />
    <path d="M0,25 L50,25 M25,0 L25,50" />
    <path d="M0,0 L35,35" strokeDasharray="2 2" />
  </svg>
);

const FloralCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-14 h-14 pointer-events-none fill-none stroke-current opacity-40 ${className || ""}`} strokeWidth="1.3">
    <path d="M0,40 C20,40 40,20 40,0" />
    <circle cx="18" cy="18" r="6" fill="currentColor" opacity="0.3" />
    <path d="M10,35 Q25,25 35,10" />
  </svg>
);

const GoldGeometricCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={`w-14 h-14 pointer-events-none fill-none stroke-current opacity-30 ${className || ""}`} strokeWidth="1.2">
    <path d="M0,0 L60,0 L0,60 Z" />
    <path d="M0,10 L50,10 L0,50 Z" />
    <line x1="0" y1="0" x2="45" y2="45" />
  </svg>
);

// -------------------------------------------------------------
// MASTER TEMPLATE REGISTRY
// -------------------------------------------------------------

export const TEMPLATES: Record<TemplateId, TemplateDefinition> = {
  // 1. Hindu Wedding - Royal Palace (Rajasthani Velvet & Gold)
  "hindu-royal-palace": {
    id: "hindu-royal-palace",
    name: "Hindu Royal Palace (Rajasthani Jharokha)",
    category: "Hindu Wedding",
    description: "Deep Maroon & Gold velvet texture, Rajasthani Jharokha arch frame, Ganesha/Kalash motifs with 3D Velvet Book cover.",
    defaultCover: "3d-book",
    defaultParticle: "rose-petals",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#6B0F2B",
    accentGold: "#D4AF37",
    bgGradient: "from-[#FDF6F0] via-[#FAF0E6] to-[#F5E6D8]",
    cardBg: "#FFFFFF",
    textHeading: "text-[#6B0F2B]",
    textBody: "text-stone-800",
    badgeBg: "bg-[#6B0F2B]",
    badgeText: "text-amber-100",
    fontHeading: "font-cinzel",
    fontBody: "font-sans",
    HeaderIconSvg: ({ symbol }) => (symbol === "kalash" ? <KalashSvg /> : <GaneshaIconSvg />),
    ArchFrameSvg: RajasthaniJharokhaFrame,
    CornerSvg: IndianMandalaCorner,
  },

  // 2. Hindu Wedding - Floral Pastel (Blush & Mint)
  "hindu-floral-pastel": {
    id: "hindu-floral-pastel",
    name: "Hindu Floral Pastel (Blush & Mint)",
    category: "Hindu Wedding",
    description: "Blush Pink, Ivory & Mint, animated watercolor floral vine borders, delicate Wax-Seal Envelope cover.",
    defaultCover: "wax-seal-envelope",
    defaultParticle: "rose-petals",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#9F1239",
    accentGold: "#0F766E",
    bgGradient: "from-[#FFF1F2] via-[#FDF2F4] to-[#F0FDFA]",
    cardBg: "#FFFFFF",
    textHeading: "text-[#9F1239]",
    textBody: "text-stone-700",
    badgeBg: "bg-[#0F766E]",
    badgeText: "text-white",
    fontHeading: "font-playfair",
    fontBody: "font-sans",
    HeaderIconSvg: () => <GaneshaIconSvg className="h-8 w-8 text-rose-700" />,
    ArchFrameSvg: FloralPastelFrame,
    CornerSvg: FloralCorner,
  },

  // 3. Hindu Wedding - Heritage Scroll (Saffron & Temple Gold)
  "hindu-heritage-scroll": {
    id: "hindu-heritage-scroll",
    name: "Hindu Heritage Scroll (Shubh Vivaah)",
    category: "Hindu Wedding",
    description: "Saffron, Temple Gold & Cream, traditional Shubh Vivaah scroll aesthetic with Curtain Reveal cover.",
    defaultCover: "curtain-reveal",
    defaultParticle: "golden-sparkles",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#C2410C",
    accentGold: "#EAB308",
    bgGradient: "from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/40",
    cardBg: "#FFFFFF",
    textHeading: "text-[#C2410C]",
    textBody: "text-stone-800",
    badgeBg: "bg-[#C2410C]",
    badgeText: "text-amber-100",
    fontHeading: "font-cinzel",
    fontBody: "font-sans",
    HeaderIconSvg: () => <KalashSvg className="h-8 w-8 text-amber-600" />,
    ArchFrameSvg: RajasthaniJharokhaFrame,
    CornerSvg: IndianMandalaCorner,
  },

  // 4. Buddhist / Ambedkarite Wedding - Dhamma Royal
  "buddhist-dhamma-royal": {
    id: "buddhist-dhamma-royal",
    name: "Buddhist Dhamma Royal (Blue & Gold)",
    category: "Buddhist / Ambedkarite",
    description: "Royal Blue (#1E3A8A) & Pure Gold, 24-spoke Ashoka Chakra seal, Buddha/Ambedkar Mangalacharan, Royal Envelope.",
    defaultCover: "wax-seal-envelope",
    defaultParticle: "lotus-petals",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#1E3A8A",
    accentGold: "#D4AF37",
    bgGradient: "from-[#F0F7FF] via-[#E6F0FA] to-[#DBEAFE]",
    cardBg: "#FFFFFF",
    textHeading: "text-[#1E3A8A]",
    textBody: "text-stone-800",
    badgeBg: "bg-[#1E3A8A]",
    badgeText: "text-amber-200",
    fontHeading: "font-cinzel",
    fontBody: "font-sans",
    HeaderIconSvg: ({ symbol }) => {
      if (symbol === "buddha") return <BuddhaSilhouetteSvg className="h-8 w-8 text-blue-900" />;
      if (symbol === "ambedkar") return <AmbedkarEmblemSvg className="h-8 w-8 text-blue-900" />;
      return <DhammaChakraSvg className="h-8 w-8 text-blue-800" />;
    },
    ArchFrameSvg: BuddhistStupaArchFrame,
    CornerSvg: DhammaCorner,
  },

  // 5. Buddhist / Ambedkarite Wedding - Panchsheel Ivory
  "buddhist-panchsheel-ivory": {
    id: "buddhist-panchsheel-ivory",
    name: "Buddhist Panchsheel Ivory (Lotus & Bodhi Leaf)",
    category: "Buddhist / Ambedkarite",
    description: "Ivory White, Sky Blue & Champagne Gold, serene lotus & Bodhi leaf SVG motifs, 3D Dhamma Book cover.",
    defaultCover: "3d-book",
    defaultParticle: "lotus-petals",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#0284C7",
    accentGold: "#D4AF37",
    bgGradient: "from-[#FAFAF9] via-[#F5F5F4] to-[#E0F2FE]",
    cardBg: "#FFFFFF",
    textHeading: "text-[#0369A1]",
    textBody: "text-stone-700",
    badgeBg: "bg-[#0284C7]",
    badgeText: "text-white",
    fontHeading: "font-playfair",
    fontBody: "font-sans",
    HeaderIconSvg: () => <BodhiLeafSvg className="h-8 w-8 text-sky-700" />,
    ArchFrameSvg: BuddhistStupaArchFrame,
    CornerSvg: DhammaCorner,
  },

  // 6. Buddhist / Ambedkarite Wedding - Heritage Gold
  "buddhist-heritage-gold": {
    id: "buddhist-heritage-gold",
    name: "Buddhist Heritage Gold (Sanchi Stupa Arch)",
    category: "Buddhist / Ambedkarite",
    description: "Deep Navy & Antique Gold, majestic Sanchi Stupa / Pillar inspired arch frame with Curtain Reveal cover.",
    defaultCover: "curtain-reveal",
    defaultParticle: "golden-sparkles",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#0F172A",
    accentGold: "#EAB308",
    bgGradient: "from-[#0F172A] via-[#1E293B] to-[#020617]",
    cardBg: "#1E293B",
    textHeading: "text-amber-300",
    textBody: "text-stone-200",
    badgeBg: "bg-amber-500",
    badgeText: "text-stone-950",
    fontHeading: "font-cinzel",
    fontBody: "font-sans",
    HeaderIconSvg: () => <DhammaChakraSvg className="h-8 w-8 text-amber-400" />,
    ArchFrameSvg: BuddhistStupaArchFrame,
    CornerSvg: DhammaCorner,
  },

  // 7. Birthday - Kids Fun Safari
  "birthday-kids-fun": {
    id: "birthday-kids-fun",
    name: "Kids Fun Safari & Balloons",
    category: "Birthday",
    description: "Sky Blue, Sunshine Yellow, Playful Balloons, Confetti particles with Velvet Curtain reveal.",
    defaultCover: "curtain-reveal",
    defaultParticle: "floating-balloons",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_245236ec9c.mp3?filename=happy-kids-108150.mp3",
    primaryColor: "#0284C7",
    accentGold: "#F59E0B",
    bgGradient: "from-[#F0F9FF] via-[#E0F2FE] to-[#FEF3C7]",
    cardBg: "#FFFFFF",
    textHeading: "text-[#0284C7]",
    textBody: "text-stone-700",
    badgeBg: "bg-[#0284C7]",
    badgeText: "text-white",
    fontHeading: "font-playfair",
    fontBody: "font-sans",
    HeaderIconSvg: () => (
      <span className="text-3xl" role="img" aria-label="Balloon">
        🎈
      </span>
    ),
    ArchFrameSvg: FloralPastelFrame,
    CornerSvg: () => null,
  },

  // 8. Birthday - Luxury Noir (18th / 25th / 50th Milestone)
  "birthday-luxury-noir": {
    id: "birthday-luxury-noir",
    name: "Luxury Noir (Black & Gold Milestone)",
    category: "Birthday",
    description: "Obsidian Black & Electric Gold milestone 18th/25th/50th, champagne sparkles with 3D Book Flip.",
    defaultCover: "3d-book",
    defaultParticle: "golden-sparkles",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_245236ec9c.mp3?filename=happy-kids-108150.mp3",
    primaryColor: "#171717",
    accentGold: "#F59E0B",
    bgGradient: "from-[#171717] via-[#262626] to-[#0A0A0A]",
    cardBg: "#262626",
    textHeading: "text-amber-400",
    textBody: "text-stone-300",
    badgeBg: "bg-amber-500",
    badgeText: "text-stone-950",
    fontHeading: "font-cinzel",
    fontBody: "font-sans",
    HeaderIconSvg: () => (
      <span className="text-3xl" role="img" aria-label="Champagne">
        🥂
      </span>
    ),
    ArchFrameSvg: ModernGeometricFrame,
    CornerSvg: GoldGeometricCorner,
  },

  // 9. Anniversary - Golden Journey (Years of Togetherness)
  "anniversary-golden-journey": {
    id: "anniversary-golden-journey",
    name: "Golden Journey (Years of Togetherness)",
    category: "Anniversary",
    description: "Emerald Green & Rose Gold with a 'Years of Togetherness' timeline and Curtain Reveal.",
    defaultCover: "curtain-reveal",
    defaultParticle: "golden-sparkles",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#064E3B",
    accentGold: "#E0A899",
    bgGradient: "from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]",
    cardBg: "#FFFFFF",
    textHeading: "text-[#064E3B]",
    textBody: "text-stone-700",
    badgeBg: "bg-[#064E3B]",
    badgeText: "text-emerald-100",
    fontHeading: "font-cinzel",
    fontBody: "font-sans",
    HeaderIconSvg: () => (
      <span className="text-3xl" role="img" aria-label="Rings">
        💍
      </span>
    ),
    ArchFrameSvg: ModernGeometricFrame,
    CornerSvg: GoldGeometricCorner,
  },

  // 10. Ceremony - Griha Pravesh & Vastu Shanti
  "ceremony-griha-pravesh": {
    id: "ceremony-griha-pravesh",
    name: "Griha Pravesh & Vastu Shanti",
    category: "Ceremony",
    description: "Housewarming ceremony with toggleable Hindu Kalash or Buddhist Buddha Vandana blessings, 3D Book cover.",
    defaultCover: "3d-book",
    defaultParticle: "rose-petals",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=flute-traditional-indian-113264.mp3",
    primaryColor: "#9A3412",
    accentGold: "#EAB308",
    bgGradient: "from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/40",
    cardBg: "#FFFFFF",
    textHeading: "text-[#9A3412]",
    textBody: "text-stone-800",
    badgeBg: "bg-[#9A3412]",
    badgeText: "text-amber-100",
    fontHeading: "font-playfair",
    fontBody: "font-sans",
    HeaderIconSvg: ({ symbol }) => (symbol === "buddha" ? <BuddhaSilhouetteSvg /> : <KalashSvg />),
    ArchFrameSvg: RajasthaniJharokhaFrame,
    CornerSvg: IndianMandalaCorner,
  },

  // 11. Inauguration - Grand Opening (Interactive Ribbon Cut)
  "event-grand-opening": {
    id: "event-grand-opening",
    name: "Grand Opening & Shop Inauguration",
    category: "Inauguration",
    description: "Corporate / Shop Opening with an interactive Ribbon-Cutting tap ceremony and celebratory confetti.",
    defaultCover: "ribbon-cut",
    defaultParticle: "golden-sparkles",
    defaultMusic: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_245236ec9c.mp3?filename=happy-kids-108150.mp3",
    primaryColor: "#991B1B",
    accentGold: "#D4AF37",
    bgGradient: "from-[#FAFAFA] via-[#F4F4F5] to-[#E4E4E7]",
    cardBg: "#FFFFFF",
    textHeading: "text-[#991B1B]",
    textBody: "text-stone-800",
    badgeBg: "bg-[#991B1B]",
    badgeText: "text-amber-100",
    fontHeading: "font-cinzel",
    fontBody: "font-sans",
    HeaderIconSvg: () => (
      <span className="text-3xl" role="img" aria-label="Ribbon">
        🎀
      </span>
    ),
    ArchFrameSvg: ModernGeometricFrame,
    CornerSvg: GoldGeometricCorner,
  },
};
