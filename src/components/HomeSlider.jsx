import React, { useRef, useState } from 'react';
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid';
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

/**
 * Full-width photo slider. `children` render as a fixed overlay on top of the
 * photos (the home hero's headline and buttons), so the message stays put
 * while the pictures move underneath.
 */
const HomeSlider = ({ children, className = '' }) => {
  const { dir, t } = useI18n();
  const swiperRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const togglePause = () => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay) return;
    if (paused) autoplay.start();
    else autoplay.stop();
    setPaused(!paused);
  };

  return (
    <div className={`home-slider relative w-full overflow-hidden bg-black ${className}`} role='region' aria-label={t('slider.label')}>
      <Swiper
        className='h-full'
        onSwiper={(sw) => {
          swiperRef.current = sw;
        }}
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
        // Photos sit edge to edge; any gap shows the black backdrop as a line.
        spaceBetween={0}
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
          <SwiperSlide key={src} className="flex h-full">
            <img
              {...imgProps(src, {
                alt: '',
                className: 'w-full h-full object-cover select-none',
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

      {children}

      {/* WCAG 2.2.2: anything that moves on its own needs a pause control. */}
      {!prefersReducedMotion && (
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={paused}
          className="absolute top-3 end-3 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-black/55 px-3 py-2 min-h-11 text-sm font-semibold text-white hover:bg-black/75"
        >
          {paused ? <PlayIcon aria-hidden="true" className="w-4 h-4" /> : <PauseIcon aria-hidden="true" className="w-4 h-4" />}
          {paused ? t('slider.play') : t('slider.pause')}
        </button>
      )}
    </div>
  );
};

export default HomeSlider;
