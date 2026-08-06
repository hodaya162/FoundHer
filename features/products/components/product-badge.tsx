import { Badge } from "@/components/ui";

import type { ProductType } from "@/domain/product";

export type ProductBadgeProps = {
  type: ProductType;
};

const badgeLabels: Record<ProductType, string> = {
  purchase: "לרכישה",
  rental_evening: "השכרת ערב",
  rental_bridal: "השכרת כלה",
};

export function ProductBadge({ type }: ProductBadgeProps) {
  return <Badge variant="primary">{badgeLabels[type]}</Badge>;
}
