import type { LookCardModel } from "../types/look-card-model";
import { EditorialLookCard } from "./editorial-look-card";

export function EditorialLookGrid({ models }: { models: readonly LookCardModel[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" role="list" aria-label="לוקים">
      {models.map((model, index) => (
        <div key={model.look.id} role="listitem">
          <EditorialLookCard model={model} priority={index < 2} />
        </div>
      ))}
    </div>
  );
}
