import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LookLabDetail } from "@/features/looks-lab/components";
import { getLabLookBySlug, getLabLooks } from "@/features/looks-lab/queries/get-lab-looks";

export const dynamicParams = false;

export const metadata: Metadata = {
  title: "Look Lab — FoundHer",
  description: "פרטי לוק ניסיוני במעבדת FoundHer.",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return getLabLooks().map(({ look }) => ({ slug: look.slug }));
}

export default async function LookLabDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = getLabLookBySlug(slug);
  if (!model) notFound();
  return <LookLabDetail model={model} />;
}
