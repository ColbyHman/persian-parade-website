import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const HomeSlider = () => {
  // Dynamically import all images from the folder
  const images = import.meta.glob('../assets/home_slider/*.{png,jpg,jpeg,gif}', { eager: true });
  const imageUrls = Object.values(images).map((mod) => mod.default);

  return (
    <div className='w-screen overflow-hidden bg-black'>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={imageUrls.length > 1}
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
        {imageUrls.map((src, idx) => (
          <SwiperSlide key={idx} className="flex">
            <img
              src={src}
              alt={`slide-${idx}`}
              className="w-full h-[50vh] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
