import Image from "next/image";

import type { Brand } from "@/domain/brand";

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
        {brands.map((brand) => (
          <article key={brand.id} className="overflow-hidden rounded-card border border-border bg-surface">
            <div className="relative aspect-[16/10] bg-surface-muted">
              <Image
                src={brand.coverImage.url}
                alt={brand.coverImage.alt}
                fill
                sizes="(max-width: 639px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="relative p-5 pt-8">
              <div className="absolute end-5 top-0 size-14 -translate-y-1/2 overflow-hidden rounded-full border-4 border-surface bg-surface-muted">
                <Image src={brand.logo.url} alt="" fill sizes="56px" className="object-cover" />
              </div>
              <h3 className="type-card-title">{brand.name}</h3>
              <p className="type-body-small mt-2 line-clamp-2 text-muted">{brand.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="type-caption mt-4 text-muted">
        עמודי מותג מלאים עדיין אינם זמינים; לעת עתה הגילוי ממשיך דרך עמוד המותגים והפריטים.
      </p>
    </EditorialSection>
  );
}
