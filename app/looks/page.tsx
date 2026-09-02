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
        <header className="max-w-2xl pb-5 pt-8 sm:pb-7 sm:pt-12">
          <p className="type-label mb-2 text-primary">השראה מפריטים אמיתיים</p>
          <h1 className="type-page-title">לוקים</h1>
          <p className="type-body mt-2 text-muted">Moodboards של פריטים נפרדים שאפשר לפתוח, לשמור ולשלב בדרך שלך.</p>
        </header>
        <div className="space-y-4 pb-7 sm:pb-10">
          <LooksSearchForm filter={activeFilter} query={query} />
          <LookFilters activeFilter={activeFilter} query={query} />
        </div>
        {looks.length > 0 ? <LookGrid looks={looks} /> : <LooksEmptyState />}
      </PageContainer>
    </main>
  );
}
