import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mdkzdgrw");

  if (state.succeeded) {
    return (
      <p className="text-green-600 font-semibold text-lg">
        Thanks for your message! We’ll be in touch soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div>
        <label htmlFor="message" className="block font-medium mb-1">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="w-full border border-gray-300 rounded-md p-3 h-32 resize-none"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
      </div>

      <div>
        <button
            type="submit"
            disabled={state.submitting}
            className={`w-full bg-red-600 text-white font-semibold py-3 px-6 rounded-md transition hover:bg-red-700 ${
                state.submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ backgroundColor: "red" }}
        >
        {state.submitting ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
