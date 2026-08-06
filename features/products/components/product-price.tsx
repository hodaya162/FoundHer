import type { Currency } from "@/domain/product";
import { cn } from "@/lib/utils";

import { formatProductPrice } from "../utils/format-product-price";

export type ProductPriceProps = {
  amount: number;
  className?: string;
  currency: Currency;
  prominent?: boolean;
  rental?: boolean;
};

export function ProductPrice({ amount, className, currency, prominent = false, rental = false }: ProductPriceProps) {
  return (
    <p className={cn("type-price", prominent && "text-2xl", className)}>
      {formatProductPrice(amount, currency)}
      {rental ? <span className="type-caption ms-1 font-normal">להשכרה</span> : null}
    </p>
  );
}
