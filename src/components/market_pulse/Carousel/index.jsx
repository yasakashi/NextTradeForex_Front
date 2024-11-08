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

export default function App({ data }) {
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
        {data?.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <CarouselCard data={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
