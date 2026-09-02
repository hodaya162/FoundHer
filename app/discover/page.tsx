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

const pageTitle = "לגלות אופנה צנועה";
const pageDescription = "פריטים נבחרים לרכישה ולהשכרה ממותגים ומסטודיו שמבינים אופנה צנועה.";
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

export default function DiscoverPage() {
  const products = getDiscoverProductCards();

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader eyebrow="גילוי" title="פריטים" description="פריטי אופנה צנועה לרכישה ולהשכרה." />

        <section aria-labelledby="discover-tools-title" className="mb-8">
          <h2 id="discover-tools-title" className="sr-only">כלי גילוי</h2>
          <Link href="/search" className={cn(buttonVariants({ variant: "secondary" }), "w-full justify-between bg-surface px-4 sm:w-auto")}>
            <span>חיפוש לפי צבע, אירוע או סגנון</span>
            <Search aria-hidden="true" className="size-4" />
          </Link>

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
