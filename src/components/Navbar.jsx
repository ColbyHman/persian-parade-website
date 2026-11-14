import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import logo from '../assets/pp_full_logo_upscaled_alt.png';
import { useI18n, LocalLink, splitPath, localizePath } from '../i18n';

const LINKS = [
  ['nav.about', '/about-us'],
  ['nav.news', '/news'],
  ['nav.events', '/events'],
  ['nav.gallery', '/gallery'],
  ['nav.press', '/press-room'],
  ['nav.sponsors', '/sponsors'],
  ['nav.support', '/support'],
  ['nav.contact', '/contact-us'],
];

const DONATE_PILL =
  'inline-flex items-center justify-center rounded-full bg-pp-red px-4 py-1.5 font-bold !text-white no-underline hover:bg-pp-red-dark';

// One small link to the *other* language, labelled in that language so a
// reader who can't read the current page can still find theirs. The visible
// pill is compact; an invisible ::after extends the tap target to 44px.
const OTHER = { en: ['fa', 'فارسی'], fa: ['en', 'English'] };

function LanguageSwitch({ onSwitch }) {
  const { lang, t } = useI18n();
  const { pathname, search, hash } = useLocation();
  const { path } = splitPath(pathname);
  const [code, label] = OTHER[lang];
  return (
    <Link
      to={localizePath(path, code) + search + hash}
      lang={code}
      hrefLang={code}
      title={t('lang.label')}
      onClick={onSwitch}
      className="relative shrink-0 inline-flex items-center gap-1 rounded-full border border-gray-300 px-2.5 py-1 text-sm font-semibold !text-gray-800 no-underline hover:bg-gray-100 transition after:absolute after:-inset-x-1 after:-inset-y-2 after:content-['']"
    >
      <GlobeAltIcon aria-hidden="true" className="w-4 h-4" />
      {label}
    </Link>
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
        <div className="hidden xl:flex items-center gap-4">
          <ul className="flex gap-x-4 text-[0.95rem] whitespace-nowrap">
            <li>
              <LocalLink to="/" className="inline-block py-1.5 transition" onClick={closeMenu}>
                {t('nav.home')}
              </LocalLink>
            </li>
            {LINKS.map(([key, to]) => (
              <li key={key}>
                <LocalLink to={to} className="inline-block py-1.5 transition" onClick={closeMenu}>
                  {t(key)}
                </LocalLink>
              </li>
            ))}
            <li>
              <a
                href="https://shop.persianparade.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1.5 transition"
              >
                {t('nav.shop')}
              </a>
            </li>
          </ul>
          <LocalLink to="/donate" className={DONATE_PILL} onClick={closeMenu}>
            {t('nav.donate')}
          </LocalLink>
          <LanguageSwitch />
        </div>

        <div className="flex items-center gap-2 sm:gap-3 xl:hidden">
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
          className={`xl:hidden bg-white shadow-md border-t border-gray-200 transition-all duration-300 ease-in-out ${
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
            <li>
              <LocalLink to="/donate" className={`${DONATE_PILL} min-h-11 w-full`} onClick={closeMenu}>
                {t('nav.donate')}
              </LocalLink>
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
