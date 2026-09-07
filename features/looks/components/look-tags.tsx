import { Badge } from "@/components/ui";
import type { Look } from "@/domain/look";
import { cn } from "@/lib/utils";

import { occasionAccentClasses, occasionLabels, seasonLabels, styleLabels } from "../utils/look-labels";

type LookTagsProps = { look: Look; compact?: boolean; className?: string };

export function LookTags({ className, compact = false, look }: LookTagsProps) {
  const occasion = look.occasions[0];
  const season = look.seasonTags[0];
  const style = look.styleTags[0];

  return (
    <div className={cn("flex flex-wrap gap-2", className)} aria-label="מאפייני הלוק">
      {occasion ? <Badge className={occasionAccentClasses[occasion]}>{occasionLabels[occasion]}</Badge> : null}
      {!compact && season ? <Badge>{seasonLabels[season]}</Badge> : null}
      {!compact && style ? <Badge>{styleLabels[style]}</Badge> : null}
    </div>
  );
}
