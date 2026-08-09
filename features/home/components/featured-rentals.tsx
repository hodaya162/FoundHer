import { RentalGrid } from "@/features/rentals/components";
import type { RentalCardModel } from "@/features/rentals/types/rental-card";

import { EditorialSection } from "./editorial-section";

type FeaturedRentalsProps = {
  products: readonly RentalCardModel[];
};

export function FeaturedRentals({ products }: FeaturedRentalsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <EditorialSection
      id="featured-rentals-title"
      eyebrow="לאירוע הבא"
      title="מחפשת שמלה לאירוע?"
      description="שמלות ערב וכלה צנועות להשכרה, שנבחרו מעסקים ברחבי הארץ."
      actionHref="/rentals"
      actionLabel="כל ההשכרות"
      tone="muted"
    >
      <RentalGrid products={products} headingLevel={3} prioritizeFirst={false} />
    </EditorialSection>
  );
}
