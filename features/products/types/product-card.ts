import type { Currency, ProductType } from "@/domain/product";
import type { ProductImage } from "@/domain/media";

type BaseProductCard = {
  readonly id: string;
  readonly slug: string;
  readonly href: string;
  readonly external: boolean;
  readonly name: string;
  readonly image: ProductImage;
  readonly sellerName: string;
  readonly featured: boolean;
};

export type PurchaseProductCard = BaseProductCard & {
  readonly type: "purchase";
  readonly price?: number;
  readonly compareAtPrice?: number;
  readonly currency: Currency;
  readonly sourceId?: string;
  readonly category?: string;
  readonly available?: boolean;
  readonly actionLabel: "לפרטי הפריט";
};

export type RentalProductCard = BaseProductCard & {
  readonly type: Exclude<ProductType, "purchase">;
  readonly rentalPrice: number;
  readonly currency: Currency;
  readonly city: string;
  readonly actionLabel: "לפרטי הפריט";
};

export type ProductCardModel = PurchaseProductCard | RentalProductCard;
