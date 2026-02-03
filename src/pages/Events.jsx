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

        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 flex items-center justify-center bg-gray-50">
                <img
                  src="/images/chaharshanbeh_souri_26.jpg"
                  alt="Chaharshanbeh Souri Celebration"
                  className="w-full h-auto object-contain max-h-full"
                />
              </div>
              <div className="md:w-1/2 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Chaharshanbeh Souri</h2>
                <p className="text-gray-600 mb-6">
                  Join us for Chaharshanbeh Souri for a night of music, dancing, and traditional fire-jumping!
                </p>
                <div className="mb-8">
                  <p className="text-gray-700 font-medium">Location: Fiesta Catering Hall</p>
                  <p className="text-gray-700 font-medium">255 Route 17, Woodridge, NJ</p>
                  <p className="text-gray-700 font-medium">Date: March 15, 2026</p>
                  <p className="text-gray-700 font-medium">Time: 6:00 PM - 11:00 PM</p>
                  <br/>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-gray-700 font-medium">Adults:</span>
                    <span className="text-gray-800 font-semibold">$120</span>
                    <span className="text-gray-500 text-sm">per ticket</span>
                  </div>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-gray-700 font-medium">Children Under 12:</span>
                    <span className="text-gray-800 font-semibold">$80</span>
                    <span className="text-gray-500 text-sm">per ticket</span>
                  </div>
                </div>
                <a
                  href="https://shop.persianparade.com/collections/all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-medium hover:bg-red-700 transition text-center"
                >
                  Buy Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
