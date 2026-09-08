import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout";
import type { RentalType } from "@/domain/rental-item";

import { getRentalCards } from "../queries/get-rental-cards";
import { RentalBrowse } from "./rental-browse";
import { RentalShareButton } from "./rental-share-button";

export function RentalBrowsePage({ type }: { type: RentalType }) {
  const bridal = type === "bridal";
  const hero = bridal
    ? { image: "/images/generated/rentals/editorial-bridal-bow-back.webp", alt: "השראה עריכתית לשמלת כלה עם פפיון", copy: "שמלות חלומיות להשכרה" }
    : { image: "/images/generated/rentals/editorial-evening-black.webp", alt: "השראה עריכתית לשמלת ערב שחורה", copy: "לאירועים שמגיעים לך" };

  return (
    <main className={bridal ? "bg-[#fffdfa]" : "bg-[#fbf7f5]"}>
      <PageContainer className="pb-4 pt-3 sm:pb-24 sm:pt-8">
        <header className="relative isolate min-h-[11rem] overflow-hidden rounded-[0.9rem] bg-foreground text-white sm:min-h-[17.5rem] sm:rounded-[1.1rem]">
          <Image src={hero.image} alt={hero.alt} fill priority sizes="(max-width: 767px) calc(100vw - 32px), 76rem" className={bridal ? "object-cover object-[center_35%]" : "object-cover object-[center_22%]"} />
          <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent" />
          <Link href="/rentals" aria-label="חזרה להשכרות" className="absolute end-3 top-3 inline-grid size-11 place-items-center rounded-full bg-white/90 text-foreground shadow-sm"><ArrowRight aria-hidden="true" className="size-5" /></Link>
          <div className="absolute start-3 top-3 z-[1] flex items-center gap-1.5">
            <RentalShareButton title={bridal ? "שמלות כלה להשכרה" : "שמלות ערב להשכרה"} />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7">
            <h1 className="text-[2.05rem] font-normal leading-tight tracking-[-0.02em] [font-family:FrankRuehl,serif] sm:text-5xl">{bridal ? "שמלות כלה" : "שמלות ערב"}</h1>
            <p className="mt-1 max-w-xs text-sm text-white/85 sm:text-base">{hero.copy}</p>
          </div>
        </header>
        <section className="relative z-[1] -mt-1 rounded-t-[1.1rem] bg-inherit pt-3 sm:-mt-5 sm:px-4 sm:pt-5">
          <RentalBrowse items={getRentalCards(type)} type={type} />
        </section>
      </PageContainer>
    </main>
  );
}
