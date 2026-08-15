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
      description="תוכן לדוגמה שממחיש כיצד מותגים ישתלבו בחוויית הגילוי. המותגים אינם עסקים מאומתים."
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {brands.map((brand) => <FavoriteBrandCard key={brand.id} brand={brand} />)}
      </div>
    </EditorialSection>
  );
}
