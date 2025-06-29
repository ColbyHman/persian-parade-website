import React from "react";
import Footer from "../components/Footer";

export default function SupportPage() {
  return (
    <div>
      {/* Support Us Banner - Red background with white text */}
      <div className="bg-red-600 text-white py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Support Us</h1>
        <p className="max-w-xl mx-auto text-center text-red-200">
          Explore ways you can support the Persian Parade Foundation and help us celebrate Persian culture.
        </p>
      </div>

      {/* Become a Member - White background, black text */}
      <div className="bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">Become a Member</h2>
          <p className="mb-6 leading-relaxed">
            Join our community by becoming a member of the Persian Parade Foundation. Members receive exclusive updates, early event invitations, and opportunities to shape the future of our cultural celebrations.
          </p>
          <p className="leading-relaxed">
            To become a member, please visit our{" "}
            <a href="/membership" className="underline text-red-600 hover:text-red-700">
              membership page
            </a>{" "}
            or contact us at{" "}
            <a href="mailto:info@persianparade.com" className="underline text-red-600 hover:text-red-700">
              info@persianparade.com
            </a>.
          </p>
        </div>
      </div>

      {/* Become a Sponsor - Red background, white text */}
      <div className="bg-red-600 text-white">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">Become a Sponsor</h2>
          <p className="mb-6 leading-relaxed">
            Sponsorships help us bring the Persian Parade to life each year. Your support promotes Iranian art, culture, and history to thousands of attendees.
          </p>
          <p className="leading-relaxed">
            Learn about sponsorship opportunities and benefits on our{" "}
            <a href="/sponsorship" className="underline !text-white hover:!text-red-300">
              sponsorship page
            </a>{" "}
            or reach out directly via{" "}
            <a href="mailto:info@persianparade.com" className="underline !text-white hover:!text-red-300">
              info@persianparade.com
            </a>.
          </p>
        </div>
      </div>

      {/* Become a Volunteer - White background, black text */}
      <div className="bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">Become a Volunteer</h2>
          <p className="mb-6 leading-relaxed">
            Help us create an unforgettable Persian Parade by volunteering your time and talents. We invite you to join one of the following committees:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Art &amp; Design</li>
            <li>Dance</li>
            <li>Fundraising</li>
            <li>Public Relations</li>
            <li>Cultural &amp; Education</li>
            <li>Digital Media</li>
            <li>Events Planning</li>
            <li>Music</li>
          </ul>

          <p className="mb-6 leading-relaxed">
            Currently, we have openings for:
          </p>

          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Artistic Director</li>
            <li>Director of Digital Media</li>
          </ul>

          <p className="leading-relaxed">
            If you're interested, please send your resume and a brief summary of your skills to{" "}
            <a href="mailto:info@persianparade.com" className="underline text-red-600 hover:text-red-700">
              info@persianparade.com
            </a>. We will contact you if your background matches our current needs.
          </p>
        </div>
      </div>

      {/* Become a Donor - Red background, white text */}
      <div className="bg-red-600 text-white">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-12 rounded-none">
          <h2 className="text-3xl font-semibold mb-6">Become a Donor</h2>
          <p className="leading-relaxed">
            Your generous donations help sustain our mission to promote Persian art, culture, and community spirit year-round. Every contribution makes a difference.
          </p>
          <p className="mt-6 leading-relaxed">
            To donate, please visit our{" "}
            <a href="/donate" className="underline !text-white hover:!text-red-300">
              donation page
            </a>{" "}
            or contact us for more information at{" "}
            <a href="mailto:info@persianparade.com" className="underline !text-white hover:!text-red-300">
              info@persianparade.com
            </a>.
          </p>
        </div>
      <Footer />
      </div>
    </div>
  );
}
