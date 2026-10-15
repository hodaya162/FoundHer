import type { Metadata } from "next";
import Link from "next/link";

import { getAdminRecoveryCallbackUrl } from "@/config/admin-auth-url";

import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata: Metadata = { title: "איפוס סיסמת מנהלת", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function ForgotPasswordPage() {
  let redirectTo: string | undefined;
  try {
    redirectTo = getAdminRecoveryCallbackUrl();
  } catch {
    redirectTo = undefined;
  }

  return (
    <main className="mx-auto flex min-h-[70dvh] w-[min(100%_-_2rem,28rem)] items-center py-12" dir="rtl">
      <section className="w-full rounded-card border border-border bg-surface p-6 shadow-sm sm:p-8" aria-labelledby="forgot-password-title">
        <p className="type-label text-primary">FoundHer Admin</p>
        <h1 id="forgot-password-title" className="type-section-title mt-2">איפוס סיסמה</h1>
        <p className="type-body-small mt-3 text-muted">
          הזיני את כתובת האימייל של חשבון הניהול. אם החשבון קיים, יישלח אליו קישור מאובטח.
        </p>
        {!redirectTo ? (
          <p role="alert" className="mt-5 rounded-button bg-destructive/10 px-4 py-3 text-sm text-destructive">
            שירות איפוס הסיסמה עדיין אינו מוגדר במלואו.
          </p>
        ) : null}
        {redirectTo ? <ForgotPasswordForm redirectTo={redirectTo} /> : null}
        <Link href="/admin/login" className="mt-5 block text-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
          חזרה לכניסה
        </Link>
      </section>
    </main>
  );
}

