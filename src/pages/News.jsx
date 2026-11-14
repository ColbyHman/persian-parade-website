import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FeedPost from '../components/FeedPost';
import Footer from '../components/Footer';
import posts from '../data/posts';
import { useI18n, LocalLink } from '../i18n';
import { PageHeader, Section, proseLink } from '../components/ui';

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
      <PageHeader title={t('nav.news')} intro={t('news.intro')} image="/images/slider/Sol1.jpg" />
      <Section>
        <div className="max-w-3xl mx-auto flex flex-col gap-5 sm:gap-8">
          {posts.filter((post) => !post.hidden).map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
          <p className="text-center">
            <LocalLink to="/post-history" className={`${proseLink} min-h-11 inline-flex items-center`}>
              {t('news.archiveLink')}
            </LocalLink>
          </p>
        </div>
      </Section>
      <Footer />
    </div>
  );
}
