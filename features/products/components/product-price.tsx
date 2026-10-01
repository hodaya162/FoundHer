import type { Currency } from "@/domain/product";
import type { RentalPriceRange } from "@/domain/rental-item";
import { cn } from "@/lib/utils";

import { formatProductPrice } from "../utils/format-product-price";

export type ProductPriceProps = {
  amount: number;
  className?: string;
  currency: Currency;
  prominent?: boolean;
  priceRange?: RentalPriceRange;
  rental?: boolean;
};

export function ProductPrice({ amount, className, currency, priceRange, prominent = false, rental = false }: ProductPriceProps) {
  const formattedRange = priceRange
    ? currency === "ILS"
      ? `₪${priceRange.min.toLocaleString("he-IL")}–${priceRange.max.toLocaleString("he-IL")}`
      : `${priceRange.min}–${priceRange.max}`
    : null;

  return (
    <p className={cn("type-price", prominent && "text-2xl", className)}>
      {formattedRange ? <bdi dir="ltr">{formattedRange}</bdi> : formatProductPrice(amount, currency)}
      {rental && !formattedRange ? <span className="type-caption ms-1 font-normal">להשכרה</span> : null}
    </p>
  );
}
