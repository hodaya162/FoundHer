import Image from "next/image";
import { ExternalLink } from "lucide-react";

import type { CatalogProduct } from "@/domain/catalog";
import { ProductFavoriteButton, ProductPrice } from "@/features/products/components";

type Props = { readonly products: readonly CatalogProduct[] };

export function CatalogProductReviewGrid({ products }: Props) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5">
      {products.map((product) => {
        const image = product.images[0];
        const actionLabel = product.contactChannel === "instagram" ? "לפרטים ב־Instagram" : "לפרטים אצל המותג";
        return (
          <li key={product.id}>
            <article className="min-w-0">
              <div className="relative aspect-[2/3] overflow-hidden rounded-[1.15rem] border border-[#eadfda]/70 bg-[#f7efea]">
                {image ? (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 639px) 46vw, 14rem"
                    className="object-contain"
                  />
                ) : null}
                <ProductFavoriteButton productId={product.id} productName={product.title} />
              </div>
              <div className="space-y-1 px-0.5 pt-3">
                <p className="type-caption">{product.brand}</p>
                <h2 className="text-sm font-semibold leading-snug">{product.title}</h2>
                {product.price !== undefined ? <ProductPrice amount={product.price} currency={product.currency} /> : null}
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="type-label inline-flex items-center gap-1.5 pt-1 text-primary"
                >
                  {actionLabel}
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
