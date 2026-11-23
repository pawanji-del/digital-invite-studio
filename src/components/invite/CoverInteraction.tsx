"use client";

import React, { useState } from "react";
import { CoverStyle } from "@/lib/types";
import { WaxSealEnvelope } from "./WaxSealEnvelope";
import { BookCover } from "./BookCover";
import { CurtainReveal } from "./CurtainReveal";
import { RibbonCutCover } from "./RibbonCutCover";

interface CoverInteractionProps {
  coverStyle: CoverStyle;
  title: string;
  hostNames?: string;
  isBuddhist?: boolean;
  templateId?: string;
  onOpened: () => void;
}

export function CoverInteraction({
  coverStyle,
  title,
  hostNames,
  isBuddhist = false,
  templateId,
  onOpened,
}: CoverInteractionProps) {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    onOpened();
  };

  if (opened) return null;

  if (coverStyle === "ribbon-cut") {
    return <RibbonCutCover title={title} onOpen={handleOpen} />;
  }

  if (coverStyle === "3d-book") {
    return (
      <BookCover
        title={title}
        isBuddhist={isBuddhist}
        templateId={templateId}
        onOpen={handleOpen}
      />
    );
  }

  if (coverStyle === "curtain-reveal") {
    return <CurtainReveal title={title} isBuddhist={isBuddhist} onOpen={handleOpen} />;
  }

  // Default: Wax-seal envelope
  const monogram = hostNames
    ? hostNames
        .split("&")
        .map((s) => s.trim()[0])
        .join(" & ")
    : "A & A";

  return (
    <WaxSealEnvelope
      monogram={monogram}
      hostNames={hostNames || title}
      isBuddhist={isBuddhist}
      onOpen={handleOpen}
    />
  );
}
