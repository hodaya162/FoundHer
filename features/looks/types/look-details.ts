import type { Look } from "@/domain/look";
import type { ProductImage } from "@/domain/media";
import type { Product } from "@/domain/product";

export type LookProductItem = {
  readonly product: Product;
  readonly image: ProductImage;
  readonly sellerName: string | null;
  readonly href: `/products/${string}`;
};

export type LookCardModel = {
  readonly look: Look;
  readonly products: readonly LookProductItem[];
};

export type LookDetailsModel = {
  readonly look: Look;
  readonly products: readonly LookProductItem[];
  readonly unresolvedProductIds: readonly string[];
  readonly similarLooks: readonly LookCardModel[];
};
