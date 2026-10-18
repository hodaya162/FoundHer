"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui";
import { createPasswordRecoveryRequestClient } from "@/lib/supabase/client";

type RequestState = "idle" | "submitting" | "sent" | "error";

export function ForgotPasswordForm({ redirectTo }: { redirectTo: string }) {
  const [state, setState] = useState<RequestState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    if (!email) {
      setState("error");
      return;
    }

    try {
      const authClient = createPasswordRecoveryRequestClient();
      const { error } = await authClient.auth.resetPasswordForEmail(email, { redirectTo });
      setState(error ? "error" : "sent");
    } catch {
      setState("error");
    }
  }

  return (
    <>
      {state === "sent" ? (
        <p role="status" className="mt-5 rounded-button bg-primary/10 px-4 py-3 text-sm text-foreground">
          אם הכתובת משויכת לחשבון מורשה, נשלח אליה קישור לאיפוס הסיסמה.
        </p>
      ) : null}
      {state === "error" ? (
        <p role="alert" className="mt-5 rounded-button bg-destructive/10 px-4 py-3 text-sm text-destructive">
          לא ניתן לשלוח כרגע את הודעת האיפוס. נסי שוב מאוחר יותר.
        </p>
      ) : null}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm font-semibold">
          אימייל
          <input name="email" type="email" autoComplete="email" required className="mt-2 min-h-12 w-full rounded-button border border-input bg-background px-4" />
        </label>
        <Button type="submit" className="w-full" disabled={state === "submitting"}>
          {state === "submitting" ? "שולחת…" : "שליחת קישור לאיפוס"}
        </Button>
      </form>
    </>
  );
}
