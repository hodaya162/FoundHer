import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout";
import {
  RentalBusinessBreadcrumbs,
  RentalBusinessHeader,
  RentalGrid,
  RentalSection,
  RentalsEmptyState,
} from "@/features/rentals/components";
import { getRentalBusinessDetailsBySlug } from "@/features/rentals/queries/get-rental-business-details-by-slug";
import { createRentalBusinessMetadata } from "@/features/rentals/utils/rental-metadata";
import { getAllRentalBusinesses } from "@/lib/repositories/rental-businesses.repository";

type RentalBusinessPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllRentalBusinesses().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: RentalBusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const details = getRentalBusinessDetailsBySlug(slug);

  if (!details) {
    return {
      title: "עסק ההשכרה לא נמצא",
      robots: { index: false, follow: false },
    };
  }

  return createRentalBusinessMetadata(details.business);
}

export default async function RentalBusinessPage({ params }: RentalBusinessPageProps) {
  const { slug } = await params;
  const details = getRentalBusinessDetailsBySlug(slug);

  if (!details) {
    notFound();
  }

  const { business, products } = details;

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <RentalBusinessBreadcrumbs businessName={business.name} />
        <RentalBusinessHeader business={business} />
        {products.length > 0 ? (
          <RentalSection
            title={`השמלות של ${business.name}`}
            titleId="business-rentals-title"
            description={`${products.length} שמלות להשכרה`}
          >
            <RentalGrid products={products} headingLevel={3} />
          </RentalSection>
        ) : (
          <RentalsEmptyState businessName={business.name} />
        )}
      </PageContainer>
    </main>
  );
}
