import type { ReactNode } from "react";

type SearchResultSectionProps = {
  id: string;
  title: string;
  count: number;
  children: ReactNode;
};

export function SearchResultSection({ children, count, id, title }: SearchResultSectionProps) {
  return (
    <section aria-labelledby={id} className="space-y-5 border-t border-border/70 pt-7">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={id} className="type-section-title">{title}</h2>
        <p className="type-caption shrink-0">{count} תוצאות</p>
      </div>
      {children}
    </section>
  );
}
