import React from "react";
import MainTitle from "../../../common/MainTitle";
import EstimateItem from "./EstimateItem";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperNabButtons from "../../../common/SwiperNabButtons";

const AnalystEstimates = () => {
  return (
    <div className="mt-32">
      <MainTitle title="Analyst Estimates" />

      <div className="mt-10 px-2 sm:px-10">
        <Swiper
          spaceBetween={10}
          loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
          }}
          modules={[]}
          className="mySwiper space-x-0 relative"
        >
          {[1, 2, 3, 4].map((item, index) => (
            <SwiperSlide key={index} className="w-full !bg-inherit">
              <EstimateItem />
            </SwiperSlide>
          ))}
          <SwiperNabButtons />
        </Swiper>
      </div>
    </div>
  );
};

export default AnalystEstimates;
