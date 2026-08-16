import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { createCanonicalUrl } from "@/config/site-url";
import { ProductDetails } from "@/features/products/components";
import { getProductDetailsBySlug } from "@/features/products/queries/get-product-details-by-slug";
import { MoreFromBusiness } from "@/features/rentals/components";
import { getOtherRentalCardsByBusinessId } from "@/features/rentals/queries/get-rental-cards";
import { getAllProducts } from "@/lib/repositories/products.repository";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProducts().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetailsBySlug(slug);

  if (!product) {
    return {
      title: "המוצר לא נמצא",
      robots: { index: false, follow: false },
    };
  }

  const canonical = createCanonicalUrl(`/products/${product.slug}`);
  const image = product.images[0];
  const seller = product.type === "purchase" ? product.brand : product.rentalBusiness;
  const sellerName = seller?.name ?? "FoundHer";
  const title = `${product.name} — ${sellerName}`;

  return {
    title,
    description: product.description,
    alternates: canonical ? { canonical } : undefined,
    robots: seller?.isDemo === false
      ? undefined
      : { index: false, follow: true },
    openGraph: {
      title,
      description: product.description,
      type: "website",
      locale: siteConfig.openGraphLocale,
      siteName: siteConfig.name,
      url: canonical,
      images: image ? [{ url: image.url, alt: image.alt }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: image ? [image.url] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductDetailsBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.type === "purchase"
    ? []
    : getOtherRentalCardsByBusinessId(product.rentalBusinessId, product.id, 3);

  const relatedContent = product.type !== "purchase" && product.rentalBusiness && relatedProducts.length > 0
    ? (
      <MoreFromBusiness
        businessName={product.rentalBusiness.name}
        businessSlug={product.rentalBusiness.slug}
        products={relatedProducts}
      />
    )
    : undefined;

  return <ProductDetails product={product} relatedContent={relatedContent} />;
}
