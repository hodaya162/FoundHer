import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PageContainer } from "@/components/layout";
import { createCanonicalUrl } from "@/config/site-url";

export const metadata: Metadata = {
  title: "השכרות",
  description: "שמלות מיוחדות לרגעים בלתי נשכחים — בחרי שמלות כלה או שמלות ערב.",
  alternates: { canonical: createCanonicalUrl("/rentals") },
};

const intents = [
  { href: "/rentals/bridal", title: "שמלות כלה", subtitle: "קלאסיות, מודרניות ומיוחדות", cta: "לכל שמלות הכלה", image: "/images/products/classic-bridal-gown.jpg", alt: "שמלת כלה לבנה עם שרוולים ארוכים", imagePosition: "object-center" },
  { href: "/rentals/evening", title: "שמלות ערב", subtitle: "לאירועים שמגיעים לך", cta: "לכל שמלות הערב", image: "/images/products/velvet-evening-dress.jpg", alt: "שמלת ערב שחורה ארוכה עם שרוולים", imagePosition: "object-top" },
] as const;

export default function RentalsPage() {
  return (
    <main className="bg-[#fffaf7]">
      <PageContainer className="pb-7 pt-6 sm:pb-20 sm:pt-10">
        <header className="mb-5 text-center sm:mb-8">
          <h1 className="font-serif text-[2rem] font-medium leading-tight tracking-[-0.035em] sm:text-5xl">השכרות</h1>
          <p className="mt-1.5 text-sm text-muted sm:text-base">שמלות מיוחדות לרגעים בלתי נשכחים</p>
        </header>
        <section aria-label="בחירת סוג השכרה" className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-5">
          {intents.map((intent, index) => (
            <Link key={intent.href} href={intent.href} className="group relative isolate min-h-[17.5rem] overflow-hidden rounded-[0.85rem] bg-foreground text-white shadow-sm sm:min-h-[32rem] sm:rounded-[1.1rem]">
              <Image src={intent.image} alt={intent.alt} fill priority={index === 0} sizes="(max-width: 639px) calc(100vw - 32px), 50vw" className={`${intent.imagePosition} object-cover transition-transform duration-700 group-hover:scale-[1.025]`} />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />
              <span className="absolute inset-x-0 bottom-0 flex items-end p-5 sm:p-7">
                <span>
                  <span className="block font-serif text-[1.65rem] font-medium leading-tight sm:text-4xl">{intent.title}</span>
                  <span className="mt-1 block text-sm text-white/85">{intent.subtitle}</span>
                  <span className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-[#f2d7d7] px-5 text-sm font-semibold text-foreground shadow-sm">{intent.cta}<ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" /></span>
                </span>
              </span>
            </Link>
          ))}
        </section>
      </PageContainer>
    </main>
  );
}
