import type { Category } from "@/domain/category";

export const categories = [
  {
    id: "category-dresses",
    slug: "dresses",
    name: "שמלות",
    description: "שמלות צנועות ליום, לשבת ולאירועים.",
    image: { id: "category-dresses-image", url: "/images/products/embroidered-maxi-dress.jpg", alt: "שמלת מקסי צנועה בגוון ורוד" },
  },
  {
    id: "category-skirts",
    slug: "skirts",
    name: "חצאיות",
    description: "חצאיות ארוכות בגזרות נקיות ונוחות.",
    image: { id: "category-skirts-image", url: "/images/products/flowing-a-line-skirt.jpg", alt: "חצאית ארוכה בגוון טבעי" },
  },
  {
    id: "category-tops",
    slug: "tops",
    name: "חולצות",
    description: "חולצות עם שרוולים מלאים וגזרות אלגנטיות.",
    image: { id: "category-tops-image", url: "/images/products/soft-tailored-blouse.jpg", alt: "חולצה צנועה מחויטת" },
  },
  {
    id: "category-evening-wear",
    slug: "evening-wear",
    name: "בגדי ערב",
    description: "שמלות ערב צנועות לרכישה ולהשכרה.",
    image: { id: "category-evening-image", url: "/images/products/velvet-evening-dress.jpg", alt: "שמלת ערב צנועה בגוון עמוק" },
  },
  {
    id: "category-bridal-dresses",
    slug: "bridal-dresses",
    name: "שמלות כלה",
    description: "שמלות כלה צנועות בקווים רכים ועל-זמניים.",
    image: { id: "category-bridal-image", url: "/images/products/classic-bridal-gown.jpg", alt: "שמלת כלה צנועה עם שרוולים ארוכים" },
  },
  {
    id: "category-headscarves",
    slug: "headscarves",
    name: "מטפחות",
    description: "מטפחות וכיסויי ראש להשלמת הלוק.",
    image: { id: "category-headscarves-image", url: "/images/products/satin-headscarf.jpg", alt: "מטפחת ראש אלגנטית בגוון בהיר" },
  },
] as const satisfies readonly Category[];
