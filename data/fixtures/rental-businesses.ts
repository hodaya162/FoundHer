import type { RentalBusiness } from "@/domain/rental-business";

export const rentalBusinesses = [
  {
    id: "rental-business-laelle",
    slug: "rental-business-a",
    name: "Rental Business A",
    description: "סטודיו להשכרת שמלות ערב צנועות בקווים רומנטיים ומודרניים.",
    city: "ירושלים",
    logo: { id: "laelle-logo", url: "/images/products/velvet-evening-dress.jpg", alt: "סמל זמני של Rental Business A" },
    coverImage: { id: "laelle-cover", url: "/images/products/modern-romance-dress.jpg", alt: "גלריית שמלות ערב לדוגמה של Rental Business A" },
    gallery: [
      { id: "laelle-gallery-one", url: "/images/products/velvet-evening-dress.jpg", alt: "שמלת ערב צנועה בגוון קטיפה" },
      { id: "laelle-gallery-two", url: "/images/products/soft-satin-evening-dress.jpg", alt: "שמלת ערב ארוכה להשכרה" },
    ],
    isDemo: true,
    featured: true,
  },
  {
    id: "rental-business-maison-noura",
    slug: "rental-business-b",
    name: "Rental Business B",
    description: "בית להשכרת שמלות כלה וערב צנועות בהתאמה אישית.",
    city: "בני ברק",
    logo: { id: "maison-noura-logo", url: "/images/products/classic-bridal-gown.jpg", alt: "סמל זמני של Rental Business B" },
    coverImage: { id: "maison-noura-cover", url: "/images/products/lace-bridal-gown.jpg", alt: "קולקציית כלות צנועה לדוגמה של Rental Business B" },
    gallery: [
      { id: "maison-gallery-one", url: "/images/products/classic-bridal-gown.jpg", alt: "שמלת כלה צנועה להשכרה" },
      { id: "maison-gallery-two", url: "/images/products/garden-event-dress.jpg", alt: "שמלת ערב מחויטת לדוגמה של Rental Business B" },
    ],
    isDemo: true,
    featured: true,
  },
] as const satisfies readonly RentalBusiness[];
