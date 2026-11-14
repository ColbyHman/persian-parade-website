import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useI18n } from '../i18n';

export default function ContactForm() {
  const { t } = useI18n();
  const [state, handleSubmit] = useForm("mdkzdgrw");

  if (state.succeeded) {
    return (
      <p className="text-pp-green-dark font-semibold text-lg">
        {t('form.thanks')}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block font-medium mb-1">
          {t('form.email')}
        </label>
        <input
          id="email"
          type="email"
          dir="ltr"
          name="email"
          required
          className="w-full border border-gray-300 rounded-md p-3"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
      </div>

      <div>
        <label htmlFor="message" className="block font-medium mb-1">
          {t('form.message')}
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
            className={`w-full bg-pp-red text-white font-semibold py-3 px-6 rounded-md transition hover:bg-pp-red-dark ${
                state.submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
        {state.submitting ? t('form.sending') : t('form.submit')}
        </button>
      </div>
    </form>
  );
}
