import { Badge } from "@/components/ui";

import type { ProductType } from "@/domain/product";

export type ProductBadgeProps = {
  type: ProductType;
};

const badgeLabels: Record<ProductType, string> = {
  purchase: "לרכישה",
  rental_evening: "להשכרה",
  rental_bridal: "להשכרה",
};

export function ProductBadge({ type }: ProductBadgeProps) {
  return <Badge variant="primary">{badgeLabels[type]}</Badge>;
}
