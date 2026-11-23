"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TEMPLATES } from "@/lib/templateRegistry";
import { TemplateId, CoverStyle, ParticleEffect } from "@/lib/types";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Calendar,
  MapPin,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  ShoppingBag,
  ExternalLink,
  Upload,
} from "lucide-react";

const WHATSAPP_STUDIO_NUMBER = "919876543210";

const PLANS = [
  {
    id: "starter",
    name: "Starter Package",
    price: "499",
    days: 15,
    views: "200 Views",
    badge: "Budget Friendly",
    features: [
      "15 Days Active Link Validity",
      "Up to 200 Guest Views / Forwards",
      "WhatsApp Link Thumbnail Preview",
      "Interactive 3D Cover Opening",
      "1-Tap Google Maps & WhatsApp RSVP",
    ],
  },
  {
    id: "royal",
    name: "Royal Experience",
    price: "1,199",
    days: 30,
    views: "1,000 Views",
    badge: "Most Popular",
    popular: true,
    features: [
      "30 Days Active Link Validity",
      "Up to 1,000 Guest Views / Forwards",
      "Interactive Save-The-Date Farman Scroll",
      "Swipeable Festivities Slider (Up to 6 Events)",
      "Photo Story Memories Lightbox",
      "High-Res Printable QR Code for Cards",
      "Background Flute / Shehnai Music",
    ],
  },
  {
    id: "signature",
    name: "Signature Custom",
    price: "2,499",
    days: 90,
    views: "Unlimited Views",
    badge: "Full Concierge",
    features: [
      "90 Days Extended Active Validity",
      "Unlimited Guest Views & Forwarding",
      "All Premium Templates & Custom Colors",
      "Interactive Ribbon Cut / Wax Seal",
      "Priority 4-Hour Studio Turnaround",
      "Dedicated WhatsApp Support for Edits",
    ],
  },
];

