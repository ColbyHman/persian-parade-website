import React from "react";
import Footer from "../components/Footer"

export default function EventsPage() {
  return (
    <div>
      <div className="bg-white">
        <div className="bg-red-600 text-white py-20 px-6 text-center shadow-xl">
          <h1 className="text-5xl font-bold mb-4">Events</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Celebrate Persian culture with us. From parades to performances, this is where you'll find everything happening with the Persian Parade Foundation.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No upcoming events</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              There are no events scheduled at this time. Please check back soon, or
              follow our social media for announcements.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
