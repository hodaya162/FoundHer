import { Heart } from "lucide-react";

import { IconButton } from "@/components/ui";

export type ProductFavoriteButtonProps = {
  productName: string;
};

export function ProductFavoriteButton({ productName }: ProductFavoriteButtonProps) {
  return (
    <IconButton
      aria-label={`שמירת ${productName} במועדפים`}
      aria-pressed="false"
      className="absolute end-3 top-3 z-[var(--z-base)] border-white/70 bg-white/90 shadow-sm hover:bg-white"
    >
      <Heart aria-hidden="true" />
    </IconButton>
  );
}
