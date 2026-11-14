import React from "react";
import Footer from "../components/Footer";
import { useI18n, Trans, LocalLink } from "../i18n";
import { PageHeader, Section, Card, EmailLink, DonateBand, proseLink } from "../components/ui";

const COMMITTEES = ['art', 'dance', 'fundraising', 'pr', 'culture', 'digital', 'events', 'music'];
const OPENINGS = ['artDirector', 'digitalDirector'];

export default function SupportPage() {
  const { t } = useI18n();
  const link = (to, key) => (
    <LocalLink to={to} className={proseLink}>
      {t(key)}
    </LocalLink>
  );

  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('support.title')} intro={t('support.intro')} image="/images/slider/ZFNY-131-scaled.jpg" />

      {/* Become a Member / Become a Sponsor */}
      <Section>
        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          <Card>
            <h2 className="font-serif font-bold text-2xl mb-3">{t('support.memberTitle')}</h2>
            <p className="mb-3 leading-relaxed">{t('support.memberBody')}</p>
            <p className="leading-relaxed">
              <Trans
                k="support.memberHow"
                values={{ contactLink: link('/contact-us', 'support.contactPageLink'), email: <EmailLink /> }}
              />
            </p>
          </Card>
          <Card accent="gold">
            <h2 className="font-serif font-bold text-2xl mb-3">{t('support.sponsorTitle')}</h2>
            <p className="mb-3 leading-relaxed">{t('support.sponsorBody')}</p>
            <p className="leading-relaxed">
              <Trans
                k="support.sponsorHow"
                values={{ sponsorLink: link('/sponsors', 'support.sponsorPageLink'), email: <EmailLink /> }}
              />
            </p>
          </Card>
        </div>
      </Section>

      {/* Become a Volunteer */}
      <Section id="volunteer" tone="white" title={t('support.volunteerTitle')}>
        <p className="mb-4 leading-relaxed max-w-3xl">{t('support.volunteerBody')}</p>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {COMMITTEES.map((c) => (
            <li
              key={c}
              className="flex items-center gap-2 rounded-lg border border-stone-200 bg-pp-paper px-3 py-2 font-semibold leading-snug"
            >
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-pp-green" />
              {t(`support.committee.${c}`)}
            </li>
          ))}
        </ul>
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 items-start">
          <Card accent="red">
            <h3 className="font-bold text-lg mb-2">{t('support.openings')}</h3>
            <ul className="list-disc ps-5 space-y-1">
              {OPENINGS.map((o) => (
                <li key={o}>{t(`support.opening.${o}`)}</li>
              ))}
            </ul>
          </Card>
          <p className="leading-relaxed">
            <Trans k="support.volunteerHow" values={{ email: <EmailLink /> }} />
          </p>
        </div>
      </Section>

      {/* Become a Donor */}
      <DonateBand title={t('support.donorTitle')} body={t('common.donationAppeal')} cta={t('cta.donateNow')} to="/donate" />
      <Footer />
    </div>
  );
}
