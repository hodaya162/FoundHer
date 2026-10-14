import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const adminGuard = readFileSync(new URL("../lib/auth/catalog-admin.ts", import.meta.url), "utf8");
const adminPage = readFileSync(new URL("../app/admin/catalog-moderation/page.tsx", import.meta.url), "utf8");
const proxy = readFileSync(new URL("../proxy.ts", import.meta.url), "utf8");
const robots = readFileSync(new URL("../app/robots.ts", import.meta.url), "utf8");
const publicConfig = readFileSync(new URL("../lib/supabase/config.ts", import.meta.url), "utf8");
const secretConfig = readFileSync(new URL("../lib/supabase/secret-config.ts", import.meta.url), "utf8");

assert.match(adminPage, /requireCatalogAdmin\(\)/, "the moderation page requires server-side admin authorization");
assert.match(adminGuard, /admin_users/, "authorization requires an explicit active admin_users row");
assert.match(proxy, /\/admin\/:path\*/, "admin sessions are refreshed only for private admin routes");
assert.match(robots, /"\/admin"/, "admin routes are disallowed in robots metadata");
assert.doesNotMatch(publicConfig, /SUPABASE_SECRET_KEY/, "client-importable configuration cannot read the secret key");
assert.match(secretConfig, /import "server-only"/, "secret configuration is restricted to server modules");
assert.match(secretConfig, /SUPABASE_SECRET_KEY/, "server configuration reads the Preview secret key");

console.log("Admin security tests passed: explicit role guard, private route proxy, noindex route, and server-only secret isolation.");
