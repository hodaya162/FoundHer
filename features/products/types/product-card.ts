import type { Currency, ProductType } from "@/domain/product";
import type { ProductImage } from "@/domain/media";

type BaseProductCard = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly image: ProductImage;
  readonly sellerName: string;
  readonly featured: boolean;
};

export type PurchaseProductCard = BaseProductCard & {
  readonly type: "purchase";
  readonly price: number;
  readonly currency: Currency;
  readonly actionLabel: "לביקור במותג";
};

export type RentalProductCard = BaseProductCard & {
  readonly type: Exclude<ProductType, "purchase">;
  readonly rentalPrice: number;
  readonly currency: Currency;
  readonly city: string;
  readonly actionLabel: "לבדיקת זמינות";
};

export type ProductCardModel = PurchaseProductCard | RentalProductCard;
