import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer } from "@/components/layout";
import type { RentalType } from "@/domain/rental-item";

import { getRentalCards } from "../queries/get-rental-cards";
import { RentalBrowse } from "./rental-browse";

export function RentalBrowsePage({ type }: { type: RentalType }) {
  const bridal = type === "bridal";
  return <main className={bridal ? "bg-[#fffdfa]" : "bg-[#fbf7f5]"}><PageContainer className="pb-14 pt-5 sm:pb-24 sm:pt-8"><Link href="/rentals" className="mb-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-foreground"><ArrowRight aria-hidden="true" className="size-4" />חזרה להשכרות</Link><header className="mb-5 max-w-2xl border-b border-border/70 pb-5"><p className="type-label mb-1.5 text-primary">השכרות נבחרות</p><h1 className="font-serif text-[2.15rem] font-medium leading-tight tracking-[-0.03em] sm:text-5xl">{bridal ? "שמלות כלה" : "שמלות ערב"}</h1><p className="mt-2 text-sm leading-6 text-muted">{bridal ? "שמלות צנועות, רכות ומדויקות ליום שלך." : "שמלות עם נוכחות לערב מיוחד, בקו צעיר ומעודן."}</p></header><RentalBrowse items={getRentalCards(type)} type={type} /></PageContainer></main>;
}
