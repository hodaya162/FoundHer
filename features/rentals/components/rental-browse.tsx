"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { ProductSize } from "@/domain/product";
import type { RentalType } from "@/domain/rental-item";

import type { RentalCardModel } from "../types/rental-card";
import { RentalGrid } from "./rental-grid";

type PriceBand = "all" | "low" | "mid" | "high";

function unique(values: readonly (string | undefined)[]): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function SelectFilter({ label, onChange, options, value }: { label: string; onChange: (value: string) => void; options: readonly string[]; value: string }) {
  return <label className="shrink-0" dir="rtl"><span className="sr-only">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-10 rounded-full border border-border bg-background px-3 text-xs font-medium outline-none focus:border-primary"><option value="all">{label}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function matchesPrice(item: RentalCardModel, band: PriceBand, type: RentalType): boolean {
  if (band === "all") return true;
  const min = item.priceRange?.min ?? item.price ?? 0;
  const max = item.priceRange?.max ?? item.price ?? 0;
  const [low, high] = type === "bridal" ? [3000, 6000] : [500, 1000];
  if (band === "low") return min <= low;
  if (band === "mid") return min <= high && max >= low;
  return max >= high;
}

export function RentalBrowse({ items, type }: { items: readonly RentalCardModel[]; type: RentalType }) {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState("all");
  const [style, setStyle] = useState("all");
  const [color, setColor] = useState("all");
  const [location, setLocation] = useState("all");
  const [price, setPrice] = useState<PriceBand>("all");
  const options = useMemo(() => ({ sizes: unique(items.flatMap((item) => item.sizes ?? [])), styles: unique(items.map((item) => item.style)), colors: unique(items.map((item) => item.color)), locations: unique(items.map((item) => item.location)) }), [items]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("he-IL");
    return items.filter((item) => {
      const searchable = [item.title, item.businessName, item.location, item.style, item.color, item.description].filter(Boolean).join(" ").toLocaleLowerCase("he-IL");
      return (!normalized || searchable.includes(normalized)) && (size === "all" || item.sizes?.includes(size as ProductSize)) && (style === "all" || item.style === style) && (color === "all" || item.color === color) && (location === "all" || item.location === location) && matchesPrice(item, price, type);
    });
  }, [color, items, location, price, query, size, style, type]);
  const hasFilters = Boolean(query || size !== "all" || style !== "all" || color !== "all" || location !== "all" || price !== "all");
  const reset = () => { setQuery(""); setSize("all"); setStyle("all"); setColor("all"); setLocation("all"); setPrice("all"); };

  return (
    <div>
      <div className="mb-4 space-y-2.5">
        <label className="relative block"><Search aria-hidden="true" className="pointer-events-none absolute end-4 top-1/2 size-[1.1rem] -translate-y-1/2 text-muted" /><span className="sr-only">חיפוש שמלות</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder={type === "bridal" ? "חפשי לפי סגנון, אזור או טווח מחירים..." : "חפשי לפי סגנון, צבע, אזור או טווח מחירים..."} className="h-12 w-full rounded-full border border-border/80 bg-white/95 pe-11 ps-4 text-sm shadow-sm outline-none placeholder:text-muted focus:border-primary" /></label>
        <div dir="ltr" className="hide-scrollbar max-w-full overflow-x-auto pb-1" aria-label="סינון שמלות">
          <div className="flex w-max items-center gap-2">
            <SlidersHorizontal aria-hidden="true" className="size-4 shrink-0 text-muted" />
            {options.sizes.length > 0 ? <SelectFilter label="מידה" value={size} onChange={setSize} options={options.sizes} /> : null}
            <SelectFilter label="סגנון" value={style} onChange={setStyle} options={options.styles} />
            {type === "evening" ? <SelectFilter label="צבע" value={color} onChange={setColor} options={options.colors} /> : null}
            <label className="shrink-0" dir="rtl"><span className="sr-only">מחיר</span><select value={price} onChange={(event) => setPrice(event.target.value as PriceBand)} className="min-h-10 rounded-full border border-border bg-background px-3 text-xs font-medium outline-none focus:border-primary"><option value="all">מחיר</option><option value="low">עד {type === "bridal" ? "₪3,000" : "₪500"}</option><option value="mid">{type === "bridal" ? "₪3,000–6,000" : "₪500–1,000"}</option><option value="high">מעל {type === "bridal" ? "₪6,000" : "₪1,000"}</option></select></label>
            <SelectFilter label="אזור" value={location} onChange={setLocation} options={options.locations} />
            {hasFilters ? <button type="button" onClick={reset} className="inline-flex min-h-10 shrink-0 items-center gap-1 px-2 text-xs font-medium text-primary"><X aria-hidden="true" className="size-3.5" />ניקוי</button> : null}
          </div>
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between gap-3"><p className="text-xs text-muted">{filtered.length} שמלות</p>{hasFilters ? <p className="text-xs text-muted">תוצאות מסוננות</p> : null}</div>
      {filtered.length > 0 ? <RentalGrid products={filtered} headingLevel={2} /> : <div className="rounded-[1rem] bg-surface-muted px-5 py-12 text-center"><p className="font-semibold">לא נמצאו שמלות מתאימות</p><button type="button" onClick={reset} className="mt-3 min-h-11 text-sm font-semibold text-primary">ניקוי החיפוש והסינון</button></div>}
    </div>
  );
}
