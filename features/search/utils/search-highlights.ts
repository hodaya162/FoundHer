/**
 * Search highlighting is intentionally omitted for the MVP. Returning plain text
 * keeps Hebrew RTL rendering predictable and avoids injecting HTML.
 */
export function getSearchDisplayText(value: string): string {
  return value;
}
