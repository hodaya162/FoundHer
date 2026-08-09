import { Button, SearchField } from "@/components/ui";

type SearchFormProps = {
  defaultValue?: string;
};

export function SearchForm({ defaultValue = "" }: SearchFormProps) {
  return (
    <form action="/search" method="get" role="search" className="flex flex-col gap-3 sm:flex-row">
      <SearchField
        name="q"
        label="חיפוש ב־FoundHer"
        defaultValue={defaultValue}
        placeholder="למשל: שמלה כחולה לאירוע"
        autoComplete="off"
        className="bg-surface sm:min-w-[28rem]"
      />
      <Button type="submit" className="shrink-0">חיפוש</Button>
    </form>
  );
}
