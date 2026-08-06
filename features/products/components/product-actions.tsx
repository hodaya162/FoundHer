import { ArrowUpLeft } from "lucide-react";

export type ProductActionsProps = {
  label: string;
};

export function ProductActions({ label }: ProductActionsProps) {
  return (
    <span className="type-label inline-flex items-center gap-2 text-primary">
      {label}
      <ArrowUpLeft aria-hidden="true" className="size-4" />
    </span>
  );
}
