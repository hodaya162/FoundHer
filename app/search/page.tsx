import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout";
import { createCanonicalUrl } from "@/config/site-url";
import { SearchEmptyState, SearchForm, SearchInitialState, SearchResults, searchFoundHer } from "@/features/search";

const canonical = createCanonicalUrl("/search");

export const metadata: Metadata = {
  title: "חיפוש ב־FoundHer",
  description: "חיפוש מאוחד בלוקים, פריטי אופנה לרכישה ולהשכרה, מותגים ועסקי השכרה ב־FoundHer.",
  alternates: canonical ? { canonical } : undefined,
  robots: { index: false, follow: true },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? "";
  const query = rawQuery.trim();
  const results = query ? await searchFoundHer(query) : null;

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader
          eyebrow="חיפוש"
          title="מה את מחפשת?"
          description="לוק, פריט או שמלה להשכרה."
          actions={<SearchForm defaultValue={query} />}
          className="md:block [&>div:last-child]:mt-5 [&>div:last-child]:w-full"
        />

        {!results ? <SearchInitialState /> : results.total === 0 ? <SearchEmptyState query={query} /> : (
          <div className="space-y-7">
            <p className="type-body-small break-words text-muted" aria-live="polite">
              {results.total} תוצאות עבור <strong className="text-foreground">“{query}”</strong>
            </p>
            <SearchResults results={results} />
          </div>
        )}
      </PageContainer>
    </main>
  );
}
