import type { ImageAsset } from "./media";

export type Category = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly image: ImageAsset;
};
