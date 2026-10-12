import Link from "next/link";
import { ArrowRight, Gem, MapPin, Scissors, Shirt, Sparkles } from "lucide-react";

import { PageContainer } from "@/components/layout";
import { buttonVariants } from "@/components/ui";
import type { RentalBusiness } from "@/domain/rental-business";
import type { RentalItem, RentalService } from "@/domain/rental-item";
import { FavoriteButton } from "@/features/favorites";
import { cn } from "@/lib/utils";
import { buildRentalWhatsAppUrl } from "../utils/whatsapp";

import { WhatsAppBrandIcon } from "./brand-icons";
import { RentalPrice } from "./rental-price";
import { RentalImageGallery } from "./rental-image-gallery";
import { RentalShareButton } from "./rental-share-button";

const serviceLabels: Record<RentalService, string> = {
  rental: "השכרה",
  alterations: "שינויים ותיקונים",
  custom_design: "עיצוב אישי",
  second_bridal_dress: "שמלה שנייה לכלה",
};

const serviceIcons = {
  rental: Shirt,
  alterations: Scissors,
  custom_design: Gem,
  second_bridal_dress: Sparkles,
} satisfies Record<RentalService, typeof Shirt>;

export function RentalDetail({ item, business }: { item: RentalItem; business: RentalBusiness | null }) {
  const contactDestination = item.contactUrl ?? business?.whatsappUrl;
  const contactUrl = contactDestination ? buildRentalWhatsAppUrl(contactDestination, item.slug) : undefined;
  const isTehilaManualRental = item.sourceId === "tehila-borkhov";

  return (
    <main className="bg-[#fffaf7]">
      <PageContainer className="pb-14 pt-3 sm:pb-24 sm:pt-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:gap-12">
          <section aria-label={`גלריית תמונות של ${item.title}`} className="relative">
            <div className="absolute inset-x-3 top-3 z-[1] flex items-center justify-between">
              <Link href={`/rentals/${item.type}`} aria-label={`חזרה לשמלות ${item.type === "bridal" ? "כלה" : "ערב"}`} className="inline-grid size-11 place-items-center rounded-full bg-white/92 text-foreground shadow-sm"><ArrowRight aria-hidden="true" className="size-5" /></Link>
              <div className="flex items-center gap-1.5">
                <FavoriteButton reference={{ entityType: "product", entityId: item.id }} entityLabel={item.title} className="border-0 bg-white/92 shadow-sm hover:bg-white" />
                <RentalShareButton title={item.title} />
              </div>
            </div>
            <RentalImageGallery images={item.images} title={item.title} />
          </section>

          <aside className="space-y-5 px-1 lg:sticky lg:top-24 lg:self-start lg:pt-8">
            <div><p className="mb-1 text-xs font-semibold text-primary">{item.type === "bridal" ? "שמלת כלה להשכרה" : "שמלת ערב להשכרה"}</p><h1 className="text-[2rem] font-normal leading-tight tracking-[-0.02em] [font-family:FrankRuehl,serif] sm:text-4xl">{item.title}</h1>{item.isDemo ? <p className="mt-1 text-xs text-muted">תוכן לדוגמה</p> : null}</div>
            <div><Link href={business ? `/rental-businesses/${business.slug}` : "/rentals"} className="text-sm font-semibold hover:text-primary">{item.businessName}</Link>{business?.ownerName ? <span className="text-sm text-muted"> · {business.ownerName}</span> : null}{item.location ? <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted"><MapPin aria-hidden="true" className="size-4" />{item.location}</p> : null}</div>
            <div className="border-y border-border/75 py-4"><RentalPrice price={item.price} priceRange={item.priceRange} currency={item.currency} prominent /></div>
            {item.sizeRange ? <p className="text-sm font-medium">מידות: <bdi dir="ltr">{item.sizeRange}</bdi></p> : null}
            {item.availabilityStatus === "date-coordination" ? <p className="rounded-[0.75rem] bg-surface-muted px-4 py-3 text-sm">זמינות בתיאום מול המשכירה ולפי תאריך</p> : null}
            <p className="text-sm leading-6 text-muted">{item.description}</p>
            <section aria-labelledby="rental-services">
              <h2 id="rental-services" className="sr-only">שירותים</h2>
              <ul className="grid grid-cols-4 gap-y-3">
                {item.services.map((service) => {
                  const Icon = serviceIcons[service];
                  return <li key={service} className="flex min-w-0 flex-col items-center gap-2 border-e border-border/70 px-1 py-2 text-center text-[0.68rem] leading-4 first:border-e-0 sm:text-xs"><Icon aria-hidden="true" className="size-5" strokeWidth={1.5} /><span>{serviceLabels[service]}</span></li>;
                })}
              </ul>
            </section>
            {contactUrl ? (
              <a href={contactUrl} target="_blank" rel="noopener noreferrer" aria-label={`יצירת קשר בוואטסאפ לגבי ${item.title} — נפתח בחלון חדש`} className={cn(buttonVariants({ size: "lg" }), "w-full rounded-full border-foreground bg-foreground text-white hover:bg-foreground/90")}><WhatsAppBrandIcon aria-hidden="true" className="size-5 text-[#25D366]" />יצירת קשר בוואטסאפ</a>
            ) : (
              <div><button type="button" disabled className="inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-white opacity-45"><WhatsAppBrandIcon aria-hidden="true" className="size-5" />{isTehilaManualRental ? "לבדיקת זמינות והשכרה" : "יצירת קשר"}</button><p className="mt-2 text-center text-xs text-muted">{isTehilaManualRental ? "פרטי קשר מאומתים עדיין אינם זמינים. ההשכרה מתבצעת ישירות מול תהילה בורכוב, ולא דרך FoundHer." : "פרטי קשר מאומתים עדיין אינם זמינים."}</p></div>
            )}
          </aside>
        </div>
      </PageContainer>
    </main>
  );
}
