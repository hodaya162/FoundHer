import type { ProductImage } from "@/domain/media";
import type { Product } from "@/domain/product";

export const LOOK_LAB_LAYOUTS = ["flatlay-editorial", "flatlay-alternative", "photo-editorial", "split-editorial"] as const;
export const LOOK_LAB_CATEGORIES = ["everyday", "work", "shabbat", "event", "vacation"] as const;

export type LookLabLayout = (typeof LOOK_LAB_LAYOUTS)[number];
export type LookLabCategory = (typeof LOOK_LAB_CATEGORIES)[number];
export type LookAssetType = "product-cutout" | "product-studio" | "model-full" | "model-crop-safe" | "detail" | "unsuitable";
export type LookAssetSource = "real" | "demo";
export type LookPaletteColor = {
  readonly name: string;
  readonly hex: `#${string}`;
};

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
  readonly canvasTone: `#${string}`;
  readonly palette: readonly LookPaletteColor[];
  readonly assets: readonly LookAsset[];
};

export type ResolvedLookAsset = LookAsset & {
  readonly product: Product;
  readonly image: ProductImage;
  readonly sellerName: string;
  readonly href?: `/products/${string}`;
  readonly isLabOnly: boolean;
};

export type HeroLookModel = {
  readonly look: HeroLook;
  readonly layout: LookLabLayout;
  readonly hero: ResolvedLookAsset;
  readonly supporting: readonly ResolvedLookAsset[];
  readonly lowestPrice: number;
  readonly currency: Product["currency"];
};
