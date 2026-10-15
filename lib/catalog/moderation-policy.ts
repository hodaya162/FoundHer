import type { CatalogProduct } from "@/domain/catalog";
import type {
  CatalogImageModerationDecision,
  CatalogProductModerationDecision,
} from "@/domain/catalog-moderation";

function productKey(sourceId: string, externalProductId: string) {
  return `${sourceId}\u0000${externalProductId}`;
}

function imageKey(sourceId: string, externalProductId: string, imageId: string) {
  return `${productKey(sourceId, externalProductId)}\u0000${imageId}`;
}

export function applyCatalogModeration(
  products: readonly CatalogProduct[],
  productDecisions: readonly CatalogProductModerationDecision[],
  imageDecisions: readonly CatalogImageModerationDecision[],
): readonly CatalogProduct[] {
  const approvedProducts = new Set(
    productDecisions
      .filter(({ status }) => status === "approved")
      .map(({ sourceId, externalProductId }) => productKey(sourceId, externalProductId)),
  );
  const approvedImages = new Set(
    imageDecisions
      .filter(({ status }) => status === "approved")
      .map(({ sourceId, externalProductId, imageId }) => imageKey(sourceId, externalProductId, imageId)),
  );

  return products.flatMap((product) => {
    if (!approvedProducts.has(productKey(product.sourceId, product.externalId))) return [];
    const images = product.images.filter((image) => approvedImages.has(imageKey(product.sourceId, product.externalId, image.id)));
    if (images.length === 0) return [];
    const approvedImageIds = new Set(images.map(({ id }) => id));
    const variants = product.variants.map((variant) => (
      variant.image && !approvedImageIds.has(variant.image.id)
        ? { ...variant, image: undefined }
        : variant
    ));
    return [{ ...product, images, variants }];
  });
}

export function createCatalogModerationSyncPayload(products: readonly CatalogProduct[]) {
  return {
    products: products.map((product) => ({
      source_id: product.sourceId,
      external_product_id: product.externalId,
    })),
    images: products.flatMap((product) => product.images.map((image) => ({
      source_id: product.sourceId,
      external_product_id: product.externalId,
      image_id: image.id,
      image_url: image.url,
    }))),
  };
}

