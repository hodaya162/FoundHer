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

const railClass = "hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:gap-3 sm:px-0";
const homeFavoriteClass = "absolute end-0.5 top-0.5 z-[var(--z-base)] size-11 min-h-11 min-w-11 border-0 bg-transparent p-0 text-primary shadow-none before:absolute before:inset-[0.3rem] before:rounded-full before:border before:border-white/80 before:bg-white/88 before:backdrop-blur-sm before:transition-colors hover:bg-transparent hover:before:bg-white [&_svg]:relative [&_svg]:z-10 [&_svg]:size-[1.15rem]";

export function ProductsRail({ products }: { products: readonly PurchaseProductCard[] }) {
  if (products.length === 0) return null;
  return (
    <HomeSection title="חדש ומומלץ" id="home-products-title" href="/discover">
      <div className={railClass}>
        {products.map((product, index) => (
          <article key={product.id} className="w-[25%] max-w-[6.6rem] shrink-0 snap-start sm:w-40 sm:max-w-none">
            <div className="relative overflow-hidden rounded-card bg-surface-muted">
              <Link href={`/products/${product.slug}`} aria-label={`צפייה בפריט ${product.name}`} className="group block">
                <div className="relative aspect-[3/4]">
                  <Image src={product.image.url} alt={product.image.alt} fill loading={index < 2 ? "eager" : "lazy"} sizes="(max-width: 639px) 25vw, 160px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
              </Link>
              <ProductFavoriteButton productId={product.id} productName={product.name} className={homeFavoriteClass} />
            </div>
            <div className="pt-2">
              <h3 className="line-clamp-2 text-[0.72rem] font-semibold leading-4"><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
              <p className="mt-0.5 text-xs font-semibold">{formatProductPrice(product.price, product.currency)}</p>
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
    <HomeSection title="לוקים מומלצים" id="home-looks-title" href="/looks">
      <div className={railClass}>
        {looks.map((look) => (
          <article key={look.id} className="w-[27%] max-w-[7.25rem] shrink-0 snap-start sm:w-60 sm:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-surface-muted">
              <Link href={`/looks/${look.slug}`} aria-label={`פתיחת הלוק ${look.title}`} className="group relative block h-full">
                <Image src={look.coverImage.url} alt={look.coverImage.alt} fill sizes="(max-width: 639px) 27vw, 240px" className="object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                <h3 className="absolute inset-x-1.5 bottom-1.5 line-clamp-1 rounded-full bg-white/88 px-1.5 py-1 text-center text-[0.62rem] font-semibold leading-3 text-foreground backdrop-blur-sm">{occasionLabels[look.occasions[0]]}</h3>
              </Link>
              <LookSaveButton lookId={look.id} lookTitle={look.title} className={homeFavoriteClass} />
            </div>
          </article>
        ))}
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
        <Link href={`/products/${product.slug}`} aria-label={`צפייה בהשכרה ${product.name}`} className="group relative block aspect-[16/5.6] min-h-[7.25rem]">
          {image ? <Image src={image.url} alt={image.alt} fill sizes="(max-width: 639px) 100vw, 76rem" className="object-cover object-[center_18%] transition-transform duration-500 group-hover:scale-[1.02]" /> : null}
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-black/62 via-black/15 to-transparent" />
          <span className="absolute inset-y-0 start-0 flex w-[66%] flex-col justify-center p-3.5 text-white">
            <span className="text-[0.65rem] text-white/75">להשכרה</span>
            <span className="mt-0.5 text-base font-semibold">{product.name}</span>
            <span className="mt-1 text-sm font-semibold">{formatProductPrice(product.rentalPrice, product.currency)}</span>
            <span className="mt-0.5 text-[0.62rem] text-white/80">{product.rentalBusiness?.name ?? product.city} · {product.city}</span>
            {product.rentalBusiness?.isDemo ? <span className="mt-1 text-[0.62rem] text-white/70">תוכן לדוגמה</span> : null}
          </span>
        </Link>
        <ProductFavoriteButton productId={product.id} productName={product.name} className={`${homeFavoriteClass} text-[#d6a0aa]`} />
      </article>
    </HomeSection>
  );
}
