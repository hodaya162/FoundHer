import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { FavoritesPageClient } from "@/features/favorites/components";
import { getLookCardModels } from "@/features/looks/queries/get-look-card-models";
import { getDiscoverProductCards } from "@/features/products/queries/get-discover-product-cards";
import { getRentalCards } from "@/features/rentals/queries/get-rental-cards";
import { getAllBrands } from "@/lib/repositories/brands.repository";
import { getAllLooks } from "@/lib/repositories/looks.repository";

export const metadata: Metadata = {
  title: "שמורים",
  description: "כל הלוקים, הפריטים וההשכרות שאהבת במקום אחד.",
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  const products = getDiscoverProductCards().filter((product) => product.type === "purchase");

  return (
    <main>
      <PageContainer className="pb-16 pt-7 sm:pb-24 sm:pt-10">
        <header className="mb-6 max-w-2xl sm:mb-8">
          <p className="type-label mb-2 text-primary">האוסף שלך</p>
          <h1 className="type-page-title">שמורים</h1>
          <p className="type-body mt-2 text-muted">כל מה שאהבת, במקום אחד.</p>
        </header>
        <FavoritesPageClient looks={getLookCardModels(getAllLooks())} products={products} rentals={getRentalCards()} brands={getAllBrands()} />
      </PageContainer>
    </main>
  );
}
