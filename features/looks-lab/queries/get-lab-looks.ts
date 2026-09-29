import type { Product } from "@/domain/product";
import { getBrandById } from "@/lib/repositories/brands.repository";
import { getProductById } from "@/lib/repositories/products.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import { labLooks } from "../data/lab-looks";
import { getLabDemoProductById } from "../data/lab-demo-products";
import type { HeroLook, HeroLookModel, LookLabCategory, ResolvedLookAsset } from "../types/look-lab";

function amount(product: Product): number {
  return product.type === "purchase" ? product.price : product.rentalPrice;
}

function sellerName(product: Product): string {
  if (product.type === "purchase") return getBrandById(product.brandId)?.name ?? "מותג הדגמה";
  return getRentalBusinessById(product.rentalBusinessId)?.name ?? "עסק הדגמה";
}

function resolveAsset(asset: HeroLook["assets"][number]): ResolvedLookAsset | undefined {
  if (!asset.modestySafe || !asset.moodboardReady) return undefined;
  const repositoryProduct = getProductById(asset.productId);
  const product = repositoryProduct ?? getLabDemoProductById(asset.productId);
  if (!product) return undefined;
  const image = (asset.imageId ? product.images.find(({ id }) => id === asset.imageId) : undefined) ?? product.images[0];
  if (!image) return undefined;

  return {
    ...asset,
    product,
    image,
    sellerName: repositoryProduct ? sellerName(product) : "נכס הדגמה למעבדה",
    href: repositoryProduct ? `/products/${product.slug}` : undefined,
    isLabOnly: !repositoryProduct,
  };
}

function resolveLook(look: HeroLook): HeroLookModel | undefined {
  const assets = look.assets.flatMap((asset) => {
    const resolved = resolveAsset(asset);
    return resolved ? [resolved] : [];
  });
  const hero = assets.find(({ productId }) => productId === look.heroProductId);
  if (!hero || assets.length < 3) return undefined;

  return {
    look,
    hero,
    supporting: assets.filter(({ productId }) => productId !== hero.productId),
    lowestPrice: Math.min(...assets.map(({ product }) => amount(product))),
    currency: hero.product.currency,
  };
}

export function getLabLooks(category?: LookLabCategory): readonly HeroLookModel[] {
  return labLooks
    .filter((look) => !category || look.category === category)
    .flatMap((look) => {
      const model = resolveLook(look);
      return model ? [model] : [];
    });
}

export function getLabLookBySlug(slug: string): HeroLookModel | undefined {
  const look = labLooks.find((candidate) => candidate.slug === slug);
  return look ? resolveLook(look) : undefined;
}
