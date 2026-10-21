import React, { useEffect } from 'react';
import Footer from '../components/Footer';

export default function DonationPage() {
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
    <div>
      {/* Donation Banner - Red background with white text */}
      <div className="bg-red-600 text-white py-16 px-6 shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-4">Donate</h1>
        <p className="max-w-xl mx-auto text-center text-red-200">
          Your generous support helps sustain our mission to promote Persian art, culture, and community spirit year-round.
          Every contribution makes a difference.
        </p>
      </div>

      {/* Zeffy Donation Form */}
      <div className="bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-semibold mb-4">Make a Donation</h2>
            <p className="leading-relaxed text-gray-700 max-w-2xl mx-auto">
              All donations are processed securely through Zeffy, a 0% fee fundraising platform.
              100% of your donation goes directly to the Persian Parade Foundation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Zeffy Embed */}
            <div data-zeffy-embed data-form-url="/embed/donation-form/donate-to-the-persian-parade-foundation"></div>

            {/* Fallback iframe if JavaScript fails */}
            <div data-zeffy-embed-fallback style={{ display: 'none' }}>
              <div style={{ position: 'relative', overflow: 'hidden', height: '600px', width: '100%' }}>
                <iframe
                  title="Donation form powered by Zeffy"
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
                  allowpaymentrequest
                  allowTransparency="true"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Alternative contact info */}
          <div className="mt-12 text-center text-gray-600">
            <p className="leading-relaxed">
              Prefer to donate by check or have questions? Contact us at{' '}
              <a href="mailto:info@persianparade.com" className="underline text-red-600 hover:text-red-700">
                info@persianparade.com
              </a>
            </p>
            <p className="leading-relaxed mt-2">
              Persian Parade Foundation is a 501(c)(3) non-profit organization. Your donation is tax-deductible to the
              extent allowed by law. EIN: 83-4668094
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
