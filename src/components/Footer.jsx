import React from 'react';
import { useI18n, LocalLink } from '../i18n';
import logo from '../assets/pp_full_logo_upscaled.png';

const Footer = () => {
  const { t, num } = useI18n();
  return (
    <footer className="footer text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        
        <div className="flex flex-col items-start">
          <img src={logo} alt={t('footer.logoAlt')} className="w-42 mb-4" width={480} height={135} decoding="async" />
          <p className="text-sm text-gray-400">{t('footer.copyright', { year: num(new Date().getFullYear(), { useGrouping: false }) })}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <LocalLink to="/" className="!text-white hover:underline">{t('nav.home')}</LocalLink>
          <LocalLink to="/about-us" className="!text-white hover:underline">{t('footer.about')}</LocalLink>
          <LocalLink to="/events" className="!text-white hover:underline">{t('nav.events')}</LocalLink>
          <LocalLink to="/gallery" className="!text-white hover:underline">{t('nav.gallery')}</LocalLink>
          <LocalLink to="/contact-us" className="!text-white hover:underline">{t('footer.contact')}</LocalLink>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold mb-2">{t('footer.contactHeading')}</h3>
          <a href="mailto:info@persianparade.com" dir="ltr" className="!text-white hover:underline">info@persianparade.com</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
