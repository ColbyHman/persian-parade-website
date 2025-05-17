import React from 'react';
import HomeSlider from '../components/HomeSlider';
import FeedPost from '../components/FeedPost';
import posts from '../data/posts'


const Home = () => {
  return (
    <div>
      <HomeSlider />
      <div className="flex flex-col items-center gap-6">
        {posts.map(post => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
