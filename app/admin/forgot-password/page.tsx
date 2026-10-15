import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui";

import { requestAdminPasswordReset } from "./actions";

export const metadata: Metadata = { title: "איפוס סיסמת מנהלת", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const errorMessages: Record<string, string> = {
  missing: "יש להזין כתובת אימייל.",
  config: "שירות איפוס הסיסמה עדיין אינו מוגדר במלואו.",
};

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const { error, sent } = await searchParams;

  return (
    <main className="mx-auto flex min-h-[70dvh] w-[min(100%_-_2rem,28rem)] items-center py-12" dir="rtl">
      <section className="w-full rounded-card border border-border bg-surface p-6 shadow-sm sm:p-8" aria-labelledby="forgot-password-title">
        <p className="type-label text-primary">FoundHer Admin</p>
        <h1 id="forgot-password-title" className="type-section-title mt-2">איפוס סיסמה</h1>
        <p className="type-body-small mt-3 text-muted">
          הזיני את כתובת האימייל של חשבון הניהול. אם החשבון קיים, יישלח אליו קישור מאובטח.
        </p>
        {sent ? (
          <p role="status" className="mt-5 rounded-button bg-primary/10 px-4 py-3 text-sm text-foreground">
            אם הכתובת משויכת לחשבון מורשה, נשלח אליה קישור לאיפוס הסיסמה.
          </p>
        ) : null}
        {error ? (
          <p role="alert" className="mt-5 rounded-button bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {errorMessages[error] ?? "לא ניתן להשלים את הבקשה כרגע."}
          </p>
        ) : null}
        <form action={requestAdminPasswordReset} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">
            אימייל
            <input name="email" type="email" autoComplete="email" required className="mt-2 min-h-12 w-full rounded-button border border-input bg-background px-4" />
          </label>
          <Button type="submit" className="w-full">שליחת קישור לאיפוס</Button>
        </form>
        <Link href="/admin/login" className="mt-5 block text-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
          חזרה לכניסה
        </Link>
      </section>
    </main>
  );
}

