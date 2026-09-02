import Link from "next/link";

import { Card, CardContent } from "@/components/ui";

import type { ProductCardModel } from "../types/product-card";
import { ProductBadge } from "./product-badge";
import { ProductFavoriteButton } from "./product-favorite-button";
import { ProductImage } from "./product-image";
import { ProductCardMeta } from "./product-card-meta";
import { ProductPrice } from "./product-price";
import { ProductTitle } from "./product-title";

export type ProductCardProps = {
  product: ProductCardModel;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const isPurchase = product.type === "purchase";

  return (
    <article className="h-full">
      <Card className="flex h-full flex-col overflow-hidden bg-transparent">
        <div className="relative">
          <Link href={href} className="group/image block" aria-label={`צפייה בפריט ${product.name}`}>
            <ProductImage image={product.image} priority={priority} />
          </Link>
          {!isPurchase ? (
            <div className="absolute start-3 top-3">
              <ProductBadge type={product.type} />
            </div>
          ) : null}
          <ProductFavoriteButton productId={product.id} productName={product.name} />
        </div>

        <CardContent className="flex flex-1 flex-col gap-1.5 px-0 pb-2 pt-3">
          <ProductCardMeta
            sellerName={product.sellerName}
            detail={isPurchase ? "לרכישה" : product.city}
          />
          <ProductTitle href={href} name={product.name} />
          {isPurchase ? (
            <ProductPrice amount={product.price} currency={product.currency} />
          ) : (
            <ProductPrice amount={product.rentalPrice} currency={product.currency} rental />
          )}
        </CardContent>
      </Card>
    </article>
  );
}
