import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageContainer, PageHeader } from "@/components/layout";
import { Card, CardContent } from "@/components/ui";
import { catalogSources } from "@/config/catalog-sources";
import { getAllCatalogProducts } from "@/lib/catalog/catalog-service";

export const metadata: Metadata = {
  title: "מותגים",
  description: "מותגי האופנה האמיתיים שאפשר לגלות ב־FoundHer.",
  robots: { index: false, follow: true },
};

export default async function BrandsPage() {
  const products = await getAllCatalogProducts();

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader eyebrow="מקורות אמיתיים" title="מותגים" description="קטלוגים מקוריים עם קישור ישיר לאתר המותג." />
        <div className="grid gap-5 sm:grid-cols-2">
          {catalogSources.map((source) => {
            const sourceProducts = products.filter((product) => product.sourceId === source.id);
            const image = sourceProducts[0]?.images[0];
            return (
              <article key={source.id}>
                <Card className="overflow-hidden bg-transparent">
                  {image ? (
                    <Link href={`/discover?brand=${source.id}`} className="group relative block aspect-[16/10] overflow-hidden bg-surface-muted">
                      <Image src={image.url} alt={`קולקציית ${source.brandName}`} fill unoptimized sizes="(max-width: 639px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                    </Link>
                  ) : null}
                  <CardContent className="space-y-2 px-1 py-4">
                    <h2 className="type-section-title">{source.brandName}</h2>
                    <p className="type-body-small text-muted">{sourceProducts.length} פריטים מהקטלוג המקורי</p>
                    <Link href={`/discover?brand=${source.id}`} className="type-body-small inline-flex rounded-sm font-semibold text-primary hover:underline">לצפייה בפריטים</Link>
                  </CardContent>
                </Card>
              </article>
            );
          })}
        </div>
      </PageContainer>
    </main>
  );
}
