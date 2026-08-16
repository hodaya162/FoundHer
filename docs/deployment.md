# FoundHer Deployment

## Runtime and build

- Node.js: `>=22.13.0`
- Package manager: npm with `package-lock.json`
- Install: `npm ci`
- Build: `npm run build`
- Start a production build: `npm run start`

The project uses the standard Next.js App Router output and does not require a `vercel.json` file.

## Required production environment variable

`NEXT_PUBLIC_SITE_URL` is the single source of truth for the public FoundHer origin. It is not a secret.

Set it to the verified HTTPS production origin without a path, query, or fragment. A trailing slash is accepted and normalized. Do not set a guessed or temporary domain.

Until a verified domain exists, omit the variable on local and preview deployments. In that state:

- no canonical URL is emitted;
- robots metadata uses `noindex`;
- `/robots.txt` blocks crawling;
- `/sitemap.xml` is empty;
- preview assets may resolve through `VERCEL_URL`, but the preview URL never becomes the production canonical.

For a public production launch, set `NEXT_PUBLIC_SITE_URL` in the Vercel Production environment. Once the real production origin exists, also expose the same production origin to Preview builds if canonical tags on previews should point to production; previews remain blocked from indexing through `VERCEL_ENV=preview`.

## Current indexing policy

Only Home is included in the production sitemap. Search, Favorites, Discover, Design System, removed Brands/Profile routes, Looks, Rentals, Products, and Rental Business pages are excluded.

This is deliberate while seller, product, Look, and rental-business records are demo content. Product and Rental Business metadata becomes indexable only for a future entity explicitly marked as non-demo; sitemap inclusion still requires a reviewed allowlist update.

## Security headers

The application sends these headers on every route:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
- `X-Frame-Options: DENY`
- `Cross-Origin-Opener-Policy: same-origin`

A strict Content Security Policy is intentionally deferred until it can be validated on a real preview against all Next.js assets and any approved external destinations. HSTS is also deferred until the verified HTTPS production domain and subdomain policy are known.

## Vercel setup

1. Import `hodaya162/FoundHer` into the existing Vercel account.
2. Use the detected Next.js framework preset.
3. Use Node.js 22.x and npm.
4. Keep the default install and build commands (`npm ci` and `npm run build`).
5. Leave `NEXT_PUBLIC_SITE_URL` unset for an initial private preview when no verified production domain exists.
6. Before public production, set `NEXT_PUBLIC_SITE_URL` to the verified HTTPS origin in the Production environment.
7. Create a preview from the reviewed TASK branch and run the route and metadata QA below.

No custom domain, DNS, analytics, or production deployment should be created or changed without owner authorization.

## Preview deployment

The TASK 017 environment can run Vercel CLI `59.1.3` through `npx`, but it is not authenticated and the repository is not linked to a Vercel project. `.vercel` is already ignored by Git, so future local project-link metadata must remain uncommitted.

To unblock the first real Preview, run this command from the repository in Windows PowerShell and complete Vercel's browser authentication with the existing owner account:

```text
npx.cmd --yes vercel@latest login
```

After `npx.cmd --yes vercel@latest whoami` returns the expected existing account, link or create the minimal FoundHer project and deploy the task branch as a Preview using standard Next.js defaults. Do not choose a Production deployment or attach a domain. Keep `NEXT_PUBLIC_SITE_URL` unset in Development and Preview until an owner-verified production origin exists.

Environment strategy:

- Development: `NEXT_PUBLIC_SITE_URL` unset.
- Preview: `NEXT_PUBLIC_SITE_URL` unset; Vercel supplies its own system variables, and the app remains noindex with no canonical.
- Production: set `NEXT_PUBLIC_SITE_URL` only to the owner-verified HTTPS production origin before public launch.

TASK 017 did not produce a Preview URL because authentication was unavailable. No temporary anonymous deployment, guessed URL, account, project ID, team ID, domain, or environment value was created.

## Preview QA checklist

- Home, Search, Discover product listing, Product detail, Looks, Look detail, Rentals, Rental Business detail, Favorites, and an invalid route load directly and after refresh.
- Mobile RTL layout has no horizontal overflow and navigation remains usable.
- Search and browser-local Favorites still work.
- Images load and demo disclosures remain visible.
- Unverified commercial actions remain unavailable and external links retain safe behavior.
- Browser console has no hydration or runtime errors.
- `/robots.txt` blocks the preview.
- `/sitemap.xml` is empty on the preview until the production URL is configured.
- Canonical tags never point to the preview deployment.
- Response headers match the documented baseline.

## Local release verification

Run:

```text
npm ci
npm run validate:fixtures
npm run test:search
npm run test:favorites
npm run test:links
npm run test:production-config
npm run typecheck
npm run lint
npm run build
npm audit
npm audit --omit=dev
```
