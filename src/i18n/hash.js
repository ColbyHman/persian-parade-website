// Shared by the browser runtime and scripts/translate.mjs / i18n-check.mjs so
// both agree on when a Farsi string is stale. FNV-1a 32-bit: tiny and
// deterministic; this is change detection, not security.
export function sourceHash(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

/** `{name}` placeholders in a string, sorted — must match across languages. */
export function placeholders(text) {
  return [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
}
