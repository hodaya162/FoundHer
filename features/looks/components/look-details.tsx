import { PageContainer } from "@/components/layout";

import type { LookDetailsModel } from "../types/look-details";
import { LookBreadcrumbs } from "./look-breadcrumbs";
import { LookEditorialVisual } from "./look-editorial-visual";
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
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)] lg:gap-12">
          <LookEditorialVisual look={look} variant="detail" priority />
          <header className="space-y-5 lg:sticky lg:top-[calc(var(--desktop-header-height)+2rem)] lg:py-8">
            <LookTags look={look} />
            <div>
              <p className="type-label mb-2 text-primary">לוק שלם</p>
              <h1 className="type-page-title">{look.title}</h1>
              <p className="type-body mt-3 max-w-xl text-muted">{look.description}</p>
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
