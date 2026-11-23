import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getInvitationById } from "@/lib/db";
import { InvitationForm } from "@/components/admin/InvitationForm";

export default async function EditInvitationPage({
  params,
}: {
  params: { id: string };
}) {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  const invite = await getInvitationById(params.id);
  if (!invite) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pt-6 px-4">
      <InvitationForm initialData={invite} isEdit={true} />
    </div>
  );
}
