import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const adminGuard = readFileSync(new URL("../lib/auth/catalog-admin.ts", import.meta.url), "utf8");
const adminPage = readFileSync(new URL("../app/admin/catalog-moderation/page.tsx", import.meta.url), "utf8");
const loginActions = readFileSync(new URL("../app/admin/login/actions.ts", import.meta.url), "utf8");
const proxy = readFileSync(new URL("../proxy.ts", import.meta.url), "utf8");
const robots = readFileSync(new URL("../app/robots.ts", import.meta.url), "utf8");
const publicConfig = readFileSync(new URL("../lib/supabase/config.ts", import.meta.url), "utf8");
const secretConfig = readFileSync(new URL("../lib/supabase/secret-config.ts", import.meta.url), "utf8");
const moderationService = readFileSync(
  new URL("../lib/catalog/catalog-moderation-service.ts", import.meta.url),
  "utf8",
);
const moderationMigration = readFileSync(
  new URL("../supabase/migrations/20261014160000_catalog_moderation.sql", import.meta.url),
  "utf8",
);
const auditFunction = moderationMigration.match(
  /create or replace function public\.record_catalog_moderation_change\(\)[\s\S]*?\n\$\$;/,
)?.[0];

assert.ok(auditFunction, "the moderation audit trigger function exists");

assert.match(adminPage, /requireCatalogAdmin\(\)/, "the moderation page requires server-side admin authorization");
assert.match(adminGuard, /admin_users/, "authorization requires an explicit active admin_users row");
assert.doesNotMatch(loginActions, /createSupabaseAdminClient/, "login membership checks use the authenticated session and RLS");
assert.doesNotMatch(adminGuard, /createSupabaseAdminClient/, "request authorization uses the authenticated session and RLS");
assert.match(proxy, /\/admin\/:path\*/, "admin sessions are refreshed only for private admin routes");
assert.match(robots, /"\/admin"/, "admin routes are disallowed in robots metadata");
assert.doesNotMatch(publicConfig, /SUPABASE_SECRET_KEY/, "client-importable configuration cannot read the secret key");
assert.match(secretConfig, /import "server-only"/, "secret configuration is restricted to server modules");
assert.match(secretConfig, /SUPABASE_SECRET_KEY/, "server configuration reads the Preview secret key");

assert.match(
  moderationMigration,
  /create or replace function public\.is_catalog_owner\(\)/,
  "owner authorization is distinct from general catalog-admin authorization",
);
assert.match(
  moderationMigration,
  /Only an active owner may manage administrator roles/,
  "administrator role changes require an active owner",
);
assert.match(
  moderationMigration,
  /The final active owner cannot be demoted or deactivated/,
  "the final active owner is protected from lockout",
);
assert.doesNotMatch(
  moderationMigration,
  /grant (insert|update|delete)[^;]*on public\.admin_users[^;]*to authenticated/i,
  "authenticated users never receive direct admin-membership mutation privileges",
);
assert.match(
  moderationMigration,
  /grant update \(status\) on public\.catalog_product_moderation to authenticated/,
  "catalog admins can update only the product status column",
);
assert.match(
  moderationMigration,
  /grant update \(status\) on public\.catalog_image_moderation to authenticated/,
  "catalog admins can update only the image status column",
);
assert.match(
  moderationMigration,
  /actor_id := auth\.uid\(\)/,
  "audit identity is derived from the authenticated JWT",
);
assert.match(
  moderationMigration,
  /actor_kind := 'service_role'/,
  "service-role changes are explicitly distinguished in the audit trail",
);
assert.doesNotMatch(
  auditFunction,
  /new\.reviewed_by/,
  "audit changed_by is not copied from client-controlled review metadata",
);
assert.match(
  moderationMigration,
  /revoke all on function public\.sync_catalog_moderation\(jsonb, jsonb\)[\s\S]*from public, anon, authenticated/,
  "the SECURITY DEFINER sync function is unavailable to browsers",
);
assert.match(
  moderationMigration,
  /grant execute on function public\.sync_catalog_moderation\(jsonb, jsonb\)[\s\S]*to service_role/,
  "only service_role can execute catalog synchronization",
);
assert.doesNotMatch(
  moderationMigration,
  /grant (insert|update|delete)[^;]*on public\.(?:admin_users|catalog_product_moderation|catalog_image_moderation|catalog_moderation_audit)[^;]*to service_role/i,
  "service_role has no direct moderation or role-management write grants",
);
assert.match(
  moderationService,
  /updateProductModeration[\s\S]*?createServerSupabaseClient\(\)/,
  "product moderation writes use the authenticated admin session",
);
assert.match(
  moderationService,
  /updateImageModeration[\s\S]*?createServerSupabaseClient\(\)/,
  "image moderation writes use the authenticated admin session",
);
assert.doesNotMatch(
  moderationService,
  /reviewed_by:\s*input\./,
  "review identity cannot be supplied by application input",
);

console.log(
  "Admin security tests passed: explicit owner/content-manager boundaries, trustworthy audit actors, least-privilege SQL grants, private routes, and server-only secret isolation.",
);
