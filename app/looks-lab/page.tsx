import type { Metadata } from "next";

import { PageContainer } from "@/components/layout";
import { HeroLookCard, LookLabFilters, LookLayoutComparison } from "@/features/looks-lab/components";
import { getLabLooks } from "@/features/looks-lab/queries/get-lab-looks";
import { LOOK_LAB_CATEGORIES, type LookLabCategory } from "@/features/looks-lab/types/look-lab";

export const metadata: Metadata = {
  title: "Looks Lab — FoundHer",
  description: "מעבדת עיצוב זמנית לבחינת כרטיסי לוק עריכתיים.",
  robots: { index: false, follow: false },
};

function parseCategory(value?: string): LookLabCategory | undefined {
  return LOOK_LAB_CATEGORIES.includes(value as LookLabCategory) ? value as LookLabCategory : undefined;
}

export default async function LooksLabPage({ searchParams }: { searchParams: Promise<{ category?: string; view?: string }> }) {
  const { category, view } = await searchParams;
  const activeCategory = parseCategory(category);
  const looks = getLabLooks(activeCategory);
  const comparisonLook = getLabLooks().find(({ look }) => look.layoutVariant === "model-hero") ?? getLabLooks()[0];
  const comparisonOnly = view === "comparison";

  return (
    <main>
      <PageContainer className="pb-20 pt-4 sm:pt-8">
        <div className="mx-auto max-w-[31rem]">
          <header className="mb-5 text-center">
            <p className="text-[0.7rem] font-semibold tracking-[0.12em] text-primary">FOUNDHER LOOKS LAB</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.025em]">הפריט שמוביל את הלוק</h1>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">ניסוי חזותי בלבד: פריט Hero אחד, והסטיילינג שנבנה סביבו. אין שינוי בעמוד הלוקים הציבורי.</p>
          </header>
          {comparisonOnly ? null : <LookLabFilters active={activeCategory} />}
          {comparisonOnly ? null : (
            <div className="mt-5 space-y-7">
              {looks.map((model, index) => <HeroLookCard key={model.look.id} model={model} priority={index === 0} />)}
            </div>
          )}
          {comparisonLook ? <LookLayoutComparison model={comparisonLook} overviewOnly={comparisonOnly} /> : null}
        </div>
      </PageContainer>
    </main>
  );
}
