import { NextRequest, NextResponse } from "next/server";
import { getInvitationBySlug } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const invite = await getInvitationBySlug(params.slug);
    if (!invite) {
      return new NextResponse("Invitation not found", { status: 404 });
    }

    // Format dates for ICS (YYYYMMDDTHHMMSSZ)
    const startDate = new Date(invite.eventDate);
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours duration default

    const formatDateICS = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const dtStart = formatDateICS(startDate);
    const dtEnd = formatDateICS(endDate);
    const now = formatDateICS(new Date());

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Interactive Digital Invitation Studio//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:invitation-${invite.id}@studio.internal`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${invite.title}`,
      `DESCRIPTION:${invite.ogDescription.replace(/\n/g, "\\n")}`,
      `LOCATION:${invite.venue.name}, ${invite.venue.address}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${invite.slug}-invite.ics"`,
      },
    });
  } catch (error) {
    return new NextResponse("Failed to generate calendar event", { status: 500 });
  }
}
