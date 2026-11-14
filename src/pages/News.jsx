import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FeedPost from '../components/FeedPost';
import Footer from '../components/Footer';
import posts from '../data/posts';
import { useI18n, LocalLink } from '../i18n';

// Every current (non-hidden) post in full. Home-page news cards link here as
// /news#post-<id>; archived posts stay on /post-history.
export default function News() {
  const { t } = useI18n();
  const { hash } = useLocation();

  // React Router doesn't scroll to #anchors on client-side navigation.
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    if (el) el.scrollIntoView({ block: 'start' });
  }, [hash]);

  return (
    <div className="bg-pp-paper text-pp-ink">
      <div className="bg-pp-red text-white py-14 px-6 text-center">
        <h1 className="text-4xl font-bold mb-3">{t('nav.news')}</h1>
        <p className="max-w-2xl mx-auto">{t('news.intro')}</p>
      </div>
      <section className="py-10 px-4 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 items-center">
          {posts.filter((post) => !post.hidden).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
          <LocalLink to="/post-history" className="font-bold text-pp-green-dark hover:text-pp-green-dark hover:underline min-h-11 inline-flex items-center">
            {t('news.archiveLink')}
          </LocalLink>
        </div>
      </section>
      <Footer />
    </div>
  );
}
