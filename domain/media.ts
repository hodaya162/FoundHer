export type ImageAsset = {
  readonly id: string;
  readonly url: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
};

export type ProductImage = ImageAsset;
