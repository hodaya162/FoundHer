import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import { getAdminRecoveryCallbackUrl } from "../config/admin-auth-url";
import { MINIMUM_ADMIN_PASSWORD_LENGTH, validateAdminPassword } from "../lib/auth/password-policy";

const forgotAction = readFileSync(new URL("../app/admin/forgot-password/actions.ts", import.meta.url), "utf8");
const callbackRoute = readFileSync(new URL("../app/admin/auth/callback/route.ts", import.meta.url), "utf8");
const resetAction = readFileSync(new URL("../app/admin/reset-password/actions.ts", import.meta.url), "utf8");
const loginPage = readFileSync(new URL("../app/admin/login/page.tsx", import.meta.url), "utf8");
const nextConfig = readFileSync(new URL("../next.config.ts", import.meta.url), "utf8");

assert.equal(
  getAdminRecoveryCallbackUrl({ NEXT_PUBLIC_SITE_URL: "https://foundher-preview-found-her1.vercel.app" }),
  "https://foundher-preview-found-her1.vercel.app/admin/auth/callback",
  "password recovery uses the exact stable Preview origin",
);
assert.throws(
  () => getAdminRecoveryCallbackUrl({}),
  /NEXT_PUBLIC_SITE_URL is required/,
  "password recovery fails closed instead of falling back to localhost",
);
assert.throws(
  () => getAdminRecoveryCallbackUrl({ NEXT_PUBLIC_SITE_URL: "https://example.test/unsafe" }),
  /must not include a path/,
  "password recovery rejects an origin containing a path",
);

assert.equal(MINIMUM_ADMIN_PASSWORD_LENGTH, 12, "admin passwords require at least 12 characters");
assert.deepEqual(validateAdminPassword("", ""), { valid: false, error: "missing" });
assert.deepEqual(validateAdminPassword("secure-password", "different-pass"), { valid: false, error: "mismatch" });
assert.deepEqual(validateAdminPassword("short", "short"), { valid: false, error: "too_short" });
assert.deepEqual(validateAdminPassword("a-secure-password", "a-secure-password"), { valid: true });

assert.match(forgotAction, /resetPasswordForEmail\(email, \{ redirectTo \}\)/, "reset requests use Supabase Auth with an explicit callback URL");
assert.match(forgotAction, /forgot-password\?sent=1/, "reset requests return the same generic success state");
assert.doesNotMatch(forgotAction, /user.*exist|email.*exist/i, "the reset action does not branch on account existence");
assert.match(callbackRoute, /exchangeCodeForSession\([\s\S]*code,[\s\S]*flowId/, "the callback exchanges the PKCE code and supports isolated flow identifiers");
assert.match(callbackRoute, /from\("admin_users"\)/, "the callback authorizes an active administrator after code exchange");
assert.match(callbackRoute, /eq\("active", true\)/, "inactive administrators cannot enter password recovery");
assert.doesNotMatch(callbackRoute, /searchParams\.get\("next"\)/, "the callback cannot be used as an open redirect");
assert.match(resetAction, /requireCatalogAdmin\(\)/, "password updates require an active admin session");
assert.match(resetAction, /auth\.updateUser\(\{ password \}\)/, "password changes use the authenticated Supabase session");
assert.match(resetAction, /signOut\(\{ scope: "local" \}\)/, "the recovery session is closed after a successful update");
assert.match(loginPage, /href="\/admin\/forgot-password"/, "the login page exposes the password recovery path");
assert.match(nextConfig, /VERCEL_ENV === "preview"/, "Preview-specific response headers are selected from Vercel's environment marker");
assert.match(nextConfig, /X-Robots-Tag[\s\S]*noindex, nofollow, noarchive/, "the stable Preview alias receives an explicit noindex response header");

console.log("Admin password recovery tests passed: fixed-origin redirects, PKCE exchange, active-admin authorization, non-enumerating responses, and password validation.");

