import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useI18n } from '../i18n';

const FIELD =
  'w-full rounded-lg border border-stone-300 bg-white px-4 text-pp-ink shadow-sm transition ' +
  'hover:border-stone-400 focus:border-pp-green-dark focus:ring-2 focus:ring-pp-green-dark/30';
const LABEL = 'block font-semibold mb-1';
const ERROR = 'mt-1 text-sm font-semibold text-pp-red-dark';

export default function ContactForm() {
  const { t } = useI18n();
  const [state, handleSubmit] = useForm("mdkzdgrw");

  if (state.succeeded) {
    return (
      <div role="status" className="rounded-xl border border-stone-200 border-t-4 border-t-pp-green bg-white p-5 flex items-start gap-3">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="w-7 h-7 shrink-0 text-pp-green-dark" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="m7.5 12.5 3 3 6-6" />
        </svg>
        <p className="text-pp-green-dark font-semibold text-lg">
          {t('form.thanks')}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-start">
      <div>
        <label htmlFor="email" className={LABEL}>
          {t('form.email')}
        </label>
        <input
          id="email"
          type="email"
          dir="ltr"
          name="email"
          autoComplete="email"
          required
          className={`${FIELD} h-12`}
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} className={ERROR} />
      </div>

      <div>
        <label htmlFor="message" className={LABEL}>
          {t('form.message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          className={`${FIELD} py-3 h-32 sm:h-40 resize-y`}
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} className={ERROR} />
      </div>

      <ValidationError errors={state.errors} className={ERROR} />

      <button
        type="submit"
        disabled={state.submitting}
        className={`w-full sm:w-auto min-h-12 px-8 rounded-full bg-pp-red text-white font-bold transition hover:bg-pp-red-dark ${
          state.submitting ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        {state.submitting ? t('form.sending') : t('form.submit')}
      </button>
    </form>
  );
}
