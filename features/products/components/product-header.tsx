import type { ProductType } from "@/domain/product";

import { ProductBadge } from "./product-badge";

export type ProductHeaderProps = {
  name: string;
  sellerName: string;
  type: ProductType;
};

export function ProductHeader({ name, sellerName, type }: ProductHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <ProductBadge type={type} />
        <p className="type-label text-primary">{sellerName}</p>
      </div>
      <h1 className="type-page-title">{name}</h1>
    </header>
  );
}
