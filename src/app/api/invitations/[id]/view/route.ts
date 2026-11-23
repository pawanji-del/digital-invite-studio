import { NextRequest, NextResponse } from "next/server";
import { incrementViewCount } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const count = await incrementViewCount(params.id);
    return NextResponse.json({ viewCount: count });
  } catch {
    return NextResponse.json({ error: "Failed to increment view" }, { status: 500 });
  }
}
