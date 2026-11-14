#!/usr/bin/env node
/**
 * Draft Farsi for new or changed English strings with a local Ollama model.
 *
 *   npm run translate                 # translate missing + stale keys
 *   npm run translate -- --dry-run    # list what would be translated
 *   npm run translate -- --only nav.  # restrict to keys with this prefix
 *   npm run translate -- --force      # redo machine drafts too (never reviewed ones)
 *
 * Env: OLLAMA_URL (default http://192.168.1.119:11434),
 *      OLLAMA_MODEL (default gemma4:e4b).
 *
 * This is a manual engineer step, not a commit hook: it needs the LAN model,
 * takes a few seconds per string and is not deterministic. `npm run
 * i18n:check` is the fast no-model check that CI runs.
 *
 * Output (src/i18n/fa.json), per key:
 *   { text, source: <hash of the English it was made from>, status: "machine" | "reviewed" }
 * Reviewers flip status to "reviewed" after checking a string. A reviewed
 * string whose English later changes is re-drafted and goes back to "machine".
 */
import { readFile, writeFile } from 'node:fs/promises';
import en from '../src/i18n/en.js';
import { sourceHash, placeholders } from '../src/i18n/hash.js';

const FA_PATH = new URL('../src/i18n/fa.json', import.meta.url);
const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://192.168.1.119:11434';
const MODEL = process.env.OLLAMA_MODEL ?? 'gemma4:e4b';
const TIMEOUT_MS = 120_000;

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const force = args.includes('--force');
const only = args.includes('--only') ? args[args.indexOf('--only') + 1] : '';

// Fixed renderings. Without these the model invents names for the org
// (e.g. "بنیاد پارادای فارسی").
const GLOSSARY = `
- Persian Parade Foundation = بنیاد رژه ایرانیان
- Persian Parade / the Parade = رژه ایرانیان
- Persian Day Parade = رژه روز ایرانی
- Persian New Year = نوروز
- Madison Avenue / Madison Ave = خیابان مدیسون
- New York City = شهر نیویورک
- Gala = گالا
- float (parade vehicle) = ماشین تزئینی رژه
- Board of Directors = هیئت مدیره
- Executive Board = هیئت اجرایی
- donation = کمک مالی ; donate = کمک مالی کنید ; donor = حامی مالی
- sponsor = حامی ; sponsorship = حمایت مالی
- volunteer = داوطلب
- non-profit = غیرانتفاعی
- Cyrus Cylinder Guild = انجمن منشور کوروش
- Persepolis Patron = حامی تخت جمشید
- Zeffy, AHA Inc., 501(c)(3), EIN, VIP: keep in Latin script`;

const SYSTEM = `You translate website text for the Persian Parade Foundation, a New York non-profit that runs an annual Persian heritage parade on Madison Avenue.
Translate the user's English into natural, warm, respectful Iranian Persian (Farsi) as written by the Iranian diaspora. Readers are of all ages, so prefer clear everyday wording.
Rules:
- Output ONLY the translation. No quotes, notes, or transliteration.
- Keep every {placeholder} exactly as written, in Latin letters with the braces.
- Use Persian digits (۰-۹) for numbers in prose.
- Short UI labels (menu items, buttons) stay short.
Glossary (always use exactly):${GLOSSARY}`;

async function translate(text) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      signal: ctrl.signal,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        stream: false,
        think: false,
        keep_alive: '5m',
        // Cap output so a runaway generation can't tie up the server.
        options: { temperature: 0.2, num_predict: 512 },
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: text },
        ],
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return data.message.content.trim().replace(/^["«“]|["»”]$/g, '').trim();
  } finally {
    clearTimeout(timer);
  }
}

const isFarsi = (s) => /[\u0600-\u06FF]/.test(s);

const fa = JSON.parse(await readFile(FA_PATH, 'utf8').catch(() => '{}'));

const todo = Object.keys(en).filter((key) => {
  if (only && !key.startsWith(only)) return false;
  const entry = fa[key];
  if (!entry) return true;
  if (entry.source !== sourceHash(en[key])) return true; // English changed
  return force && entry.status !== 'reviewed';
});

// Drop entries for keys removed from en.js.
const orphans = Object.keys(fa).filter((k) => !(k in en));

console.log(`${todo.length} to translate, ${orphans.length} orphaned (model ${MODEL} @ ${OLLAMA_URL})`);
if (dryRun) {
  for (const k of todo) console.log(`  ${k}: ${en[k]}`);
  for (const k of orphans) console.log(`  (remove) ${k}`);
  process.exit(0);
}
for (const k of orphans) delete fa[k];

const save = () =>
  writeFile(
    FA_PATH,
    JSON.stringify(Object.fromEntries(Object.keys(en).filter((k) => fa[k]).map((k) => [k, fa[k]])), null, 2) + '\n',
  );

let ok = 0;
const failed = [];
for (const [i, key] of todo.entries()) {
  const source = en[key];
  const want = placeholders(source).join();
  let text;
  // One retry: the usual failure is a dropped or translated {placeholder}.
  for (let attempt = 1; attempt <= 2 && !text; attempt++) {
    try {
      // The model localises digits everywhere; legal designations stay Latin,
      // wrapped in a left-to-right isolate (U+2066…U+2069) so the brackets
      // don't get reordered inside right-to-left text.
      const out = (await translate(source))
        // U+2060 (word joiner) stops a line break between ")(" .
        .replace(/\u2066?(?:۵۰۱|501)\s*\(c\)\u2060?\s*\((?:۳|3)\)\u2069?/g, '\u2066501(c)\u2060(3)\u2069');
      // A pure brand name ("AHA Inc.") legitimately comes back unchanged.
      if (!isFarsi(out) && out !== source) throw new Error(`not Farsi: ${out.slice(0, 60)}`);
      if (placeholders(out).join() !== want) throw new Error(`placeholders ${placeholders(out)} != ${want}`);
      text = out;
    } catch (e) {
      if (attempt === 2) failed.push(`${key}: ${e.message}`);
    }
  }
  if (text) {
    fa[key] = { text, source: sourceHash(source), status: 'machine' };
    ok++;
    await save(); // incremental, so an interrupted run keeps its progress
  }
  console.log(`[${i + 1}/${todo.length}] ${text ? 'ok  ' : 'FAIL'} ${key}${text ? ` → ${text}` : ''}`);
}
await save();

console.log(`\n${ok} translated, ${failed.length} failed.`);
for (const f of failed) console.log(`  ${f}`);
process.exit(failed.length ? 1 : 0);
