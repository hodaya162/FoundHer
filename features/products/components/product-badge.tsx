import { Badge } from "@/components/ui";

import type { RentalProductCard } from "../types/product-card";

export type ProductBadgeProps = {
  type: RentalProductCard["type"];
};

const badgeLabels: Record<RentalProductCard["type"], string> = {
  rental_evening: "השכרת ערב",
  rental_bridal: "השכרת כלה",
};

export function ProductBadge({ type }: ProductBadgeProps) {
  return <Badge variant="primary">{badgeLabels[type]}</Badge>;
}
