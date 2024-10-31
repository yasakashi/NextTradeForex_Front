import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';
import CarouselCard from './Card';
import './styles.css';

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
      >
        <SwiperSlide>
          <CarouselCard label='Course' />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselCard label='Course' />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselCard label='Post' />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselCard label='Course' />
        </SwiperSlide>
        <SwiperSlide>
          <CarouselCard label='Post' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
