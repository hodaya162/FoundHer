import type { RentalBusiness } from "@/domain/rental-business";

export const rentalBusinesses = [
  {
    id: "rental-business-laelle",
    slug: "laelle-rental",
    name: "Laelle Rental",
    description: "סטודיו להשכרת שמלות ערב צנועות בקווים רומנטיים ומודרניים.",
    city: "ירושלים",
    logo: { id: "laelle-logo", url: "https://images.pexels.com/photos/18239440/pexels-photo-18239440.jpeg?auto=compress&cs=tinysrgb&w=300", alt: "לוגו זמני של Laelle Rental" },
    coverImage: { id: "laelle-cover", url: "https://images.pexels.com/photos/18239440/pexels-photo-18239440.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "גלריית שמלות הערב של Laelle Rental" },
    gallery: [
      { id: "laelle-gallery-one", url: "https://images.pexels.com/photos/18239440/pexels-photo-18239440.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "שמלת ערב צנועה בגוון קטיפה" },
      { id: "laelle-gallery-two", url: "https://images.pexels.com/photos/33869499/pexels-photo-33869499.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "שמלת ערב ארוכה להשכרה" },
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
    logo: { id: "maison-noura-logo", url: "https://images.pexels.com/photos/35324628/pexels-photo-35324628.jpeg?auto=compress&cs=tinysrgb&w=300", alt: "לוגו זמני של Maison Noura" },
    coverImage: { id: "maison-noura-cover", url: "https://images.pexels.com/photos/35324628/pexels-photo-35324628.jpeg?auto=compress&cs=tinysrgb&w=1400", alt: "קולקציית הכלות הצנועה של Maison Noura" },
    gallery: [
      { id: "maison-gallery-one", url: "https://images.pexels.com/photos/35324628/pexels-photo-35324628.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "שמלת כלה צנועה להשכרה" },
      { id: "maison-gallery-two", url: "https://images.pexels.com/photos/17299354/pexels-photo-17299354.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "שמלת ערב מחויטת של Maison Noura" },
    ],
    websiteUrl: "https://example.com/rental-businesses/maison-noura",
    whatsappUrl: "https://wa.me/15555550102?text=FoundHer%20fixture%20booking",
    featured: true,
  },
] as const satisfies readonly RentalBusiness[];
