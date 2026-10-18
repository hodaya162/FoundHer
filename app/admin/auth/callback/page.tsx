"use client";

import { useEffect, useState } from "react";

import { completeBrowserPasswordRecovery } from "@/lib/auth/browser-password-recovery";

const RESET_PASSWORD_PATH = "/admin/reset-password";
const INVALID_RECOVERY_PATH = "/admin/login?error=recovery_invalid";

export default function AdminAuthCallbackPage() {
  const [message, setMessage] = useState("מאמתות את קישור האיפוס…");

  useEffect(() => {
    let active = true;

    void completeBrowserPasswordRecovery(new URL(window.location.href))
      .then((result) => {
        if (!active) return;
        // Strip one-time tokens before navigating away from the callback.
        window.history.replaceState(null, "", "/admin/auth/callback");
        if (result === "success") {
          setMessage("הקישור אומת. מעבירות לבחירת סיסמה חדשה…");
          window.location.replace(RESET_PASSWORD_PATH);
          return;
        }
        window.location.replace(INVALID_RECOVERY_PATH);
      })
      .catch(() => {
        if (active) window.location.replace(INVALID_RECOVERY_PATH);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="mx-auto flex min-h-[70dvh] w-[min(100%_-_2rem,28rem)] items-center py-12" dir="rtl">
      <section className="w-full rounded-card border border-border bg-surface p-6 text-center shadow-sm sm:p-8">
        <p className="type-label text-primary">FoundHer Admin</p>
        <h1 className="type-section-title mt-2">איפוס סיסמה</h1>
        <p role="status" className="type-body-small mt-4 text-muted">{message}</p>
      </section>
    </main>
  );
}
