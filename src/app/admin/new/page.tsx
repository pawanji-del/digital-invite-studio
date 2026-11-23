import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { InvitationForm } from "@/components/admin/InvitationForm";

export default function NewInvitationPage() {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pt-6 px-4">
      <InvitationForm />
    </div>
  );
}
