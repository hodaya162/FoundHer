import type { Metadata } from "next";
import { createCanonicalUrl } from "@/config/site-url";
import { RentalBrowsePage } from "@/features/rentals/components/rental-browse-page";
export const metadata: Metadata = { title: "שמלות ערב להשכרה", description: "שמלות ערב צנועות להשכרה ב־FoundHer.", alternates: { canonical: createCanonicalUrl("/rentals/evening") } };
export default function EveningRentalsPage() { return <RentalBrowsePage type="evening" />; }
