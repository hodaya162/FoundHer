import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createCanonicalUrl } from "@/config/site-url";
import { RentalDetail } from "@/features/rentals/components/rental-detail";
import { getAllRentals, getRentalBySlug } from "@/lib/repositories/rentals.repository";
import { getRentalBusinessById } from "@/lib/repositories/rental-businesses.repository";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return getAllRentals().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getRentalBySlug((await params).slug);
  if (!item) return { title: "השמלה לא נמצאה", robots: { index: false, follow: false } };
  return { title: `${item.title} — ${item.businessName}`, description: item.description, alternates: { canonical: createCanonicalUrl(`/rentals/${item.slug}`) }, robots: item.isDemo ? { index: false, follow: true } : undefined, openGraph: { images: item.images[0] ? [{ url: item.images[0].url, alt: item.images[0].alt }] : undefined } };
}

export default async function RentalDetailPage({ params }: Props) {
  const item = getRentalBySlug((await params).slug);
  if (!item) notFound();
  return <RentalDetail item={item} business={getRentalBusinessById(item.businessId) ?? null} />;
}
