import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import { PageContainer, PageHeader } from "@/components/layout";
import { buttonVariants } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { ProductGrid, ProductTransactionFilter } from "@/features/products/components";
import { getDiscoverProductCards } from "@/features/products/queries/get-discover-product-cards";
import type { ProductTransactionFilter as ProductTransactionFilterValue } from "@/features/products/types/product-card";
import { cn } from "@/lib/utils";

const pageTitle = "פריטים לרכישה ולהשכרה";
const pageDescription = "פריטי אופנה צנועה לרכישה ולהשכרה במקום אחד.";
const canonical = createCanonicalUrl("/products");

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

type ProductsPageProps = {
  searchParams: Promise<{ type?: string | string[] }>;
};

function parseTransactionFilter(value: string | string[] | undefined): ProductTransactionFilterValue {
  const normalized = Array.isArray(value) ? value[0] : value;
  return normalized === "purchase" || normalized === "rental" ? normalized : "all";
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const selected = parseTransactionFilter(params.type);
  const products = getDiscoverProductCards(selected);

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader eyebrow="גילוי" title="פריטים" description="פריטי אופנה צנועה לרכישה ולהשכרה." />

        <section aria-labelledby="products-tools-title" className="mb-7">
          <h2 id="products-tools-title" className="sr-only">כלי גילוי</h2>
          <Link href="/search" className={cn(buttonVariants({ variant: "secondary" }), "w-full justify-between bg-surface px-4 sm:w-auto")}>
            <span>חיפוש לפי צבע, אירוע או סגנון</span>
            <Search aria-hidden="true" className="size-4" />
          </Link>
        </section>

        <ProductTransactionFilter selected={selected} />

        <section aria-labelledby="products-catalog-title">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="type-label text-primary">נבחרו עכשיו</p>
              <h2 id="products-catalog-title" className="type-section-title mt-1">לגלות ולשמור</h2>
            </div>
            <p className="type-caption shrink-0">{products.length} פריטים</p>
          </div>
          <ProductGrid products={products} />
        </section>
      </PageContainer>
    </main>
  );
}
