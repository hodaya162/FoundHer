import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import type { LookOccasion } from "@/domain/look";
import { EditorialLookFeed, LookGrid, LookOccasionFilters, LooksEmptyState } from "@/features/looks/components";
import { getEditorialPrototypeSlugs } from "@/features/looks/data/editorial-look-presentations";
import { getLookCardModels } from "@/features/looks/queries/get-look-card-models";
import { getAllLooks } from "@/lib/repositories/looks.repository";

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
  readonly searchParams: Promise<{
    readonly occasion?: LookOccasion;
    readonly review?: string;
  }>;
};

export default async function LooksPage({ searchParams }: LooksPageProps) {
  const { occasion, review } = await searchParams;
  const reviewSourceId = review === "ayala" ? "ayala" : undefined;
  const allLooks = getAllLooks();
  const prototypeSlugs = new Set(getEditorialPrototypeSlugs());
  const looks = reviewSourceId
    ? allLooks.filter(({ productRefs }) => productRefs.some(({ sourceId }) => sourceId === reviewSourceId))
    : review === "all"
      ? allLooks
      : allLooks.filter(({ occasions, slug }) => prototypeSlugs.has(slug) && (!occasion || occasions.includes(occasion)));
  const models = await getLookCardModels(looks);

  return (
    <main>
      <PageContainer className="max-w-[46rem] pb-16 sm:pb-20">
        {review ? (
          <>
            <PageHeader
              eyebrow="סקירה פנימית"
              title={reviewSourceId ? "מועמדי אילה שמלות" : "כל מועמדי הלוקים"}
              description={`${models.length} מועמדים אמיתיים לבחירה ולאוצרות.`}
            />
            {models.length > 0 ? <LookGrid models={models} showCandidateNumbers /> : <LooksEmptyState />}
          </>
        ) : (
          <>
            <header className="pb-4 pt-5 text-center sm:pb-6 sm:pt-8">
              <p className="text-xs font-semibold tracking-[0.08em] text-primary">סטייל אמיתי · פריטים אמיתיים</p>
              <h1 className="sr-only">לוקים והשראה</h1>
            </header>
            <LookOccasionFilters selected={occasion} />
            <div className="mt-4 sm:mt-6">
              {models.length > 0 ? <EditorialLookFeed models={models} /> : <LooksEmptyState />}
            </div>
          </>
        )}
      </PageContainer>
    </main>
  );
}
