import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import { useI18n, Trans } from '../i18n';
import { PageHeader, Section, Card, EmailLink } from '../components/ui';

export default function DonationPage() {
  const { t } = useI18n();
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.zeffy.com/embed/v2/zeffy-embed.js';
    script.async = true;
    script.onerror = () => {
      document.querySelectorAll('[data-zeffy-embed-fallback]').forEach(el => {
        el.style.display = 'block';
        el.querySelectorAll('iframe[data-zeffy-embed-src]').forEach(f => {
          f.src = f.getAttribute('data-zeffy-embed-src');
        });
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('donate.title')} intro={t('donate.intro')} image="/images/slider/2023-Dedication-Banner1.jpg" />

      <Section>
        <div className="grid lg:grid-cols-3 gap-5 lg:gap-8 items-start">
          {/* Zeffy donation form */}
          <Card accent="red" className="lg:col-span-2 p-4 sm:p-6">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-2">{t('donate.makeDonation')}</h2>
            <p className="leading-relaxed mb-4 sm:mb-6">{t('donate.zeffy')}</p>

            {/* Zeffy Embed */}
            <div data-zeffy-embed data-form-url="/embed/donation-form/donate-to-the-persian-parade-foundation"></div>

            {/* Fallback iframe if JavaScript fails */}
            <div data-zeffy-embed-fallback style={{ display: 'none' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '600px', width: '100%' }}>
                <iframe
                  title={t('donate.formTitle')}
                  style={{
                    position: 'absolute',
                    border: 0,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    width: '100%',
                    height: '100%'
                  }}
                  data-zeffy-embed-src="https://www.zeffy.com/embed/donation-form/donate-to-the-persian-parade-foundation"
                  allow="payment"
                ></iframe>
              </div>
            </div>
          </Card>

          {/* By check + tax note */}
          <Card accent="gold" as="aside" className="text-base space-y-3">
            <p className="leading-relaxed">
              <Trans k="donate.byCheck" values={{ email: <EmailLink /> }} />
            </p>
            <p className="leading-relaxed text-stone-700">
              <Trans k="donate.taxNote" values={{ ein: <span dir="ltr" className="font-semibold text-pp-ink">83-4668094</span> }} />
            </p>
          </Card>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
