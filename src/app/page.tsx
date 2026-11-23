"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Smartphone,
  Music,
  Share2,
  QrCode,
  MapPin,
  Calendar,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Zap,
  ShoppingBag,
} from "lucide-react";
import { PhonePreviewModal } from "@/components/landing/PhonePreviewModal";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { PoppableBalloons } from "@/components/effects/PoppableBalloons";

const WHATSAPP_CONTACT_NUMBER = "919876543210"; // Agency WhatsApp Business number

const DEMO_CARDS = [
  {
    category: "Pastel Hydrangea Engagement",
    categoryGroup: "hindu",
    title: "Kiara & Arjun's Engagement Party",
    slug: "kiara-weds-arjun",
    templateId: "engagement-pastel-hydrangea",
    image: "/images/kiara-arjun-hero.jpg",
    theme: "Powder Blue & Antique Gold",
    badge: "Living Motion Video",
    badgeColor: "bg-blue-600",
    highlights: [
      "3D Floral Powder-Blue Wax Seal",
      "Living Motion Video Portrait",
      "French Romantic Script Typography",
      "Floating Hydrangea & White Petals",
      "One-Tap Google Maps & WhatsApp RSVP",
    ],
  },
  {
    category: "Hindu Royal Palace Wedding",
    categoryGroup: "hindu",
    title: "Aarav Weds Ananya",
    slug: "aarav-weds-ananya",
    templateId: "hindu-royal-palace",
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
    theme: "Maroon & Antique Gold",
    badge: "Royal Palace",
    badgeColor: "bg-rose-700",
    highlights: ["3D Velvet Book Flip", "Rajasthani Jharokha Arch", "Ganesha & Kalash Motifs", "Pull-to-Reveal Farman", "Live Flute Shehnai Music"],
  },
  {
    category: "Buddhist Dhamma Vivah",
    categoryGroup: "buddhist",
    title: "Rahul & Priya Dhamma Parinay",
    slug: "rahul-priya-dhamma-vivah",
    templateId: "buddhist-dhamma-royal",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    theme: "Royal Blue & Temple Gold",
    badge: "Ashoka Chakra Seal",
    badgeColor: "bg-blue-700",
    highlights: ["24-Spoke Ashoka Chakra Seal", "Namo Tassa Mangalacharan", "Panchsheel & Mangal Parinay", "Serene Buddha Vandana", "Live Interactive SFX"],
  },
  {
    category: "Floral Pastel Beach Wedding",
    categoryGroup: "hindu",
    title: "Aditi & Rohit's Beachside Union",
    slug: "aditi-rohit-pastel-wedding",
    templateId: "hindu-floral-pastel",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
    theme: "Blush Pink & Mint Sage",
    badge: "Floral Pastel",
    badgeColor: "bg-pink-600",
    highlights: ["Wax-Seal Floral Envelope", "Floating Rose Petals", "5-Function Festivity Cards", "Interactive Lightbox Gallery"],
  },
  {
    category: "Grand Opening & Inauguration",
    categoryGroup: "corporate",
    title: "Apex Innovation Studio Launch",
    slug: "apex-tech-grand-opening",
    templateId: "event-grand-opening",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    theme: "Obsidian & Gold Luxe",
    badge: "Interactive Ribbon Cut",
    badgeColor: "bg-amber-600",
    highlights: ["Interactive Ribbon-Cutting Ceremony", "Golden Scissor Tap SFX", "VIP Keynote & Product Demos", "One-Tap RSVP & Maps"],
  },
  {
    category: "Luxury Kids Birthday",
    categoryGroup: "birthday",
    title: "Rohan Turns 5! Safari Adventure",
    slug: "rohan-turns-5",
    templateId: "birthday-kids-fun",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80",
    theme: "Midnight Violet & Gold",
    badge: "Floating Balloons",
    badgeColor: "bg-purple-600",
    highlights: ["Velvet Curtain Reveal", "Floating Balloons Engine", "Jungle Safari Card Theme", "Playful Birthday Countdown"],
  },
  {
    category: "Auspicious Housewarming",
    categoryGroup: "ceremony",
    title: "Sharma Family Griha Pravesh",
    slug: "sharma-griha-pravesh",
    templateId: "ceremony-griha-pravesh",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    theme: "Saffron & Marigold Gold",
    badge: "Traditional Ceremony",
    badgeColor: "bg-emerald-600",
    highlights: ["3D Hardcover Book Flip", "Vastu Shanti & Hawan Itinerary", "New Home Photo Tour", "WhatsApp RSVP Form"],
  },
];

