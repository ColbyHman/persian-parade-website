import React from "react";
import SponsorTier from "../components/SponsorTier";
import Footer from "../components/Footer";
import { imgProps } from "../lib/images";
import { useI18n, Trans } from "../i18n";

// Amounts in US dollars; names and benefits are i18n keys (src/i18n/en.js).
const LEVELS = [
  { name: 'sponsors.tier.cyrus', amount: 10000, benefits: ['sponsors.b.table10Two', 'sponsors.b.vipTwo', 'sponsors.b.recognitionGalas', 'sponsors.b.bannersBoth'] },
  { name: 'sponsors.tier.persepolis', amount: 7500, benefits: ['sponsors.b.table10One', 'sponsors.b.vipOne', 'sponsors.b.recognitionGala', 'sponsors.b.bannerOne'] },
  { name: 'sponsors.tier.float', amount: 5000, benefits: ['sponsors.b.tickets4', 'sponsors.b.customDesign', 'sponsors.b.recognitionWebGala', 'sponsors.b.longBannerOne'] },
];
const ADVERTISING = [
  { name: 'sponsors.tier.sponsor', amount: 2000, benefits: ['sponsors.b.displayBoth', 'sponsors.b.ackYear', 'sponsors.b.boardApproval'] },
  { name: 'sponsors.tier.sponsor', amount: 1000, benefits: ['sponsors.b.displayOneOr', 'sponsors.b.displayTwoSmall', 'sponsors.b.ackWebYear', 'sponsors.b.boardApproval'] },
  { name: 'sponsors.tier.sponsor', amount: 500, benefits: ['sponsors.b.smallBanner', 'sponsors.b.ackWebYear', 'sponsors.b.boardApproval'] },
];

export default function SponsorsPage() {
  const { t } = useI18n();
  return (
    <div>
      <div className="bg-white text-gray-800">
        {/* Hero Section */}
        <div className="bg-pp-red text-white py-20 px-6 text-center shadow-xl">
          <h1 className="text-5xl font-bold mb-4">{t('sponsors.title')}</h1>
          <p className="text-lg max-w-3xl mx-auto">
            {t('sponsors.intro')}
          </p>
        </div>

        {/* Current Sponsors */}
        <div className="max-w-5xl mx-auto px-6 py-12">
          <section className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-8">{t('sponsors.current')}</h2>
            <div className="flex flex-col items-center gap-8">
              <img
                {...imgProps('/images/aha-ad.jpg', {
                  alt: t('sponsors.ahaAlt'),
                  className: "max-w-md w-full h-auto rounded-lg shadow-md",
                  sizes: "(max-width: 448px) 100vw, 448px",
                  loading: "lazy",
                })}
              />
            </div>
          </section>

          {/* Sponsorship Levels & Advertising Sponsorship - Side by Side */}
          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-3xl font-semibold mb-6 text-center">{t('sponsors.levels')}</h2>
              <div className="space-y-12">
                {LEVELS.map((tier) => (
                  <SponsorTier key={tier.amount} name={t(tier.name)} amount={tier.amount} benefits={tier.benefits.map((k) => t(k))} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-semibold mb-6 text-center">{t('sponsors.advertising')}</h2>
              <div className="space-y-12">
                {ADVERTISING.map((tier) => (
                  <SponsorTier key={tier.amount} name={t(tier.name)} amount={tier.amount} benefits={tier.benefits.map((k) => t(k))} />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Contact to Become a Sponsor */}
        <section className="bg-gray-100 py-16 px-6 text-center border-y border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('sponsors.title')}</h2>
            <p className="text-gray-700 text-lg">
              <Trans
                k="sponsors.reachOut"
                values={{
                  email: (
                    <a href="mailto:info@persianparade.com" dir="ltr" className="text-pp-red underline hover:text-pp-red-dark font-semibold">
                      info@persianparade.com
                    </a>
                  ),
                }}
              />
            </p>
          </div>
        </section>

        {/* Friends of the Parade - Full Width */}
        <section className="bg-pp-red text-white py-12 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">{t('sponsors.friends')}</h2>
            <p className="text-white mb-4">
              {t('sponsors.friendsBody')}
            </p>
            <a
              href="https://shop.persianparade.com/collections/donations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-pp-red px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              {t('cta.donateNow')}
            </a>
          </div>
        </section>

        {/* Corporate Partnerships */}
        <section className="bg-gray-50 py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4 text-center">{t('sponsors.corporate')}</h2>
            <p className="text-gray-700 text-lg mb-4 text-center max-w-3xl mx-auto">
              {t('sponsors.corporateBody')}
            </p>
            <p className="text-center text-gray-700">
              <Trans
                k="sponsors.corporateContact"
                values={{
                  email: (
                    <a href="mailto:PR@PersianParade.com" dir="ltr" className="text-pp-red underline hover:text-pp-red-dark">
                      PR@PersianParade.com
                    </a>
                  ),
                }}
              />
            </p>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}
