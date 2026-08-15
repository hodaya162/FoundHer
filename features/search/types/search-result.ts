import type { Currency } from "@/domain/product";
import type { ImageAsset } from "@/domain/media";

export type SearchEntityType =
  | "look"
  | "product"
  | "rental_product"
  | "brand"
  | "rental_business";

export type SearchMatchedField = "title" | "tags" | "relations" | "description";

type BaseSearchResult = {
  readonly entityType: SearchEntityType;
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly subtitle: string;
  readonly image: ImageAsset;
  readonly matchedFields: readonly SearchMatchedField[];
  readonly score: number;
};

export type LookSearchResult = BaseSearchResult & {
  readonly entityType: "look";
  readonly href: `/looks/${string}`;
  readonly contextLabel: string;
};

export type PurchaseProductSearchResult = BaseSearchResult & {
  readonly entityType: "product";
  readonly href: `/products/${string}`;
  readonly sellerName: string;
  readonly price: number;
  readonly currency: Currency;
};

export type RentalProductSearchResult = BaseSearchResult & {
  readonly entityType: "rental_product";
  readonly href: `/products/${string}`;
  readonly sellerName: string;
  readonly city: string;
  readonly rentalPrice: number;
  readonly currency: Currency;
  readonly rentalTypeLabel: string;
};

export type BrandSearchResult = BaseSearchResult & {
  readonly entityType: "brand";
  readonly href: null;
  readonly isDemo: boolean;
};

export type RentalBusinessSearchResult = BaseSearchResult & {
  readonly entityType: "rental_business";
  readonly href: `/rental-businesses/${string}`;
  readonly city: string;
  readonly isDemo: boolean;
};

export type SearchResult =
  | LookSearchResult
  | PurchaseProductSearchResult
  | RentalProductSearchResult
  | BrandSearchResult
  | RentalBusinessSearchResult;

export type SearchResults = {
  readonly query: string;
  readonly normalizedQuery: string;
  readonly looks: readonly LookSearchResult[];
  readonly products: readonly PurchaseProductSearchResult[];
  readonly rentals: readonly RentalProductSearchResult[];
  readonly brands: readonly BrandSearchResult[];
  readonly rentalBusinesses: readonly RentalBusinessSearchResult[];
  readonly total: number;
};
