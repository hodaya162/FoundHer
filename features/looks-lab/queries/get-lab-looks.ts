import type { Product } from "@/domain/product";
import { getBrandById } from "@/lib/repositories/brands.repository";
import { getProductById } from "@/lib/repositories/products.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import { labLooks } from "../data/lab-looks";
import { getLabDemoProductById } from "../data/lab-demo-products";
import type { HeroLook, HeroLookModel, LookLabCategory, LookLabLayout, ResolvedLookAsset } from "../types/look-lab";

const reviewOrder = ["lab-denim-stripes-gold", "lab-burgundy-satin", "lab-real-model-soft-satin"] as const;

function amount(product: Product): number {
  return product.type === "purchase" ? product.price : product.rentalPrice;
}

function sellerName(product: Product): string {
  if (product.type === "purchase") return getBrandById(product.brandId)?.name ?? "מותג הדגמה";
  return getRentalBusinessById(product.rentalBusinessId)?.name ?? "עסק הדגמה";
}

function resolveAsset(asset: HeroLook["assets"][number]): ResolvedLookAsset | undefined {
  if (!asset.modestySafe || !asset.moodboardReady || asset.assetType === "unsuitable") return undefined;
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

function selectLayout(assets: readonly ResolvedLookAsset[]): LookLabLayout | undefined {
  const fullModelAssets = assets.filter(({ assetType }) => assetType === "model-full");
  if (fullModelAssets.length === 1) return "photo-editorial";

  const cropSafeModelAssets = assets.filter(({ assetType }) => assetType === "model-crop-safe");
  if (cropSafeModelAssets.length >= 2) return "split-editorial";

  const productBoardReady = assets.every(({ assetType }) => ["product-cutout", "product-studio", "detail"].includes(assetType));
  if (!productBoardReady) return undefined;
  return assets.length >= 5 ? "flatlay-editorial" : "flatlay-alternative";
}

function resolveLook(look: HeroLook): HeroLookModel | undefined {
  const assets = look.assets.flatMap((asset) => {
    const resolved = resolveAsset(asset);
    return resolved ? [resolved] : [];
  });
  const hero = assets.find(({ productId }) => productId === look.heroProductId);
  if (!hero || assets.length < 3) return undefined;
  const layout = selectLayout(assets);
  if (!layout) return undefined;

  return {
    look,
    layout,
    hero,
    supporting: assets.filter(({ productId }) => productId !== hero.productId),
    lowestPrice: Math.min(...assets.map(({ product }) => amount(product))),
    currency: hero.product.currency,
  };
}

export function getLabLooks(category?: LookLabCategory): readonly HeroLookModel[] {
  const order = new Map<string, number>(reviewOrder.map((id, index) => [id, index]));
  return labLooks
    .filter((look) => !category || look.category === category)
    .flatMap((look) => {
      const model = resolveLook(look);
      return model ? [model] : [];
    })
    .sort((left, right) => (order.get(left.look.id) ?? Number.MAX_SAFE_INTEGER) - (order.get(right.look.id) ?? Number.MAX_SAFE_INTEGER));
}

export function getLabLookBySlug(slug: string): HeroLookModel | undefined {
  const look = labLooks.find((candidate) => candidate.slug === slug);
  return look ? resolveLook(look) : undefined;
}
