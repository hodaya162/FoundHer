"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useState } from "react";

import { buttonVariants, EmptyState } from "@/components/ui";
import type { Brand } from "@/domain/brand";
import type { CatalogProduct } from "@/domain/catalog";
import { LookGrid } from "@/features/looks/components";
import type { LookCardModel } from "@/features/looks/types/look-card";
import { LookProductItem } from "@/features/looks/components";
import { ProductGrid } from "@/features/products/components";
import type { PurchaseProductCard } from "@/features/products/types/product-card";
import { RentalGrid } from "@/features/rentals/components";
import type { RentalCardModel } from "@/features/rentals/types/rental-card";
import { cn } from "@/lib/utils";

import { useFavorites } from "../hooks/use-favorites";
import type { FavoriteEntityType } from "../types/favorite";
import { FavoriteBrandCard } from "./favorite-brand-card";

type FavoriteCategory = "all" | "looks" | "products" | "rentals" | "brands";

type Props = {
  lookModels: readonly LookCardModel[];
  products: readonly PurchaseProductCard[];
  catalogProducts: readonly CatalogProduct[];
  rentals: readonly RentalCardModel[];
  brands: readonly Brand[];
};

const categories: readonly { id: FavoriteCategory; label: string }[] = [
  { id: "all", label: "הכול" },
  { id: "looks", label: "לוקים" },
  { id: "products", label: "פריטים" },
  { id: "rentals", label: "השכרות" },
  { id: "brands", label: "מותגים" },
];

function EmptyFavorites() {
  return (
    <EmptyState
      icon={<Heart />}
      title="עדיין לא שמרת כלום"
      description="לחצי על הלב ליד לוק או פריט כדי לשמור אותו כאן."
      action={(
        <div className="flex flex-wrap justify-center gap-2">
          <Link href="/looks" className={buttonVariants()}>ללוקים</Link>
          <Link href="/rentals" className={buttonVariants({ variant: "secondary" })}>להשכרות</Link>
        </div>
      )}
    />
  );
}

function CategoryEmpty({ category }: { category: Exclude<FavoriteCategory, "all"> }) {
  const labels: Record<typeof category, string> = {
    looks: "אין עדיין לוקים שמורים",
    products: "אין עדיין פריטים שמורים",
    rentals: "אין עדיין השכרות שמורות",
    brands: "אין עדיין מותגים שמורים",
  };
  return <EmptyState icon={<Heart />} title={labels[category]} description="אפשר לשמור בכל רגע באמצעות כפתור הלב ולחזור לכאן." />;
}

function Section({ children, count, id, title }: { children: React.ReactNode; count: number; id: string; title: string }) {
  return (
    <section aria-labelledby={`favorites-${id}`} className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <h2 id={`favorites-${id}`} className="type-section-title">{title}</h2>
        <p className="type-caption" aria-label={`${count} פריטים`}>{count}</p>
      </div>
      {children}
    </section>
  );
}

export function FavoritesPageClient({ brands, catalogProducts, lookModels, products, rentals }: Props) {
  const [category, setCategory] = useState<FavoriteCategory>("all");
  const references = useFavorites();
  const ids = (type: FavoriteEntityType) => new Set(references.filter((item) => item.entityType === type).map((item) => item.entityId));
  const lookIds = ids("look");
  const productIds = ids("product");
  const brandIds = ids("brand");
  const savedLooks = lookModels.filter(({ look }) => lookIds.has(look.id));
  const savedProducts = products.filter((product) => productIds.has(product.id));
  const savedCatalogProducts = catalogProducts.filter((product) => productIds.has(product.id));
  const savedRentals = rentals.filter((product) => productIds.has(product.id));
  const savedBrands = brands.filter((brand) => brandIds.has(brand.id));
  const total = savedLooks.length + savedProducts.length + savedCatalogProducts.length + savedRentals.length + savedBrands.length;

  const section = (id: Exclude<FavoriteCategory, "all">) => category === "all" || category === id;

  return (
    <>
      <div aria-label="סינון שמורים" className="hide-scrollbar -mx-4 mb-8 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="group">
        {categories.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
            className={cn("min-h-10 shrink-0 rounded-full px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", category === item.id ? "bg-foreground text-white" : "text-muted hover:bg-surface-muted hover:text-foreground")}
          >
            {item.label}
          </button>
        ))}
      </div>

      {total === 0 ? <EmptyFavorites /> : (
        <div className="space-y-12">
          {section("looks") && savedLooks.length > 0 ? <Section id="looks" title="לוקים שמורים" count={savedLooks.length}><LookGrid models={savedLooks} headingLevel={3} /></Section> : null}
          {section("products") && (savedProducts.length > 0 || savedCatalogProducts.length > 0) ? (
            <Section id="products" title="פריטים שמורים" count={savedProducts.length + savedCatalogProducts.length}>
              <div className="space-y-6">
                {savedProducts.length > 0 ? <ProductGrid products={savedProducts} priorityCount={1} /> : null}
                {savedCatalogProducts.length > 0 ? (
                  <ul className="hide-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-3">
                    {savedCatalogProducts.map((product) => <LookProductItem key={product.id} item={{ product }} />)}
                  </ul>
                ) : null}
              </div>
            </Section>
          ) : null}
          {section("rentals") && savedRentals.length > 0 ? <Section id="rentals" title="השכרות שמורות" count={savedRentals.length}><RentalGrid products={savedRentals} /></Section> : null}
          {section("brands") && savedBrands.length > 0 ? (
            <Section id="brands" title="מותגים שמורים" count={savedBrands.length}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{savedBrands.map((brand) => <FavoriteBrandCard key={brand.id} brand={brand} />)}</div>
            </Section>
          ) : null}
          {category !== "all" && (
            (category === "looks" && savedLooks.length === 0)
            || (category === "products" && savedProducts.length === 0 && savedCatalogProducts.length === 0)
            || (category === "rentals" && savedRentals.length === 0)
            || (category === "brands" && savedBrands.length === 0)
          ) ? <CategoryEmpty category={category} /> : null}
        </div>
      )}
    </>
  );
}
