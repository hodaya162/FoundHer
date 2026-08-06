import type { RentalBusiness } from "@/domain/rental-business";

export type ProductRentalBusinessProps = {
  rentalBusiness: RentalBusiness | null;
};

export function ProductRentalBusiness({ rentalBusiness }: ProductRentalBusinessProps) {
  if (!rentalBusiness) {
    return <p className="type-body-small text-muted">פרטי עסק ההשכרה אינם זמינים כרגע.</p>;
  }

  return (
    <div className="space-y-1">
      <p className="font-semibold">{rentalBusiness.name}</p>
      <p className="type-body-small text-muted">{rentalBusiness.description}</p>
    </div>
  );
}
