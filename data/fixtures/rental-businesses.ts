import type { RentalBusiness } from "@/domain/rental-business";

export const rentalBusinesses = [
  {
    id: "rental-business-laelle",
    slug: "laelle-rental",
    name: "Laelle Rental",
    description: "סטודיו להשכרת שמלות ערב צנועות בקווים רומנטיים ומודרניים.",
    city: "ירושלים",
    logo: { id: "laelle-logo", url: "/images/products/velvet-evening-dress.jpg", alt: "לוגו זמני של Laelle Rental" },
    coverImage: { id: "laelle-cover", url: "/images/products/modern-romance-dress.jpg", alt: "גלריית שמלות הערב של Laelle Rental" },
    gallery: [
      { id: "laelle-gallery-one", url: "/images/products/velvet-evening-dress.jpg", alt: "שמלת ערב צנועה בגוון קטיפה" },
      { id: "laelle-gallery-two", url: "/images/products/soft-satin-evening-dress.jpg", alt: "שמלת ערב ארוכה להשכרה" },
    ],
    whatsappUrl: "https://wa.me/15555550101?text=FoundHer%20fixture%20availability",
    instagramUrl: "https://www.instagram.com/example.laelle.rental",
    featured: true,
  },
  {
    id: "rental-business-maison-noura",
    slug: "maison-noura",
    name: "Maison Noura",
    description: "בית להשכרת שמלות כלה וערב צנועות בהתאמה אישית.",
    city: "בני ברק",
    logo: { id: "maison-noura-logo", url: "/images/products/classic-bridal-gown.jpg", alt: "לוגו זמני של Maison Noura" },
    coverImage: { id: "maison-noura-cover", url: "/images/products/lace-bridal-gown.jpg", alt: "קולקציית הכלות הצנועה של Maison Noura" },
    gallery: [
      { id: "maison-gallery-one", url: "/images/products/classic-bridal-gown.jpg", alt: "שמלת כלה צנועה להשכרה" },
      { id: "maison-gallery-two", url: "/images/products/garden-event-dress.jpg", alt: "שמלת ערב מחויטת של Maison Noura" },
    ],
    websiteUrl: "https://example.com/rental-businesses/maison-noura",
    whatsappUrl: "https://wa.me/15555550102?text=FoundHer%20fixture%20booking",
    featured: true,
  },
] as const satisfies readonly RentalBusiness[];
