import type { Brand } from "@/domain/brand";

export type ProductBrandProps = {
  brand: Brand | null;
};

export function ProductBrand({ brand }: ProductBrandProps) {
  if (!brand) {
    return <p className="type-body-small text-muted">פרטי המותג אינם זמינים כרגע.</p>;
  }

  return (
    <div className="space-y-1">
      <p className="font-semibold">{brand.name}</p>
      <p className="type-body-small text-muted">{brand.description}</p>
    </div>
  );
}
