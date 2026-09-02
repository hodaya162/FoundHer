import { PageContainer } from "@/components/layout";

import type { LookDetailsModel } from "../types/look-details";
import { LookBreadcrumbs } from "./look-breadcrumbs";
import { LookProductCollage } from "./look-product-collage";
import { LookProductList } from "./look-product-list";
import { LookSaveButton } from "./look-save-button";
import { LookStory } from "./look-story";
import { LookTags } from "./look-tags";
import { SimilarLooks } from "./similar-looks";

type LookDetailsProps = { details: LookDetailsModel };

export function LookDetails({ details }: LookDetailsProps) {
  const { look, products, similarLooks, unresolvedProductIds } = details;

  return (
    <main>
      <PageContainer className="pb-8 sm:pb-12">
        <LookBreadcrumbs lookTitle={look.title} />
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:gap-12">
          <LookProductCollage items={products} priority linkItems showPrices layout="editorial-a" className="aspect-[5/4] sm:aspect-[16/11] lg:aspect-[5/4]" />
          <header className="space-y-4 lg:sticky lg:top-[calc(var(--desktop-header-height)+2rem)] lg:py-6">
            <LookTags look={look} compact />
            <div>
              <h1 className="type-page-title">{look.title}</h1>
              <p className="type-body mt-3 max-w-xl text-muted">{look.description}</p>
              <p className="mt-4 border-s border-primary/40 ps-3 text-sm leading-6 text-muted">הלוק הזה מורכב מפריטים אמיתיים שנבחרו יחד על ידי FoundHer.</p>
              {look.isDemo ? <p className="type-caption mt-3">תוכן להדגמה בלבד · ללא שיתוף פעולה מסחרי.</p> : null}
            </div>
            <div className="flex items-center gap-3">
              <LookSaveButton lookId={look.id} lookTitle={look.title} />
            </div>
          </header>
        </div>
        <LookStory look={look} />
        <LookProductList products={products} unresolvedCount={unresolvedProductIds.length} />
        <SimilarLooks looks={similarLooks} />
      </PageContainer>
    </main>
  );
}
