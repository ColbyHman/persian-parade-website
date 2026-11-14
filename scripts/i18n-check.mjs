#!/usr/bin/env node
/**
 * Fast, model-free check that src/i18n/fa.json is in sync with en.js.
 *
 *   npm run i18n:check            # report; exit 0
 *   npm run i18n:check -- --strict  # exit 1 if anything is missing or stale
 *
 * Missing/stale strings are not a broken site — they fall back to English —
 * so CI reports them as a warning. Fix with `npm run translate`.
 */
import { readFile } from 'node:fs/promises';
import en from '../src/i18n/en.js';
import { sourceHash, placeholders } from '../src/i18n/hash.js';

const strict = process.argv.includes('--strict');
const gh = !!process.env.GITHUB_ACTIONS;
const fa = JSON.parse(await readFile(new URL('../src/i18n/fa.json', import.meta.url), 'utf8'));

const missing = [], stale = [], broken = [], machine = [];
for (const [key, source] of Object.entries(en)) {
  const e = fa[key];
  if (!e) missing.push(key);
  else if (e.source !== sourceHash(source)) stale.push(key);
  else if (placeholders(e.text).join() !== placeholders(source).join()) broken.push(key);
  else if (e.status !== 'reviewed') machine.push(key);
}
const orphaned = Object.keys(fa).filter((k) => !(k in en));
const total = Object.keys(en).length;

const line = (label, keys) => keys.length && console.log(`${label} (${keys.length}): ${keys.join(', ')}`);
console.log(`Farsi: ${total - missing.length - stale.length - broken.length}/${total} strings current, ` +
  `${total - missing.length - stale.length - broken.length - machine.length} human-reviewed.`);
line('Missing', missing);
line('Stale (English changed)', stale);
line('Broken {placeholders}', broken);
line('Orphaned (key removed from en.js)', orphaned);
if (machine.length) console.log(`Machine drafts awaiting review: ${machine.length}`);

const problems = missing.length + stale.length + broken.length;
if (problems) {
  const msg = `${problems} Farsi string(s) missing or stale; they show in English until you run \`npm run translate\`.`;
  console.log(gh ? `::warning title=Farsi translations::${msg}` : `\n${msg}`);
}
process.exit(strict && problems ? 1 : 0);
