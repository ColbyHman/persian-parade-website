import React, { useState } from 'react';
import Footer from '../components/Footer.jsx';
import PressArchive from '../components/pressArchive.jsx';
import voaLogo from '../assets/voa_logo.png';
import nycParadeLifeLogo from '../assets/nyc-parade-life.png';
import { useI18n } from '../i18n';
import { PageHeader, Section, Card } from '../components/ui';

// `logo: true` = outlet logo (shown whole on white); otherwise a YouTube
// thumbnail that fills the 16:9 box.
const pressPosts = [
  {
    year: 2023,
    title: 'Aftab Dance Group',
    url: 'https://www.youtube.com/watch?v=ml_kwt7PRNU',
    image: 'https://img.youtube.com/vi/ml_kwt7PRNU/hqdefault.jpg',
  },
  {
    year: 2023,
    title: 'CBS New York',
    url: 'https://www.youtube.com/watch?v=0Izd2iDa7GA',
    image: 'https://img.youtube.com/vi/0Izd2iDa7GA/hqdefault.jpg',
  },
  {
    year: 2022,
    title: 'Manoto Plus TV',
    url: 'https://www.youtube.com/watch?v=AO5vILzpNTA',
    image: 'https://img.youtube.com/vi/AO5vILzpNTA/hqdefault.jpg',
  },
  {
    year: 2019,
    title: 'Voice of America Persian',
    url: 'https://ir.voanews.com/a/new-york/4876505.html',
    image: voaLogo,
    logo: true,
  },
  {
    year: 2019,
    title: 'NYCParadeLife.com Article',
    url: 'https://nycparadelife.com/?s=persian&amp;submit=Search',
    image: nycParadeLifeLogo,
    logo: true,
  },
  {
    year: 2019,
    title: 'NYCParadeLife.com Video',
    url: 'https://www.youtube.com/watch?v=5lrOzHYmJSE',
    image: 'https://img.youtube.com/vi/5lrOzHYmJSE/hqdefault.jpg',
  },
];

// Let long domain names wrap before ".com" instead of mid-word on phones.
function Breakable({ text }) {
  const parts = text.split(/(?=\.com)/);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <wbr />}
      {part}
    </React.Fragment>
  ));
}

function PlayIcon() {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 size-9 sm:size-14 rounded-full bg-black/60 flex items-center justify-center"
    >
      <svg viewBox="0 0 24 24" className="size-5 sm:size-7 fill-white ms-0.5" focusable="false">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

function PressCard({ post }) {
  const { t, num } = useI18n();
  // External thumbnails can fail (blocked, removed video): fall back to the
  // outlet name on a dark panel so the grid keeps its shape.
  const [failed, setFailed] = useState(false);
  const isVideo = !post.logo;
  return (
    <Card
      as="a"
      accent={isVideo ? 'red' : 'green'}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group !p-0 overflow-hidden flex flex-col h-full no-underline !text-pp-ink hover:shadow-md transition"
    >
      <span
        className={`relative block aspect-video overflow-hidden ${post.logo ? 'bg-white border-b border-stone-200' : 'bg-pp-ink'}`}
      >
        {failed ? (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 sm:gap-2 p-2 text-center font-serif font-bold text-white text-sm sm:text-xl [overflow-wrap:anywhere]">
            {isVideo && <PlayIcon />}
            <Breakable text={post.title} />
          </span>
        ) : (
          <>
            <img
              src={post.image}
              alt=""
              onError={() => setFailed(true)}
              className={`absolute inset-0 w-full h-full ${post.logo ? 'object-contain p-3 sm:p-6' : 'object-cover group-hover:scale-105 transition-transform duration-300 motion-reduce:transition-none'}`}
              width={480}
              height={270}
              loading="lazy"
              decoding="async"
            />
            {isVideo && (
              <span className="absolute inset-0 flex items-center justify-center">
                <PlayIcon />
              </span>
            )}
          </>
        )}
      </span>
      <span className="block px-2.5 py-3 sm:p-5 text-start">
        <span className="block text-sm sm:text-base font-bold text-pp-gold-text">
          {num(post.year, { useGrouping: false })}
          {isVideo && <> · {t('press.video')}</>}
        </span>
        <span className="block font-bold text-[0.95rem] sm:text-xl leading-snug [overflow-wrap:anywhere]">
          <Breakable text={post.title} />
          <span className="sr-only"> {t('press.newTab')}</span>
          {'\u00a0'}
          <span aria-hidden="true" className="text-pp-green-dark inline-block rtl:-scale-x-100">
            ↗
          </span>
        </span>
      </span>
    </Card>
  );
}

export default function PressRoom() {
  const { t } = useI18n();
  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('press.title')} intro={t('press.intro')} image="/images/slider/ZFNY-404-scaled.jpg" />

      <Section title={t('press.featured')} tone="white">
        <ul className="grid gap-3 sm:gap-6 grid-cols-2 lg:grid-cols-3">
          {pressPosts.map((post) => (
            <li key={post.url}>
              <PressCard post={post} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t('press.archive')}>
        <PressArchive />
      </Section>
      <Footer />
    </div>
  );
}
