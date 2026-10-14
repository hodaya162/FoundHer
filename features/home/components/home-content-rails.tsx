import Image from "next/image";
import Link from "next/link";

import type { Look } from "@/domain/look";
import { LookSaveButton } from "@/features/looks/components";
import { occasionLabels } from "@/features/looks/utils/look-labels";
import { ProductFavoriteButton } from "@/features/products/components/product-favorite-button";
import type { PurchaseProductCard } from "@/features/products/types/product-card";
import { formatProductPrice } from "@/features/products/utils/format-product-price";
import type { RentalCardModel } from "@/features/rentals/types/rental-card";

import { HomeSection } from "./home-section";

const railViewportClass = "hide-scrollbar -mx-4 snap-x snap-mandatory scroll-px-4 overflow-x-auto pb-1 sm:mx-0 sm:scroll-px-0";
const railTrackClass = "flex w-max min-w-full gap-2 px-4 sm:gap-3 sm:px-0";
const homeFavoriteClass = "absolute end-0 top-0 z-[var(--z-base)] size-11 min-h-11 min-w-11 border-0 bg-transparent p-0 text-primary shadow-none before:absolute before:end-1.5 before:top-1.5 before:size-7 before:rounded-full before:border before:border-white/80 before:bg-white/88 before:backdrop-blur-sm before:transition-colors hover:bg-transparent hover:before:bg-white [&_svg]:absolute [&_svg]:end-[0.8125rem] [&_svg]:top-[0.8125rem] [&_svg]:z-10 [&_svg]:size-3.5";

export function ProductsRail({ products }: { products: readonly PurchaseProductCard[] }) {
  if (products.length === 0) return null;
  return (
    <HomeSection title="חדש ומומלץ" id="home-products-title" href="/discover">
      <div className={railViewportClass}>
        <div className={railTrackClass}>
          {products.map((product, index) => (
            <article key={product.id} className="w-[43vw] max-w-[9.5rem] shrink-0 snap-start sm:w-40 sm:max-w-none">
              <div className="relative overflow-hidden rounded-card bg-surface-muted">
                <Link href={`/products/${product.slug}`} aria-label={`צפייה בפריט ${product.name}`} className="group block">
                  <div className="relative aspect-[3/4]">
                    <Image src={product.image.url} alt={product.image.alt} fill loading={index < 2 ? "eager" : "lazy"} sizes="(max-width: 639px) 43vw, 160px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                </Link>
                <ProductFavoriteButton productId={product.id} productName={product.name} className={homeFavoriteClass} />
              </div>
              <div className="pt-2">
                <h3 className="line-clamp-2 text-[0.82rem] font-semibold leading-[1.25]"><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
                <p className="mt-1 truncate text-[0.68rem] text-muted" dir="ltr">{product.sellerName}</p>
                <p className="mt-0.5 text-[0.82rem] font-semibold">{product.price === undefined ? "מחיר באתר" : formatProductPrice(product.price, product.currency)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}

export function LooksRail({ looks }: { looks: readonly Look[] }) {
  if (looks.length === 0) return null;
  return (
    <HomeSection title="לוקים מומלצים" id="home-looks-title" href="/looks">
      <div className={railViewportClass}>
        <div className={railTrackClass}>
          {looks.map((look) => (
            <article key={look.id} className="w-[43vw] max-w-[9.75rem] shrink-0 snap-start sm:w-60 sm:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-muted">
                <Link href={`/looks/${look.slug}`} aria-label={`פתיחת הלוק ${look.title}`} className="group relative block h-full">
                  <Image src={look.coverImage.url} alt={look.coverImage.alt} fill sizes="(max-width: 639px) 43vw, 240px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <h3 className="absolute inset-x-2 bottom-2 line-clamp-1 rounded-full bg-white/88 px-2 py-1.5 text-center text-xs font-semibold leading-3 text-foreground backdrop-blur-sm">{occasionLabels[look.occasions[0]]}</h3>
                </Link>
                <LookSaveButton lookId={look.id} lookTitle={look.title} className={homeFavoriteClass} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}

export function RentalsRail({ products }: { products: readonly RentalCardModel[] }) {
  if (products.length === 0) return null;
  const product = products[0];
  const image = product.images[0];

  return (
    <HomeSection title="להשכרה עכשיו" id="home-rentals-title" href="/rentals">
      <article className="relative overflow-hidden rounded-card bg-surface-muted">
        <Link href={`/products/${product.slug}`} aria-label={`צפייה בהשכרה ${product.name}`} className="group relative block aspect-[16/6.6] min-h-36 sm:aspect-[16/5.6] sm:min-h-[7.25rem]">
          {image ? <Image src={image.url} alt={image.alt} fill sizes="(max-width: 639px) 100vw, 76rem" className="object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-[1.02]" /> : null}
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-black/62 via-black/15 to-transparent" />
          <span className="absolute inset-y-0 start-0 flex w-[68%] flex-col justify-center p-4 text-white sm:w-[66%] sm:p-3.5">
            <span className="text-xs text-white/75 sm:text-[0.65rem]">להשכרה</span>
            <span className="mt-1 text-lg font-semibold sm:text-base">{product.name}</span>
            <span className="mt-1 text-base font-semibold sm:text-sm">{formatProductPrice(product.rentalPrice, product.currency)}</span>
            <span className="mt-1 text-[0.7rem] text-white/80 sm:text-[0.62rem]">{product.rentalBusiness?.name ?? product.city} · {product.city}</span>
            {product.rentalBusiness?.isDemo ? <span className="mt-1 text-[0.68rem] text-white/70 sm:text-[0.62rem]">תוכן לדוגמה</span> : null}
          </span>
        </Link>
        <ProductFavoriteButton productId={product.id} productName={product.name} className={`${homeFavoriteClass} text-[#d6a0aa]`} />
      </article>
    </HomeSection>
  );
}
