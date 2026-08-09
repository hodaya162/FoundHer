import type { LookOccasion } from "@/domain/look";
import type { ImageAsset } from "@/domain/media";

import { homeOccasionLabels } from "./occasion-labels";

export type HomeOccasionEntry = {
  readonly occasion: LookOccasion;
  readonly label: string;
  readonly subtitle: string;
  readonly image: ImageAsset;
};

export const homeOccasions = [
  {
    occasion: "shabbat",
    label: homeOccasionLabels.shabbat,
    subtitle: "רך, חגיגי ונוח",
    image: { id: "home-shabbat", url: "/images/products/layered-neutral-set.jpg", alt: "לוק צנוע בגוונים טבעיים לשבת" },
  },
  {
    occasion: "work",
    label: homeOccasionLabels.work,
    subtitle: "מדויק ליום ארוך",
    image: { id: "home-work", url: "/images/products/tailored-midi-dress.jpg", alt: "שמלה צנועה מחויטת לעבודה" },
  },
  {
    occasion: "evening_event",
    label: homeOccasionLabels.evening_event,
    subtitle: "נוכחות אלגנטית",
    image: { id: "home-evening", url: "/images/products/velvet-evening-dress.jpg", alt: "שמלת ערב צנועה לאירוע" },
  },
  {
    occasion: "wedding_guest",
    label: homeOccasionLabels.wedding_guest,
    subtitle: "חגיגי בלי להתאמץ",
    image: { id: "home-wedding-guest", url: "/images/products/embroidered-maxi-dress.jpg", alt: "שמלת מקסי צנועה לאורחת בחתונה" },
  },
  {
    occasion: "everyday",
    label: homeOccasionLabels.everyday,
    subtitle: "פשוט להרגיש לבושה",
    image: { id: "home-everyday", url: "/images/products/pleated-modest-dress.jpg", alt: "שמלת קפלים צנועה ליום יום" },
  },
  {
    occasion: "vacation",
    label: homeOccasionLabels.vacation,
    subtitle: "קליל, נעים ורב־שימושי",
    image: { id: "home-vacation", url: "/images/products/flowing-a-line-skirt.jpg", alt: "חצאית נשפכת צנועה לחופשה" },
  },
  {
    occasion: "nursing",
    label: homeOccasionLabels.nursing,
    subtitle: "נוחות עם מחשבה",
    image: { id: "home-nursing", url: "/images/products/soft-tailored-blouse.jpg", alt: "חולצה צנועה ורכה המתאימה ללוק הנקה" },
  },
  {
    occasion: "holiday",
    label: homeOccasionLabels.holiday,
    subtitle: "להיכנס לחג בסטייל",
    image: { id: "home-holiday", url: "/images/products/classic-shabbat-dress.jpg", alt: "שמלה צנועה חגיגית לחג" },
  },
] as const satisfies readonly HomeOccasionEntry[];
