import type { LookPaletteColor } from "../types/look-lab";

export function LookPalette({ colors }: { colors: readonly LookPaletteColor[] }) {
  return (
    <div aria-label={`פלטת צבעים: ${colors.map(({ name }) => name).join(", ")}`} className="mt-3 flex items-center gap-2">
      {colors.map((color) => (
        <span
          key={`${color.name}-${color.hex}`}
          aria-hidden
          title={color.name}
          className="size-5 rounded-full border border-black/10 shadow-[0_1px_2px_rgba(32,24,21,0.08)]"
          style={{ backgroundColor: color.hex }}
        />
      ))}
    </div>
  );
}
