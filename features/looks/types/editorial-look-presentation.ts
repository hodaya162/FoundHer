import type { LookImagePresentation } from "@/domain/look";

export type EditorialLookVariant =
  | "FEATURED_EDITORIAL"
  | "MODEL_WITH_PRODUCT_BOARD"
  | "SINGLE_PRODUCT_EDITORIAL";

export type EditorialLookTone = "denim" | "rose" | "wine";

export type EditorialLookImage = {
  readonly productId: string;
  readonly imageIndex: number;
  readonly presentation: LookImagePresentation;
};

export type EditorialLookPresentation = {
  readonly variant: EditorialLookVariant;
  readonly tone: EditorialLookTone;
  readonly dominant: EditorialLookImage;
  readonly supporting?: EditorialLookImage;
  readonly editorialNote: string;
  readonly singleProductConcept?: boolean;
};
