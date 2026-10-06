import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import {
  FavoriteBrandsRail,
  HomeCategoryRail,
  HomeHero,
  HomeSearch,
  LooksRail,
  ProductsRail,
  RentalsRail,
} from "@/features/home/components";
import { getFeaturedPurchaseProductCards } from "@/features/products/queries/get-featured-purchase-product-cards";
import { getFeaturedRentalCards } from "@/features/rentals/queries/get-rental-cards";
import { getFeaturedBrands } from "@/lib/repositories/brands.repository";
import { getFeaturedLooks } from "@/lib/repositories/looks.repository";
import { getLookCardModels } from "@/features/looks/queries/get-look-card-models";

const title = "השראה לאופנה צנועה";
const description = "גלי לוקים שלמים, אופנה צנועה, פריטים ושמלות להשכרה ממותגים ועסקים נבחרים.";
const canonical = createCanonicalUrl("/");

export const metadata: Metadata = {
  title,
  description,
  alternates: canonical ? { canonical } : undefined,
  openGraph: {
    title,
    description,
    type: "website",
    locale: siteConfig.openGraphLocale,
    siteName: siteConfig.name,
    url: canonical,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default async function HomePage() {
  const looks = getFeaturedLooks();
  const lookModels = await getLookCardModels(looks);
  const rentals = getFeaturedRentalCards();
  const products = getFeaturedPurchaseProductCards();
  const brands = getFeaturedBrands();

  return (
    <main>
      <PageContainer className="pb-5 pt-3.5 sm:pb-16 sm:pt-5">
        <div className="space-y-4 sm:space-y-5">
          <HomeSearch />
          <HomeCategoryRail />
          <HomeHero image={lookModels[0]?.products[0]?.images[0]} />
        </div>

        <div className="mt-5 space-y-6 sm:mt-12 sm:space-y-12">
          <ProductsRail products={products} />
          <LooksRail models={lookModels} />
          <FavoriteBrandsRail brands={brands} />
          <RentalsRail products={rentals} />
        </div>
      </PageContainer>
    </main>
  );
}
