import {
  getBridalRentalProducts,
  getEveningRentalProducts,
  getFeaturedRentalProducts,
  getOtherRentalProductsByBusinessId,
  getRentalProducts,
} from "@/lib/repositories/products.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

import type { RentalCardModel, RentalTypeFilter } from "../types/rental-card";

function createRentalCardModel(product: ReturnType<typeof getRentalProducts>[number]): RentalCardModel {
  return {
    ...product,
    rentalBusiness: getRentalBusinessById(product.rentalBusinessId) ?? null,
  };
}

export function getRentalCards(filter: RentalTypeFilter = "all"): readonly RentalCardModel[] {
  const products = filter === "evening"
    ? getEveningRentalProducts()
    : filter === "bridal"
      ? getBridalRentalProducts()
      : getRentalProducts();

  return products.map(createRentalCardModel);
}

export function getFeaturedRentalCards(): readonly RentalCardModel[] {
  return getFeaturedRentalProducts().map(createRentalCardModel);
}

export function getOtherRentalCardsByBusinessId(
  rentalBusinessId: string,
  currentProductId: string,
  limit = 3,
): readonly RentalCardModel[] {
  return getOtherRentalProductsByBusinessId(rentalBusinessId, currentProductId, limit).map(createRentalCardModel);
}
