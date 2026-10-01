import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { EditorialLookGrid, LookOccasionFilter, LooksEmptyState } from "@/features/looks/components";
import { getLookCardModels, type LookOccasionFilter as LookOccasionFilterValue } from "@/features/looks/queries/get-look-card-models";

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

type LooksPageProps = { searchParams: Promise<{ occasion?: string | string[] }> };

function parseOccasion(value: string | string[] | undefined): LookOccasionFilterValue {
  const normalized = Array.isArray(value) ? value[0] : value;
  return normalized === "everyday"
    || normalized === "work"
    || normalized === "shabbat"
    || normalized === "event"
    || normalized === "vacation"
    ? normalized
    : "all";
}

export default async function LooksPage({ searchParams }: LooksPageProps) {
  const params = await searchParams;
  const occasion = parseOccasion(params.occasion);
  const looks = getLookCardModels(occasion);

  return (
    <main>
      <PageContainer className="pb-20 pt-7 sm:pb-24 sm:pt-10">
        <header className="mb-6 max-w-2xl">
          <p className="type-label text-primary">השראה מפריטים אמיתיים</p>
          <h1 className="type-page-title mt-2">לוקים ששווה לשמור</h1>
          <p className="type-body mt-2 text-muted">שילובים ערוכים מהקטלוג, עם צילום מקור נאמן לכל פריט.</p>
        </header>
        <LookOccasionFilter selected={occasion} />
        {looks.length > 0 ? <EditorialLookGrid models={looks} /> : <LooksEmptyState />}
      </PageContainer>
    </main>
  );
}
