import type { Currency } from "@/domain/product";

import { formatProductPrice } from "../utils/format-product-price";

export type ProductPriceProps = {
  amount: number;
  currency: Currency;
  rental?: boolean;
};

export function ProductPrice({ amount, currency, rental = false }: ProductPriceProps) {
  return (
    <p className="type-price">
      {formatProductPrice(amount, currency)}
      {rental ? <span className="type-caption ms-1 font-normal">להשכרה</span> : null}
    </p>
  );
}
