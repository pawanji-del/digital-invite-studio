import { NextRequest, NextResponse } from "next/server";
import { createInvitation } from "@/lib/db";
import { Invitation } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.title || !body.customerName || !body.customerPhone) {
      return NextResponse.json(
        { error: "Title, Customer Name, and Phone are required." },
        { status: 400 }
      );
    }

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const baseSlug = (body.slug || body.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    // Validity plan calculation
    const now = new Date();
    const activeFrom = body.activeFrom ? new Date(body.activeFrom).toISOString() : now.toISOString();

    let validityDays = 30;
    let maxViews = 1000;
    let planName = body.planName || "Royal Experience";

    if (planName.toLowerCase().includes("starter") || planName.toLowerCase().includes("499")) {
      validityDays = 15;
      maxViews = 200;
      planName = "Starter";
    } else if (planName.toLowerCase().includes("signature") || planName.toLowerCase().includes("2,499")) {
      validityDays = 90;
      maxViews = 0; // Unlimited
      planName = "Signature Custom";
    } else {
      validityDays = 30;
      maxViews = 1000;
      planName = "Royal Experience";
    }

    const expiresAt = new Date(new Date(activeFrom).getTime() + validityDays * 86400000).toISOString();

    const newInviteData: Omit<Invitation, "id" | "createdAt" | "updatedAt" | "viewCount" | "currentViews"> = {
      title: body.title,
      slug,
      status: "draft",
      isUnpaidDemo: true, // Show watermark until shop staff approves payment
      category: body.category || "wedding",
      templateId: body.templateId || "hindu-royal-palace",
      coverStyle: body.coverStyle || "3d-book",
      particleEffect: body.particleEffect || "rose-petals",
      planName,
      paymentStatus: "unpaid",
      activeFrom,
      expiresAt,
      maxViews,
      orderId,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerNotes: body.customerNotes || "",
      ogTitle: body.ogTitle || body.title,
      ogDescription: body.ogDescription || `You are warmly invited to celebrate with us!`,
      ogImage: body.hero?.heroImage || body.ogImage || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
      audioUrl: body.audioUrl || "",
      hero: {
        mangalacharan: body.hero?.mangalacharan || "॥ शुभम् भवतु ॥",
        primaryTitle: body.hero?.primaryTitle || "TOGETHER WITH THEIR FAMILIES",
        groomOrHost: body.hero?.groomOrHost || "",
        groomParents: body.hero?.groomParents || "",
        brideOrCelebrant: body.hero?.brideOrCelebrant || "",
        brideParents: body.hero?.brideParents || "",
        invitationText: body.hero?.invitationText || "cordially invite you to celebrate our special occasion",
        closingLine: body.hero?.closingLine || "With warm regards & blessings",
        heroImage: body.hero?.heroImage || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=900&q=80",
        sacredSymbol: body.hero?.sacredSymbol || "ganesha",
      },
      eventDate: body.eventDate || "2027-02-12T20:00:00",
      eventDateDisplay: body.eventDateDisplay || "Friday, 12 February 2027",
      subEvents: body.subEvents && body.subEvents.length > 0 ? body.subEvents : [
        {
          id: `ev-${Date.now()}`,
          title: "Main Celebration Function",
          date: body.eventDateDisplay || "Date to be confirmed",
          time: "07:00 PM",
          venue: body.venue?.name || "Venue to be announced",
          dressCode: "Festive Attire",
          dressCodeColorHex: "#D4AF37",
          iconName: "Sparkles",
        },
      ],
      gallery: body.gallery || [],
      venue: {
        name: body.venue?.name || "Grand Celebrations Hall",
        address: body.venue?.address || "",
        googleMapsUrl: body.venue?.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(body.venue?.name || "")}`,
      },
      rsvp: {
        whatsappNumber: body.rsvp?.whatsappNumber || body.customerPhone,
        contactPerson: body.customerName,
        messageTemplate: `Namaste! We are excited to confirm attendance for ${body.title}.`,
      },
    };

    const created = await createInvitation(newInviteData);

    return NextResponse.json({
      success: true,
      orderId,
      slug: created.slug,
      invite: created,
    });
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
