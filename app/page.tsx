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
    images: [{ url: "/images/generated/looks/summer-event-classic.webp", alt: "השראה ללוק צנוע שלם ב־FoundHer" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/generated/looks/summer-event-classic.webp"],
  },
};

export default function HomePage() {
  const looks = getFeaturedLooks();
  const rentals = getFeaturedRentalCards();
  const products = getFeaturedPurchaseProductCards();
  const brands = getFeaturedBrands();

  return (
    <main>
      <PageContainer className="pb-10 pt-3 sm:pb-16 sm:pt-5">
        <div className="space-y-4 sm:space-y-5">
          <HomeSearch />
          <HomeCategoryRail />
          <HomeHero image={looks[0]?.coverImage} />
        </div>

        <div className="mt-8 space-y-10 sm:mt-12 sm:space-y-14">
          <ProductsRail products={products} />
          <LooksRail looks={looks} />
          <FavoriteBrandsRail brands={brands} />
          <RentalsRail products={rentals} />
        </div>
      </PageContainer>
    </main>
  );
}
