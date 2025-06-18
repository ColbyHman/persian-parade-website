import React from "react";
import SponsorTier from "../components/SponsorTier";

export default function SponsorsPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="bg-red-600 text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Become a Sponsor</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Partner with the Persian Parade Foundation to support cultural celebration, community pride, and the promotion of Iranian heritage in New York City.
        </p>
      </div>

      {/* Sponsorship Tiers */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">Sponsorship Levels</h2>
          <div className="space-y-12">
            <SponsorTier
              name="Cyrus Cylinder Guild"
              amount="$10,000"
              benefits={[
                "Table for 10 at two Persian Parade Galas during the Parade year",
                "VIP seating at two Persian Parade Galas",
                "Special recognition on the Persian Parade website and at Galas",
                "Advertising with long banners along both sides of a float of your choice",
              ]}
            />
            <SponsorTier
              name="Persepolis Patron"
              amount="$7,500"
              benefits={[
                "Table for 10 at one Persian Parade Gala",
                "VIP seating at one Persian Parade Gala",
                "Special recognition on the Persian Parade website and at Gala",
                "Advertising with long banners along one side of a float of your choice",
              ]}
            />
            <SponsorTier
              name="Float Sponsor"
              amount="$5,000"
              benefits={[
                "4 tickets to one Persian Parade Gala",
                "Custom artistic design request for float (subject to Executive Board approval)",
                "Recognition on website and at Gala",
                "Long banner along one side of a float of your choice",
              ]}
            />
          </div>
        </section>

        {/* Advertising Sponsorship */}
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-center">Advertising Sponsorship</h2>
          <div className="space-y-12">
            <SponsorTier
              name="Sponsor"
              amount="$2,000"
              benefits={[
                "Display long banners along both sides of a float of your choice",
                "Acknowledgment on the Persian Parade website for one year",
                "Subject to Executive Board approval",
              ]}
            />
            <SponsorTier
              name="Sponsor"
              amount="$1,000"
              benefits={[
                "Display a long banner along one side of a float, OR",
                "Display two small banners along both sides of a float",
                "Acknowledgment on the website for one year",
                "Subject to Executive Board approval",
              ]}
            />
            <SponsorTier
              name="Sponsor"
              amount="$500"
              benefits={[
                "Display a small banner on one side of a float",
                "Acknowledgment on the website for one year",
                "Subject to Executive Board approval",
              ]}
            />
          </div>
        </section>

        {/* Friends of the Parade */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Friends of the Persian Parade</h2>
          <p className="text-gray-700">
            We welcome donations of any amount. Every contribution helps us sustain and grow this cultural celebration.
          </p>
        </section>

        {/* Corporate Partnerships */}
        <section className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">Corporate Partnership</h2>
          <p className="text-gray-700 text-lg mb-4 text-center max-w-3xl mx-auto">
            We collaborate with corporations to develop customized partnerships that align with your business goals. Enjoy exclusive co-branding, employee access, float advertising, and recognition across our digital and physical platforms.
          </p>
          <p className="text-center text-gray-700">
            For partnership inquiries, please contact our Office of Public Relations at{" "}
            <a
              href="mailto:PR@PersianParade.com"
              className="text-red-600 underline hover:text-red-800"
            >
              PR@PersianParade.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}


