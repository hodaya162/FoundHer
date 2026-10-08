import type { LookCardModel } from "../types/look-card";
import { EditorialLookCard } from "./editorial-look-card";

type Props = { models: readonly LookCardModel[] };

export function EditorialLookFeed({ models }: Props) {
  const [featured, ...compact] = models;

  return (
    <div className="space-y-7 pb-4">
      {featured ? <EditorialLookCard model={featured} size="featured" priority /> : null}
      {compact.length > 0 ? (
        <div className="grid grid-cols-2 items-start gap-x-3 gap-y-7">
          {compact.map((model) => <EditorialLookCard key={model.look.id} model={model} size="compact" />)}
        </div>
      ) : null}
    </div>
  );
}
