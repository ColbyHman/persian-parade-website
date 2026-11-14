import React from "react";
import Footer from "../components/Footer";
import { useI18n } from "../i18n";
import { PageHeader, Section, Card, ButtonLink } from "../components/ui";

export default function EventsPage() {
  const { t } = useI18n();
  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('events.title')} intro={t('events.intro')} image="/images/slider/ZFNY-404-scaled.jpg" />

      <Section>
        <Card accent="gold" className="max-w-3xl flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          {/* Calendar icon (decorative) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-12 w-12 shrink-0 text-pp-green-dark"
          >
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18" />
          </svg>
          <div>
            <h2 className="font-serif font-bold text-2xl mb-2">{t('events.noneTitle')}</h2>
            <p className="leading-relaxed mb-5">{t('events.noneBody')}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to="/news" variant="green">{t('nav.news')}</ButtonLink>
              <ButtonLink to="/contact-us" variant="outline">{t('nav.contact')}</ButtonLink>
            </div>
          </div>
        </Card>
      </Section>
      <Footer />
    </div>
  );
}