export function OrderFormClient() {
  const searchParams = useSearchParams();
  const initialTemplate = (searchParams.get("template") as TemplateId) || "hindu-royal-palace";
  const initialPlan = searchParams.get("plan") || "royal";

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(initialTemplate);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(initialPlan);
  const [activeFromDate, setActiveFromDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  // Event Details State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("wedding");
  const [groomOrHost, setGroomOrHost] = useState("");
  const [groomParents, setGroomParents] = useState("");
  const [brideOrCelebrant, setBrideOrCelebrant] = useState("");
  const [brideParents, setBrideParents] = useState("");
  const [eventDate, setEventDate] = useState("2027-02-12");
  const [eventTime, setEventTime] = useState("07:00 PM");
  const [eventDateDisplay, setEventDateDisplay] = useState("Friday, 12 February 2027");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [rsvpPhone, setRsvpPhone] = useState("");

  // Customer Contact State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Order Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<{
    orderId: string;
    slug: string;
    invite: any;
  } | null>(null);

  const selectedPlan = PLANS.find((p) => p.id === selectedPlanId) || PLANS[1];
  const selectedTemplate = TEMPLATES[selectedTemplateId] || TEMPLATES["hindu-royal-palace"];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        setHeroImageUrl(data.url);
      } else {
        alert("Upload failed. You can paste an image URL directly.");
      }
    } catch {
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !customerName || !customerPhone) {
      alert("Please fill in the Event Title, Your Name, and Phone Number.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title,
      customerName,
      customerPhone,
      customerNotes,
      planName: selectedPlan.name,
      activeFrom: new Date(activeFromDate).toISOString(),
      templateId: selectedTemplateId,
      category: selectedTemplate.category === "buddhist-wedding" ? "buddhist-wedding" : category,
      coverStyle: selectedTemplate.defaultCover,
      particleEffect: selectedTemplate.defaultParticle,
      audioUrl: selectedTemplate.defaultMusic,
      eventDate: `${eventDate}T${eventTime.replace(" ", "")}`,
      eventDateDisplay: eventDateDisplay || eventDate,
      hero: {
        mangalacharan: selectedTemplateId.startsWith("buddhist")
          ? "नमो तस्स भगवतो अरहतो सम्मासम्बुद्धस्स"
          : "॥ शुभम् भवतु ॥",
        primaryTitle: "TOGETHER WITH THEIR FAMILIES",
        groomOrHost,
        groomParents,
        brideOrCelebrant,
        brideParents,
        invitationText: "cordially invite you to celebrate our special occasion",
        closingLine: "With love, blessings & warm regards",
        heroImage: heroImageUrl || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
        sacredSymbol: selectedTemplateId.startsWith("buddhist") ? "dhamma-chakra" : "ganesha",
      },
      venue: {
        name: venueName,
        address: venueAddress,
        googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(venueName + " " + venueAddress)}`,
      },
      rsvp: {
        whatsappNumber: rsvpPhone || customerPhone,
        contactPerson: customerName,
      },
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setOrderResult(data);
      } else {
        const err = await res.json();
        alert(err.error || "Failed to place order");
      }
    } catch {
      alert("Error contacting the studio server");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (orderResult) {
    const whatsappOrderMessage = `*NEW ORDER CONFIRMATION* 🛎️\n\n*Order ID:* ${orderResult.orderId}\n*Customer:* ${customerName} (${customerPhone})\n*Design:* ${selectedTemplate.name}\n*Plan:* ${selectedPlan.name} (₹${selectedPlan.price})\n*Event:* ${title}\n*Date:* ${eventDateDisplay}\n\n👉 Draft Preview: ${typeof window !== "undefined" ? window.location.origin : ""}/invite/${orderResult.slug}?preview=admin\n\nPlease verify details and activate our link!`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_STUDIO_NUMBER}?text=${encodeURIComponent(whatsappOrderMessage)}`;

    return (
      <div className="min-h-screen bg-[#0e0c0a] text-stone-100 flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-lg rounded-3xl border border-amber-500/40 bg-stone-900/90 p-8 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-lg">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block">
              Order Registered Successfully
            </span>
            <h2 className="font-cinzel text-3xl font-bold text-white mt-1">
              {orderResult.orderId}
            </h2>
            <p className="font-sans text-xs text-stone-300 mt-2">
              Thank you, <strong>{customerName}</strong>! Your invitation has been drafted in our studio under Pending Review.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="p-4 rounded-2xl bg-black/50 border border-stone-800 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Design Template:</span>
              <span className="font-semibold text-amber-200">{selectedTemplate.name}</span>
            </div>
            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Selected Plan:</span>
              <span className="font-semibold text-white">{selectedPlan.name} (₹{selectedPlan.price})</span>
            </div>
            <div className="flex justify-between border-b border-stone-800 pb-2">
              <span className="text-stone-400">Validity Period:</span>
              <span className="font-semibold text-white">{selectedPlan.days} Days ({selectedPlan.views})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-400">Status:</span>
              <span className="font-bold text-amber-400">Pending Studio Activation</span>
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-sm font-bold tracking-wide uppercase transition shadow-lg shadow-emerald-600/30 active:scale-95"
            >
              <MessageSquare className="h-4 w-4" />
              Send Confirmation on WhatsApp
            </a>

            <Link
              href={`/invite/${orderResult.slug}?preview=admin`}
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-700 bg-stone-800/80 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Preview My Draft Invitation
            </Link>

            <Link
              href="/"
              className="block text-xs text-stone-400 hover:text-white pt-2 transition"
            >
              ← Back to Studio Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-[#0e0c0a] text-stone-900 dark:text-stone-100 py-10 px-4 sm:px-6 font-sans transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-stone-800 pb-6 mb-8">
          <Link href="/" className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Back to Studio</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 dark:text-amber-400 block">
                Step {currentStep} of 4
              </span>
              <span className="font-cinzel text-base font-bold text-stone-900 dark:text-white">
                {currentStep === 1 && "Choose Template"}
                {currentStep === 2 && "Select Validity Plan"}
                {currentStep === 3 && "Event & Couple Details"}
                {currentStep === 4 && "Contact & Confirmation"}
              </span>
            </div>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2 mb-8">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentStep >= step ? "bg-amber-500" : "bg-stone-800"
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Template Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Select Your Living Invitation Theme
              </h2>
              <p className="text-xs text-stone-400 mt-2">
                Every design includes 3D opening covers, custom music, live countdown, and interactive Save-The-Date farman scroll.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(TEMPLATES).map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedTemplateId === tpl.id
                      ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/10 ring-2 ring-amber-500/20"
                      : "border-stone-800 bg-stone-900/80 hover:border-stone-700"
                  }`}
                >
                  <div>
                    <span className="text-[9.5px] uppercase font-bold tracking-wider text-amber-400 block mb-1">
                      {tpl.category}
                    </span>
                    <h3 className="font-playfair text-lg font-bold text-white">
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                      {tpl.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400 font-medium">
                    <span>{tpl.defaultCover}</span>
                    <span className="text-amber-300 font-bold">
                      {selectedTemplateId === tpl.id ? "✓ Selected" : "Select"}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/20"
              >
                <span>Continue to Plan</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Plan & Validity Duration */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Choose Link Validity & Reach Plan
              </h2>
              <p className="text-xs text-stone-400 mt-2">
                All plans include free hosting, instant WhatsApp link previews, and downloadable card QR codes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                    selectedPlanId === plan.id
                      ? "border-amber-400 bg-amber-400/10 shadow-xl shadow-amber-500/15 ring-2 ring-amber-400/20"
                      : "border-stone-800 bg-stone-900/80 hover:border-stone-700"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                        {plan.badge}
                      </span>
                      {selectedPlanId === plan.id && (
                        <CheckCircle2 className="h-4 w-4 text-amber-400" />
                      )}
                    </div>

                    <h3 className="font-cinzel text-xl font-bold text-white">
                      {plan.name}
                    </h3>

                    <div className="my-4">
                      <span className="font-mono text-3xl font-extrabold text-white">
                        ₹{plan.price}
                      </span>
                      <span className="text-xs text-stone-400 block mt-0.5">
                        {plan.days} Days Validity • {plan.views}
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs text-stone-300 pt-2 border-t border-stone-800">
                      {plan.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    className={`mt-6 w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                      selectedPlanId === plan.id
                        ? "bg-amber-500 text-stone-950 shadow-md"
                        : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                    }`}
                  >
                    {selectedPlanId === plan.id ? "Selected Plan" : "Choose Plan"}
                  </button>
                </div>
              ))}
            </div>

            {/* Go Live Start Date */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800 max-w-md mx-auto">
              <label className="block text-xs font-bold text-amber-300 uppercase mb-1.5">
                When should this link go live?
              </label>
              <input
                type="date"
                value={activeFromDate}
                onChange={(e) => setActiveFromDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <span className="text-[10px] text-stone-400 mt-1 block">
                Link will be active from this date for the full {selectedPlan.days}-day validity period.
              </span>
            </div>

            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl border border-stone-700 text-stone-300 text-xs font-semibold hover:bg-stone-800 transition"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/20"
              >
                <span>Event Details</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Event & Couple Details */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Enter Event & Family Information
              </h2>
              <p className="text-xs text-stone-400 mt-2">
                Our studio staff will review and format your names with elegant royal typography.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                  Invitation Title / Heading *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Weds Ananya or Rohit's 25th Milestone Celebration"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Groom / Main Host Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={groomOrHost}
                    onChange={(e) => setGroomOrHost(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Groom / Host Parents
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Son of Mr. Rajesh & Mrs. Sunita Sharma"
                    value={groomParents}
                    onChange={(e) => setGroomParents(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Bride / Celebrant Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Mehta (Optional for birthdays/corporate)"
                    value={brideOrCelebrant}
                    onChange={(e) => setBrideOrCelebrant(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Bride Parents
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Daughter of Mr. Vikram & Mrs. Kavita Mehta"
                    value={brideParents}
                    onChange={(e) => setBrideParents(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Event Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 07:00 PM"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Display Date String
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Friday, 12 February 2027"
                    value={eventDateDisplay}
                    onChange={(e) => setEventDateDisplay(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Raj Vilas Palace"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Full Venue Address
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Amer Road, near Jal Mahal, Jaipur"
                    value={venueAddress}
                    onChange={(e) => setVenueAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                  WhatsApp RSVP Number (Receives Guest Confirmations) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 919876543210 (with country code)"
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl border border-stone-700 text-stone-300 text-xs font-semibold hover:bg-stone-800 transition"
              >
                Back
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!title || !groomOrHost || !venueName) {
                    alert("Please fill in Title, Host/Groom Name, and Venue Name");
                    return;
                  }
                  setCurrentStep(4);
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider transition active:scale-95 shadow-md shadow-amber-500/20"
              >
                <span>Final Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Contact & Order Placement */}
        {currentStep === 4 && (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                Contact & Studio Submission
              </h2>
              <p className="text-xs text-stone-400 mt-2">
                We will prepare your interactive invitation in demo mode and send your private approval preview directly to your WhatsApp.
              </p>
            </div>

            {/* Photo Upload / URL */}
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
              <h3 className="font-bold text-sm text-amber-300 uppercase tracking-wide">
                Couple / Main Hero Photo
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">
                    Upload from Device
                  </label>
                  <label className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-stone-700 bg-stone-950 text-xs text-stone-400 cursor-pointer hover:border-amber-400 transition">
                    <Upload className="h-4 w-4 text-amber-400" />
                    <span>{uploading ? "Uploading..." : "Select Photo from Phone/PC"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">
                    Or Paste Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={heroImageUrl}
                    onChange={(e) => setHeroImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {heroImageUrl && (
                <div className="mt-2 h-28 w-28 rounded-xl overflow-hidden border border-stone-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={heroImageUrl} alt="Hero Preview" className="h-full w-full object-cover" />
                </div>
              )}
            </div>

            {/* Customer Details */}
            <div className="p-6 rounded-3xl bg-stone-900/90 border border-stone-800 space-y-4">
              <h3 className="font-bold text-sm text-amber-300 uppercase tracking-wide">
                Your Contact Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-300 uppercase mb-1">
                  Special Notes or Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any specific songs, colors, dress code details, or family traditions..."
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-700 bg-stone-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Summary & Price Checkout Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-950 border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
                  Order Summary
                </span>
                <h4 className="font-cinzel text-lg font-bold text-white">
                  {selectedTemplate.name} • {selectedPlan.name}
                </h4>
                <p className="text-xs text-stone-400">
                  {selectedPlan.days} Days Link Validity • {selectedPlan.views}
                </p>
              </div>

              <div className="text-right flex items-center gap-4">
                <div>
                  <span className="text-xs text-stone-400 block">Total Amount</span>
                  <span className="font-mono text-3xl font-extrabold text-amber-300">
                    ₹{selectedPlan.price}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 font-sans text-xs font-extrabold uppercase tracking-wider transition active:scale-95 shadow-lg shadow-amber-500/25 disabled:opacity-50"
                >
                  {isSubmitting ? "Placing Order..." : "Confirm & Book Now"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 rounded-xl border border-stone-700 text-stone-300 text-xs font-semibold hover:bg-stone-800 transition"
              >
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
