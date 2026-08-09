import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import { PageContainer, PageHeader } from "@/components/layout";
import { Badge, Button, buttonVariants } from "@/components/ui";
import { ProductGrid } from "@/features/products/components";
import { getDiscoverProductCards } from "@/features/products/queries/get-discover-product-cards";
import { cn } from "@/lib/utils";

const pageTitle = "לגלות אופנה צנועה";
const pageDescription = "פריטים נבחרים לרכישה ולהשכרה ממותגים ומסטודיו שמבינים אופנה צנועה.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "https://foundher.example/discover" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    type: "website",
    url: "https://foundher.example/discover",
  },
};

export default function DiscoverPage() {
  const products = getDiscoverProductCards();
  const purchaseCount = products.filter(({ type }) => type === "purchase").length;
  const rentalCount = products.length - purchaseCount;

  return (
    <main>
      <PageContainer className="pb-16 sm:pb-20">
        <PageHeader
          eyebrow="פיד הגילוי שלך"
          title={pageTitle}
          description={pageDescription}
        />

        <section aria-labelledby="discover-tools-title" className="mb-8 space-y-4 border-y border-border py-5">
          <h2 id="discover-tools-title" className="sr-only">כלי גילוי</h2>
          <Link href="/search" className={cn(buttonVariants({ variant: "secondary" }), "w-full justify-between bg-surface px-4 sm:w-auto")}>
            <span>מחפשת משהו מסוים? עברי לחיפוש בכל FoundHer</span>
            <Search aria-hidden="true" className="size-4" />
          </Link>

          <div aria-label="סינון חזותי לפי סוג מוצר" className="flex gap-2 overflow-x-auto pb-1">
            <Button size="sm" aria-pressed="true" className="shrink-0">
              הכול <Badge className="bg-white/15 text-white">{products.length}</Badge>
            </Button>
            <Button size="sm" variant="secondary" aria-pressed="false" className="shrink-0">
              לרכישה <Badge>{purchaseCount}</Badge>
            </Button>
            <Button size="sm" variant="secondary" aria-pressed="false" className="shrink-0">
              להשכרה <Badge>{rentalCount}</Badge>
            </Button>
            <Button size="sm" variant="ghost" className="ms-auto shrink-0">
              סינון נוסף
            </Button>
          </div>
        </section>

        <section aria-labelledby="discover-products-title">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="type-label text-primary">הבחירות של FoundHer</p>
              <h2 id="discover-products-title" className="type-section-title mt-1">פריטים שכדאי להכיר</h2>
            </div>
            <p className="type-caption shrink-0">{products.length} פריטים</p>
          </div>
          <ProductGrid products={products} />
        </section>
      </PageContainer>
    </main>
  );
}
