import type { ReactNode } from "react";

import { PageContainer } from "@/components/layout";

import type { ProductDetails as ProductDetailsModel } from "../types/product-details";
import { ProductActionBar } from "./product-action-bar";
import { ProductBrand } from "./product-brand";
import { ProductBreadcrumbs } from "./product-breadcrumbs";
import { ProductColors } from "./product-colors";
import { ProductDescription } from "./product-description";
import { ProductGallery } from "./product-gallery";
import { ProductHeader } from "./product-header";
import { ProductMeta } from "./product-meta";
import { ProductPrice } from "./product-price";
import { ProductRentalBusiness } from "./product-rental-business";
import { ProductSection } from "./product-section";
import { ProductSizes } from "./product-sizes";

export type ProductDetailsProps = {
  product: ProductDetailsModel;
  relatedContent?: ReactNode;
};

export function ProductDetails({ product, relatedContent }: ProductDetailsProps) {
  return (
    <main>
      <PageContainer className="pb-16 sm:pb-24">
        <ProductBreadcrumbs productName={product.name} productType={product.type} />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.85fr)] lg:gap-12">
          <ProductGallery images={product.images} productName={product.name} />
          {product.type === "purchase" ? (
            <PurchaseProductPanel product={product} />
          ) : (
            <RentalProductPanel product={product} />
          )}
        </div>
        {relatedContent ? <div className="mt-16 border-t border-border pt-12 sm:mt-24 sm:pt-16">{relatedContent}</div> : null}
      </PageContainer>
    </main>
  );
}
function PurchaseProductPanel({ product }: { product: Extract<ProductDetailsModel, { type: "purchase" }> }) {
  return (
    <aside aria-label={`פרטי ${product.name}`} className="space-y-6 lg:sticky lg:top-[calc(var(--desktop-header-height)+1.5rem)] lg:self-start">
      <ProductHeader name={product.name} sellerName={product.brand?.name ?? "מותג לא זמין"} type={product.type} />
      <ProductPrice amount={product.price} currency={product.currency} prominent />
      <ProductDescription description={product.description} />
      <ProductSection title="מידות זמינות"><ProductSizes sizes={product.sizes} /></ProductSection>
      <ProductSection title="צבעים"><ProductColors colors={product.colors} /></ProductSection>
      <ProductSection title="המותג"><ProductBrand brand={product.brand} /></ProductSection>
      <ProductMeta items={[{ label: "סוג", value: "לרכישה" }, { label: "קטגוריה", value: product.categoryId }]} />
      <ProductActionBar type="purchase" externalUrl={product.externalUrl} productName={product.name} />
      <p className="type-caption text-center">המשך הרכישה מתבצע באתר המותג המקורי.</p>
    </aside>
  );
}

function RentalProductPanel({ product }: { product: Exclude<ProductDetailsModel, { type: "purchase" }> }) {
  return (
    <aside aria-label={`פרטי ${product.name}`} className="space-y-6 lg:sticky lg:top-[calc(var(--desktop-header-height)+1.5rem)] lg:self-start">
      <ProductHeader
        name={product.name}
        sellerName={product.rentalBusiness?.name ?? "עסק השכרה לא זמין"}
        type={product.type}
      />
      <ProductPrice amount={product.rentalPrice} currency={product.currency} rental prominent />
      <ProductDescription description={product.description} />
      <ProductSection title="מידות זמינות"><ProductSizes sizes={product.availableSizes} /></ProductSection>
      <ProductSection title="עסק ההשכרה"><ProductRentalBusiness rentalBusiness={product.rentalBusiness} /></ProductSection>
      <ProductMeta
        items={[
          { label: "סוג", value: product.type === "rental_bridal" ? "השכרת כלה" : "השכרת ערב" },
          { label: "עיר", value: product.city },
          { label: "קטגוריה", value: product.categoryId },
        ]}
      />
      <ProductActionBar type={product.type} availabilityUrl={product.availabilityUrl} productName={product.name} />
      <p className="type-caption text-center">בדיקת הזמינות מתבצעת מול עסק ההשכרה.</p>
    </aside>
  );
}
