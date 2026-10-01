import { getBrandById } from "@/lib/repositories/brands.repository";
import { getAllProducts } from "@/lib/repositories/products.repository";
import { getRentalCards } from "@/features/rentals/queries/get-rental-cards";

import type { ProductCardModel, ProductTransactionFilter, PurchaseProductCard } from "../types/product-card";
import { createProductCardModel, createRentalDiscoveryCardModel } from "../utils/create-product-card-model";

function getPurchaseCards(): readonly PurchaseProductCard[] {
  return getAllProducts().flatMap((product) => {
    if (product.type !== "purchase") return [];
    const brand = getBrandById(product.brandId);

    if (!brand) {
      throw new Error(`Product ${product.id} references missing brand ${product.brandId}.`);
    }

    return [createProductCardModel(product, brand.isDemo ? `${brand.name} · תוכן לדוגמה` : brand.name)];
  });
}

function interleaveCatalog(
  purchases: readonly PurchaseProductCard[],
  rentals: readonly ProductCardModel[],
): readonly ProductCardModel[] {
  const result: ProductCardModel[] = [];
  const length = Math.max(purchases.length, rentals.length);

  for (let index = 0; index < length; index += 1) {
    const purchase = purchases[index];
    const rental = rentals[index];
    if (purchase) result.push(purchase);
    if (rental) result.push(rental);
  }

  return result;
}

export function getDiscoverProductCards(
  filter: ProductTransactionFilter = "all",
): readonly ProductCardModel[] {
  const purchases = getPurchaseCards();
  // Bridal discovery remains in the dedicated Rentals experience. The general
  // Products catalog surfaces only evening rentals, which fit its browsing intent.
  const rentals = getRentalCards("evening").map(createRentalDiscoveryCardModel);

  if (filter === "purchase") return purchases;
  if (filter === "rental") return rentals;
  return interleaveCatalog(purchases, rentals);
}
