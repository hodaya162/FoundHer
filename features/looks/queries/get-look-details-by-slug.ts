import { getLookBySlug, getSimilarLooks } from "@/lib/repositories/looks.repository";
import { resolveCatalogProductReferences } from "@/lib/catalog/catalog-service";

import type { LookDetailsModel, LookProductItem } from "../types/look-details";

export async function getLookDetailsBySlug(slug: string): Promise<LookDetailsModel | undefined> {
  const look = getLookBySlug(slug);
  if (!look) return undefined;

  const resolved = await resolveCatalogProductReferences(look.productRefs, { availableOnly: true });
  const resolvedIds = new Set(resolved.products.map(({ externalId, sourceId }) => `${sourceId}:${externalId}`));
  const items: LookProductItem[] = resolved.products.map((product) => ({ product }));

  return {
    look,
    products: items,
    unresolvedProductRefs: look.productRefs.filter(
      ({ productId, sourceId }) => !resolvedIds.has(`${sourceId}:${productId}`),
    ),
    catalogUnavailable: resolved.unavailableSourceIds.length > 0,
    similarLooks: getSimilarLooks(look, 3),
  };
}
