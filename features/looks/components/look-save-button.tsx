import { FavoriteButton } from "@/features/favorites";

type LookSaveButtonProps = {
  lookId: string;
  lookTitle: string;
  className?: string;
};

export function LookSaveButton({ className, lookId, lookTitle }: LookSaveButtonProps) {
  return (
    <FavoriteButton
      reference={{ entityType: "look", entityId: lookId }}
      entityLabel={`הלוק ${lookTitle}`}
      className={className}
    />
  );
}
