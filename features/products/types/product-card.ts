import type { Currency, ProductType } from "@/domain/product";
import type { ProductImage } from "@/domain/media";
import type { RentalPriceRange } from "@/domain/rental-item";

type BaseProductCard = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly image: ProductImage;
  readonly sellerName: string;
  readonly featured: boolean;
  readonly href: `/products/${string}` | `/rentals/${string}`;
};

export type PurchaseProductCard = BaseProductCard & {
  readonly type: "purchase";
  readonly price: number;
  readonly currency: Currency;
  readonly actionLabel: "לפרטי הפריט";
  readonly sourceType: "product";
  readonly transactionType: "purchase";
};

export type RentalProductCard = BaseProductCard & {
  readonly type: Exclude<ProductType, "purchase">;
  readonly rentalPrice: number;
  readonly priceRange?: RentalPriceRange;
  readonly currency: Currency;
  readonly city: string;
  readonly actionLabel: "לפרטי הפריט";
  readonly sourceType: "product" | "rental";
  readonly transactionType: "rental";
};

export type ProductCardModel = PurchaseProductCard | RentalProductCard;

export type ProductTransactionFilter = "all" | "purchase" | "rental";
