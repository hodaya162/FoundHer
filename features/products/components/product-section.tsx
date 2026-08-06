import type { ReactNode } from "react";

export type ProductSectionProps = {
  children: ReactNode;
  title: string;
};

export function ProductSection({ children, title }: ProductSectionProps) {
  return (
    <section className="space-y-3 border-t border-border pt-5">
      <h2 className="text-sm font-semibold">{title}</h2>
      {children}
    </section>
  );
}
