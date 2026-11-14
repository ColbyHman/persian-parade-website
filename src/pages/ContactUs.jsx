import React from "react";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { useI18n } from "../i18n";

export default function ContactPage() {
  const { t } = useI18n();
  return (
    <div>
      {/* Page Banner */}
      <div className="bg-red-600 text-white py-16 px-6 shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-4">{t('contact.title')}</h1>
        <p className="max-w-xl mx-auto text-center text-red-200">
          {t('contact.intro')}
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">{t('contact.getInTouch')}</h2>
              <p className="mb-4">
                {t('contact.body')}
              </p>
              <div className="space-y-4 mt-6">
                <p>
                  <strong>{t('contact.emailLabel')}</strong>{" "}
                  <a href="mailto:info@persianparade.com" dir="ltr" className="text-red-600 underline hover:text-red-700">
                    info@persianparade.com
                  </a>
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm/>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
