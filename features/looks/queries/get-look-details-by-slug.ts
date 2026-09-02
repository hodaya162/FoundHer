import { getLookBySlug, getSimilarLooks } from "@/lib/repositories/looks.repository";

import type { LookDetailsModel } from "../types/look-details";
import { getLookCardModels, getLookProductItems } from "./get-look-card-models";

export function getLookDetailsBySlug(slug: string): LookDetailsModel | undefined {
  const look = getLookBySlug(slug);
  if (!look) return undefined;

  const items = getLookProductItems(look);
  const resolvedIds = new Set(items.map(({ product }) => product.id));

  return {
    look,
    products: items,
    unresolvedProductIds: look.items.map(({ productId }) => productId).filter((id) => !resolvedIds.has(id)),
    similarLooks: getLookCardModels(getSimilarLooks(look, 3)),
  };
}
