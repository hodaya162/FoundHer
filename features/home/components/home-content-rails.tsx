import Image from "next/image";
import Link from "next/link";

import type { Look } from "@/domain/look";
import { LookSaveButton } from "@/features/looks/components";
import { ProductFavoriteButton } from "@/features/products/components/product-favorite-button";
import type { PurchaseProductCard } from "@/features/products/types/product-card";
import { formatProductPrice } from "@/features/products/utils/format-product-price";
import type { RentalCardModel } from "@/features/rentals/types/rental-card";

import { HomeSection } from "./home-section";

const railClass = "hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0";

export function ProductsRail({ products }: { products: readonly PurchaseProductCard[] }) {
  if (products.length === 0) return null;
  return (
    <HomeSection title="חדש בשבילך" id="home-products-title" href="/discover">
      <div className={railClass}>
        {products.map((product, index) => (
          <article key={product.id} className="w-[42%] max-w-[12rem] shrink-0 snap-start sm:w-48">
            <div className="relative overflow-hidden rounded-card bg-surface-muted">
              <Link href={`/products/${product.slug}`} aria-label={`צפייה בפריט ${product.name}`} className="group block">
                <div className="relative aspect-[3/4]">
                  <Image src={product.image.url} alt={product.image.alt} fill loading={index < 2 ? "eager" : "lazy"} sizes="(max-width: 639px) 42vw, 192px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
              </Link>
              <ProductFavoriteButton productId={product.id} productName={product.name} className="absolute end-2 top-2 border-0 bg-white/92 shadow-sm" />
            </div>
            <div className="pt-2.5">
              <p className="truncate text-[0.68rem] text-muted" dir="auto">{product.sellerName}</p>
              <h3 className="mt-0.5 line-clamp-1 text-sm font-semibold"><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
              <p className="mt-1 text-sm font-semibold">{formatProductPrice(product.price, product.currency)}</p>
            </div>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}

export function LooksRail({ looks }: { looks: readonly Look[] }) {
  if (looks.length === 0) return null;
  return (
    <HomeSection title="לוקים ששווה לשמור" id="home-looks-title" href="/looks">
      <div className={railClass}>
        {looks.map((look) => (
          <article key={look.id} className="w-[68%] max-w-[19rem] shrink-0 snap-start sm:w-72">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-muted">
              <Link href={`/looks/${look.slug}`} aria-label={`פתיחת הלוק ${look.title}`} className="group relative block h-full">
                <Image src={look.coverImage.url} alt={look.coverImage.alt} fill sizes="(max-width: 639px) 68vw, 288px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <h3 className="absolute inset-x-4 bottom-4 line-clamp-2 text-lg font-semibold text-white">{look.title}</h3>
              </Link>
              <LookSaveButton lookId={look.id} lookTitle={look.title} className="absolute end-2.5 top-2.5 border-0 bg-white/92 shadow-sm" />
            </div>
          </article>
        ))}
      </div>
    </HomeSection>
  );
}

export function RentalsRail({ products }: { products: readonly RentalCardModel[] }) {
  if (products.length === 0) return null;
  return (
    <HomeSection title="להשכרה עכשיו" id="home-rentals-title" href="/rentals">
      <div className={railClass}>
        {products.map((product) => {
          const image = product.images[0];
          return (
            <article key={product.id} className="w-[42%] max-w-[12rem] shrink-0 snap-start sm:w-48">
              <div className="relative overflow-hidden rounded-card bg-surface-muted">
                <Link href={`/products/${product.slug}`} aria-label={`צפייה בהשכרה ${product.name}`} className="group block">
                  <div className="relative aspect-[3/4]">
                    {image ? <Image src={image.url} alt={image.alt} fill sizes="(max-width: 639px) 42vw, 192px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" /> : null}
                  </div>
                </Link>
                <ProductFavoriteButton productId={product.id} productName={product.name} className="absolute end-2 top-2 border-0 bg-white/92 shadow-sm" />
              </div>
              <div className="pt-2.5">
                <h3 className="line-clamp-1 text-sm font-semibold"><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
                <p className="mt-1 text-sm font-semibold">{formatProductPrice(product.rentalPrice, product.currency)} <span className="text-[0.65rem] font-normal text-muted">להשכרה</span></p>
                {product.rentalBusiness?.isDemo ? <p className="mt-1 text-[0.62rem] text-muted">תוכן לדוגמה</p> : null}
              </div>
            </article>
          );
        })}
      </div>
    </HomeSection>
  );
}
