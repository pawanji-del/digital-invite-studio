"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Invitation,
  EventCategory,
  TemplateId,
  CoverStyle,
  SacredSymbol,
  ParticleEffect,
  SubEvent,
  GalleryItem,
} from "@/lib/types";
import { TEMPLATES } from "@/lib/templateRegistry";
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  ShieldAlert,
  Calendar,
  Image as ImageIcon,
  MapPin,
  MessageSquare,
} from "lucide-react";

interface InvitationFormProps {
  initialData?: Invitation;
  isEdit?: boolean;
}

export function InvitationForm({ initialData, isEdit = false }: InvitationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "hero" | "events" | "gallery" | "venue">("general");

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [isUnpaidDemo, setIsUnpaidDemo] = useState(initialData?.isUnpaidDemo ?? false);
  const [category, setCategory] = useState<EventCategory>(initialData?.category || "wedding");
  const [templateId, setTemplateId] = useState<TemplateId>(initialData?.templateId || "hindu-royal-palace");
  const [coverStyle, setCoverStyle] = useState<CoverStyle>(initialData?.coverStyle || "3d-book");
  const [particleEffect, setParticleEffect] = useState<ParticleEffect>(initialData?.particleEffect || "rose-petals");

  // Commercial Lifecycle & Package Controls (Upgrade B)
  const [planName, setPlanName] = useState(initialData?.planName || "Royal Experience");
  const [paymentStatus, setPaymentStatus] = useState<"paid" | "unpaid">(
    initialData?.paymentStatus || (initialData?.isUnpaidDemo ? "unpaid" : "paid")
  );
  const [activeFrom, setActiveFrom] = useState(
    initialData?.activeFrom ? initialData.activeFrom.slice(0, 16) : new Date().toISOString().slice(0, 16)
  );
  const [expiresAt, setExpiresAt] = useState(
    initialData?.expiresAt
      ? initialData.expiresAt.slice(0, 16)
      : new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 16)
  );
  const [maxViews, setMaxViews] = useState<number>(initialData?.maxViews ?? 1000);
  const [lifecycleStatus, setLifecycleStatus] = useState<"active" | "draft" | "expired" | "archived">(
    !initialData?.status || initialData.status === "active" || (initialData.status as any) === "live"
      ? "active"
      : (initialData.status as "draft" | "expired" | "archived")
  );

  const applyPackagePreset = (preset: "starter" | "royal" | "signature") => {
    const now = new Date();
    if (preset === "starter") {
      setPlanName("Starter");
      setMaxViews(200);
      setExpiresAt(new Date(now.getTime() + 15 * 86400000).toISOString().slice(0, 16));
    } else if (preset === "royal") {
      setPlanName("Royal Experience");
      setMaxViews(1000);
      setExpiresAt(new Date(now.getTime() + 30 * 86400000).toISOString().slice(0, 16));
    } else if (preset === "signature") {
      setPlanName("Signature Custom");
      setMaxViews(0);
      setExpiresAt(new Date(now.getTime() + 90 * 86400000).toISOString().slice(0, 16));
    }
  };

  const [ogTitle, setOgTitle] = useState(initialData?.ogTitle || "");
  const [ogDescription, setOgDescription] = useState(initialData?.ogDescription || "");
  const [ogImage, setOgImage] = useState(initialData?.ogImage || "");
  const [audioUrl, setAudioUrl] = useState(initialData?.audioUrl || "");

  // Hero Details
  const [mangalacharan, setMangalacharan] = useState(initialData?.hero.mangalacharan || "॥ श्री गणेशाय नमः ॥");
  const [primaryTitle, setPrimaryTitle] = useState(initialData?.hero.primaryTitle || "TOGETHER WITH THEIR FAMILIES");
  const [groomOrHost, setGroomOrHost] = useState(initialData?.hero.groomOrHost || "");
  const [groomParents, setGroomParents] = useState(initialData?.hero.groomParents || "");
  const [brideOrCelebrant, setBrideOrCelebrant] = useState(initialData?.hero.brideOrCelebrant || "");
  const [brideParents, setBrideParents] = useState(initialData?.hero.brideParents || "");
  const [invitationText, setInvitationText] = useState(initialData?.hero.invitationText || "cordially invite you to celebrate the joyous wedding ceremony of their children");
  const [closingLine, setClosingLine] = useState(initialData?.hero.closingLine || "With love, blessings & warm regards");
  const [heroImage, setHeroImage] = useState(initialData?.hero.heroImage || "");
  const [sacredSymbol, setSacredSymbol] = useState<SacredSymbol>(initialData?.hero.sacredSymbol || "ganesha");

  // Date & Venue
  const [eventDate, setEventDate] = useState(initialData?.eventDate || "2027-02-12T22:30:00");
  const [eventDateDisplay, setEventDateDisplay] = useState(initialData?.eventDateDisplay || "Friday, 12 February 2027");
  const [venueName, setVenueName] = useState(initialData?.venue.name || "");
  const [venueAddress, setVenueAddress] = useState(initialData?.venue.address || "");
  const [googleMapsUrl, setGoogleMapsUrl] = useState(initialData?.venue.googleMapsUrl || "");

  // RSVP
  const [whatsappNumber, setWhatsappNumber] = useState(initialData?.rsvp.whatsappNumber || "");
  const [contactPerson, setContactPerson] = useState(initialData?.rsvp.contactPerson || "");
  const [messageTemplate, setMessageTemplate] = useState(initialData?.rsvp.messageTemplate || "");

  // Sub-Events
  const [subEvents, setSubEvents] = useState<SubEvent[]>(
    initialData?.subEvents || [
      {
        id: "ev-1",
        title: "Main Ceremony",
        date: "Friday, 12 Feb 2027",
        time: "07:00 PM",
        venue: "Grand Banquet Palace",
        dressCode: "Traditional Royal Attire",
        dressCodeColorHex: "#D4AF37",
        iconName: "Sparkles",
      },
    ]
  );

  // Gallery
  const [gallery, setGallery] = useState<GalleryItem[]>(initialData?.gallery || []);

  const handleTemplateChange = (tplId: TemplateId) => {
    setTemplateId(tplId);
    const selectedTpl = TEMPLATES[tplId];
    if (selectedTpl) {
      setCoverStyle(selectedTpl.defaultCover);
      setParticleEffect(selectedTpl.defaultParticle);
      if (!audioUrl) setAudioUrl(selectedTpl.defaultMusic);

      // Helpful defaults based on template tradition
      if (tplId.startsWith("buddhist")) {
        setCategory("buddhist-wedding");
        setSacredSymbol("dhamma-chakra");
        setMangalacharan("नमो तस्स भगवतो अरहतो सम्मासम्बुद्धस्स");
        setPrimaryTitle("सप्रेम सस्नेह जय भीम");
      } else if (tplId.startsWith("hindu")) {
        setCategory("wedding");
        setSacredSymbol("ganesha");
        setMangalacharan("॥ श्री गणेशाय नमः ॥");
        setPrimaryTitle("TOGETHER WITH THEIR FAMILIES");
      } else if (tplId === "event-grand-opening") {
        setCategory("inauguration");
        setSacredSymbol("ribbon");
        setCoverStyle("ribbon-cut");
        setMangalacharan("CORDIALLY INVITING YOU");
        setPrimaryTitle("INAUGURATION CEREMONY");
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "ogImage" | "heroImage" | "gallery" | "audio") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(targetField);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (data.url) {
        if (targetField === "ogImage") setOgImage(data.url);
        if (targetField === "heroImage") setHeroImage(data.url);
        if (targetField === "audio") setAudioUrl(data.url);
        if (targetField === "gallery") {
          setGallery((prev) => [
            ...prev,
            { id: `gal-${Date.now()}`, url: data.url, caption: "Special Moment" },
          ]);
        }
      }
    } catch {
      alert("Image upload failed. You can also paste an image URL directly.");
    } finally {
      setUploading(null);
    }
  };

  const handleSubEventChange = (index: number, field: keyof SubEvent, val: string) => {
    setSubEvents((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  const addSubEvent = () => {
    setSubEvents((prev) => [
      ...prev,
      {
        id: `ev-${Date.now()}`,
        title: "New Celebration Function",
        date: "Day, Date Month Year",
        time: "07:00 PM",
        venue: venueName || "Venue Name",
        dressCode: "Festive Attire",
        dressCodeColorHex: "#D4AF37",
        iconName: "Sparkles",
      },
    ]);
  };

  const removeSubEvent = (index: number) => {
    setSubEvents((prev) => prev.filter((_, i) => i !== index));
  };

  const addGalleryItem = () => {
    setGallery((prev) => [
      ...prev,
      {
        id: `gal-${Date.now()}`,
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        caption: "Cherished Moment",
      },
    ]);
  };

  const removeGalleryItem = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      alert("Please provide both Title and Custom Slug");
      return;
    }

    setLoading(true);

    const payload = {
      title,
      slug: slug.toLowerCase().trim().replace(/[\s_]+/g, "-"),
      status: lifecycleStatus,
      isUnpaidDemo,
      category,
      templateId,
      coverStyle,
      particleEffect,
      planName,
      paymentStatus,
      activeFrom: new Date(activeFrom).toISOString(),
      expiresAt: new Date(expiresAt).toISOString(),
      maxViews: Number(maxViews),
      ogTitle: ogTitle || title,
      ogDescription: ogDescription || `You are warmly invited to celebrate with us!`,
      ogImage: ogImage || heroImage || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      audioUrl,
      hero: {
        mangalacharan,
        primaryTitle,
        groomOrHost,
        groomParents,
        brideOrCelebrant,
        brideParents,
        invitationText,
        closingLine,
        heroImage: heroImage || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
        sacredSymbol,
      },
      eventDate,
      eventDateDisplay,
      subEvents,
      gallery,
      venue: {
        name: venueName,
        address: venueAddress,
        googleMapsUrl: googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(venueName)}`,
      },
      rsvp: {
        whatsappNumber,
        contactPerson,
        messageTemplate,
      },
    };

    try {
      const url = isEdit ? `/api/invitations/${initialData?.id}` : "/api/invitations";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save invitation");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto pb-16">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sticky top-0 bg-stone-50/95 backdrop-blur-md py-3 z-30 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="p-2 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-100 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-stone-900">
              {isEdit ? "Edit Invitation" : "Create New Multi-Template Invitation"}
            </h1>
            <p className="text-xs text-stone-500">
              Select tradition, bespoke template, 3D opening cover, SFX, and WhatsApp sharing metadata
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold tracking-wide shadow-md hover:bg-amber-700 transition active:scale-95 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? "Saving..." : isEdit ? "Update Invitation" : "Publish Invitation"}
          </button>
        </div>
      </div>

      {/* Trial / Unpaid Watermark Banner */}
      <div className="mb-6 p-4 rounded-2xl border border-amber-200 bg-amber-50/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">
              Trial / Unpaid Demo Mode
            </h4>
            <p className="text-xs text-amber-800">
              When enabled, displays &apos;DEMO PREVIEW - NOT PAID&apos; watermark to protect agency work before final client payment.
            </p>
          </div>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isUnpaidDemo}
            onChange={(e) => setIsUnpaidDemo(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          <span className="ml-2 text-xs font-bold text-amber-900">
            {isUnpaidDemo ? "DEMO MODE ON" : "NORMAL (PAID)"}
          </span>
        </label>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-stone-200 mb-6 gap-2 overflow-x-auto pb-1">
        {[
          { key: "general", label: "1. Tradition & Template" },
          { key: "hero", label: "2. Mangalacharan & Hosts" },
          { key: "events", label: "3. Sub-Events Slider" },
          { key: "gallery", label: "4. Photo Story" },
          { key: "venue", label: "5. Venue, Map & RSVP" },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition shrink-0 ${
              activeTab === tab.key
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: General & Template Selection */}
      {activeTab === "general" && (
        <div className="space-y-6">
          {/* Multi-Template Selector */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              Select Design Template & Tradition Architecture
            </h3>
            <p className="text-xs text-stone-500">
              Each template contains authentic tradition-specific motifs, SVGs, color gradients, and typography.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {Object.values(TEMPLATES).map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => handleTemplateChange(tpl.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    templateId === tpl.id
                      ? "border-amber-600 bg-amber-50/60 shadow-md ring-2 ring-amber-500/20"
                      : "border-stone-200 bg-stone-50 hover:border-stone-300"
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800 block">
                      {tpl.category}
                    </span>
                    <h4 className="font-bold text-sm text-stone-900 mt-0.5">
                      {tpl.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px] text-stone-600 font-medium">
                    <span>Cover: {tpl.defaultCover}</span>
                    <span className="capitalize">{tpl.defaultParticle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Basic URL & Status Details */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 text-base">
              Basic Settings & URL Slug
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Invitation Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Weds Ananya or Rahul & Priya Dhamma Vivah"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!slug && !isEdit) {
                      setSlug(e.target.value.toLowerCase().replace(/[\s_]+/g, "-"));
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Custom URL Slug *
                </label>
                <div className="flex items-center rounded-xl border border-stone-200 overflow-hidden focus-within:ring-2 focus-within:ring-amber-500">
                  <span className="px-3 py-2.5 bg-stone-100 text-stone-500 text-xs">
                    /invite/
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="aarav-weds-ananya"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  3D Opening Cover Style
                </label>
                <select
                  value={coverStyle}
                  onChange={(e) => setCoverStyle(e.target.value as CoverStyle)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                >
                  <option value="3d-book">3D Royal Velvet / Hardcover Book (rotateY -135deg)</option>
                  <option value="wax-seal-envelope">Luxury Wax-Seal Envelope (Crack & Unfold)</option>
                  <option value="curtain-reveal">Royal Velvet Curtain Reveal (Left & Right)</option>
                  <option value="ribbon-cut">Interactive Ribbon Cutting Ceremony (Inaugurations)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Ambient Particle Effect
                </label>
                <select
                  value={particleEffect}
                  onChange={(e) => setParticleEffect(e.target.value as ParticleEffect)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                >
                  <option value="rose-petals">Rose Petals (Wedding & Ceremonies)</option>
                  <option value="lotus-petals">Lotus Petals (Buddhist / Serene)</option>
                  <option value="golden-sparkles">Golden Sparkles (Luxury / Milestones)</option>
                  <option value="floating-balloons">Floating Balloons (Birthdays & Kids)</option>
                  <option value="none">None (Minimalist)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Lifecycle Status
                </label>
                <select
                  value={lifecycleStatus}
                  onChange={(e) => setLifecycleStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                >
                  <option value="active">Active (Live & Publicly Accessible)</option>
                  <option value="draft">Draft (Private / Pending Review)</option>
                  <option value="expired">Expired (Event Concluded)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Commercial Package Presets & Validity Controls */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  Commercial Package Presets & Validity Controls
                </h3>
                <p className="text-xs text-stone-500">
                  Select a business package preset to automatically calculate validity duration and view limits.
                </p>
              </div>

              {/* Package Presets Selector Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => applyPackagePreset("starter")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                    planName === "Starter"
                      ? "bg-stone-900 text-white shadow-sm"
                      : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                  }`}
                >
                  🥉 Starter (15d / 200 views)
                </button>
                <button
                  type="button"
                  onClick={() => applyPackagePreset("royal")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                    planName === "Royal Experience"
                      ? "bg-amber-600 text-white shadow-sm"
                      : "bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200"
                  }`}
                >
                  👑 Royal (30d / 1,000 views)
                </button>
                <button
                  type="button"
                  onClick={() => applyPackagePreset("signature")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                    planName === "Signature Custom"
                      ? "bg-purple-900 text-white shadow-sm"
                      : "bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200"
                  }`}
                >
                  💎 Signature (90d / Unlimited)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Plan Name
                </label>
                <input
                  type="text"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="e.g. Royal Experience"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => {
                    const next = e.target.value as "paid" | "unpaid";
                    setPaymentStatus(next);
                    setIsUnpaidDemo(next === "unpaid");
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                >
                  <option value="paid">Paid (Commercial Client)</option>
                  <option value="unpaid">Unpaid (Show Trial Watermark)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Maximum Views / Reach (0 = Unlimited)
                </label>
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={maxViews}
                  onChange={(e) => setMaxViews(Number(e.target.value))}
                  placeholder="e.g. 500 (or 0 for unlimited)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Active From (Go-Live Date/Time)
                </label>
                <input
                  type="datetime-local"
                  value={activeFrom}
                  onChange={(e) => setActiveFrom(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Guests visiting before this will see the &apos;Coming Soon&apos; countdown.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Expires At (Automatic Conclude Date/Time)
                </label>
                <input
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
                <span className="text-[10px] text-stone-400 mt-1 block">
                  Link automatically expires and displays the branded conclusion page.
                </span>
              </div>
            </div>
          </div>

          {/* WhatsApp / Social Media SSR Open Graph Section */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              WhatsApp & Social Media Link Preview (Open Graph)
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  WhatsApp Preview Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aarav & Ananya are getting married! 💍✨"
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  WhatsApp Preview Description
                </label>
                <textarea
                  rows={2}
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Thumbnail Image (OG Poster Image)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                  />
                  <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer transition">
                    <Upload className="h-4 w-4" />
                    {uploading === "ogImage" ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "ogImage")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Mangalacharan & Hero Hosts */}
      {activeTab === "hero" && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-amber-600" />
            Sacred Mangalacharan & Host Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Sacred Motif / Symbol
              </label>
              <select
                value={sacredSymbol}
                onChange={(e) => setSacredSymbol(e.target.value as SacredSymbol)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              >
                <option value="ganesha">Lord Ganesha (Golden Hindu)</option>
                <option value="kalash">Auspicious Kalash (Hindu / Puja)</option>
                <option value="dhamma-chakra">Ashoka Chakra / Dhamma Wheel (Buddhist / Ambedkarite 24-spokes)</option>
                <option value="buddha">Tathagata Gautam Buddha Silhouette</option>
                <option value="ambedkar">Dr. B.R. Ambedkar Emblem</option>
                <option value="lotus">Serene Lotus / Bodhi Leaf</option>
                <option value="ribbon">Inauguration Ribbon</option>
                <option value="none">None (Minimalist)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Sacred Mangalacharan / Opening Line
              </label>
              <input
                type="text"
                placeholder="नमो तस्स भगवतो अरहतो सम्मासम्बुद्धस्स or ॥ श्री गणेशाय नमः ॥"
                value={mangalacharan}
                onChange={(e) => setMangalacharan(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none font-serif"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Primary Header
              </label>
              <input
                type="text"
                placeholder="TOGETHER WITH THEIR FAMILIES or सप्रेम सस्नेह जय भीम"
                value={primaryTitle}
                onChange={(e) => setPrimaryTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Groom / Primary Host Name *
              </label>
              <input
                type="text"
                required
                value={groomOrHost}
                onChange={(e) => setGroomOrHost(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Groom Parents Line
              </label>
              <input
                type="text"
                value={groomParents}
                onChange={(e) => setGroomParents(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Bride / Celebrant Name
              </label>
              <input
                type="text"
                value={brideOrCelebrant}
                onChange={(e) => setBrideOrCelebrant(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Bride Parents Line
              </label>
              <input
                type="text"
                value={brideParents}
                onChange={(e) => setBrideParents(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Hero Photo
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
                <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer transition">
                  <Upload className="h-4 w-4" />
                  {uploading === "heroImage" ? "Uploading..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "heroImage")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Background Music Audio URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={audioUrl}
                  onChange={(e) => setAudioUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
                <label className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold cursor-pointer transition">
                  <Upload className="h-4 w-4" />
                  {uploading === "audio" ? "Uploading..." : "Upload MP3"}
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileUpload(e, "audio")}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Invitation Subtext / Request Text
              </label>
              <textarea
                rows={2}
                value={invitationText}
                onChange={(e) => setInvitationText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                Closing Sign-off Line
              </label>
              <input
                type="text"
                value={closingLine}
                onChange={(e) => setClosingLine(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Sub-Events Repeater */}
      {activeTab === "events" && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-amber-600" />
                Wedding Festivities & Sub-Events
              </h3>
              <p className="text-xs text-stone-500">
                These render as interactive swipeable 3D cards with Dress Code swatches.
              </p>
            </div>
            <button
              type="button"
              onClick={addSubEvent}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition active:scale-95"
            >
              <Plus className="h-4 w-4" />
              Add Function
            </button>
          </div>

          <div className="space-y-4 mt-4">
            {subEvents.map((ev, idx) => (
              <div
                key={ev.id || idx}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 relative space-y-3"
              >
                <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Function #{idx + 1}
                  </span>
                  {subEvents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSubEvent(idx)}
                      className="p-1 rounded-lg text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={ev.title}
                      onChange={(e) => handleSubEventChange(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                      Date & Day
                    </label>
                    <input
                      type="text"
                      value={ev.date}
                      onChange={(e) => handleSubEventChange(idx, "date", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                      Time
                    </label>
                    <input
                      type="text"
                      value={ev.time}
                      onChange={(e) => handleSubEventChange(idx, "time", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                      Venue
                    </label>
                    <input
                      type="text"
                      value={ev.venue}
                      onChange={(e) => handleSubEventChange(idx, "venue", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                      Dress Code Text
                    </label>
                    <input
                      type="text"
                      value={ev.dressCode || ""}
                      onChange={(e) => handleSubEventChange(idx, "dressCode", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-600 uppercase mb-1">
                      Dress Code Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={ev.dressCodeColorHex || "#D4AF37"}
                        onChange={(e) => handleSubEventChange(idx, "dressCodeColorHex", e.target.value)}
                        className="h-8 w-12 rounded border border-stone-300 cursor-pointer"
                      />
                      <span className="text-xs text-stone-600 font-mono">
                        {ev.dressCodeColorHex || "#D4AF37"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Photo Gallery */}
      {activeTab === "gallery" && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-amber-600" />
                Our Story / Photo Gallery Carousel (with Tap-to-Zoom Lightbox)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold cursor-pointer hover:bg-amber-700 transition active:scale-95">
                <Upload className="h-4 w-4" />
                {uploading === "gallery" ? "Uploading..." : "Upload Photo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "gallery")}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={addGalleryItem}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                <Plus className="h-3.5 w-3.5" />
                Add URL
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {gallery.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-center gap-3 relative"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.caption || "Story"}
                  className="h-16 w-16 object-cover rounded-lg border border-stone-200 shrink-0"
                />
                <div className="flex-1 space-y-1.5">
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => {
                      const copy = [...gallery];
                      copy[idx].url = e.target.value;
                      setGallery(copy);
                    }}
                    className="w-full px-2.5 py-1 text-xs rounded border border-stone-200 bg-white"
                  />
                  <input
                    type="text"
                    value={item.caption || ""}
                    onChange={(e) => {
                      const copy = [...gallery];
                      copy[idx].caption = e.target.value;
                      setGallery(copy);
                    }}
                    className="w-full px-2.5 py-1 text-xs rounded border border-stone-200 bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryItem(idx)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: Venue & RSVP */}
      {activeTab === "venue" && (
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-amber-600" />
              Event Date & Live Countdown Timer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Main Event ISO Date & Time *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={eventDate.substring(0, 16)}
                  onChange={(e) => setEventDate(e.target.value + ":00")}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Display Date Text *
                </label>
                <input
                  type="text"
                  required
                  value={eventDateDisplay}
                  onChange={(e) => setEventDateDisplay(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <MapPin className="h-4 w-4 text-amber-600" />
              Venue & Google Maps Directions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Venue Name *
                </label>
                <input
                  type="text"
                  required
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Google Maps URL
                </label>
                <input
                  type="text"
                  value={googleMapsUrl}
                  onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Full Address *
                </label>
                <input
                  type="text"
                  required
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="font-bold text-stone-900 text-base flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              WhatsApp RSVP Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Host WhatsApp Number (with Country Code) *
                </label>
                <input
                  type="text"
                  required
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase mb-1">
                  Host / RSVP Contact Person
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
