import React from 'react';
import HomeSlider from '../components/HomeSlider';
import Footer from '../components/Footer';
import posts from '../data/posts';
import parade from '../data/parade';
import { imgProps } from '../lib/images';
import { useI18n, LocalLink } from '../i18n';

const visiblePosts = posts.filter((post) => !post.hidden);

/** First readable line of a post, for a card teaser. */
function excerpt(post) {
  if (post.description) return post.description;
  for (const item of post.content ?? []) {
    if (typeof item === 'string') return item;
    if (item.type === 'paragraph') return item.text;
  }
  return post.caption?.split(' | ')[0] ?? '';
}

function Hero() {
  const { t, lang } = useI18n();
  const when = parade.date
    ? new Date(`${parade.date}T12:00:00`).toLocaleDateString(lang === 'fa' ? 'fa-IR-u-ca-gregory' : 'en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : t('hero.dateTba');

  return (
    <HomeSlider className="h-[420px] sm:h-[66vh] sm:min-h-[480px]">
      {/* Fade so white text stays readable on any photo: from the bottom on
          phones, from the start edge on wider screens. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/70 via-45% to-transparent to-80% sm:bg-gradient-to-r sm:rtl:bg-gradient-to-l sm:from-black/85 sm:via-black/50 sm:to-transparent sm:to-75%"
      />
      <div className="absolute z-10 inset-x-0 bottom-0 px-4 pb-5 sm:inset-x-auto sm:start-18 sm:bottom-14 sm:max-w-xl sm:px-0 sm:pb-0 text-white">
        <p className="hidden sm:block font-bold text-pp-gold">{t('hero.eyebrow')}</p>
        <h1 className="font-serif font-bold leading-tight text-[1.75rem] sm:text-5xl mt-0 sm:mt-2 mb-2">
          {t('hero.title')}
        </h1>
        <p className="mb-4 sm:mb-6 text-base sm:text-lg">
          <strong>{when}</strong> · {t('hero.route')}
        </p>
        <div className="flex gap-2.5 sm:gap-3">
          <LocalLink
            to="/donate"
            className="flex-1 sm:flex-none inline-flex items-center justify-center min-h-13 px-3 sm:px-7 rounded-full bg-pp-red !text-white font-bold hover:bg-pp-red-dark no-underline"
          >
            <span className="sm:hidden">{t('nav.donate')}</span>
            <span className="hidden sm:inline">{t('hero.donate')}</span>
          </LocalLink>
          <LocalLink
            to="/support"
            className="flex-1 sm:flex-none inline-flex items-center justify-center min-h-13 px-3 sm:px-7 rounded-full border-2 border-white !text-white font-bold hover:bg-white/10 no-underline"
          >
            <span className="sm:hidden">{t('hero.involvedShort')}</span>
            <span className="hidden sm:inline">{t('hero.involved')}</span>
          </LocalLink>
        </div>
      </div>
    </HomeSlider>
  );
}

const TILES = [
  { key: 'donate', to: '/donate', accent: 'red' },
  { key: 'march', to: '/contact-us', accent: 'green' },
  { key: 'sponsor', to: '/sponsors', accent: 'green' },
  { key: 'volunteer', to: '/support', accent: 'green' },
];

function GetInvolved() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-7 sm:px-10 sm:py-14">
      <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-3.5 sm:mb-6">{t('involved.title')}</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
        {TILES.map(({ key, to, accent }) => (
          <LocalLink
            key={key}
            to={to}
            className={`group flex sm:block items-center justify-between min-h-16 rounded-xl border border-stone-200 border-t-4 bg-white p-3.5 sm:p-6 no-underline !text-pp-ink hover:shadow-md transition ${
              accent === 'red' ? 'border-t-pp-red' : 'border-t-pp-green'
            }`}
          >
            <span className="block font-bold text-[1.05rem] sm:text-xl sm:mb-1.5">{t(`involved.${key}.title`)}</span>
            <span className="hidden sm:block text-gray-700 mb-3">{t(`involved.${key}.body`)}</span>
            <span
              aria-hidden="true"
              className={`font-bold ${accent === 'red' ? 'text-pp-red' : 'text-pp-green-dark'} group-hover:underline`}
            >
              <span className="hidden sm:inline">{t(`involved.${key}.cta`)} </span>
              <span className="inline-block rtl:-scale-x-100">→</span>
            </span>
          </LocalLink>
        ))}
      </div>
    </section>
  );
}

function NewsCard({ post }) {
  const { t, lang } = useI18n();
  const [y, m, d] = post.date.split('-').map(Number);
  const date = new Date(y, m - 1, d).toLocaleDateString(lang === 'fa' ? 'fa-IR-u-ca-gregory' : 'en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return (
    <LocalLink
      to={`/news#post-${post.id}`}
      className="group flex-[0_0_78%] sm:flex-none snap-start flex flex-col overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition no-underline !text-pp-ink"
    >
      {post.imageUrl ? (
        <img
          {...imgProps(post.imageUrl, {
            alt: '',
            className: 'w-full h-36 sm:h-48 object-cover',
            sizes: '(max-width: 640px) 78vw, 33vw',
            loading: 'lazy',
          })}
        />
      ) : (
        // Text-only posts get a branded panel instead of a photo.
        <div aria-hidden="true" className="h-36 sm:h-48 bg-pp-ink flex flex-col justify-end">
          <span className="px-4 pb-3 font-serif text-xl font-bold text-pp-gold">{t('site.name')}</span>
          <span className="flag-rule" />
        </div>
      )}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <span className="text-sm font-bold text-pp-gold-text">{date}</span>
        {/* Posts are English-only for now; keep them LTR on Farsi pages. */}
        <span lang="en" dir="ltr" className="font-bold text-lg leading-snug line-clamp-2 sm:line-clamp-none group-hover:underline">
          {post.title}
        </span>
        <span lang="en" dir="ltr" className="hidden sm:block text-gray-700 line-clamp-3">
          {excerpt(post)}
        </span>
      </div>
    </LocalLink>
  );
}

function LatestNews() {
  const { t, lang } = useI18n();
  return (
    <section className="bg-white px-4 py-7 sm:px-10 sm:py-14">
      <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-3.5 sm:mb-6">{t('news.title')}</h2>
      {lang === 'fa' && <p className="text-sm text-gray-600 -mt-2 mb-3">{t('lang.englishOnly')}</p>}
      {/* Swipe sideways on phones; a 3-column grid from 640px up. */}
      <div className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory -mx-4 px-4 pb-1.5 sm:m-0 sm:p-0">
        {visiblePosts.slice(0, 3).map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
      <LocalLink
        to="/news"
        className="mt-3 sm:mt-6 inline-flex items-center min-h-11 font-bold text-pp-green-dark hover:text-pp-green-dark hover:underline"
      >
        {t('news.seeAll')} <span className="inline-block ms-1 rtl:-scale-x-100">→</span>
      </LocalLink>
    </section>
  );
}

function Sponsors() {
  const { t } = useI18n();
  return (
    <section className="px-4 py-7 sm:px-10 sm:py-14">
      <h2 className="font-serif font-bold text-2xl sm:text-3xl mb-3.5 sm:mb-6">{t('home.ourSponsors')}</h2>
      <div className="flex items-center gap-3.5 sm:gap-7 rounded-xl bg-white p-3 sm:p-5">
        <img
          {...imgProps('/images/aha-ad.jpg', {
            alt: t('home.sponsorAlt'),
            className: 'w-24 sm:w-56 h-auto rounded-lg',
            sizes: '(max-width: 640px) 96px, 224px',
            loading: 'lazy',
          })}
        />
        <div>
          <p className="font-bold sm:text-lg"><bdi dir="ltr">AHA Inc.</bdi></p>
          <p className="text-[0.95rem] sm:text-base text-gray-700 mb-1">{t('sponsors.ahaDesc')}</p>
          <p className="text-[0.95rem] sm:text-base">
            {t('sponsorsStrip.thanks')}{' '}
            <LocalLink to="/sponsors" className="font-bold text-pp-green-dark hover:text-pp-green-dark hover:underline">
              {t('sponsorsStrip.become')} <span className="inline-block rtl:-scale-x-100">→</span>
            </LocalLink>
          </p>
        </div>
      </div>
    </section>
  );
}

const Home = () => (
  <div className="bg-pp-paper text-pp-ink text-start">
    <Hero />
    <div className="flag-rule" />
    <GetInvolved />
    <LatestNews />
    <Sponsors />
    <Footer />
  </div>
);

export default Home;
