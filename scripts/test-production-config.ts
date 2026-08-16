import assert from "node:assert/strict";

import {
  createCanonicalUrl,
  getConfiguredSiteUrl,
  getMetadataBase,
  isIndexingEnabled,
  type SiteUrlEnvironment,
} from "../config/site-url";

const productionEnvironment: SiteUrlEnvironment = {
  NEXT_PUBLIC_SITE_URL: "https://foundher.test/",
  NODE_ENV: "production",
  VERCEL_ENV: "production",
};

assert.equal(getConfiguredSiteUrl(productionEnvironment)?.toString(), "https://foundher.test/");
assert.equal(createCanonicalUrl("/looks", productionEnvironment), "https://foundher.test/looks");
assert.equal(isIndexingEnabled(productionEnvironment), true);

assert.equal(
  isIndexingEnabled({ ...productionEnvironment, VERCEL_ENV: "preview" }),
  false,
);
assert.equal(
  isIndexingEnabled({ ...productionEnvironment, NODE_ENV: "development" }),
  false,
);
assert.equal(isIndexingEnabled({ NODE_ENV: "production" }), false);
assert.equal(
  isIndexingEnabled({ NEXT_PUBLIC_SITE_URL: "http://localhost:3000", NODE_ENV: "production" }),
  false,
);
assert.equal(
  isIndexingEnabled({ NEXT_PUBLIC_SITE_URL: "http://foundher.test", NODE_ENV: "production" }),
  false,
);
assert.equal(createCanonicalUrl("/", { NODE_ENV: "production" }), undefined);
assert.equal(getMetadataBase({}).toString(), "http://localhost:3000/");
assert.equal(
  getMetadataBase({ VERCEL_URL: "foundher-preview.vercel.app" }).toString(),
  "https://foundher-preview.vercel.app/",
);

assert.throws(
  () => getConfiguredSiteUrl({ NEXT_PUBLIC_SITE_URL: "javascript:alert(1)" }),
  /http or https/,
);
assert.throws(
  () => getConfiguredSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://foundher.test/path" }),
  /must not include a path/,
);

console.log("Production URL configuration tests passed.");
