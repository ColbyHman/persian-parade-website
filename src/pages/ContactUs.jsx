import React from "react";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { useI18n } from "../i18n";
import { PageHeader, Section, Card, EmailLink } from "../components/ui";

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('contact.title')} intro={t('contact.intro')} image="/images/slider/ZFNY-1-scaled.jpg" />

      <Section>
        <div className="grid md:grid-cols-5 gap-5 md:gap-8 items-start">
          {/* Contact info */}
          <Card accent="gold" className="md:col-span-2">
            <h2 className="font-serif font-bold text-2xl mb-3">{t('contact.getInTouch')}</h2>
            <p className="mb-4 leading-relaxed">{t('contact.body')}</p>
            <p>
              <strong>{t('contact.emailLabel')}</strong>{" "}
              <EmailLink />
            </p>
          </Card>

          {/* Contact form */}
          <Card accent="green" className="md:col-span-3">
            <ContactForm />
          </Card>
        </div>
      </Section>

      <Footer />
    </div>
  );
}
