import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { FavoritesPageClient } from "@/features/favorites/components";
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
      <PageContainer className="pb-16 pt-8 sm:pb-24 sm:pt-12">
        <header className="mb-8 max-w-2xl sm:mb-10">
          <p className="type-label mb-3 text-primary">הבחירות שלך</p>
          <h1 className="type-page-title">שמורים</h1>
          <p className="type-body mt-4 text-muted">כל הלוקים, הפריטים וההשכרות שאהבת במקום אחד.</p>
        </header>
        <FavoritesPageClient looks={getAllLooks()} products={products} rentals={getRentalCards()} brands={getAllBrands()} />
      </PageContainer>
    </main>
  );
}
