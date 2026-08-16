import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SectionHeader } from "@/components/layout";

import type { RentalCardModel } from "../types/rental-card";
import { RentalGrid } from "./rental-grid";

type MoreFromBusinessProps = {
  businessName: string;
  businessSlug: string;
  products: readonly RentalCardModel[];
};

export function MoreFromBusiness({ businessName, businessSlug, products }: MoreFromBusinessProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="more-from-business-title">
      <SectionHeader
        title={`עוד שמלות מ־${businessName}`}
        titleId="more-from-business-title"
        action={(
          <Link
            href={`/rental-businesses/${businessSlug}`}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
          >
            לכל שמלות העסק
            <ArrowLeft aria-hidden="true" className="size-4" />
          </Link>
        )}
      />
      <RentalGrid products={products} prioritizeFirst={false} />
    </section>
  );
}
