// Shared building blocks for inner pages, matching the home-page redesign.
// Use these instead of hand-rolled banners/sections so every page stays
// consistent: dark photo header + tricolour rule, alternating paper/white
// sections, white cards with a coloured top border, pill buttons.
import React from 'react';
import { imgProps } from '../lib/images';
import { LocalLink } from '../i18n';

/**
 * Page title band. Dark ink background, optional photo behind a gradient
 * (same treatment as the home hero), gold eyebrow, serif title, intro text,
 * then the green/white/red rule.
 */
export function PageHeader({ title, intro, eyebrow, image, children }) {
  return (
    <>
      <header className="relative overflow-hidden bg-pp-ink text-white text-start">
        {image && (
          <>
            <img
              {...imgProps(image, {
                alt: '',
                className: 'absolute inset-0 w-full h-full object-cover',
                sizes: '100vw',
                fetchPriority: 'high',
              })}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-black/90 via-black/70 to-black/30"
            />
          </>
        )}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-10 py-10 sm:py-16">
          {eyebrow && <p className="font-bold text-pp-gold mb-1">{eyebrow}</p>}
          <h1 className="font-serif font-bold leading-tight text-3xl sm:text-5xl mb-3">{title}</h1>
          {intro && <p className="max-w-2xl text-base sm:text-lg text-gray-100">{intro}</p>}
          {children}
        </div>
      </header>
      <div className="flag-rule" />
    </>
  );
}

/** Full-width section. `tone` alternates paper (default) and white. */
export function Section({ title, tone = 'paper', id, className = '', children }) {
  return (
    <section
      id={id}
      className={`text-start px-4 sm:px-10 py-8 sm:py-14 scroll-mt-24 ${tone === 'white' ? 'bg-white' : 'bg-pp-paper'} ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {title && <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-4 sm:mb-6">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

/** White card; `accent` colours the top border (green | red | gold | none). */
export function Card({ accent = 'green', className = '', children, as = 'div', ...rest }) {
  const border = {
    green: 'border-t-4 border-t-pp-green',
    red: 'border-t-4 border-t-pp-red',
    gold: 'border-t-4 border-t-pp-gold',
    none: '',
  }[accent];
  // createElement rather than <Tag>: this repo's ESLint config doesn't mark
  // JSX-only identifiers as used.
  return React.createElement(
    as,
    { className: `rounded-xl border border-stone-200 bg-white p-5 sm:p-6 shadow-sm ${border} ${className}`, ...rest },
    children,
  );
}

const BUTTON = {
  red: 'bg-pp-red !text-white hover:bg-pp-red-dark',
  green: 'bg-pp-green-dark !text-white hover:bg-pp-green',
  outline: 'border-2 border-pp-ink !text-pp-ink hover:bg-pp-ink/5',
  white: 'bg-white !text-pp-red hover:bg-gray-100',
};

/**
 * Pill button link. Internal paths (starting with "/") keep the visitor's
 * language; anything else opens as a normal link.
 */
export function ButtonLink({ to, variant = 'red', className = '', children, ...rest }) {
  const cls = `inline-flex items-center justify-center min-h-12 px-6 rounded-full font-bold no-underline transition ${BUTTON[variant]} ${className}`;
  if (to.startsWith('/')) {
    return (
      <LocalLink to={to} className={cls} {...rest}>
        {children}
      </LocalLink>
    );
  }
  // External links (shop, Zeffy…) open in a new tab.
  return (
    <a href={to} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
      {children}
    </a>
  );
}

/** Class for links inside running text: green, underlined, AA on white/paper. */
export const proseLink = 'font-semibold text-pp-green-dark underline underline-offset-2 hover:text-pp-green-dark hover:decoration-2';

/** Email address link that stays left-to-right inside Farsi text. */
export function EmailLink({ address = 'info@persianparade.com', className = proseLink }) {
  return (
    <a href={`mailto:${address}`} dir="ltr" className={className}>
      {address}
    </a>
  );
}

/** Closing call-to-action band used at the bottom of pages. */
export function DonateBand({ title, body, cta, to = '/donate' }) {
  return (
    <section className="bg-pp-ink text-white text-start px-4 sm:px-10 py-10 sm:py-14 border-t-4 border-pp-gold">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10">
        <div className="flex-1">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-2">{title}</h2>
          <p className="text-gray-100 max-w-2xl">{body}</p>
        </div>
        <ButtonLink to={to} variant="red" className="shrink-0">
          {cta}
        </ButtonLink>
      </div>
    </section>
  );
}
