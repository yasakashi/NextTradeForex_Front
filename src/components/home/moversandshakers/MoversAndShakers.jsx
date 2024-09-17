
import MainTitle from "../../../common/MainTitle";
import SingleMover from "./MoverItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const MoversAndShakers = () => {
  return (
    <div className="wrapper my-36 lg:my-20">
      <div>
        <MainTitle title="Movers & Shakers" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative w-full h-full">
            <img
              className="w-full h-full"
              src="/assets/cover-photo.png"
              alt="Movers & Shakers"
            />
            <div className="absolute bottom-3 left-3 lg:bottom-8 lg:left-8">
              <a
                className="px-2 py-1 lg:px-8 lg:py-3 text-[14px] lg:text-[16px] text-[#030c3b] rounded-full font-medium lg:font-semibold bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-xl"
                href="/"
              >
                Explore Now
              </a>
            </div>
          </div>
          <div>
            <div className="bg-blue-light  py-5 h-full">
              <Swiper
                spaceBetween={10}
                loop
                centeredSlides={false}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 50,
                  },
                }}
                modules={[Navigation]}
                className="mySwiper space-x-0 relative"
              >
                {[1, 2, 3, 4].map((item, index) => (
                  <SwiperSlide key={index} className="w-full !bg-inherit">
                    <SingleMover />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoversAndShakers;
