import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { FavoritesPageClient } from "@/features/favorites/components";
import { getDiscoverProductCards } from "@/features/products/queries/get-discover-product-cards";
import { getRentalCards } from "@/features/rentals/queries/get-rental-cards";
import { getAllBrands } from "@/lib/repositories/brands.repository";
import { getAllLooks } from "@/lib/repositories/looks.repository";
import { resolveCatalogProductReferences } from "@/lib/catalog/catalog-service";
import type { LookCardModel } from "@/features/looks/types/look-card";

export const metadata: Metadata = {
  title: "שמורים",
  description: "כל הלוקים, הפריטים וההשכרות שאהבת במקום אחד.",
  robots: { index: false, follow: true },
};

export default async function FavoritesPage() {
  const products = getDiscoverProductCards().filter((product) => product.type === "purchase");
  const looks = getAllLooks();
  const catalogRefs = [...new Map(
    looks.flatMap(({ productRefs }) => productRefs).map((reference) => [`${reference.sourceId}:${reference.productId}`, reference]),
  ).values()];
  const catalog = await resolveCatalogProductReferences(catalogRefs);
  const catalogById = new Map(catalog.products.flatMap((product) => [
    [product.id, product],
    [`${product.sourceId}:${product.externalId}`, product],
  ]));
  const lookModels: readonly LookCardModel[] = looks.flatMap((look) => {
    const resolvedProducts = look.productRefs.flatMap((reference) => {
      const product = catalogById.get(`${reference.sourceId}:${reference.productId}`);
      return product ? [product] : [];
    });
    return resolvedProducts.length > 0 ? [{ look, products: resolvedProducts, unresolvedProductCount: look.productRefs.length - resolvedProducts.length }] : [];
  });

  return (
    <main>
      <PageContainer className="pb-16 pt-7 sm:pb-24 sm:pt-10">
        <header className="mb-6 max-w-2xl sm:mb-8">
          <p className="type-label mb-2 text-primary">האוסף שלך</p>
          <h1 className="type-page-title">שמורים</h1>
          <p className="type-body mt-2 text-muted">כל מה שאהבת, במקום אחד.</p>
        </header>
        <FavoritesPageClient lookModels={lookModels} products={products} catalogProducts={catalog.products} rentals={getRentalCards()} brands={getAllBrands()} />
      </PageContainer>
    </main>
  );
}
