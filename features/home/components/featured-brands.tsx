import type { Brand } from "@/domain/brand";
import { FavoriteBrandCard } from "@/features/favorites/components";

import { EditorialSection } from "./editorial-section";

type FeaturedBrandsProps = {
  brands: readonly Brand[];
};

export function FeaturedBrands({ brands }: FeaturedBrandsProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <EditorialSection
      id="featured-brands-title"
      eyebrow="יוצרות שכדאי להכיר"
      title="מותגים עם נקודת מבט"
      description="בחירה קטנה של מותגים שמביאים קווים נקיים, נשיות ואופנה צנועה עכשווית."
      actionHref="/brands"
      actionLabel="לעמוד המותגים"
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {brands.map((brand) => <FavoriteBrandCard key={brand.id} brand={brand} />)}
      </div>
      <p className="type-caption mt-4 text-muted">
        עמודי מותג מלאים עדיין אינם זמינים; לעת עתה הגילוי ממשיך דרך עמוד המותגים והפריטים.
      </p>
    </EditorialSection>
  );
}
