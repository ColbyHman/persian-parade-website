/**
 * Image helpers: srcset + intrinsic dimensions.
 *
 * `scripts/optimize-images.mjs` writes optimized originals plus @400w / @800w
 * variants next to them, and records intrinsic sizes in data/imageDims.json.
 * These helpers turn a single logical path into a srcset so the browser only
 * downloads a file close to the size it will actually paint.
 */
import dims from '../data/imageDims.json';

const VARIANT_RE = /@(\d+)w(?=\.[a-z]+$)/;
const variantPath = (path, w) => path.replace(/(\.[a-z]+)$/, `@${w}w$1`);

// Candidate variant widths that exist on disk, smallest first.
const widthsFor = (path) =>
  Object.keys(dims)
    .filter((p) => VARIANT_RE.test(p) && p.replace(VARIANT_RE, '') === path)
    .map((p) => Number(VARIANT_RE.exec(p)[1]))
    .sort((a, b) => a - b);

/**
 * srcset string for a public/ image, e.g. for "/gallery/2024/ZFNY-416.jpg":
 *   "/gallery/2024/ZFNY-416@400w.jpg 400w, /gallery/2024/ZFNY-416@800w.jpg 800w"
 *
 * Pass a matching `sizes` to the <img> as well — without it the browser is
 * free to pick the largest candidate and the srcset buys nothing.
 */
export function srcSet(path) {
  const ws = widthsFor(path);
  if (!ws.length) return undefined;
  return ws.map((w) => `${variantPath(path, w)} ${w}w`).join(', ');
}

/** Intrinsic [width, height] for a public/ image, or undefined. */
export function dimsOf(path) {
  return dims[path];
}

/**
 * Props for a responsive <img>: src, srcSet, sizes, intrinsic width/height and
 * async decoding.
 */
export function imgProps(path, { sizes, alt = '', className, ...rest } = {}) {
  const d = dimsOf(path);
  const props = {
    src: path,
    alt,
    className,
    decoding: 'async',
    ...(d ? { width: d[0], height: d[1] } : {}),
    ...rest,
  };
  const ss = srcSet(path);
  if (ss) {
    props.srcSet = ss;
    props.sizes = sizes ?? '100vw';
  }
  return props;
}

// ------------------------------------------------------- bundled src/assets
// Vite rewrites bundled filenames to content-hashed ones, so imageDims.json
// (which keys on public/ paths) can't help here. Instead, match the variant
// siblings through the glob map: keys are the source paths, values are modules
// whose default export is the final URL.

/**
 * Every variant of one bundled image, keyed by source filename:
 *   { 'about_1.webp': '/assets/about_1-HASH.webp',
 *     'about_1@400w.webp': '/assets/about_1@400w-HASH.webp', ... }
 */
export function bundledFamily(globMap, baseName) {
  const stem = baseName.replace(/(\.[a-z]+)$/, '');
  const family = {};
  for (const [key, mod] of Object.entries(globMap)) {
    const file = key.split('/').pop();
    if (file !== baseName && !file.startsWith(`${stem}@`)) continue;
    family[file] = mod?.default ?? mod;
  }
  return family;
}

/**
 * Props for an <img> backed by a bundled asset family. `src` is the smallest
 * variant (a sane fallback), `srcSet` offers all of them so the browser picks
 * by viewport and DPR.
 */
export function bundledImgProps(family, { sizes, alt = '', className, width, height, ...rest } = {}) {
  const variants = Object.entries(family)
    .map(([file, url]) => ({ url, w: Number(/@(\d+)w\./.exec(file)?.[1]) }))
    .filter((e) => Number.isFinite(e.w))
    .sort((a, b) => a.w - b.w);
  const original = Object.entries(family).find(([file]) => !/@\d+w\./.test(file));

  const props = {
    src: variants[0]?.url ?? original?.[1],
    alt,
    className,
    decoding: 'async',
    ...(original ? { width, height } : {}),
    ...rest,
  };
  if (variants.length) {
    props.srcSet = variants.map((e) => `${e.url} ${e.w}w`).join(', ');
    props.sizes = sizes ?? '100vw';
  }
  return props;
}
