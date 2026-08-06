import type { Brand } from "@/domain/brand";
import type { PurchaseProduct, RentalProduct } from "@/domain/product";
import type { RentalBusiness } from "@/domain/rental-business";

export type PurchaseProductDetails = PurchaseProduct & {
  readonly brand: Brand | null;
};

export type RentalProductDetails = RentalProduct & {
  readonly rentalBusiness: RentalBusiness | null;
};

export type ProductDetails = PurchaseProductDetails | RentalProductDetails;
