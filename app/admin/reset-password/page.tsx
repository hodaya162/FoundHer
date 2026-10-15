import type { Metadata } from "next";

import { Button } from "@/components/ui";
import { requireCatalogAdmin } from "@/lib/auth/catalog-admin";
import { MINIMUM_ADMIN_PASSWORD_LENGTH } from "@/lib/auth/password-policy";

import { updateAdminPassword } from "./actions";

export const metadata: Metadata = { title: "בחירת סיסמה חדשה", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const errorMessages: Record<string, string> = {
  missing: "יש להזין סיסמה חדשה פעמיים.",
  mismatch: "הסיסמאות אינן תואמות.",
  too_short: `הסיסמה חייבת להכיל לפחות ${MINIMUM_ADMIN_PASSWORD_LENGTH} תווים.`,
  update_failed: "לא ניתן היה לעדכן את הסיסמה. ייתכן שקישור האיפוס פג תוקף.",
  config: "שירות האימות עדיין אינו מוגדר במלואו.",
};

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireCatalogAdmin();
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70dvh] w-[min(100%_-_2rem,28rem)] items-center py-12" dir="rtl">
      <section className="w-full rounded-card border border-border bg-surface p-6 shadow-sm sm:p-8" aria-labelledby="reset-password-title">
        <p className="type-label text-primary">FoundHer Admin</p>
        <h1 id="reset-password-title" className="type-section-title mt-2">בחירת סיסמה חדשה</h1>
        <p className="type-body-small mt-3 text-muted">
          בחרי סיסמה חדשה בת {MINIMUM_ADMIN_PASSWORD_LENGTH} תווים לפחות. לאחר העדכון תתבקשי להתחבר מחדש.
        </p>
        {error ? (
          <p role="alert" className="mt-5 rounded-button bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessages[error] ?? "לא ניתן להשלים את עדכון הסיסמה."}
          </p>
        ) : null}
        <form action={updateAdminPassword} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">
            סיסמה חדשה
            <input name="password" type="password" autoComplete="new-password" minLength={MINIMUM_ADMIN_PASSWORD_LENGTH} required className="mt-2 min-h-12 w-full rounded-button border border-input bg-background px-4" />
          </label>
          <label className="block text-sm font-semibold">
            אימות הסיסמה
            <input name="passwordConfirmation" type="password" autoComplete="new-password" minLength={MINIMUM_ADMIN_PASSWORD_LENGTH} required className="mt-2 min-h-12 w-full rounded-button border border-input bg-background px-4" />
          </label>
          <Button type="submit" className="w-full">עדכון סיסמה</Button>
        </form>
      </section>
    </main>
  );
}

