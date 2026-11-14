import React from "react";
import Footer from "../components/Footer";
import { useI18n, Trans, LocalLink } from "../i18n";

const COMMITTEES = ['art', 'dance', 'fundraising', 'pr', 'culture', 'digital', 'events', 'music'];
const OPENINGS = ['artDirector', 'digitalDirector'];

const Email = ({ onRed }) => (
  <a
    href="mailto:info@persianparade.com"
    dir="ltr"
    className={onRed ? "underline !text-white hover:!text-red-300" : "underline text-red-600 hover:text-red-700"}
  >
    info@persianparade.com
  </a>
);

export default function SupportPage() {
  const { t } = useI18n();
  const link = (to, key, onRed) => (
    <LocalLink
      to={to}
      className={onRed ? "underline !text-white hover:!text-red-300" : "underline text-red-600 hover:text-red-700"}
    >
      {t(key)}
    </LocalLink>
  );

  return (
    <div>
      {/* Support Us Banner - Red background with white text */}
      <div className="bg-red-600 text-white py-16 px-6 shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-4">{t('support.title')}</h1>
        <p className="max-w-xl mx-auto text-center text-red-200">
          {t('support.intro')}
        </p>
      </div>

      {/* Become a Member - White background, black text */}
      <div className="bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">{t('support.memberTitle')}</h2>
          <p className="mb-6 leading-relaxed">
            {t('support.memberBody')}
          </p>
          <p className="leading-relaxed">
            <Trans
              k="support.memberHow"
              values={{ contactLink: link('/contact-us', 'support.contactPageLink'), email: <Email /> }}
            />
          </p>
        </div>
      </div>

      {/* Become a Sponsor - Red background, white text */}
      <div className="bg-red-600 text-white">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">{t('support.sponsorTitle')}</h2>
          <p className="mb-6 leading-relaxed">
            {t('support.sponsorBody')}
          </p>
          <p className="leading-relaxed">
            <Trans
              k="support.sponsorHow"
              values={{ sponsorLink: link('/sponsors', 'support.sponsorPageLink', true), email: <Email onRed /> }}
            />
          </p>
        </div>
      </div>

      {/* Become a Volunteer - White background, black text */}
      <div className="bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">{t('support.volunteerTitle')}</h2>
          <p className="mb-6 leading-relaxed">
            {t('support.volunteerBody')}
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2">
            {COMMITTEES.map((c) => (
              <li key={c}>{t(`support.committee.${c}`)}</li>
            ))}
          </ul>

          <p className="mb-6 leading-relaxed">
            {t('support.openings')}
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2">
            {OPENINGS.map((o) => (
              <li key={o}>{t(`support.opening.${o}`)}</li>
            ))}
          </ul>

          <p className="leading-relaxed">
            <Trans k="support.volunteerHow" values={{ email: <Email /> }} />
          </p>
        </div>
      </div>

      {/* Become a Donor - Red background, white text */}
      <div className="bg-red-600 text-white">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">{t('support.donorTitle')}</h2>
          <p className="leading-relaxed">
            {t('common.donationAppeal')}
          </p>
          <p className="mt-6 leading-relaxed">
            <Trans
              k="support.donorHow"
              values={{ donateLink: link('/donate', 'support.donatePageLink', true), email: <Email onRed /> }}
            />
          </p>
        </div>
      <Footer />
      </div>
    </div>
  );
}
