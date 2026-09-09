import type { Currency } from "@/domain/product";
import type { RentalPriceRange } from "@/domain/rental-item";
import { cn } from "@/lib/utils";

const shekels = new Intl.NumberFormat("he-IL", {
  style: "currency",
  currency: "ILS",
  maximumFractionDigits: 0,
});

type RentalPriceProps = {
  currency: Currency;
  price?: number;
  priceRange?: RentalPriceRange;
  prominent?: boolean;
  compact?: boolean;
};

export function RentalPrice({ compact = false, currency, price, priceRange, prominent = false }: RentalPriceProps) {
  if (priceRange) {
    return (
      <p className={cn("font-semibold tabular-nums", prominent ? "text-2xl" : "text-sm")}>
        {compact ? null : <span className="block text-[0.68rem] font-normal text-muted">טווח השכרה</span>}
        {currency === "ILS" ? `₪${priceRange.min.toLocaleString("he-IL")}–${priceRange.max.toLocaleString("he-IL")}` : `${priceRange.min}–${priceRange.max}`}
      </p>
    );
  }

  if (price !== undefined) {
    return <p className={cn("font-semibold tabular-nums", prominent ? "text-2xl" : "text-sm")}>{shekels.format(price)}{compact ? null : <> <span className="text-xs font-normal text-muted">להשכרה</span></>}</p>;
  }

  return <p className="text-sm text-muted">מחיר בתיאום עם העסק</p>;
}
