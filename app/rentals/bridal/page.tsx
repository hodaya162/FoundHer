import type { Metadata } from "next";
import { createCanonicalUrl } from "@/config/site-url";
import { RentalBrowsePage } from "@/features/rentals/components/rental-browse-page";
export const metadata: Metadata = { title: "שמלות כלה להשכרה", description: "שמלות כלה צנועות להשכרה ב־FoundHer.", alternates: { canonical: createCanonicalUrl("/rentals/bridal") } };
export default function BridalRentalsPage() { return <RentalBrowsePage type="bridal" />; }
