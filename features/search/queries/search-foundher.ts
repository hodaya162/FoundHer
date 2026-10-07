import { occasionLabels, seasonLabels, styleLabels } from "@/features/looks/utils/look-labels";
import { getRentalTypeLabel } from "@/features/rentals/utils/rental-labels";
import { getAllBrands } from "@/lib/repositories/brands.repository";
import { getAllCategories } from "@/lib/repositories/categories.repository";
import { getAllLooks } from "@/lib/repositories/looks.repository";
import { getAllProducts } from "@/lib/repositories/products.repository";
import { getAllRentalBusinesses } from "@/lib/repositories/rental-businesses.repository";
import { getCatalogSourceById } from "@/config/catalog-sources";

import type {
  BrandSearchResult,
  LookSearchResult,
  PurchaseProductSearchResult,
  RentalBusinessSearchResult,
  RentalProductSearchResult,
  SearchResults,
} from "../types/search-result";
import { normalizeSearch } from "../utils/normalize-search";
import { scoreSearchDocument } from "../utils/search-score";

type Ranked<T> = { readonly index: number; readonly result: T };

function rank<T extends { readonly score: number }>(results: readonly Ranked<T>[]): readonly T[] {
  return [...results]
    .sort((left, right) => right.result.score - left.result.score || left.index - right.index)
    .map(({ result }) => result);
}

export function searchFoundHer(query: string): SearchResults {
  const normalizedQuery = normalizeSearch(query);

  if (!normalizedQuery) {
    return {
      query: query.trim(),
      normalizedQuery,
      looks: [],
      products: [],
      rentals: [],
      brands: [],
      rentalBusinesses: [],
      total: 0,
    };
  }

  const brands = getAllBrands();
  const rentalBusinesses = getAllRentalBusinesses();
  const categories = getAllCategories();
  const brandsById = new Map(brands.map((brand) => [brand.id, brand]));
  const rentalBusinessesById = new Map(rentalBusinesses.map((business) => [business.id, business]));
  const categoriesById = new Map(categories.map((category) => [category.id, category]));

  const lookResults = rank<LookSearchResult>(getAllLooks().flatMap((look, index) => {
    const linkedBrandNames = [...new Set(look.productRefs.flatMap(({ sourceId }) => {
      const source = getCatalogSourceById(sourceId);
      return source ? [source.brandName] : [];
    }))];
    const contextLabel = occasionLabels[look.occasions[0]] ?? "השראה";
    const match = scoreSearchDocument(normalizedQuery, {
      title: [look.title],
      tags: [
        "לוק",
        "לוקים",
        ...look.occasions.flatMap((value) => [value, occasionLabels[value]]),
        ...look.styleTags.flatMap((value) => [value, styleLabels[value]]),
        ...look.seasonTags.flatMap((value) => [value, seasonLabels[value]]),
      ],
      relations: linkedBrandNames,
      description: [look.description],
    });

    if (match.score === 0) return [];

    return [{
      index,
      result: {
        entityType: "look",
        id: look.id,
        slug: look.slug,
        title: look.title,
        subtitle: look.description,
        matchedFields: match.matchedFields,
        score: match.score,
        href: `/looks/${look.slug}`,
        contextLabel,
      },
    }];
  }));

  const purchaseResults: Ranked<PurchaseProductSearchResult>[] = [];
  const rentalResults: Ranked<RentalProductSearchResult>[] = [];

  getAllProducts().forEach((product, index) => {
    const image = product.images[0];
    const category = categoriesById.get(product.categoryId);
    if (!image) return;

    if (product.type === "purchase") {
      const brand = brandsById.get(product.brandId);
      const match = scoreSearchDocument(normalizedQuery, {
        title: [product.name],
        tags: [
          category?.name ?? "",
          ...product.colors.map(({ name }) => name),
          ...product.sizes,
          "לרכישה",
          "רכישה",
          "קנייה",
          "קניה",
          "לקנות",
        ],
        relations: brand ? [brand.name] : [],
        description: [product.description],
      });

      if (match.score > 0) {
        purchaseResults.push({
          index,
          result: {
            entityType: "product",
            id: product.id,
            slug: product.slug,
            title: product.name,
            subtitle: product.description,
            image,
            matchedFields: match.matchedFields,
            score: match.score,
            href: `/products/${product.slug}`,
            sellerName: brand
              ? `${brand.name}${brand.isDemo ? " · תוכן לדוגמה" : ""}`
              : "מותג לא זמין",
            price: product.price,
            currency: product.currency,
          },
        });
      }
      return;
    }

    const business = rentalBusinessesById.get(product.rentalBusinessId);
    if (business?.isDemo !== false) return;
    const rentalTypeLabel = getRentalTypeLabel(product.type);
    const match = scoreSearchDocument(normalizedQuery, {
      title: [product.name],
      tags: [
        category?.name ?? "",
        ...product.availableSizes,
        rentalTypeLabel,
        "להשכרה",
        "השכרה",
      ],
      relations: [business?.name ?? "", product.city],
      description: [product.description],
    });

    if (match.score > 0) {
      rentalResults.push({
        index,
        result: {
          entityType: "rental_product",
          id: product.id,
          slug: product.slug,
          title: product.name,
          subtitle: product.description,
          image,
          matchedFields: match.matchedFields,
          score: match.score,
          href: `/products/${product.slug}`,
          sellerName: business
            ? `${business.name}${business.isDemo ? " · תוכן לדוגמה" : ""}`
            : "עסק השכרה לא זמין",
          city: product.city,
          rentalPrice: product.rentalPrice,
          currency: product.currency,
          rentalTypeLabel,
        },
      });
    }
  });

  const brandResults = rank<BrandSearchResult>(brands.flatMap((brand, index) => {
    const match = scoreSearchDocument(normalizedQuery, {
      title: [brand.name],
      tags: ["מותג", "מותגים"],
      description: [brand.description],
    });
    if (match.score === 0) return [];

    return [{
      index,
      result: {
        entityType: "brand",
        id: brand.id,
        slug: brand.slug,
        title: brand.name,
        subtitle: brand.description,
        image: brand.coverImage,
        matchedFields: match.matchedFields,
        score: match.score,
        href: null,
        isDemo: brand.isDemo,
      },
    }];
  }));

  const rentalBusinessResults = rank<RentalBusinessSearchResult>(rentalBusinesses.flatMap((business, index) => {
    if (business.isDemo) return [];
    const match = scoreSearchDocument(normalizedQuery, {
      title: [business.name],
      tags: ["עסק השכרה", "השכרת שמלות"],
      relations: [business.city],
      description: [business.description],
    });
    if (match.score === 0) return [];

    return [{
      index,
      result: {
        entityType: "rental_business",
        id: business.id,
        slug: business.slug,
        title: business.name,
        subtitle: business.description,
        image: business.coverImage,
        matchedFields: match.matchedFields,
        score: match.score,
        href: `/rental-businesses/${business.slug}`,
        city: business.city,
        isDemo: business.isDemo,
      },
    }];
  }));

  const products = rank(purchaseResults);
  const rentals = rank(rentalResults);
  const total = lookResults.length + products.length + rentals.length + brandResults.length + rentalBusinessResults.length;

  return {
    query: query.trim(),
    normalizedQuery,
    looks: lookResults,
    products,
    rentals,
    brands: brandResults,
    rentalBusinesses: rentalBusinessResults,
    total,
  };
}
