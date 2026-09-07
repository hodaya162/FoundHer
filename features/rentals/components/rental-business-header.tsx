import Image from "next/image";
import { ExternalLink, Globe, Instagram, MapPin, MessageCircle } from "lucide-react";

import { Badge, buttonVariants } from "@/components/ui";
import type { RentalBusiness } from "@/domain/rental-business";
import { cn } from "@/lib/utils";

type RentalBusinessHeaderProps = {
  business: RentalBusiness;
};

export function RentalBusinessHeader({ business }: RentalBusinessHeaderProps) {
  const actions = [
    business.whatsappUrl
      ? { href: business.whatsappUrl, label: "WhatsApp", icon: MessageCircle }
      : null,
    business.instagramUrl
      ? { href: business.instagramUrl, label: "Instagram", icon: Instagram }
      : null,
    business.websiteUrl
      ? { href: business.websiteUrl, label: "אתר", icon: Globe }
      : null,
  ].filter((action): action is NonNullable<typeof action> => action !== null);

  return (
    <header className="pb-10 sm:pb-14">
      <div className="relative -mx-4 aspect-[4/3] overflow-hidden bg-surface-muted sm:mx-0 sm:aspect-[16/7] sm:rounded-card">
        <Image
          src={business.coverImage.url}
          alt={business.coverImage.alt}
          fill
          priority
          sizes="(max-width: 1023px) 100vw, 1200px"
          className="object-cover"
        />
      </div>
      <div className="relative pt-5 sm:px-4 sm:pt-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-surface-muted sm:size-20">
            <Image src={business.logo.url} alt={business.logo.alt} fill sizes="96px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <p className="type-label text-primary">עסק להשכרת שמלות</p>
              {business.isDemo ? <Badge>תוכן לדוגמה</Badge> : null}
            </div>
            <h1 className="type-page-title">{business.name}</h1>
            {business.ownerName ? <p className="mt-1 text-sm font-medium">{business.ownerName}</p> : null}
            <p className="type-body mt-2 max-w-2xl text-muted">{business.description}</p>
            <p className="type-body-small mt-3 flex items-center gap-2 text-muted">
              <MapPin aria-hidden="true" className="size-4" />
              {business.city}
            </p>
            {business.isDemo ? (
              <p className="type-caption mt-3">העסק מוצג להמחשת המוצר בלבד; פרטי קשר לא יוצגו עד שיאומתו.</p>
            ) : null}
            {business.bridalPriceRange || business.eveningPriceRange ? (
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {business.bridalPriceRange ? <p><span className="text-muted">כלה: </span><strong>₪{business.bridalPriceRange.min.toLocaleString("he-IL")}–{business.bridalPriceRange.max.toLocaleString("he-IL")}</strong></p> : null}
                {business.eveningPriceRange ? <p><span className="text-muted">ערב: </span><strong>₪{business.eveningPriceRange.min.toLocaleString("he-IL")}–{business.eveningPriceRange.max.toLocaleString("he-IL")}</strong></p> : null}
              </div>
            ) : null}
          </div>
        </div>
        {actions.length > 0 ? (
          <nav aria-label={`יצירת קשר עם ${business.name}`} className="mt-5 flex flex-wrap gap-2">
            {actions.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} של ${business.name} — נפתח בחלון חדש`}
                className={cn(buttonVariants({ variant: "secondary" }), "min-w-28")}
              >
                <Icon aria-hidden="true" className="size-4" />
                {label}
                <ExternalLink aria-hidden="true" className="size-3.5" />
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
