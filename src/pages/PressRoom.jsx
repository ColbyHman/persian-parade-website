import React from 'react';
import Footer from '../components/Footer.jsx'
import PressArchive from '../components/pressArchive.jsx';
import voaLogo from '../assets/voa_logo.png';
import nycParadeLifeLogo from '../assets/nyc-parade-life.png';

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
  },
  {
    year: 2019,
    title: 'NYCParadeLife.com Article',
    url: 'https://nycparadelife.com/?s=persian&amp;submit=Search',
    image: nycParadeLifeLogo,
  },
  {
    year: 2019,
    title: 'NYCParadeLife.com Video',
    url: 'https://www.youtube.com/watch?v=5lrOzHYmJSE',
    image: 'https://img.youtube.com/vi/5lrOzHYmJSE/hqdefault.jpg',
  },
];

export default function PressRoom() {
  return (
    <div>
      <div className="bg-red-600 w-full py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Press Room</h1>
          <h2 className="text-lg max-w-3xl mx-auto">
            Explore our latest press coverage, videos, and articles showcasing the Persian Parade's rich cultural history and community impact.
          </h2>
        </div>
      </div>
      <div className="text-black py-20 px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressPosts.map((post, index) => (
            <a
              key={index}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded shadow-lg hover:shadow-xl transition p-4 flex flex-col items-center text-center"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.blurb}</p>
            </a>
          ))}
        </div>
        <PressArchive/>
      </div>
      <Footer/>
    </div>
  );
}
