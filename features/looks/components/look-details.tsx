import { PageContainer } from "@/components/layout";

import type { LookDetailsModel } from "../types/look-details";
import { LookBreadcrumbs } from "./look-breadcrumbs";
import { LookProductList } from "./look-product-list";
import { LookSaveButton } from "./look-save-button";
import { LookTags } from "./look-tags";
import { SimilarLooks } from "./similar-looks";
import { RealLookComposition } from "./real-look-composition";
import { EditorialLookComposition } from "./editorial-look-composition";
import { formatLookTotalPrice } from "../utils/look-price";

type LookDetailsProps = { details: LookDetailsModel };

export function LookDetails({ details }: LookDetailsProps) {
  const { catalogUnavailable, editorialPresentation, look, products, similarLooks, unresolvedProductRefs } = details;
  const catalogProducts = products.map(({ product }) => product);
  const total = formatLookTotalPrice(catalogProducts);

  return (
    <main>
      <PageContainer className="pb-8 sm:pb-12">
        <LookBreadcrumbs lookTitle={look.title} />
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(19rem,0.7fr)] lg:gap-12">
          <div className="overflow-hidden rounded-[1.25rem] border border-[#eadfda]/70 bg-surface-muted shadow-[0_12px_36px_rgba(62,39,34,0.06)]">
            {editorialPresentation ? (
              <EditorialLookComposition presentation={editorialPresentation} products={catalogProducts} size="detail" priority />
            ) : (
              <RealLookComposition look={look} products={catalogProducts} variant="hero" priority />
            )}
          </div>
          <header className="space-y-5 lg:sticky lg:top-[calc(var(--desktop-header-height)+2rem)] lg:py-8">
            <LookTags look={look} />
            <div>
              <p className="type-label mb-2 text-primary">{editorialPresentation?.singleProductConcept ? "קונספט עריכתי · פריט יחיד" : "לוק שלם"}</p>
              <h1 className="type-page-title">{look.title}</h1>
              <p className="type-body mt-3 max-w-xl text-muted">{look.description}</p>
              <p className="mt-3 text-sm font-semibold text-primary">
                {catalogProducts.length} {catalogProducts.length === 1 ? "פריט" : "פריטים"}
                {total ? <> · {total}</> : null}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <LookSaveButton lookId={look.id} lookTitle={look.title} />
            </div>
          </header>
        </div>
        <LookProductList products={products} unresolvedCount={unresolvedProductRefs.length} catalogUnavailable={catalogUnavailable} />
        {!editorialPresentation ? <SimilarLooks looks={similarLooks} /> : null}
      </PageContainer>
    </main>
  );
}
