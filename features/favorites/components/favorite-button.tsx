"use client";

import { Heart } from "lucide-react";

import { Button, IconButton } from "@/components/ui";
import { cn } from "@/lib/utils";

import { useFavorite } from "../hooks/use-favorites";
import type { FavoriteReference } from "../types/favorite";

type FavoriteButtonProps = {
  reference: FavoriteReference;
  entityLabel: string;
  className?: string;
  variant?: "icon" | "label";
};

export function FavoriteButton({ className, entityLabel, reference, variant = "icon" }: FavoriteButtonProps) {
  const { saved, toggle } = useFavorite(reference);
  const label = saved ? `הסרת ${entityLabel} מהשמורים` : `שמירת ${entityLabel}`;
  const icon = <Heart aria-hidden="true" className={cn("size-5", saved && "fill-current")} />;

  if (variant === "label") {
    return (
      <Button aria-label={label} aria-pressed={saved} onClick={toggle} variant="secondary" size="lg" className={className}>
        {icon}
        <span>{saved ? "הסרה מהשמורים" : "שמירה"}</span>
      </Button>
    );
  }

  return (
    <IconButton aria-label={label} aria-pressed={saved} onClick={toggle} className={className}>
      {icon}
    </IconButton>
  );
}
