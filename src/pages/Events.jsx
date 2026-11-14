import React from "react";
import Footer from "../components/Footer"
import { useI18n } from "../i18n";

export default function EventsPage() {
  const { t } = useI18n();
  return (
    <div>
      <div className="bg-white">
        <div className="bg-red-600 text-white py-20 px-6 text-center shadow-xl">
          <h1 className="text-5xl font-bold mb-4">{t('events.title')}</h1>
          <p className="text-lg max-w-2xl mx-auto">
            {t('events.intro')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t('events.noneTitle')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('events.noneBody')}
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
