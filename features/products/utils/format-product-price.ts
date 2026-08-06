import type { Currency } from "@/domain/product";

const currencyFormatters = new Map<Currency, Intl.NumberFormat>();

export function formatProductPrice(amount: number, currency: Currency): string {
  let formatter = currencyFormatters.get(currency);

  if (!formatter) {
    formatter = new Intl.NumberFormat("he-IL", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
    currencyFormatters.set(currency, formatter);
  }

  return formatter.format(amount);
}
