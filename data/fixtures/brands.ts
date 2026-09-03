import type { Brand } from "@/domain/brand";

export const brands = [
  {
    id: "brand-esti-belle",
    slug: "esti-belle",
    name: "Brand A",
    description: "בית אופנה ישראלי לשמלות צנועות בגזרות נשיות ורכות.",
    logo: { id: "esti-belle-logo", url: "/images/products/embroidered-maxi-detail.jpg", alt: "סמל זמני של Brand A" },
    coverImage: { id: "esti-belle-cover", url: "/images/products/embroidered-maxi-dress.jpg", alt: "קולקציית שמלות צנועות לדוגמה של Brand A" },
    isDemo: true,
    featured: true,
  },
  {
    id: "brand-lidor-bar",
    slug: "lidor-bar",
    name: "Brand B",
    description: "פריטים צנועים מודרניים בצבעוניות שקטה ובגזרות מדויקות.",
    logo: { id: "lidor-bar-logo", url: "/images/products/pleated-modest-dress.jpg", alt: "סמל זמני של Brand B" },
    coverImage: { id: "lidor-bar-cover", url: "/images/products/pleated-modest-dress.jpg", alt: "קולקציה צנועה לדוגמה של Brand B" },
    isDemo: true,
    featured: true,
  },
  {
    id: "brand-shosh-designs",
    slug: "shosh-designs",
    name: "Brand D",
    description: "שכבות, טקסטורות ופריטי בסיס לארון צנוע ורב-שימושי.",
    logo: { id: "shosh-designs-logo", url: "/images/products/layered-neutral-set.jpg", alt: "סמל זמני של Brand D" },
    coverImage: { id: "shosh-designs-cover", url: "/images/products/flowing-a-line-skirt.jpg", alt: "סט שכבות צנוע לדוגמה של Brand D" },
    isDemo: true,
    featured: false,
  },
  {
    id: "brand-naya-studio",
    slug: "naya-studio",
    name: "Brand C",
    description: "חייטות רכה ואלגנטיות מינימליסטית לנשים שאוהבות קווים נקיים.",
    logo: { id: "naya-studio-logo", url: "/images/products/soft-tailored-blouse.jpg", alt: "סמל זמני של Brand C" },
    coverImage: { id: "naya-studio-cover", url: "/images/products/tailored-midi-dress.jpg", alt: "שמלה מחויטת צנועה לדוגמה של Brand C" },
    isDemo: true,
    featured: true,
  },
] as const satisfies readonly Brand[];
