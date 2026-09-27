import type { ProductImage } from "@/domain/media";
import type { Product } from "@/domain/product";

export const LOOK_LAB_VARIANTS = ["hero-center", "hero-edge", "layered-editorial", "model-hero"] as const;
export const LOOK_LAB_CATEGORIES = ["everyday", "work", "shabbat", "event", "vacation"] as const;

export type LookLabVariant = (typeof LOOK_LAB_VARIANTS)[number];
export type LookLabCategory = (typeof LOOK_LAB_CATEGORIES)[number];
export type LookAssetType = "product-only" | "clean-background" | "model" | "detail";
export type LookAssetSource = "real" | "demo";

export type LookAsset = {
  readonly productId: string;
  readonly imageId?: string;
  readonly assetType: LookAssetType;
  readonly source: LookAssetSource;
  readonly modestySafe: boolean;
  readonly moodboardReady: boolean;
  readonly backgroundRemovalSafe: boolean;
};

export type HeroLook = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly descriptor: string;
  readonly category: LookLabCategory;
  readonly heroProductId: string;
  readonly layoutVariant: LookLabVariant;
  readonly assets: readonly LookAsset[];
};

export type ResolvedLookAsset = LookAsset & {
  readonly product: Product;
  readonly image: ProductImage;
  readonly sellerName: string;
  readonly href: `/products/${string}`;
};

export type HeroLookModel = {
  readonly look: HeroLook;
  readonly hero: ResolvedLookAsset;
  readonly supporting: readonly ResolvedLookAsset[];
  readonly lowestPrice: number;
  readonly currency: Product["currency"];
};
