import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { imgProps } from '../lib/images.js';

// Slides live in public/images/slider so scripts/optimize-images.mjs can give
// each one @400w/@800w variants and an intrinsic size. They used to sit in
// src/assets behind an eager import.meta.glob, which pulled all 7 photos
// (6.5MB, five of them 2560px wide) into the initial page load.
const SLIDES = [
  '/images/slider/ZFNY-416-scaled.jpg',
  '/images/slider/ZFNY-131-scaled.jpg',
  '/images/slider/ZFNY-586-scaled.jpg',
  '/images/slider/ZFNY-404-scaled.jpg',
  '/images/slider/2023-Dedication-Banner1.jpg',
  '/images/slider/Sol1.jpg',
  '/images/slider/ZFNY-1-scaled.jpg',
];

// A slide is one quarter of the viewport at 1440px and full width on mobile.
const SLIDE_SIZES =
  '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 33vw, 25vw';

const HomeSlider = () => {
  return (
    <div className='w-screen overflow-hidden bg-black'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={SLIDES.length > 1}
        spaceBetween={20}
        slidesPerView={1} // default fallback
        slidesPerGroup={1}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1440: {
            slidesPerView: 4,
          },
        }}
      >
        {SLIDES.map((src, idx) => (
          <SwiperSlide key={src} className="flex">
            <img
              {...imgProps(src, {
                alt: '',
                className: 'w-full h-[50vh] object-cover',
                sizes: SLIDE_SIZES,
                // First slide is the LCP element; the rest can wait.
                loading: idx === 0 ? 'eager' : 'lazy',
                fetchPriority: idx === 0 ? 'high' : 'auto',
              })}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
