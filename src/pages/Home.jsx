import React from 'react';
import HomeSlider from '../components/HomeSlider';
import FeedPost from '../components/FeedPost';
import posts from '../data/posts';
import Footer from '../components/Footer';
import { imgProps } from '../lib/images';
import { useI18n } from '../i18n';

const Home = () => {
  const { t } = useI18n();
  return (
    <div className="text-black bg-white">
      {/* Slider */}
      <HomeSlider />

      {/* Red Welcome Banner */}
      <section className="bg-red-600 text-white py-16 px-6">
        <div className="shadow-xl rounded-lg p-8 bg-red-700">
          <h1 className="text-4xl font-bold text-center mb-4">
            {t('home.welcome')}
          </h1>
          <p className="max-w-2xl mx-auto text-center text-red-200">
            {t('home.tagline')}
          </p>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="bg-gray-50 py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-10">{t('home.recentPosts')}</h2>

          <div className="flex flex-col gap-10 items-center">
            {posts.filter(post => !post.hidden).map(post => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="bg-gray-50 py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">{t('home.ourSponsors')}</h2>
          <div className="flex flex-col items-center gap-8">
            <img
              {...imgProps('/images/aha-ad.jpg', {
                alt: t('home.sponsorAlt'),
                className: "max-w-md w-full h-auto rounded-lg shadow-md",
                sizes: "(max-width: 448px) 100vw, 448px",
                loading: "lazy",
              })}
            />
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="bg-red-600 text-white pb-16 px-4 md:px-12">
        <div className="max-w-4xl mx-auto text-center pt-8">
          <h2 className="text-3xl font-bold mb-4">{t('home.supportHeading')}</h2>
          <p className="text-lg mb-6 text-red-100">
            {t('common.donationAppeal')}
          </p>
          <a
            href="https://shop.persianparade.com/collections/donations"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-red-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition"
          >
            {t('cta.donateNow')}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
