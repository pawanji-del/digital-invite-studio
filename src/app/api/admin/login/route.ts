import { NextRequest, NextResponse } from "next/server";
import { getAdminPin, setAdminSession } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();
    const correctPin = getAdminPin();

    if (pin === correctPin) {
      await setAdminSession();
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid PIN code. Please check your credentials." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
}
