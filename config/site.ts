export const siteConfig = {
  name: "FoundHer",
  tagline: "אופנה צנועה, במקום אחד",
  footerTagline: "אופנה צנועה, שמצאה אותך.",
  description: "גלי אופנה יהודית צנועה, לוקים מעוררי השראה, מותגים נבחרים ושמלות להשכרה.",
  defaultLocale: "he",
  direction: "rtl",
} as const;

export type SiteConfig = typeof siteConfig;
