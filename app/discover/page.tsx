import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import { PageContainer, PageHeader } from "@/components/layout";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { buttonVariants } from "@/components/ui";
import { ProductGrid } from "@/features/products/components";
import { getDiscoverProductCards } from "@/features/products/queries/get-discover-product-cards";
import { cn } from "@/lib/utils";
import { catalogSources } from "@/config/catalog-sources";
import { CATALOG_CATEGORIES, type CatalogCategory } from "@/domain/catalog";

const pageTitle = "לגלות אופנה צנועה";
const pageDescription = "פריטי אופנה אמיתיים לרכישה מהקטלוגים המקוריים של המותגים ב־FoundHer.";
const canonical = createCanonicalUrl("/discover");

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: canonical ? { canonical } : undefined,
  robots: { index: false, follow: true },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    locale: siteConfig.openGraphLocale,
    siteName: siteConfig.name,
    url: canonical,
  },
};

type DiscoverPageProps = {
  searchParams: Promise<{ brand?: string | string[]; category?: string | string[] }>;
};

const categoryLabels: Record<CatalogCategory, string> = {
  tops: "חולצות",
  skirts: "חצאיות",
  dresses: "שמלות",
  outerwear: "שכבות",
  accessories: "אביזרים",
  swimwear: "בגדי ים",
  other: "נוספים",
};

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  const params = await searchParams;
  const requestedBrand = Array.isArray(params.brand) ? params.brand[0] : params.brand;
  const requestedCategory = Array.isArray(params.category) ? params.category[0] : params.category;
  const brand = catalogSources.some((source) => source.id === requestedBrand) ? requestedBrand : undefined;
  const category = CATALOG_CATEGORIES.includes(requestedCategory as CatalogCategory) ? requestedCategory : undefined;
  const products = await getDiscoverProductCards({ brand, category });

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader eyebrow="גילוי" title="פריטים" description="פריטי אופנה אמיתיים מהקטלוגים המקוריים של המותגים." />

        <section aria-labelledby="discover-tools-title" className="mb-8">
          <h2 id="discover-tools-title" className="sr-only">כלי גילוי</h2>
          <Link href="/search" className={cn(buttonVariants({ variant: "secondary" }), "w-full justify-between bg-surface px-4 sm:w-auto")}>
            <span>חיפוש לפי צבע, אירוע או סגנון</span>
            <Search aria-hidden="true" className="size-4" />
          </Link>
          <div className="mt-4 space-y-3" dir="rtl">
            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="סינון לפי מותג">
              <Link href="/discover" className={cn("shrink-0 rounded-full border px-4 py-2 text-sm", !brand && !category ? "border-foreground bg-foreground text-white" : "border-border bg-surface")}>הכול</Link>
              {catalogSources.map((source) => (
                <Link key={source.id} href={`/discover?brand=${source.id}`} className={cn("shrink-0 rounded-full border px-4 py-2 text-sm", brand === source.id ? "border-foreground bg-foreground text-white" : "border-border bg-surface")}>{source.brandName}</Link>
              ))}
            </div>
            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="סינון לפי קטגוריה">
              {CATALOG_CATEGORIES.map((value) => (
                <Link key={value} href={`/discover?category=${value}`} className={cn("shrink-0 rounded-full border px-3 py-1.5 text-xs", category === value ? "border-primary bg-primary text-white" : "border-border bg-surface")}>{categoryLabels[value]}</Link>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="discover-products-title">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="type-label text-primary">נבחרו עכשיו</p>
              <h2 id="discover-products-title" className="type-section-title mt-1">לגלות ולשמור</h2>
            </div>
            <p className="type-caption shrink-0">{products.length} פריטים</p>
          </div>
          <ProductGrid products={products} />
        </section>
      </PageContainer>
    </main>
  );
}
