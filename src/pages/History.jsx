import React from 'react';
import FeedPost from '../components/FeedPost';
import posts from '../data/posts';
import Footer from '../components/Footer';
import { useI18n } from '../i18n';
import { PageHeader, Section } from '../components/ui';

const History = () => {
  const { t, num } = useI18n();
  const hiddenPosts = posts.filter(post => post.hidden);

  const postsByYear = hiddenPosts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {});

  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  return (
    <div className="bg-pp-paper text-pp-ink">
      <PageHeader title={t('history.title')} intro={t('history.intro')} image="/images/slider/ZFNY-131-scaled.jpg" />

      <Section>
        <div className="max-w-3xl mx-auto">
          {years.map(year => (
            <section key={year} aria-labelledby={`year-${year}`} className="mb-8 sm:mb-12 last:mb-0">
              <h2
                id={`year-${year}`}
                className="font-serif font-bold text-2xl sm:text-3xl mb-4 sm:mb-6 pb-2 border-b-2 border-pp-gold"
              >
                {num(Number(year), { useGrouping: false })}
              </h2>
              <div className="flex flex-col gap-5 sm:gap-8">
                {postsByYear[year].map(post => (
                  <FeedPost key={post.id} post={post} headingLevel={3} />
                ))}
              </div>
            </section>
          ))}
          {years.length === 0 && (
            <p className="text-center text-stone-600">{t('history.empty')}</p>
          )}
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default History;
