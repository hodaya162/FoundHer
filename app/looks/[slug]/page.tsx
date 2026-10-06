import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LookDetails } from "@/features/looks/components";
import { getLookDetailsBySlug } from "@/features/looks/queries/get-look-details-by-slug";
import { createLookMetadata } from "@/features/looks/utils/look-metadata";
import { getAllLooks } from "@/lib/repositories/looks.repository";

type LookPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLooks().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: LookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const details = await getLookDetailsBySlug(slug);

  if (!details) {
    return { title: "הלוק לא נמצא", robots: { index: false, follow: false } };
  }

  return createLookMetadata(details.look);
}

export default async function LookPage({ params }: LookPageProps) {
  const { slug } = await params;
  const details = await getLookDetailsBySlug(slug);
  if (!details) notFound();

  return <LookDetails details={details} />;
}
