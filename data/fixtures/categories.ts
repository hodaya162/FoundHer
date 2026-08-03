import type { Category } from "@/domain/category";

export const categories = [
  {
    id: "category-dresses",
    slug: "dresses",
    name: "שמלות",
    description: "שמלות צנועות ליום, לשבת ולאירועים.",
    image: { id: "category-dresses-image", url: "https://images.pexels.com/photos/7048338/pexels-photo-7048338.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "שמלת מקסי צנועה בגוון ורוד" },
  },
  {
    id: "category-skirts",
    slug: "skirts",
    name: "חצאיות",
    description: "חצאיות ארוכות בגזרות נקיות ונוחות.",
    image: { id: "category-skirts-image", url: "https://images.pexels.com/photos/16512659/pexels-photo-16512659.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "חצאית ארוכה בגוון טבעי" },
  },
  {
    id: "category-tops",
    slug: "tops",
    name: "חולצות",
    description: "חולצות עם שרוולים מלאים וגזרות אלגנטיות.",
    image: { id: "category-tops-image", url: "https://images.pexels.com/photos/17299354/pexels-photo-17299354.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "חולצה צנועה מחויטת" },
  },
  {
    id: "category-evening-wear",
    slug: "evening-wear",
    name: "בגדי ערב",
    description: "שמלות ערב צנועות לרכישה ולהשכרה.",
    image: { id: "category-evening-image", url: "https://images.pexels.com/photos/18239440/pexels-photo-18239440.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "שמלת ערב צנועה בגוון עמוק" },
  },
  {
    id: "category-bridal-dresses",
    slug: "bridal-dresses",
    name: "שמלות כלה",
    description: "שמלות כלה צנועות בקווים רכים ועל-זמניים.",
    image: { id: "category-bridal-image", url: "https://images.pexels.com/photos/35324628/pexels-photo-35324628.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "שמלת כלה צנועה עם שרוולים ארוכים" },
  },
  {
    id: "category-headscarves",
    slug: "headscarves",
    name: "מטפחות",
    description: "מטפחות וכיסויי ראש להשלמת הלוק.",
    image: { id: "category-headscarves-image", url: "https://images.pexels.com/photos/33869499/pexels-photo-33869499.jpeg?auto=compress&cs=tinysrgb&w=900", alt: "מטפחת ראש אלגנטית בגוון בהיר" },
  },
] as const satisfies readonly Category[];
