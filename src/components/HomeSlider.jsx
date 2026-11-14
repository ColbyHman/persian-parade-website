import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, Keyboard, A11y } from 'swiper/modules';
import { imgProps } from '../lib/images.js';
import { useI18n } from '../i18n';

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

// Respect the OS "reduce motion" setting: no autoplay, instant transitions.
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const HomeSlider = () => {
  const { dir, t } = useI18n();
  return (
    <div className='home-slider w-screen overflow-hidden bg-black' role='region' aria-label={t('slider.label')}>
      <Swiper
        // Swiper reads direction once at init, so remount when the language flips.
        key={dir}
        dir={dir}
        modules={[Navigation, Pagination, Autoplay, Keyboard, A11y]}
        navigation
        pagination={{ clickable: true }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        // A slower glide with an ease-in-out curve (set in index.css) instead
        // of Swiper's 300ms default, which read as a jump every few seconds.
        speed={prefersReducedMotion ? 0 : 900}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: 4500,
                // Keep rotating after someone clicks an arrow/dot, but hold
                // still while the pointer is over a photo.
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        loop={SLIDES.length > 1}
        spaceBetween={8}
        slidesPerView={1} // default fallback
        slidesPerGroup={1}
        // Don't let a fast swipe fling past several photos at once.
        resistanceRatio={0.6}
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
                className: 'w-full h-[50vh] object-cover select-none',
                sizes: SLIDE_SIZES,
                draggable: false,
                // Up to four slides are on screen at once on desktop, so load
                // the first row eagerly; lazy ones would pop in mid-glide.
                loading: idx < 4 ? 'eager' : 'lazy',
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
