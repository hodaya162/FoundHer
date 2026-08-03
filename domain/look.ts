import type { ImageAsset } from "./media";

export type Look = {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly coverImage: ImageAsset;
  readonly productIds: readonly string[];
  readonly brandIds: readonly string[];
  readonly featured: boolean;
  readonly createdAt: string;
};
