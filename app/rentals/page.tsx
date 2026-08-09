import { PageContainer, PageHeader } from "@/components/layout";
import {
  RentalFilterBar,
  RentalFilters,
  RentalGrid,
  RentalSection,
  RentalsEmptyState,
} from "@/features/rentals/components";
import { getRentalCards } from "@/features/rentals/queries/get-rental-cards";
import type { RentalTypeFilter } from "@/features/rentals/types/rental-card";
import {
  rentalsPageDescription,
  rentalsPageMetadata,
  rentalsPageTitle,
} from "@/features/rentals/utils/rental-metadata";

export const metadata = rentalsPageMetadata;

type RentalsPageProps = {
  searchParams: Promise<{ type?: string | string[] }>;
};

function parseRentalFilter(value: string | string[] | undefined): RentalTypeFilter {
  return value === "evening" || value === "bridal" ? value : "all";
}

const sectionTitles: Record<RentalTypeFilter, string> = {
  all: "כל השמלות להשכרה",
  evening: "שמלות ערב להשכרה",
  bridal: "שמלות כלה להשכרה",
};

export default async function RentalsPage({ searchParams }: RentalsPageProps) {
  const { type } = await searchParams;
  const activeFilter = parseRentalFilter(type);
  const products = getRentalCards(activeFilter);

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader
          eyebrow="השמלה לאירוע הבא"
          title={rentalsPageTitle}
          description={rentalsPageDescription}
        />
        <RentalFilters activeFilter={activeFilter} />
        <RentalFilterBar />
        {products.length > 0 ? (
          <RentalSection
            title={sectionTitles[activeFilter]}
            titleId="rental-results-title"
            description={`${products.length} שמלות שנבחרו מעסקי השכרה ברחבי הארץ.`}
          >
            <RentalGrid products={products} headingLevel={3} />
          </RentalSection>
        ) : (
          <RentalsEmptyState />
        )}
      </PageContainer>
    </main>
  );
}
