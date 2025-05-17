import React from 'react';
import HomeSlider from '../components/HomeSlider';
import FeedPost from '../components/FeedPost';
import posts from '../data/posts';
import Footer from '../components/Footer';


const Home = () => {
  return (
    <div>
      <HomeSlider />
      <div className="flex flex-col items-center gap-6 p-2">
        {posts.map(post => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
