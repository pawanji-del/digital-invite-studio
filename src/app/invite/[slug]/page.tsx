import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInvitationBySlug, getInvitationLifecycleState } from "@/lib/db";
import { InviteViewClient } from "./InviteViewClient";
import { ComingSoonScreen } from "@/components/invite/ComingSoonScreen";
import { ExpiredScreen } from "@/components/invite/ExpiredScreen";
import { UnavailableScreen } from "@/components/invite/UnavailableScreen";

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    preview?: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const invite = await getInvitationBySlug(params.slug);

  if (!invite) {
    return {
      title: "Invitation Not Found",
      description: "The digital invitation you are looking for could not be found.",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const ogImageUrl = invite.ogImage.startsWith("http")
    ? invite.ogImage
    : `${appUrl}${invite.ogImage}`;

  return {
    title: `${invite.ogTitle} | Digital Studio`,
    description: invite.ogDescription,
    openGraph: {
      title: invite.ogTitle,
      description: invite.ogDescription,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: invite.title,
        },
      ],
      type: "website",
      siteName: "Digital Invitation Studio",
    },
    twitter: {
      card: "summary_large_image",
      title: invite.ogTitle,
      description: invite.ogDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function InvitePage({ params, searchParams }: PageProps) {
  const invite = await getInvitationBySlug(params.slug);

  if (!invite) {
    notFound();
  }

  const isAdminPreview = searchParams?.preview === "admin";
  const lifecycle = getInvitationLifecycleState(invite);

  // Enforce lifecycle unless an admin preview parameter is provided
  if (!isAdminPreview) {
    if (lifecycle.state === "coming-soon") {
      return <ComingSoonScreen invite={invite} />;
    }
    if (lifecycle.state === "expired") {
      return <ExpiredScreen invite={invite} />;
    }
    if (lifecycle.state === "draft" || lifecycle.state === "archived") {
      return <UnavailableScreen invite={invite} />;
    }
  }

  return <InviteViewClient invite={invite} />;
}
