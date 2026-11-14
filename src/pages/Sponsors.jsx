import React from "react";
import SponsorTier from "../components/SponsorTier";
import Footer from "../components/Footer";
import { imgProps } from "../lib/images";
import { useI18n, Trans } from "../i18n";
import { PageHeader, Section, Card, ButtonLink, EmailLink, DonateBand } from "../components/ui";

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
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('sponsors.title')} intro={t('sponsors.intro')} image="/images/slider/ZFNY-586-scaled.jpg" />

      {/* Current Sponsors */}
      <Section title={t('sponsors.current')} tone="white">
        <Card accent="gold" className="flex items-center gap-4 sm:gap-6">
          <img
            {...imgProps('/images/aha-ad.jpg', {
              alt: t('sponsors.ahaAlt'),
              className: "w-36 sm:w-72 h-auto rounded-lg",
              sizes: "(max-width: 640px) 144px, 288px",
              loading: "lazy",
            })}
          />
          <p className="font-bold text-lg">AHA Persian School</p>
        </Card>
      </Section>

      {/* Sponsorship Levels & Advertising Sponsorship - side by side */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-4 sm:mb-6">{t('sponsors.levels')}</h2>
            <div className="space-y-5">
              {LEVELS.map((tier) => (
                <SponsorTier key={tier.amount} accent="red" name={t(tier.name)} amount={tier.amount} benefits={tier.benefits.map((k) => t(k))} />
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-4 sm:mb-6">{t('sponsors.advertising')}</h2>
            <div className="space-y-5">
              {ADVERTISING.map((tier) => (
                <SponsorTier key={tier.amount} name={t(tier.name)} amount={tier.amount} benefits={tier.benefits.map((k) => t(k))} />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* How to become a sponsor + corporate partnerships */}
      <Section tone="white">
        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          <Card>
            <h2 className="font-serif font-bold text-2xl mb-3">{t('sponsors.title')}</h2>
            <p>
              <Trans k="sponsors.reachOut" values={{ email: <EmailLink /> }} />
            </p>
          </Card>
          <Card>
            <h2 className="font-serif font-bold text-2xl mb-3">{t('sponsors.corporate')}</h2>
            <p className="mb-3">{t('sponsors.corporateBody')}</p>
            <p>
              <Trans k="sponsors.corporateContact" values={{ email: <EmailLink address="PR@PersianParade.com" /> }} />
            </p>
          </Card>
        </div>
      </Section>

      {/* Friends of the Parade */}
      <DonateBand
        title={t('sponsors.friends')}
        body={t('sponsors.friendsBody')}
        cta={t('cta.donateNow')}
        to="https://shop.persianparade.com/collections/donations"
      />
      <Footer />
    </div>
  );
}
