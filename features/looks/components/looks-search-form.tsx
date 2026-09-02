import { Search } from "lucide-react";

import type { LookFilter } from "../types/look-filter";

type LooksSearchFormProps = {
  filter: LookFilter;
  query: string;
};

export function LooksSearchForm({ filter, query }: LooksSearchFormProps) {
  return (
    <form action="/looks" role="search" className="relative">
      {filter !== "all" ? <input type="hidden" name="occasion" value={filter} /> : null}
      <button type="submit" aria-label="חיפוש לוקים" className="absolute end-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-foreground">
        <Search aria-hidden="true" className="size-5" />
      </button>
      <label htmlFor="looks-search" className="sr-only">חיפוש בתוך הלוקים</label>
      <input
        id="looks-search"
        name="q"
        type="search"
        defaultValue={query}
        placeholder="חפשי לוק לפי אירוע או סגנון"
        className="min-h-11 w-full rounded-[0.9rem] border border-border/80 bg-surface pe-12 ps-4 text-sm outline-none placeholder:text-muted focus:border-primary"
      />
    </form>
  );
}
