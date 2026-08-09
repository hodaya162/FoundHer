import { MapPin, Ruler, SlidersHorizontal, Sparkles, WalletCards } from "lucide-react";

const futureFilters = [
  { label: "עיר", icon: MapPin },
  { label: "מידה", icon: Ruler },
  { label: "מחיר", icon: WalletCards },
  { label: "סגנון", icon: Sparkles },
] as const;

export function RentalFilterBar() {
  return (
    <section aria-labelledby="future-filters-title" className="mb-10 rounded-card bg-surface-muted p-4 sm:p-5">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 id="future-filters-title" className="type-label flex items-center gap-2">
          <SlidersHorizontal aria-hidden="true" className="size-4" />
          סינון מדויק
        </h2>
        <p className="type-caption text-muted">אפשרויות נוספות ייפתחו בקרוב</p>
      </div>
      <div className="flex flex-wrap gap-2" aria-label="מסננים עתידיים">
        {futureFilters.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            disabled
            aria-label={`${label} — בקרוב`}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm text-muted disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Icon aria-hidden="true" className="size-4" />
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
