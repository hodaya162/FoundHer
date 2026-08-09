import type { Metadata } from "next";

import { PageContainer, PageHeader } from "@/components/layout";
import { SearchEmptyState, SearchForm, SearchInitialState, SearchResults, searchFoundHer } from "@/features/search";

export const metadata: Metadata = {
  title: "חיפוש ב־FoundHer",
  description: "חיפוש מאוחד בלוקים, פריטי אופנה לרכישה ולהשכרה, מותגים ועסקי השכרה ב־FoundHer.",
  alternates: { canonical: "https://foundher.example/search" },
  robots: { index: false, follow: true },
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] ?? "" : params.q ?? "";
  const query = rawQuery.trim();
  const results = query ? searchFoundHer(query) : null;

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader
          eyebrow="כל FoundHer במקום אחד"
          title="מה תרצי למצוא?"
          description="חפשי לוק, פריט, שמלה להשכרה, מותג או עסק השכרה."
          actions={<SearchForm defaultValue={query} />}
        />

        {!results ? <SearchInitialState /> : results.total === 0 ? <SearchEmptyState query={query} /> : (
          <div className="space-y-8">
            <p className="type-body break-words" aria-live="polite">
              מצאנו <strong>{results.total}</strong> תוצאות עבור <strong>“{query}”</strong>
            </p>
            <SearchResults results={results} />
          </div>
        )}
      </PageContainer>
    </main>
  );
}
