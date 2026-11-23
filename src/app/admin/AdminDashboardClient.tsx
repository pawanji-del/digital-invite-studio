"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Invitation } from "@/lib/types";
import { QRCodeModal } from "@/components/admin/QRCodeModal";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  Plus,
  LogOut,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Share2,
  Eye,
  Trash2,
  Edit,
  Sparkles,
  Search,
  Calendar,
  ShieldAlert,
  MessageSquareShare,
  Clock,
  TrendingUp,
  CreditCard,
  PlayCircle,
  PauseCircle,
  ShoppingBag,
} from "lucide-react";

interface AdminDashboardClientProps {
  initialInvitations: Invitation[];
}

export function AdminDashboardClient({ initialInvitations }: AdminDashboardClientProps) {
  const router = useRouter();
  const [invitations, setInvitations] = useState<Invitation[]>(initialInvitations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [copiedForwardSlug, setCopiedForwardSlug] = useState<string | null>(null);
  const [qrModalData, setQrModalData] = useState<{ url: string; title: string; slug: string } | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const handleCopyLink = (slug: string) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/invite/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleCopyForwardMessage = (invite: Invitation) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/invite/${invite.slug}`;
    const familyLine = invite.hero.closingLine || invite.hero.invitationText || "";
    const text = `✨ *CORDIAL INVITATION* ✨\n\n*${invite.title}*\n${familyLine ? `${familyLine}\n\n` : ""}📅 *Date:* ${invite.eventDateDisplay}\n📍 *Venue:* ${invite.venue.name}, ${invite.venue.address}\n\n👇 *Please open our interactive digital invitation card:* \n${url}\n\n🙏 Warm regards & Blessings!`;
    navigator.clipboard.writeText(text);
    setCopiedForwardSlug(invite.slug);
    setTimeout(() => setCopiedForwardSlug(null), 2500);
  };

  const handleShareWhatsApp = (invite: Invitation) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}/invite/${invite.slug}`;
    const message = `✨ *${invite.title}*\n${invite.ogDescription}\n\n👉 Open Interactive Invitation: ${url}`;
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(shareUrl, "_blank");
  };

  // Quick API update helper
  const handleQuickUpdate = async (id: string, updates: Partial<Invitation>) => {
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/invitations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const updated = await res.json();
        setInvitations((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
      } else {
        alert("Failed to update invitation status");
      }
    } catch {
      alert("Error contacting server");
    } finally {
      setActionLoadingId(null);
    }
  };

  // 1-Click Extend Validity (+15 Days)
  const handleExtendValidity = (invite: Invitation) => {
    const currentExpiry = invite.expiresAt ? new Date(invite.expiresAt).getTime() : Date.now();
    const baseTime = currentExpiry > Date.now() ? currentExpiry : Date.now();
    const newExpiresAt = new Date(baseTime + 15 * 86400000).toISOString();
    handleQuickUpdate(invite.id, {
      expiresAt: newExpiresAt,
      status: invite.status === "expired" ? "active" : invite.status,
    });
  };

  // 1-Click Increase View Limit (+250 Views)
  const handleIncreaseViews = (invite: Invitation) => {
    const currentMax = invite.maxViews ?? 500;
    const newMax = currentMax + 250;
    handleQuickUpdate(invite.id, {
      maxViews: newMax,
      status: invite.status === "expired" ? "active" : invite.status,
    });
  };

  // 1-Click Toggle Watermark
  const handleToggleWatermark = (invite: Invitation) => {
    handleQuickUpdate(invite.id, { isUnpaidDemo: !invite.isUnpaidDemo });
  };

  // 1-Click Toggle Payment Status
  const handleTogglePayment = (invite: Invitation) => {
    const nextStatus = invite.paymentStatus === "paid" ? "unpaid" : "paid";
    handleQuickUpdate(invite.id, {
      paymentStatus: nextStatus,
      isUnpaidDemo: nextStatus === "unpaid",
    });
  };

  // 1-Click Toggle Lifecycle Status (Active / Draft / Archived)
  const handleToggleStatus = (invite: Invitation, newStatus: "active" | "draft" | "archived") => {
    handleQuickUpdate(invite.id, { status: newStatus });
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/invitations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setInvitations((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert("Failed to delete invitation");
      }
    } catch {
      alert("Error deleting invitation");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // Counts for Metric Tabs
  const countActive = invitations.filter((i) => i.status === "active" || (i.status as any) === "live").length;
  const countPending = invitations.filter((i) => i.status === "draft" && i.paymentStatus === "unpaid").length;
  const countDraft = invitations.filter((i) => i.status === "draft" && i.paymentStatus !== "unpaid").length;
  const countExpired = invitations.filter((i) => i.status === "expired").length;
  const countArchived = invitations.filter((i) => i.status === "archived").length;

  const filtered = invitations.filter((inv) => {
    const matchesSearch =
      inv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inv.orderId && inv.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (inv.customerName && inv.customerName.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;
    if (statusFilter === "active") return inv.status === "active" || (inv.status as any) === "live";
    if (statusFilter === "pending") return inv.status === "draft" && inv.paymentStatus === "unpaid";
    if (statusFilter === "draft") return inv.status === "draft" && inv.paymentStatus !== "unpaid";
    if (statusFilter === "expired") return inv.status === "expired";
    if (statusFilter === "archived") return inv.status === "archived";

    return true;
  });

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-stone-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-stone-950 font-bold shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold text-base tracking-wide block">
                Digital Invitation Studio
              </span>
              <span className="text-[10px] text-stone-400 -mt-0.5 block tracking-wider uppercase">
                Commercial Control Center
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/admin/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold tracking-wide transition active:scale-95 shadow-md shadow-amber-500/20"
            >
              <Plus className="h-4 w-4" />
              New Invitation
            </Link>

            <button
              onClick={handleLogout}
              title="Logout from Studio"
              className="p-2 rounded-xl border border-stone-700 bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Active Links
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
                {countActive}
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Check className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Pending Orders
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
                {countPending}
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Concluded / Expired
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1">
                {countExpired}
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Total Views
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                {invitations.reduce((acc, curr) => acc + (curr.currentViews || curr.viewCount || 0), 0)}
              </p>
            </div>
            <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Eye className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                placeholder="Search by couple, title, order ID, or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
              />
            </div>

            <span className="text-xs text-stone-500 font-medium">
              Showing <strong className="text-stone-800">{filtered.length}</strong> of {invitations.length} invitations
            </span>
          </div>

          {/* Commercial Lifecycle Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[
              { id: "all", label: "All Records", count: invitations.length },
              { id: "active", label: "Active Live", count: countActive },
              { id: "pending", label: "Pending Orders", count: countPending },
              { id: "draft", label: "Drafts", count: countDraft },
              { id: "expired", label: "Expired", count: countExpired },
              { id: "archived", label: "Archived", count: countArchived },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 ${
                  statusFilter === tab.id
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    statusFilter === tab.id ? "bg-stone-700 text-amber-300" : "bg-stone-100 text-stone-600"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Invitation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((invite) => {
            const origin = typeof window !== "undefined" ? window.location.origin : "";
            const inviteUrl = `${origin}/invite/${invite.slug}`;
            const adminPreviewUrl = `${origin}/invite/${invite.slug}?preview=admin`;

            const currentViews = invite.currentViews || invite.viewCount || 0;
            const maxViews = invite.maxViews ?? 0;
            const viewPercentage = maxViews > 0 ? Math.min(100, Math.round((currentViews / maxViews) * 100)) : 0;

            const now = Date.now();
            const expireTime = invite.expiresAt ? new Date(invite.expiresAt).getTime() : 0;
            const daysRemaining = expireTime ? Math.ceil((expireTime - now) / (1000 * 60 * 60 * 24)) : 0;
            const isActuallyExpired = invite.status === "expired" || (expireTime > 0 && now > expireTime);

            const isPendingOrder = invite.status === "draft" && invite.paymentStatus === "unpaid";

            return (
              <div
                key={invite.id}
                className={`bg-white rounded-3xl border shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-200 ${
                  isPendingOrder
                    ? "border-amber-400 ring-2 ring-amber-400/20"
                    : isActuallyExpired
                    ? "border-rose-200 opacity-90"
                    : "border-stone-200"
                }`}
              >
                {/* Header Preview Image */}
                <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={invite.hero.heroImage || invite.ogImage}
                    alt={invite.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1.5 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                          invite.status === "active" || (invite.status as any) === "live"
                            ? "bg-emerald-500 text-white"
                            : invite.status === "expired" || isActuallyExpired
                            ? "bg-rose-600 text-white"
                            : invite.status === "archived"
                            ? "bg-stone-600 text-white"
                            : isPendingOrder
                            ? "bg-amber-500 text-stone-950 font-black animate-pulse"
                            : "bg-stone-500 text-white"
                        }`}
                      >
                        {isPendingOrder ? "Pending Order" : invite.status}
                      </span>

                      {/* Payment Status Badge */}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          invite.paymentStatus === "paid"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-red-100 text-red-800 border border-red-300"
                        }`}
                      >
                        {invite.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {invite.orderId && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-400 text-stone-950 shadow-sm">
                          {invite.orderId}
                        </span>
                      )}

                      {invite.isUnpaidDemo && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white shadow-sm">
                          <ShieldAlert className="h-2.5 w-2.5" />
                          Demo
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
                        {invite.planName || "Royal Plan"} • {invite.coverStyle}
                      </span>
                      {invite.templateId && (
                        <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                          {invite.templateId.replace(/-/g, " ")}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-bold truncate">
                      {invite.title}
                    </h3>
                  </div>
                </div>

                {/* Body Details & Usage Bar */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Customer Info (if pending self-service order) */}
                    {invite.customerName && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 text-xs">
                        <span className="font-bold block text-[10px] uppercase tracking-wider text-amber-800">
                          Customer Contact
                        </span>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="font-semibold">{invite.customerName}</span>
                          <span className="font-mono text-[11px] text-amber-900">{invite.customerPhone}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-stone-600 text-xs">
                      <Calendar className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{invite.eventDateDisplay}</span>
                    </div>

                    {/* View Limit Usage Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px] text-stone-600 font-medium">
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3 text-stone-400" />
                          Views: <strong>{currentViews}</strong> / {maxViews > 0 ? maxViews : "Unlimited"}
                        </span>
                        <span className={isActuallyExpired ? "text-rose-600 font-bold" : "text-stone-500"}>
                          {isActuallyExpired
                            ? "Concluded / Expired"
                            : daysRemaining > 0
                            ? `${daysRemaining}d remaining`
                            : "Expires Today"}
                        </span>
                      </div>

                      {/* Progress meter */}
                      {maxViews > 0 && (
                        <div className="h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              viewPercentage >= 90
                                ? "bg-rose-500"
                                : viewPercentage >= 70
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${viewPercentage}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 1-Click Fast Commercial Control Actions */}
                  <div className="pt-2 border-t border-stone-100 space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Activate / Pause toggle */}
                      {invite.status === "active" || (invite.status as any) === "live" ? (
                        <button
                          onClick={() => handleToggleStatus(invite, "draft")}
                          disabled={actionLoadingId === invite.id}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center gap-1 transition"
                        >
                          <PauseCircle className="h-3 w-3 text-amber-600" />
                          Pause (Draft)
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(invite, "active")}
                          disabled={actionLoadingId === invite.id}
                          className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 flex items-center gap-1 transition"
                        >
                          <PlayCircle className="h-3 w-3 text-emerald-600" />
                          Make Live
                        </button>
                      )}

                      {/* Extend Validity */}
                      <button
                        onClick={() => handleExtendValidity(invite)}
                        disabled={actionLoadingId === invite.id}
                        title="Extend link validity by 15 days"
                        className="px-2 py-1 rounded-lg text-[10px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center gap-1 transition"
                      >
                        <Clock className="h-3 w-3 text-blue-600" />
                        +15 Days
                      </button>

                      {/* Increase Views */}
                      <button
                        onClick={() => handleIncreaseViews(invite)}
                        disabled={actionLoadingId === invite.id}
                        title="Add 250 guest views to limit"
                        className="px-2 py-1 rounded-lg text-[10px] font-bold bg-purple-50 hover:bg-purple-100 text-purple-700 flex items-center gap-1 transition"
                      >
                        <TrendingUp className="h-3 w-3 text-purple-600" />
                        +250 Views
                      </button>

                      {/* Watermark toggle */}
                      <button
                        onClick={() => handleToggleWatermark(invite)}
                        disabled={actionLoadingId === invite.id}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                          invite.isUnpaidDemo
                            ? "bg-red-50 text-red-700 hover:bg-red-100"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        <ShieldAlert className="h-3 w-3" />
                        {invite.isUnpaidDemo ? "Demo On" : "No Demo"}
                      </button>

                      {/* Payment toggle */}
                      <button
                        onClick={() => handleTogglePayment(invite)}
                        disabled={actionLoadingId === invite.id}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition flex items-center gap-1 ${
                          invite.paymentStatus === "paid"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        <CreditCard className="h-3 w-3" />
                        {invite.paymentStatus === "paid" ? "Paid" : "Mark Paid"}
                      </button>
                    </div>

                    {/* Standard Icon Buttons Bar */}
                    <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-stone-100">
                      {/* View Live / Admin Preview */}
                      <Link
                        href={adminPreviewUrl}
                        target="_blank"
                        title="Open Live Preview (Bypasses Draft/Expiry for Admin)"
                        className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>

                      {/* Copy Link */}
                      <button
                        onClick={() => handleCopyLink(invite.slug)}
                        title="Copy Public Link"
                        className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
                      >
                        {copiedSlug === invite.slug ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>

                      {/* Copy WhatsApp Forward Message */}
                      <button
                        onClick={() => handleCopyForwardMessage(invite)}
                        title="Copy Full WhatsApp Invitation Message"
                        className="p-2 rounded-xl border border-stone-200 text-teal-600 hover:bg-teal-50 transition"
                      >
                        {copiedForwardSlug === invite.slug ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <MessageSquareShare className="h-4 w-4" />
                        )}
                      </button>

                      {/* QR Code */}
                      <button
                        onClick={() =>
                          setQrModalData({
                            url: inviteUrl,
                            title: invite.title,
                            slug: invite.slug,
                          })
                        }
                        title="Generate Printable QR Code"
                        className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
                      >
                        <QrCode className="h-4 w-4 text-amber-600" />
                      </button>

                      {/* Share on WhatsApp */}
                      <button
                        onClick={() => handleShareWhatsApp(invite)}
                        title="Share Directly on WhatsApp"
                        className="p-2 rounded-xl border border-stone-200 text-emerald-600 hover:bg-emerald-50 transition"
                      >
                        <Share2 className="h-4 w-4" />
                      </button>

                      {/* Edit */}
                      <Link
                        href={`/admin/edit/${invite.id}`}
                        title="Edit Invitation"
                        className="p-2 rounded-xl border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(invite.id, invite.title)}
                        title="Delete Invitation"
                        className="p-2 rounded-xl border border-stone-200 text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* QR Code Modal */}
      {qrModalData && (
        <QRCodeModal
          url={qrModalData.url}
          title={qrModalData.title}
          slug={qrModalData.slug}
          onClose={() => setQrModalData(null)}
        />
      )}
    </div>
  );
}
