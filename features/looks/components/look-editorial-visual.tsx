import Image from "next/image";

import type { Look } from "@/domain/look";
import { cn } from "@/lib/utils";

type Props = {
  look: Look;
  priority?: boolean;
  variant?: "card" | "detail";
};

export function LookEditorialVisual({ look, priority = false, variant = "card" }: Props) {
  const isDetail = variant === "detail";

  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden bg-[#f6efe7]", isDetail && "rounded-[1.5rem]")}>
      <Image
        src={look.editorialHeroImage.url}
        alt={look.editorialHeroImage.alt}
        fill
        priority={priority}
        sizes={isDetail ? "(max-width: 1023px) 100vw, 58vw" : "(max-width: 767px) 100vw, 33vw"}
        className="object-cover"
      />
      <span className="sr-only">הדמיה עריכתית לצורכי השראה; תמונות המוצרים המקוריות מופיעות בעמוד הלוק.</span>
    </div>
  );
}
