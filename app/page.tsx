import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import {
  EditorialSection,
  FeaturedBrands,
  FeaturedLooks,
  FeaturedRentals,
  HomeEditorialCta,
  HomeHero,
  NewArrivals,
  OccasionGrid,
} from "@/features/home/components";
import { homeOccasions } from "@/features/home/utils/home-content";
import { getFeaturedLooks } from "@/lib/repositories/looks.repository";
import { getFeaturedBrands } from "@/lib/repositories/brands.repository";
import { getFeaturedRentalCards } from "@/features/rentals/queries/get-rental-cards";
import { getFeaturedPurchaseProductCards } from "@/features/products/queries/get-featured-purchase-product-cards";

const title = "השראה לאופנה צנועה";
const description = "גלי לוקים שלמים, אופנה צנועה, פריטים ושמלות להשכרה ממותגים ועסקים נבחרים.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://foundher.example/" },
  openGraph: {
    title,
    description,
    type: "website",
    url: "https://foundher.example/",
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
  const featuredBrands = getFeaturedBrands().slice(0, 3);
  const selectedProducts = getFeaturedPurchaseProductCards().slice(0, 4);

  return (
    <main>
      <PageContainer className="pb-16 pt-4 sm:pb-20 sm:pt-8">
        <HomeHero image={featuredLooks[0]?.coverImage} />

        <EditorialSection
          id="home-occasions-title"
          eyebrow="מתחילות מהחיים עצמם"
          title="למה את מתלבשת?"
          description="בחרי את הרגע שלך והמשיכי אל אוסף הלוקים להשראה צנועה."
        >
          <OccasionGrid entries={homeOccasions} />
        </EditorialSection>

        <FeaturedLooks looks={featuredLooks} />
        <FeaturedRentals products={featuredRentals} />
        <FeaturedBrands brands={featuredBrands} />
        <NewArrivals products={selectedProducts} />
        <HomeEditorialCta />
      </PageContainer>
    </main>
  );
}
