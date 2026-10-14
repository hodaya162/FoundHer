# Catalog Moderation setup

This feature is intentionally fail-closed: public catalog queries return no catalog products until the moderation schema exists and products plus images are explicitly approved.

## Preview setup

1. Confirm the Vercel **Preview** environment contains only the `foundher-preview` values for:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY` (server-only)
2. In the `foundher-preview` Supabase SQL Editor, run:
   - `supabase/migrations/20261014160000_catalog_moderation.sql`
   - `supabase/manual/preview_bootstrap_admin.sql`
3. The bootstrap block grants `owner` only when exactly one Auth user exists. It aborts if zero or multiple users exist, so it never guesses an administrator identity.
4. Keep public sign-up disabled. Sign in at `/admin/login` with the manually created account.
5. Opening `/admin/catalog-moderation` inserts missing product and image review rows as `pending` without changing existing decisions.
6. Approve the desired product and at least one of its images before expecting it to appear publicly.

## Production safety

Do not configure or migrate Production as part of the Preview review. Production must use a separate Supabase project and separate Vercel Production environment variables after explicit approval.

## Security properties

- Admin pages validate both the Supabase Auth session and an active `admin_users` row.
- Public sign-up is not exposed by FoundHer.
- The secret key is read only by server modules and is never serialized to the browser.
- RLS protects the moderation tables from anonymous access.
- Product and image identities use `source_id + external_product_id` and the stable source image ID.
- Synchronization inserts new rows as `pending` and updates `last_seen_at` without overwriting moderation status.
- Missing configuration, missing decisions, database errors, pending products, and products without approved images all fail closed.
