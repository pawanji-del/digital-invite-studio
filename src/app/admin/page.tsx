import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getInvitations } from "@/lib/db";
import { AdminDashboardClient } from "./AdminDashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = isAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const invitations = await getInvitations();

  return <AdminDashboardClient initialInvitations={invitations} />;
}
