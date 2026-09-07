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
    <main>
      <PageContainer className="pb-10 pt-7 sm:pb-20 sm:pt-10">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="type-page-title">השכרות</h1>
          <p className="type-body mt-2 text-muted">שמלות מיוחדות לרגעים בלתי נשכחים</p>
        </header>
        <section aria-label="בחירת סוג השכרה" className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 sm:gap-5">
          {intents.map((intent, index) => (
            <Link key={intent.href} href={intent.href} className="group relative isolate min-h-[17.25rem] overflow-hidden rounded-[1.15rem] bg-foreground text-white shadow-sm sm:min-h-[32rem]">
              <Image src={intent.image} alt={intent.alt} fill priority={index === 0} sizes="(max-width: 639px) calc(100vw - 32px), 50vw" className={`${intent.imagePosition} object-cover transition-transform duration-700 group-hover:scale-[1.025]`} />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/12 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end p-5 sm:p-7">
                <span>
                  <span className="block font-serif text-[1.7rem] font-medium leading-tight sm:text-4xl">{intent.title}</span>
                  <span className="mt-1 block text-sm text-white/80">{intent.subtitle}</span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">{intent.cta}<ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-1" /></span>
                </span>
              </span>
            </Link>
          ))}
        </section>
      </PageContainer>
    </main>
  );
}
