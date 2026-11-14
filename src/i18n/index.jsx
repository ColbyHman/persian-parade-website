/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import en from './en.js';
import fa from './fa.json';
import { sourceHash, placeholders } from './hash.js';

export const LANGS = ['en', 'fa'];
const STORAGE_KEY = 'pp-lang';

/** Farsi text for a key, or undefined if missing, stale or malformed. */
function faFor(key) {
  const entry = fa[key];
  const source = en[key];
  if (!entry || source === undefined) return undefined;
  if (entry.source !== sourceHash(source)) return undefined; // English changed since
  if (placeholders(entry.text).join() !== placeholders(source).join()) return undefined;
  return entry.text;
}

/** True when any Farsi string currently shown is an unreviewed machine draft. */
const HAS_MACHINE_FA = Object.entries(fa).some(
  ([key, e]) => e.status !== 'reviewed' && faFor(key) !== undefined,
);

/** Split "/fa/about-us" into { lang: 'fa', path: '/about-us' }. */
export function splitPath(pathname) {
  const m = pathname.match(/^\/fa(?=\/|$)(.*)$/);
  return m ? { lang: 'fa', path: m[1] || '/' } : { lang: 'en', path: pathname };
}

export function localizePath(path, lang) {
  if (lang !== 'fa' || !path.startsWith('/')) return path;
  return path === '/' ? '/fa' : `/fa${path}`;
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const { lang, path } = splitPath(pathname);
  const firstLoad = useRef(true);

  // <html lang/dir> drive the RTL layout, the Farsi font and screen readers.
  useEffect(() => {
    // A returning Farsi reader landing on an unprefixed URL (e.g. typed
    // persianparade.com) goes back to Farsi. Only on the first page load, so
    // the English button still works afterwards.
    if (firstLoad.current) {
      firstLoad.current = false;
      if (lang === 'en' && storedLang() === 'fa') {
        navigate(localizePath(path, 'fa') + search + hash, { replace: true });
        return;
      }
    }
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'fa' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode */
    }
  }, [lang, path, search, hash, navigate]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      let text = (lang === 'fa' && faFor(key)) || en[key];
      if (text === undefined) {
        if (import.meta.env.DEV) console.warn(`[i18n] missing key ${key}`);
        return key;
      }
      if (vars) text = text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
      return text;
    };
    const num = (n, opts) => new Intl.NumberFormat(lang === 'fa' ? 'fa-IR' : 'en-US', opts).format(n);
    return { lang, dir: lang === 'fa' ? 'rtl' : 'ltr', t, num, showMachineNotice: lang === 'fa' && HAS_MACHINE_FA };
  }, [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}

/**
 * Render a translated string whose {placeholders} are React nodes (links,
 * bold text). Plain-string values work too.
 */
export function Trans({ k, values = {} }) {
  const { t } = useI18n();
  const text = t(k);
  const parts = text.split(/(\{\w+\})/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\{(\w+)\}$/);
        return m && m[1] in values ? <React.Fragment key={i}>{values[m[1]]}</React.Fragment> : part;
      })}
    </>
  );
}

/** <Link> that keeps the visitor in their current language. */
export function LocalLink({ to, ...rest }) {
  const { lang } = useI18n();
  return <Link to={localizePath(to, lang)} {...rest} />;
}

/** Language last chosen on this device, if any. */
export function storedLang() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
