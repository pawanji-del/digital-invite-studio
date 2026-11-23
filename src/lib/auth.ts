import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "studio_admin_auth";
const DEFAULT_PIN = "7788";

export function getAdminPin(): string {
  return process.env.ADMIN_PIN || DEFAULT_PIN;
}

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return token === "verified";
  } catch {
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "verified", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
