import type { Look } from "@/domain/look";
import type { PurchaseProduct, RentalProduct } from "@/domain/product";

export type LookProductItem =
  | { readonly product: PurchaseProduct; readonly sellerName: string | null }
  | { readonly product: RentalProduct; readonly sellerName: string | null };

export type LookDetailsModel = {
  readonly look: Look;
  readonly products: readonly LookProductItem[];
  readonly unresolvedProductIds: readonly string[];
  readonly similarLooks: readonly Look[];
};
