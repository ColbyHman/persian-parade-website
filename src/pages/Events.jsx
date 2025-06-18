import React from "react";
import Footer from "../components/Footer"

export default function EventsPage() {
  return (
    <div>
      <div className="bg-white">
        <div className="bg-red-600 text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Celebrate Persian culture with us. From parades to performances, this is where you'll find everything happening with the Persian Parade Foundation.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Upcoming Events</h2>
          <p className="text-gray-600 mb-6">
            We currently have no upcoming events scheduled. We're working behind the scenes to bring you more opportunities to connect and celebrate our heritage.
          </p>
          <p className="text-gray-600 mb-8">
            In the meantime, stay in touch by following us on social media.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/contact-us"
              className="border border-red-600 text-red-600 px-6 py-2 rounded-full font-medium hover:bg-red-50 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
