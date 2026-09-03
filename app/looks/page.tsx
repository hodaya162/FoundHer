import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { LookFilters, LookGrid, LooksEmptyState, LooksSearchForm } from "@/features/looks/components";
import { filterLooks } from "@/features/looks/queries/filter-looks";
import { getLookCardModels } from "@/features/looks/queries/get-look-card-models";
import { parseLookFilter } from "@/features/looks/types/look-filter";

const pageTitle = "לוקים והשראה";
const pageDescription = "רעיונות שלמים ללבוש לשבת, לעבודה, לאירועים וליום־יום.";
const canonical = createCanonicalUrl("/looks");

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: canonical ? { canonical } : undefined,
  robots: { index: false, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    locale: siteConfig.openGraphLocale,
    siteName: siteConfig.name,
    url: canonical,
  },
};

type LooksPageProps = {
  searchParams: Promise<{ occasion?: string; q?: string }>;
};

export default async function LooksPage({ searchParams }: LooksPageProps) {
  const { occasion, q } = await searchParams;
  const activeFilter = parseLookFilter(occasion);
  const query = q?.trim() ?? "";
  const looks = getLookCardModels(filterLooks(activeFilter, query));

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <header className="pb-3 pt-2 sm:pb-4 sm:pt-5">
          <h1 className="sr-only">לוקים</h1>
          <p className="text-center text-[0.78rem] font-medium leading-5 text-primary">השראה מפריטים אמיתיים</p>
        </header>
        <div className="space-y-3 pb-5 sm:pb-8">
          <LooksSearchForm filter={activeFilter} query={query} />
          <LookFilters activeFilter={activeFilter} query={query} />
        </div>
        {looks.length > 0 ? <LookGrid looks={looks} layout="editorial" /> : <LooksEmptyState />}
      </PageContainer>
    </main>
  );
}
