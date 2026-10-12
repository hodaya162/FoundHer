export type ImageAsset = {
  readonly id: string;
  readonly url: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly imageType?: "product_only" | "model" | "detail";
  readonly imageQuality?: "high" | "medium" | "low";
  readonly imageQualityReason?: string;
};

export type ProductImage = ImageAsset;
