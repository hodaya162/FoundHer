import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import type { RentalBusiness } from "@/domain/rental-business";

export type ProductRentalBusinessProps = {
  rentalBusiness: RentalBusiness | null;
};

export function ProductRentalBusiness({ rentalBusiness }: ProductRentalBusinessProps) {
  if (!rentalBusiness) {
    return <p className="type-body-small text-muted">פרטי עסק ההשכרה אינם זמינים כרגע.</p>;
  }

  return (
    <div className="space-y-3">
      <div>
        <p className="font-semibold">{rentalBusiness.name}</p>
        <p className="type-body-small mt-1 flex items-center gap-2 text-muted">
          <MapPin aria-hidden="true" className="size-4" />
          {rentalBusiness.city}
        </p>
      </div>
      <p className="type-body-small text-muted">{rentalBusiness.description}</p>
      <Link
        href={`/rental-businesses/${rentalBusiness.slug}`}
        className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary"
      >
        לעמוד העסק
        <ArrowLeft aria-hidden="true" className="size-4" />
      </Link>
    </div>
  );
}
