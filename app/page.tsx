import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { FeaturedLooks, FeaturedRentals, HomeHero, NewArrivals } from "@/features/home/components";
import { getFeaturedLooks } from "@/lib/repositories/looks.repository";
import { getFeaturedRentalCards } from "@/features/rentals/queries/get-rental-cards";
import { getFeaturedPurchaseProductCards } from "@/features/products/queries/get-featured-purchase-product-cards";

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
    images: [{ url: "/images/products/embroidered-maxi-dress.jpg", alt: "השראה ללוק צנוע שלם ב־FoundHer" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/products/embroidered-maxi-dress.jpg"],
  },
};

export default function HomePage() {
  const featuredLooks = getFeaturedLooks().slice(0, 3);
  const featuredRentals = getFeaturedRentalCards().slice(0, 3);
  const selectedProducts = getFeaturedPurchaseProductCards().slice(0, 4);

  return (
    <main>
      <PageContainer className="pb-14 pt-3 sm:pb-20 sm:pt-6">
        <HomeHero image={featuredLooks[0]?.coverImage} />
        <FeaturedLooks looks={featuredLooks} />
        <FeaturedRentals products={featuredRentals} />
        <NewArrivals products={selectedProducts} />
      </PageContainer>
    </main>
  );
}
