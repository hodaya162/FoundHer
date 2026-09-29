import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config/site";
import { createCanonicalUrl, getMetadataBase } from "@/config/site-url";
import { RentalDetail } from "@/features/rentals/components/rental-detail";
import { getAllRentals, getRentalBySlug } from "@/lib/repositories/rentals.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return getAllRentals().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getRentalBySlug((await params).slug);
  if (!item) return { title: "השמלה לא נמצאה", robots: { index: false, follow: false } };
  const pathname = `/rentals/${item.slug}`;
  const canonical = createCanonicalUrl(pathname);
  const productUrl = new URL(pathname, getMetadataBase()).toString();
  const image = item.images[0];
  const title = `${item.title} — ${item.businessName}`;

  return {
    title,
    description: item.description,
    alternates: canonical ? { canonical } : undefined,
    robots: item.isDemo ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description: item.description,
      type: "website",
      locale: siteConfig.openGraphLocale,
      siteName: siteConfig.name,
      url: productUrl,
      images: image ? [{ url: image.url, alt: image.alt }] : undefined,
    },
  };
}

export default async function RentalDetailPage({ params }: Props) {
  const item = getRentalBySlug((await params).slug);
  if (!item) notFound();
  return <RentalDetail item={item} business={getRentalBusinessById(item.businessId) ?? null} />;
}
