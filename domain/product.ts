import type { ProductImage } from "./media";

export type ProductType =
  | "purchase"
  | "rental_evening"
  | "rental_bridal";

export type Currency = "ILS";

export type ProductSize =
  | "XS"
  | "S"
  | "M"
  | "L"
  | "XL"
  | "XXL"
  | "34"
  | "36"
  | "38"
  | "40"
  | "42"
  | "44"
  | "46"
  | "ONE_SIZE";

export type ProductColor = {
  readonly id: string;
  readonly name: string;
  readonly hex: `#${string}`;
};

type BaseProduct = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly description: string;
  readonly images: readonly ProductImage[];
  readonly categoryId: string;
  readonly featured: boolean;
  readonly createdAt: string;
};

export type PurchaseProduct = BaseProduct & {
  readonly type: "purchase";
  readonly brandId: string;
  readonly price: number;
  readonly currency: Currency;
  readonly sizes: readonly ProductSize[];
  readonly colors: readonly ProductColor[];
  readonly externalUrl: string;
};

export type RentalProduct = BaseProduct & {
  readonly type: "rental_evening" | "rental_bridal";
  readonly rentalBusinessId: string;
  readonly rentalPrice: number;
  readonly currency: Currency;
  readonly city: string;
  readonly availableSizes: readonly ProductSize[];
  readonly availabilityUrl: string;
};

export type Product = PurchaseProduct | RentalProduct;
