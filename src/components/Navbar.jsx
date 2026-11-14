import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/pp_full_logo_upscaled_alt.png';
import { useI18n, LocalLink, splitPath, localizePath } from '../i18n';

const LINKS = [
  ['nav.about', '/about-us'],
  ['nav.events', '/events'],
  ['nav.gallery', '/gallery'],
  ['nav.press', '/press-room'],
  ['nav.sponsors', '/sponsors'],
  ['nav.support', '/support'],
  ['nav.history', '/post-history'],
  ['nav.contact', '/contact-us'],
  ['nav.donate', '/donate'],
];

// Each option is labelled in its own language so a reader who can't read the
// current page can still find theirs.
const LANG_OPTIONS = [
  ['en', 'English'],
  ['fa', 'فارسی'],
];

function LanguageSwitch({ onSwitch, className = '' }) {
  const { lang, t } = useI18n();
  const { pathname, search, hash } = useLocation();
  const { path } = splitPath(pathname);
  return (
    <div role="group" aria-label={t('lang.label')} className={`flex shrink-0 rounded-full border-2 border-gray-800 overflow-hidden ${className}`}>
      {LANG_OPTIONS.map(([code, label]) => (
        <Link
          key={code}
          to={localizePath(path, code) + search + hash}
          lang={code}
          hrefLang={code}
          aria-current={lang === code ? 'true' : undefined}
          onClick={onSwitch}
          className={`px-2.5 sm:px-3 py-2 min-h-11 flex items-center text-sm sm:text-base font-semibold no-underline transition ${
            lang === code ? 'bg-gray-800 !text-white' : '!text-gray-800 hover:bg-gray-100'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

const Navbar = () => {
  const { t, showMachineNotice } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    if (isOpen) {
      // Closing
      setIsOpen(false);
      setTimeout(() => setMenuVisible(false), 300); // match animation duration
    } else {
      // Opening
      setMenuVisible(true);
      setTimeout(() => setIsOpen(true), 10); // slight delay to trigger animation
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setTimeout(() => setMenuVisible(false), 300);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-3 flex justify-between items-center gap-3">
        <LocalLink to="/" className="flex items-center shrink-0" onClick={closeMenu}>
          <img src={logo} alt={t('site.name')} className="h-8 sm:h-10 w-auto" width={480} height={135} decoding="async" />
        </LocalLink>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            <li>
              <LocalLink to="/" className="transition" onClick={closeMenu}>
                {t('nav.home')}
              </LocalLink>
            </li>
            {LINKS.map(([key, to]) => (
              <li key={key}>
                <LocalLink to={to} className="transition" onClick={closeMenu}>
                  {t(key)}
                </LocalLink>
              </li>
            ))}
            <li>
              <a
                href="https://shop.persianparade.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition"
              >
                {t('nav.shop')}
              </a>
            </li>
          </ul>
          <LanguageSwitch />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          <LanguageSwitch onSwitch={closeMenu} />
          <button
            className="focus:outline-none transition-transform duration-300 ease-in-out p-1"
            onClick={toggleMenu}
            aria-label={t('nav.toggleMenu')}
            aria-expanded={isOpen}
          >
            <div className="relative w-8 h-8">
              <Bars3Icon
                className={`absolute inset-0 w-8 h-8 text-gray-800 transform transition duration-300 ease-in-out ${
                  isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
                }`}
              />
              <XMarkIcon
                className={`absolute inset-0 w-8 h-8 text-gray-800 transform transition duration-300 ease-in-out ${
                  isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Popover Menu */}
      {menuVisible && (
        <div
          className={`lg:hidden bg-white shadow-md border-t border-gray-200 transition-all duration-300 ease-in-out ${
            isOpen ? 'animate-slide-down' : 'animate-slide-up'
          }`}
        >
          <ul className="flex flex-col space-y-4 py-4 px-6">
            <li>
              <LocalLink to="/" className="block" onClick={closeMenu}>
                {t('nav.home')}
              </LocalLink>
            </li>
            {LINKS.map(([key, to]) => (
              <li key={key}>
                <LocalLink to={to} className="block" onClick={closeMenu}>
                  {t(key)}
                </LocalLink>
              </li>
            ))}
            <li>
              <a href="https://shop.persianparade.com" target="_blank" rel="noopener noreferrer" className="block">
                {t('nav.shop')}
              </a>
            </li>
          </ul>
        </div>
      )}

      {showMachineNotice && (
        <p className="bg-amber-50 border-t border-amber-200 text-amber-900 text-sm text-center px-4 py-2">
          {t('lang.machineNotice')}{' '}
          <LocalLink to="/contact-us" className="underline">
            {t('nav.contact')}
          </LocalLink>
        </p>
      )}
    </nav>
  );
};

export default Navbar;
