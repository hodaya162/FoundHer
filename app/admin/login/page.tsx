import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui";
import { getCurrentCatalogAdmin } from "@/lib/auth/catalog-admin";

import { signInCatalogAdmin } from "./actions";

export const metadata: Metadata = { title: "כניסת מנהלת", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const errorMessages: Record<string, string> = {
  missing: "יש להזין כתובת אימייל וסיסמה.",
  credentials: "פרטי הכניסה אינם נכונים.",
  forbidden: "החשבון אינו מורשה לנהל את הקטלוג.",
  config: "סביבת הניהול עדיין אינה מוגדרת במלואה.",
};

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getCurrentCatalogAdmin()) redirect("/admin/catalog-moderation");
  const { error } = await searchParams;
  return (
    <main className="mx-auto flex min-h-[70dvh] w-[min(100%_-_2rem,28rem)] items-center py-12" dir="rtl">
      <section className="w-full rounded-card border border-border bg-surface p-6 shadow-sm sm:p-8" aria-labelledby="admin-login-title">
        <p className="type-label text-primary">FoundHer Admin</p>
        <h1 id="admin-login-title" className="type-section-title mt-2">כניסה לניהול הקטלוג</h1>
        <p className="type-body-small mt-3 text-muted">הגישה מיועדת למנהלות מורשות בלבד. אין אפשרות להרשמה דרך האתר.</p>
        {error ? <p role="alert" className="mt-5 rounded-button bg-destructive/10 px-4 py-3 text-sm text-destructive">{errorMessages[error] ?? "לא ניתן להשלים את הכניסה."}</p> : null}
        <form action={signInCatalogAdmin} className="mt-6 space-y-4">
          <label className="block text-sm font-semibold">
            אימייל
            <input name="email" type="email" autoComplete="username" required className="mt-2 min-h-12 w-full rounded-button border border-input bg-background px-4" />
          </label>
          <label className="block text-sm font-semibold">
            סיסמה
            <input name="password" type="password" autoComplete="current-password" required className="mt-2 min-h-12 w-full rounded-button border border-input bg-background px-4" />
          </label>
          <Button type="submit" className="w-full">כניסה מאובטחת</Button>
        </form>
      </section>
    </main>
  );
}