export default function CommercialLandingPage() {
  const [selectedDemoTab, setSelectedDemoTab] = useState<string>("all");
  const [previewData, setPreviewData] = useState<{ slug: string; title: string } | null>(null);

  const filteredDemos = DEMO_CARDS.filter((card) => {
    if (selectedDemoTab === "all") return true;
    return card.categoryGroup === selectedDemoTab;
  });

  const createWhatsAppOrderLink = (planName: string, price: string) => {
    const message = `Namaste! 👋 I want to order the *${planName}* (₹${price}) for our upcoming celebration. Please share details and next steps!`;
    return `https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#0e0c0a] text-stone-900 dark:text-stone-100 selection:bg-amber-400 selection:text-stone-950 font-sans transition-colors duration-200 relative">
      {/* Interactive Celebration Balloons on Landing Page */}
      <PoppableBalloons count={7} className="opacity-75" />

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-amber-200/70 dark:border-stone-800/80 bg-white/85 dark:bg-stone-950/85 backdrop-blur-md transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 flex items-center justify-center text-stone-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-cinzel font-bold text-lg tracking-wider text-stone-900 dark:text-amber-100 block">
                INVITATION STUDIO
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-amber-700 dark:text-stone-400 block -mt-1 font-semibold">
                Living 3D Digital Invites
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-700 dark:text-stone-300">
            <a href="#demos" className="hover:text-amber-600 dark:hover:text-amber-300 transition">
              Live Demos
            </a>
            <a href="#features" className="hover:text-amber-600 dark:hover:text-amber-300 transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-amber-600 dark:hover:text-amber-300 transition">
              How It Works
            </a>
            <a href="#pricing" className="hover:text-amber-600 dark:hover:text-amber-300 transition">
              Pricing (₹)
            </a>
          </nav>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Day/Dark Mode Sun/Moon Toggle */}
            <ThemeToggle />

            <Link
              href="/order"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-extrabold uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/20"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Order Online
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent("Hello! I want to consult about custom digital invitations.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition active:scale-95 shadow-md shadow-emerald-600/20"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              WhatsApp Us
            </a>

            <Link
              href="/admin"
              className="px-3.5 py-2 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500 hover:text-stone-950 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider transition active:scale-95"
            >
              Admin
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 px-4 sm:px-6">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-amber-400/20 via-rose-300/20 to-amber-300/20 dark:from-amber-600/20 dark:via-rose-600/15 dark:to-amber-400/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300 dark:border-amber-400/40 bg-amber-100/70 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
            The Future of Wedding & Event Invites • Day & Dark Mode Ready
          </div>

          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-950 dark:text-white leading-[1.12]">
            Don&apos;t Send a Boring PDF.{" "}
            <span className="block mt-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 dark:from-amber-200 dark:via-amber-400 dark:to-amber-600 bg-clip-text text-transparent font-playfair italic font-normal">
              Send an Experience.
            </span>
          </h1>

          <p className="mt-6 text-stone-700 dark:text-stone-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
            Awe your guests with living invitations featuring <strong>3D wax-seal envelope reveals</strong>, classical shehnai flute music, <strong>pull-to-reveal farman scroll</strong>, live countdown, swipeable festivities with dress code swatches & one-tap Google Maps directions.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#demos"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-sans text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Smartphone className="h-4 w-4" />
              Explore Live Demos
            </a>

            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-amber-300 dark:border-stone-700 bg-white dark:bg-stone-900/90 hover:bg-amber-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition hover:border-amber-400 active:scale-95 shadow-sm"
            >
              <ShoppingBag className="h-4 w-4 text-amber-500" />
              Book Your Invitation Now
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP_CONTACT_NUMBER}?text=${encodeURIComponent("Hello! I want to order a digital interactive invitation for my event.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-emerald-300 dark:border-emerald-800/80 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-sans text-xs sm:text-sm font-bold uppercase tracking-wider transition active:scale-95"
            >
              <MessageSquare className="h-4 w-4 text-emerald-500" />
              WhatsApp Us
            </a>
          </div>

          {/* Interactive Feature Pills */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-700 dark:text-stone-300">
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/80 border border-amber-200 dark:border-stone-800 backdrop-blur-sm shadow-sm">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              3D Wax-Seal Unfold
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/80 border border-amber-200 dark:border-stone-800 backdrop-blur-sm shadow-sm">
              <Music className="h-3.5 w-3.5 text-rose-500" />
              Background Flute Music
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/80 border border-amber-200 dark:border-stone-800 backdrop-blur-sm shadow-sm">
              <Share2 className="h-3.5 w-3.5 text-emerald-500" />
              WhatsApp Link Thumbnail
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/80 border border-amber-200 dark:border-stone-800 backdrop-blur-sm shadow-sm">
              <QrCode className="h-3.5 w-3.5 text-blue-500" />
              Printable Card QR Codes
            </span>
            <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/80 border border-amber-200 dark:border-stone-800 backdrop-blur-sm shadow-sm">
              <MapPin className="h-3.5 w-3.5 text-amber-500" />
              1-Tap Google Maps
            </span>
          </div>

          {/* Phone Mockup Centerpiece */}
          <div className="mt-16 relative flex justify-center">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[48px] border-[8px] border-stone-800 dark:border-stone-700 bg-stone-900 p-2 shadow-2xl ring-1 ring-amber-400/40 overflow-hidden group">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30" />

              {/* Inside Mockup Frame */}
              <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-gradient-to-b from-[#fdfbf7] to-[#e9ded4] flex flex-col justify-between p-6 text-stone-900">
                <div className="text-center pt-6">
                  <span className="font-cinzel text-[9px] tracking-[0.3em] font-bold text-stone-500 uppercase">
                    Interactive Wedding Invite
                  </span>
                  <h3 className="font-playfair text-2xl font-bold text-amber-950 mt-1">
                    Aarav & Ananya
                  </h3>
                </div>

                {/* Wax seal mockup */}
                <div className="my-auto mx-auto flex h-20 w-20 items-center justify-center rounded-full shadow-2xl bg-gradient-to-br from-amber-600 via-amber-800 to-amber-950 border-2 border-amber-300 text-amber-100 font-cinzel font-bold text-lg cursor-pointer animate-pulse">
                  A & A
                </div>

                <div className="text-center pb-2">
                  <button
                    onClick={() =>
                      setPreviewData({
                        slug: "aarav-weds-ananya",
                        title: "Aarav Weds Ananya",
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-950 text-white font-sans text-xs font-bold uppercase tracking-wider shadow-md hover:bg-black transition active:scale-95"
                  >
                    Tap to Open Live Simulation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demos Showcase Section */}
      <section id="demos" className="py-20 bg-[#faf6f0] dark:bg-stone-950 border-t border-amber-200/60 dark:border-stone-800/80 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-cinzel text-xs tracking-[0.3em] font-bold text-amber-600 dark:text-amber-400 uppercase block">
              Experience Before You Order
            </span>
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white mt-2">
              Ready-Made Live Demo Showcase
            </h2>
            <p className="font-sans text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-3">
              Click &quot;Quick Phone Preview&quot; to test in the simulated iPhone right now, or &quot;Fullscreen View&quot; to see it in a new tab.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {[
              { id: "all", label: "✨ All Showcase" },
              { id: "hindu", label: "🪔 Hindu Weddings" },
              { id: "buddhist", label: "☸️ Buddhist Dhamma Vivah" },
              { id: "corporate", label: "✂️ Grand Opening" },
              { id: "birthday", label: "🎈 Birthday Safari" },
              { id: "ceremony", label: "🏡 Griha Pravesh" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedDemoTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition active:scale-95 ${
                  selectedDemoTab === tab.id
                    ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                    : "bg-white dark:bg-stone-900 border border-amber-200 dark:border-stone-800 text-stone-700 dark:text-stone-400 hover:text-stone-950 dark:hover:text-white hover:border-amber-300 dark:hover:border-stone-700 shadow-sm"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDemos.map((card) => (
              <div
                key={card.slug}
                className="group rounded-3xl bg-white dark:bg-stone-900/90 border border-amber-200/80 dark:border-stone-800 p-5 shadow-lg shadow-amber-950/5 dark:shadow-none flex flex-col justify-between transition-all duration-300 hover:border-amber-400 hover:shadow-xl"
              >
                <div>
                  {/* Card Thumbnail */}
                  <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9.5px] font-bold uppercase tracking-wider text-white shadow-md ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                        {card.category}
                      </span>
                      <h4 className="font-playfair text-lg font-bold truncate">
                        {card.title}
                      </h4>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <ul className="space-y-1.5 my-3 text-xs text-stone-700 dark:text-stone-300">
                    {card.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dual Buttons: View Live Demo + Book This Design */}
                <div className="mt-5 pt-3 border-t border-amber-100 dark:border-stone-800 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        setPreviewData({ slug: card.slug, title: card.title })
                      }
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800/90 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95"
                    >
                      <Smartphone className="h-3.5 w-3.5 text-amber-500" />
                      View Live Demo
                    </button>

                    <Link
                      href={`/order?template=${card.templateId}`}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/20"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Book Design
                    </Link>
                  </div>

                  <a
                    href={`/invite/${card.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl border border-stone-200 dark:border-stone-800/80 bg-stone-50 dark:bg-stone-900/60 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400 font-sans text-[11px] font-semibold transition"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open Fullscreen Tab
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid (Bento Grid) */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-cinzel text-xs tracking-[0.3em] font-bold text-amber-600 dark:text-amber-400 uppercase block">
            Why Choose Digital Studio
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white mt-2">
            Packed with Signature Features
          </h2>
          <p className="font-sans text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-3">
            Every invite is engineered for effortless sharing, jaw-dropping guest reactions, and maximum RSVP response rate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-md shadow-amber-950/5 hover:border-amber-400/60 transition">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-white">
              3D Tap-to-Open Covers
            </h3>
            <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Choose between authentic Wax-Seal Envelopes, 3D Hardcover Invitation Books (`rotateY(-135deg)`), or Royal Velvet Curtains that slide open on touch.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-md shadow-amber-950/5 hover:border-amber-400/60 transition">
            <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-white">
              Physical Pull-to-Reveal Scroll
            </h3>
            <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Guests physically pull down a golden tassel on their phone screen to unroll the royal Farman, triggering a festive confetti shower and revealing the date.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-md shadow-amber-950/5 hover:border-amber-400/60 transition">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-white">
              WhatsApp Link Previews (SSR OG)
            </h3>
            <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Built with server-side Open Graph tags. When you paste the link on WhatsApp, the couple photo, custom names, and description appear automatically.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-md shadow-amber-950/5 hover:border-amber-400/60 transition">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-white">
              1-Tap Google Maps Navigation
            </h3>
            <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              No more guests calling for directions! Guests click &quot;Get Directions&quot; and their phone immediately launches GPS navigation directly to the venue gate.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-md shadow-amber-950/5 hover:border-amber-400/60 transition">
            <div className="h-12 w-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
              <Music className="h-6 w-6" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-white">
              Shehnai / Flute Audio Player
            </h3>
            <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Floating spinning vinyl disc in the corner that plays traditional flute, shehnai, or your custom chosen song with a smooth volume fade-in effect.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 shadow-md shadow-amber-950/5 hover:border-amber-400/60 transition">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <QrCode className="h-6 w-6" />
            </div>
            <h3 className="font-playfair text-xl font-bold text-stone-900 dark:text-white">
              HD Printable QR Codes
            </h3>
            <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Download high-res PNG QR codes from the admin dashboard to print on traditional physical wedding cards, Mithai boxes, and invitation envelopes!
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-[#faf6f0] dark:bg-stone-950 border-y border-amber-200/60 dark:border-stone-800/80 px-4 sm:px-6 transition-colors duration-200">
        <div className="max-w-5xl mx-auto text-center">
          <span className="font-cinzel text-xs tracking-[0.3em] font-bold text-amber-600 dark:text-amber-400 uppercase block">
            Simple 3-Step Process
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white mt-2">
            How It Works
          </h2>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-500/10 border-2 border-amber-400 text-amber-800 dark:text-amber-300 font-cinzel font-bold text-xl flex items-center justify-center mb-4 shadow-md">
                1
              </div>
              <h3 className="font-playfair text-lg font-bold text-stone-900 dark:text-white">
                Send Details or Book Online
              </h3>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 max-w-xs">
                Select your package, fill the online wizard or send names, venue address, dates, and photos on WhatsApp.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-500/10 border-2 border-amber-400 text-amber-800 dark:text-amber-300 font-cinzel font-bold text-xl flex items-center justify-center mb-4 shadow-md">
                2
              </div>
              <h3 className="font-playfair text-lg font-bold text-stone-900 dark:text-white">
                We Build Your 3D Site in 4 Hours
              </h3>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 max-w-xs">
                Our studio configures your wax seal, falling petals, countdown, and music. We send you a private preview link.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="h-14 w-14 rounded-full bg-amber-100 dark:bg-amber-500/10 border-2 border-amber-400 text-amber-800 dark:text-amber-300 font-cinzel font-bold text-xl flex items-center justify-center mb-4 shadow-md">
                3
              </div>
              <h3 className="font-playfair text-lg font-bold text-stone-900 dark:text-white">
                Share Link & Print QR Code
              </h3>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-2 max-w-xs">
                Broadcast the link to friends and family with stunning photo thumbnails, and print the QR code on physical cards!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (INR ₹) */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-cinzel text-xs tracking-[0.3em] font-bold text-amber-600 dark:text-amber-400 uppercase block">
            Transparent Pricing
          </span>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-stone-900 dark:text-white mt-2">
            Affordable Luxury Packages
          </h2>
          <p className="font-sans text-stone-600 dark:text-stone-400 text-xs sm:text-sm mt-3">
            One-time cost with lifetime hosting. Zero recurring subscription fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Starter */}
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 p-8 flex flex-col justify-between shadow-lg shadow-amber-950/5">
            <div>
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-700 dark:text-stone-400 font-bold block">
                Basic Package
              </span>
              <h3 className="font-playfair text-2xl font-bold text-stone-900 dark:text-white mt-1">
                Starter
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-stone-900 dark:text-white">₹499</span>
                <span className="text-xs text-stone-500 font-semibold">one-time</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Ideal for single-day events, intimate ceremonies, or simple birthdays.
              </p>

              <div className="my-6 border-t border-amber-100 dark:border-stone-800" />

              <ul className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Single-Event Invitation Card</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>1 Luxury Theme Choice</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>WhatsApp Link Preview (OG Thumbnail)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Google Maps 1-Tap Directions</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Direct WhatsApp RSVP Button</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-2">
              <Link
                href="/order?plan=starter"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/10"
              >
                <ShoppingBag className="h-4 w-4" />
                Book Online (₹499)
              </Link>

              <a
                href={createWhatsAppOrderLink("Starter Plan", "499")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-white font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95"
              >
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                Order on WhatsApp
              </a>
            </div>
          </div>

          {/* Plan 2: Royal Experience (Most Popular) */}
          <div className="relative rounded-3xl bg-gradient-to-b from-amber-50/70 via-white to-amber-100/30 dark:from-stone-900 dark:to-stone-950 border-2 border-amber-500 p-8 flex flex-col justify-between shadow-2xl shadow-amber-500/15">
            {/* Best Value Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-300 text-stone-950 text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              Most Popular • Best Value
            </div>

            <div>
              <span className="font-cinzel text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block">
                Full Wedding Experience
              </span>
              <h3 className="font-playfair text-2xl font-bold text-stone-900 dark:text-white mt-1">
                Royal Experience
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-amber-600 dark:text-amber-400">₹1,199</span>
                <span className="text-xs text-stone-500 font-semibold">one-time</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Everything featured in our viral video. Perfect for multi-day weddings!
              </p>

              <div className="my-6 border-t border-amber-300/40 dark:border-amber-500/20" />

              <ul className="space-y-3 text-xs text-stone-800 dark:text-stone-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span><strong>3D Wax-Seal Envelope or 3D Book Cover</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span><strong>Pull-to-Reveal Farman Scroll</strong> with Tassel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Multi-Event Schedule (Haldi, Mehendi, Sangeet, Pheras)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Dress Code Color Swatches</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Love Story Photo Gallery with Lightbox</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Background Shehnai / Flute Music Player</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>Live Countdown & Calendar (.ics) Sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0" />
                  <span>HD Printable Card QR Code (PNG)</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-2">
              <Link
                href="/order?plan=royal"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-sans text-xs font-extrabold uppercase tracking-wider shadow-lg shadow-amber-500/25 transition active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" />
                Book Online (₹1,199)
              </Link>

              <a
                href={createWhatsAppOrderLink("Royal Experience Plan", "1,199")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-amber-300 dark:border-stone-700 bg-white/80 dark:bg-stone-800/80 hover:bg-amber-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95"
              >
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                Order on WhatsApp
              </a>
            </div>
          </div>

          {/* Plan 3: Signature Custom */}
          <div className="rounded-3xl bg-white dark:bg-stone-900 border border-amber-200/80 dark:border-stone-800 p-8 flex flex-col justify-between shadow-lg shadow-amber-950/5">
            <div>
              <span className="font-cinzel text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-bold block">
                VIP Bespoke
              </span>
              <h3 className="font-playfair text-2xl font-bold text-stone-900 dark:text-white mt-1">
                Signature Custom
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-stone-900 dark:text-white">₹2,499</span>
                <span className="text-xs text-stone-500 font-semibold">one-time</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-2">
                Fully personalized bespoke creation with priority 4-hour delivery.
              </p>

              <div className="my-6 border-t border-amber-100 dark:border-stone-800" />

              <ul className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span><strong>Everything in Royal Experience</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Custom Color Palette & Bespoke Layout</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Custom Couple Initials Wax Stamp Design</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Upload Your Own MP3 Song / Music</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span><strong>Express Delivery within 4 Hours</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Unlimited Revisions for 30 Days</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-2">
              <Link
                href="/order?plan=signature"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95 shadow-md shadow-purple-600/20"
              >
                <ShoppingBag className="h-4 w-4" />
                Book Online (₹2,499)
              </Link>

              <a
                href={createWhatsAppOrderLink("Signature Custom Plan", "2,499")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-white font-sans text-xs font-bold uppercase tracking-wider transition active:scale-95"
              >
                <MessageSquare className="h-4 w-4 text-emerald-500" />
                Order on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#faf6f0] dark:bg-stone-950 border-t border-amber-200/60 dark:border-stone-800/80 px-4 sm:px-6 transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-cinzel text-xs tracking-[0.3em] font-bold text-amber-600 dark:text-amber-400 uppercase block">
              Got Questions?
            </span>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm">
              <h4 className="font-playfair text-base font-bold text-amber-900 dark:text-amber-200">
                Does this invitation work on all mobile phones?
              </h4>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                Yes! It runs smoothly at 60fps in Chrome, Safari, WhatsApp in-app browser, and Android/iPhone devices without needing any app install.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm">
              <h4 className="font-playfair text-base font-bold text-amber-900 dark:text-amber-200">
                How do I send it to my guests?
              </h4>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                Just copy the link and send it via WhatsApp, SMS, or Instagram. Thanks to our SSR Open Graph setup, a gorgeous photo card with your names will show up automatically in their chat! You also get a printable HD QR code to print on your paper cards.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm">
              <h4 className="font-playfair text-base font-bold text-amber-900 dark:text-amber-200">
                How fast can I get my invite ready?
              </h4>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                Regular orders are delivered within 12–24 hours. If you select the Signature Custom package, we deliver express within 4 hours!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-amber-200/70 dark:border-stone-800 shadow-sm">
              <h4 className="font-playfair text-base font-bold text-amber-900 dark:text-amber-200">
                Can I edit event timings or venues if plans change?
              </h4>
              <p className="font-sans text-xs text-stone-600 dark:text-stone-400 mt-1.5 leading-relaxed">
                Yes! Since this is a live web app, any update made in the dashboard reflects instantly for all guests without sending a new link.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-200/70 dark:border-stone-800/80 bg-white dark:bg-stone-950 py-10 px-4 text-center text-xs text-stone-500 transition-colors duration-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-cinzel font-bold text-stone-800 dark:text-stone-300">
              Digital Invitation Studio
            </span>
          </div>

          <p>© 2026 Interactive Digital Invitation Studio • All Rights Reserved</p>

          <Link
            href="/admin"
            className="text-amber-600 dark:text-amber-400/80 hover:text-amber-500 transition font-semibold"
          >
            Admin Sign In →
          </Link>
        </div>
      </footer>

      {/* Interactive Phone Simulation Modal */}
      {previewData && (
        <PhonePreviewModal
          slug={previewData.slug}
          title={previewData.title}
          onClose={() => setPreviewData(null)}
        />
      )}
    </div>
  );
}
