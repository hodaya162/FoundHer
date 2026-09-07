import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";

import { PageContainer } from "@/components/layout";
import { buttonVariants } from "@/components/ui";
import type { RentalItem, RentalService } from "@/domain/rental-item";
import type { RentalBusiness } from "@/domain/rental-business";
import { FavoriteButton } from "@/features/favorites";
import { cn } from "@/lib/utils";

import { RentalPrice } from "./rental-price";

const serviceLabels: Record<RentalService, string> = {
  rental: "השכרה",
  alterations: "שינויים ותיקונים",
  custom_design: "עיצוב אישי",
  second_bridal_dress: "שמלה שנייה לכלה",
};

export function RentalDetail({ item, business }: { item: RentalItem; business: RentalBusiness | null }) {
  const contactUrl = item.contactUrl ?? business?.whatsappUrl;
  return (
    <main>
      <PageContainer className="pb-16 pt-3 sm:pb-24 sm:pt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Link href={`/rentals/${item.type}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-foreground"><ArrowRight aria-hidden="true" className="size-4" />חזרה לשמלות {item.type === "bridal" ? "כלה" : "ערב"}</Link>
          <FavoriteButton reference={{ entityType: "product", entityId: item.id }} entityLabel={item.title} />
        </div>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:gap-12">
          <section aria-label={`גלריית תמונות של ${item.title}`} className="grid gap-2 sm:grid-cols-2">
            {item.images.map((image, index) => <figure key={image.id} className={cn("relative aspect-[3/4] overflow-hidden rounded-[1rem] bg-surface-muted", index === 0 && item.images.length > 1 && "sm:col-span-2 sm:aspect-[5/4]")}><Image src={image.url} alt={image.alt} fill priority={index === 0} sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover" /></figure>)}
          </section>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div><p className="type-label mb-2 text-primary">{item.type === "bridal" ? "שמלת כלה להשכרה" : "שמלת ערב להשכרה"}</p><h1 className="font-serif text-4xl font-medium leading-tight tracking-[-0.035em] sm:text-5xl">{item.title}</h1>{item.isDemo ? <p className="mt-2 text-xs text-muted">תוכן לדוגמה</p> : null}</div>
            <div className="border-y border-border py-5"><RentalPrice price={item.price} priceRange={item.priceRange} currency={item.currency} prominent /></div>
            <div><Link href={business ? `/rental-businesses/${business.slug}` : "/rentals"} className="text-lg font-semibold hover:text-primary">{item.businessName}</Link>{business?.ownerName ? <p className="mt-0.5 text-sm text-muted">{business.ownerName}</p> : null}<p className="mt-2 flex items-center gap-2 text-sm text-muted"><MapPin aria-hidden="true" className="size-4" />{item.location}</p></div>
            <p className="type-body text-muted">{item.description}</p>
            <section aria-labelledby="rental-services"><h2 id="rental-services" className="mb-3 text-sm font-semibold">שירותים</h2><ul className="flex flex-wrap gap-2">{item.services.map((service) => <li key={service} className="rounded-full border border-border bg-surface px-3 py-2 text-xs">{serviceLabels[service]}</li>)}</ul></section>
            {contactUrl ? <a href={contactUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "lg" }), "w-full")}><MessageCircle aria-hidden="true" className="size-4" />יצירת קשר בוואטסאפ</a> : <div><button type="button" disabled className={cn(buttonVariants({ size: "lg" }), "w-full")}><MessageCircle aria-hidden="true" className="size-4" />יצירת קשר</button><p className="mt-2 text-center text-xs text-muted">פרטי קשר מאומתים עדיין אינם זמינים.</p></div>}
          </aside>
        </div>
      </PageContainer>
    </main>
  );
}
