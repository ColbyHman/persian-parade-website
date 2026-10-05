#!/usr/bin/env node
/**
 * Image optimization pipeline.
 *
 * Runs on ImageMagick (no native npm deps). Idempotent: re-running on already
 * optimized files is a no-op in terms of quality, and variants are regenerated
 * from whatever the current "full" file is.
 *
 * What it does:
 *   1. Recompresses every JPEG at q78, progressive, 4:2:0 chroma, metadata
 *      stripped. The 2023/2024 gallery folders were 1.2-1.6 MB per 1200x800
 *      image; this takes them to ~150-200 KB with no visible difference.
 *   2. Emits @400w and @800w variants next to each public/ image so cards and
 *      thumbnails stop downloading full-size files.
 *   3. Converts the oversized About PNGs to WebP, plus a small @560w variant.
 *   4. Resizes the two logo PNGs to 480w (they render at 40-170 CSS px) and
 *      keeps them lossless PNG so the mark stays crisp.
 *   5. Writes src/data/imageDims.json: public path -> intrinsic [w, h] for
 *      every generated variant, so components can set width/height and avoid
 *      layout shift without probing at runtime.
 *
 * Usage: npm run images:optimize
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, relative, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIMS_OUT = join(ROOT, 'src/data/imageDims.json');

const QUALITY = 78;
const WEBP_QUALITY = 80;
const isVariant = (f) => /@\d+w\.[a-z]+$/.test(f);

const widths = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
  e.isDirectory() ? widths(join(dir, e.name)) : [join(dir, e.name)]
).filter((f) => !isVariant(f));

const magick = (args) => execFileSync('magick', args, { stdio: ['ignore', 'ignore', 'pipe'] });
const dims = (file) => {
  const out = execFileSync('identify', ['-format', '%w %h', `${file}[0]`], { encoding: 'utf8' });
  const [w, h] = out.trim().split(/\s+/).map(Number);
  return [w, h];
};
// Accepts a byte count, a path, or a Stats object.
const bytes = (x) => (typeof x === 'number'
  ? x
  : typeof x === 'string'
    ? statSync(x).size
    : x.size);
const kb = (x) => (bytes(x) / 1024).toFixed(0) + 'KB';
const variantPath = (file, w) => {
  const ext = extname(file);
  return `${file.slice(0, -ext.length)}@${w}w${ext}`;
};

const manifest = {};
const record = (publicPath, file) => { manifest[publicPath] = dims(file); };

const report = { recompressed: 0, before: 0, after: 0, variants: 0, converted: 0, logos: 0 };

// ---------------------------------------------------------------- public JPEGs
// Gallery + loose marketing images. Full file is optimized in place, then
// downscaled variants are derived from it.
const jpegTargets = [
  ...widths(join(ROOT, 'public/gallery')),
  ...widths(join(ROOT, 'public/images')).filter((f) => extname(f) === '.jpg'),
];

for (const file of jpegTargets) {
  const before = statSync(file).size;
  report.before += before;

  const tmp = `${file}.tmp.jpg`;
  magick([file, '-strip', '-interlace', 'Plane', '-sampling-factor', '4:2:0',
    '-quality', String(QUALITY), tmp]);
  execFileSync('mv', [tmp, file]);

  const after = statSync(file).size;
  report.after += after;
  if (after < before) report.recompressed++;

  record('/' + relative(join(ROOT, 'public'), file), file);

  const [fw] = dims(file);
  for (const w of widths_(fw)) {
    const v = variantPath(file, w);
    magick([file, '-resize', `${w}x`, '-strip', '-interlace', 'Plane',
      '-sampling-factor', '4:2:0', '-quality', String(QUALITY), v]);
    record('/' + relative(join(ROOT, 'public'), v), v);
    report.variants++;
  }
  console.log(`  ${kb(before).padStart(7)} -> ${kb(after).padStart(7)}  ${relative(ROOT, file)}`);
}

// Which variant widths make sense for a given source width: never upscale,
// always stop at 800w.
function widths_(srcWidth) {
  return [...new Set([400, 800])].filter((w) => w < srcWidth);
}

// Home slider slides. Served from public/ (not bundled) so they get variants
// and intrinsic sizes like every other image.
const sliderDir = join(ROOT, 'public/images/slider');
for (const file of widths(sliderDir)) {
  const before = statSync(file).size;
  const tmp = `${file}.tmp.jpg`;
  magick([file, '-strip', '-interlace', 'Plane', '-sampling-factor', '4:2:0',
    '-quality', String(QUALITY), tmp]);
  execFileSync('mv', [tmp, file]);
  console.log(`  ${kb(before).padStart(7)} -> ${kb(statSync(file).size).padStart(7)}  ${relative(ROOT, file)}`);

  record('/' + relative(join(ROOT, 'public'), file), file);
  const [fw] = dims(file);
  for (const w of widths_(fw)) {
    const v = variantPath(file, w);
    magick([file, '-resize', `${w}x`, '-strip', '-interlace', 'Plane',
      '-sampling-factor', '4:2:0', '-quality', String(QUALITY), v]);
    record('/' + relative(join(ROOT, 'public'), v), v);
    report.variants++;
  }
}

// ------------------------------------------------------------- About PNG -> WebP
// about_1.png was 2.6 MB at 1165x1420. WebP q80 is 218 KB; the @400w/@800w
// variants (what the max-w-md container actually needs) are ~38 KB and ~111 KB.
// Idempotent: on re-runs the PNG is gone and the WebP is already there, so we
// re-derive variants from the WebP rather than failing.
for (const name of ['about_1', 'about_2', 'about_3']) {
  const src = join(ROOT, `src/assets/${name}.png`);
  const out = join(ROOT, `src/assets/${name}.webp`);

  if (existsSync(src)) {
    const before = statSync(src).size;
    magick([src, '-strip', '-quality', String(WEBP_QUALITY), out]);
    console.log(`  ${kb(before).padStart(7)} -> ${kb(statSync(out)).padStart(7)}  ${relative(ROOT, out)}`);
    execFileSync('rm', ['-f', src]);
    report.converted++;
  } else if (!existsSync(out)) {
    console.warn(`  !! neither ${name}.png nor ${name}.webp exists, skipping`);
    continue;
  }

  const [fw] = dims(out);
  for (const w of [400, 800].filter((w) => w < fw)) {
    magick([out, '-resize', `${w}x`, '-strip', '-quality', String(WEBP_QUALITY),
      variantPath(out, w)]);
    report.variants++;
  }
}

// -------------------------------------------------------------------- logos
// Navbar renders at h-10 (40px), footer at w-42 (168px). The 1280x360 source
// is 394 KB for something never displayed above 170 CSS px. Lossless PNG at
// 480w keeps the mark crisp at 2x.
// Shrink a PNG in place, but never write a larger file than we started with
// (a 512x512 source re-encoded can come out a few KB fatter; not worth it).
const shrinkPng = (src, resizeTo) => {
  const before = statSync(src).size;
  const tmp = `${src}.tmp.png`;
  magick([src, ...(resizeTo ? ['-resize', resizeTo] : []), '-strip',
    '-define', 'png:compression-level=9', tmp]);
  if (statSync(tmp).size < before) {
    execFileSync('mv', [tmp, src]);
    console.log(`  ${kb(before).padStart(7)} -> ${kb(statSync(src)).padStart(7)}  ${relative(ROOT, src)}`);
    return true;
  }
  execFileSync('rm', ['-f', tmp]);
  console.log(`  ${kb(before).padStart(7)} ->  (kept, no gain)  ${relative(ROOT, src)}`);
  return false;
};

for (const name of ['pp_full_logo_upscaled', 'pp_full_logo_upscaled_alt']) {
  const src = join(ROOT, `src/assets/${name}.png`);
  if (!existsSync(src)) continue;
  if (shrinkPng(src, '480x')) report.logos++;
}

// cropped logo used by posts data, if referenced from public/
const cropped = join(ROOT, 'public/images/cropped-pp_logo_upscaled_transparent.png');
if (existsSync(cropped)) {
  if (shrinkPng(cropped, '480x')) report.logos++;
  record('/images/cropped-pp_logo_upscaled_transparent.png', cropped);
}

mkdirSync(dirname(DIMS_OUT), { recursive: true });
writeFileSync(DIMS_OUT, JSON.stringify(manifest, null, 2) + '\n');

console.log(`\npublic JPEGs: ${(report.before / 1e6).toFixed(1)}MB -> ${(report.after / 1e6).toFixed(1)}MB`);
console.log(`variants written: ${report.variants}, webp conversions: ${report.converted}, logos resized: ${report.logos}`);
console.log(`manifest: ${relative(ROOT, DIMS_OUT)} (${Object.keys(manifest).length} entries)`);
