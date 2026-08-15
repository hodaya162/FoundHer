import { Badge } from "@/components/ui";
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
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-semibold">{brand.name}</p>
        {brand.isDemo ? <Badge>תוכן לדוגמה</Badge> : null}
      </div>
      <p className="type-body-small text-muted">{brand.description}</p>
      {brand.isDemo ? <p className="type-caption">המותג והפריטים מוצגים להמחשת המוצר בלבד.</p> : null}
    </div>
  );
}
