import type { Look } from "@/domain/look";
import { resolveCatalogProductReferences } from "@/lib/catalog/catalog-service";

import type { LookCardModel } from "../types/look-card";

export async function getLookCardModels(looks: readonly Look[]): Promise<readonly LookCardModel[]> {
  const references = [...new Map(
    looks.flatMap(({ productRefs }) => productRefs)
      .map((reference) => [`${reference.sourceId}:${reference.productId}`, reference]),
  ).values()];
  const resolved = await resolveCatalogProductReferences(references, { availableOnly: true });
  const byId = new Map(resolved.products.flatMap((product) => [
    [product.id, product],
    [`${product.sourceId}:${product.externalId}`, product],
  ]));

  return looks.flatMap((look) => {
    const products = look.productRefs.flatMap((reference) => {
      const product = byId.get(`${reference.sourceId}:${reference.productId}`);
      return product ? [product] : [];
    });
    const heroAvailable = products.some(({ id }) => id === look.composition.heroProductId);
    if (!heroAvailable || products.length === 0) return [];
    return [{ look, products, unresolvedProductCount: look.productRefs.length - products.length }];
  });
}
