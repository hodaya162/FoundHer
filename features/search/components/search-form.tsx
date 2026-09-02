import { Search } from "lucide-react";
import { IconButton, SearchField } from "@/components/ui";

type SearchFormProps = {
  defaultValue?: string;
};

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  return (
    <form action="/search" method="get" role="search" className="flex w-full max-w-2xl items-center gap-2">
      <SearchField
        name="q"
        label="חיפוש ב־FoundHer"
        defaultValue={defaultValue}
        placeholder="למשל: שמלה כחולה לאירוע"
        autoComplete="off"
        className="min-w-0 flex-1 bg-surface"
      />
      <IconButton type="submit" aria-label="חיפוש" className="border-foreground bg-foreground text-white hover:bg-primary">
        <Search aria-hidden="true" />
      </IconButton>
    </form>
  );
}
