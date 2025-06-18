import React from "react";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

export default function ContactPage() {
  return (
    <div>
      {/* Page Banner */}
      <div className="bg-red-600 text-white py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-4">Contact Us</h1>
        <p className="max-w-xl mx-auto text-center text-red-200">
          We'd love to hear from you. Reach out with any questions, suggestions, or collaboration ideas.
        </p>
      </div>

      {/* Contact Section */}
      <div className="bg-white text-black">
        <div className="max-w-screen-xl mx-auto px-10 md:px-24 lg:px-40 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <p className="mb-4">
                For general inquiries or to get involved with the Persian Parade Foundation, please contact us using the form or the details below.
              </p>
              <div className="space-y-4 mt-6">
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@persianparade.com" className="text-red-600 underline hover:text-red-700">
                    info@persianparade.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong> (123) 456-7890
                </p>
                <p>
                  <strong>Address:</strong><br />
                  Persian Parade Foundation<br />
                  123 Celebration Ave<br />
                  New York, NY 10001
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
