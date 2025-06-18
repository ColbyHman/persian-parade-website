import React from 'react';
import HomeSlider from '../components/HomeSlider';
import FeedPost from '../components/FeedPost';
import posts from '../data/posts';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="text-black bg-white">
      {/* Slider */}
      <HomeSlider />

      {/* Red Welcome Banner */}
      <section className="bg-red-600 text-white py-16 px-6">
        <h1 className="text-4xl font-bold text-center mb-4">
          Welcome to the Persian Parade Foundation
        </h1>
        <p className="max-w-2xl mx-auto text-center text-red-200">
          Celebrating Persian culture, heritage, and community with pride and unity.
        </p>
      </section>

      {/* Recent Posts Section */}
      <section className="bg-gray-50 py-12 px-4 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Recent Posts</h2>

          <div className="flex flex-col gap-10 items-center">
            {posts.map(post => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
