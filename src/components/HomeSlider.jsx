import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const HomeSlider = () => {
  // Dynamically import all images from the folder
  const images = import.meta.glob('../assets/home_slider/*.{png,jpg,jpeg,gif}', { eager: true });

  // images is an object: { './assets/slider/img1.jpg': Module, ... }
  const imageUrls = Object.values(images).map((mod) => mod.default);

  return (
    <div className='w-full h-[400px] md:h-[500px]'>
        <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000 }}
        loop={imageUrls.length > 1}
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        >
        {imageUrls.map((src, idx) => (
            <SwiperSlide key={idx}>
            <img src={src} alt={`slide-${idx}`} className="w-full h-full object-cover" />
            </SwiperSlide>
        ))}
        </Swiper>
    </div>
  );
};

export default HomeSlider;
