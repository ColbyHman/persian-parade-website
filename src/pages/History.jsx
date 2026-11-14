import React from 'react';
import FeedPost from '../components/FeedPost';
import posts from '../data/posts';
import Footer from '../components/Footer';
import { useI18n } from '../i18n';

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
    <div className="text-black bg-white">
      <section className="bg-pp-red text-white py-16 px-6">
        <div className="shadow-xl rounded-lg p-8 bg-pp-red-dark">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t('history.title')}
          </h1>
          <p className="max-w-2xl mx-auto text-center text-white">
            {t('history.intro')}
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          {years.map(year => (
            <div key={year} className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">{num(Number(year), { useGrouping: false })}</h2>
              <div className="flex flex-col gap-10 items-center">
                {postsByYear[year].map(post => (
                  <FeedPost key={post.id} post={post} />
                ))}
              </div>
            </div>
          ))}
          {years.length === 0 && (
            <p className="text-center text-gray-500">{t('history.empty')}</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default History;
