import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductDetails } from "@/features/products/components";
import { getProductDetailsBySlug } from "@/features/products/queries/get-product-details-by-slug";
import { getAllProducts } from "@/lib/repositories/products.repository";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const canonicalBase = "https://foundher.example/products";

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

  const canonical = `${canonicalBase}/${product.slug}`;
  const image = product.images[0];
  const sellerName = product.type === "purchase"
    ? product.brand?.name ?? "FoundHer"
    : product.rentalBusiness?.name ?? "FoundHer";
  const title = `${product.name} — ${sellerName}`;

  return {
    title,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title,
      description: product.description,
      type: "website",
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

  return <ProductDetails product={product} />;
}
