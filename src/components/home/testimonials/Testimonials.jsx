import React from "react";
import MainTitle from "../../../common/MainTitle";
import SingleTestimonial from "./SingleTestimonial";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SwiperNabButtons from "../../../common/SwiperNabButtons";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const testimonialData = [
  {
    id: 1,
    img: "/assets/img1.jpg",
    description: `  The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.`,
    name: "Adam Steve",
    position: "Event Manager, British",
  },

  {
    id: 2,
    img: "/assets/img1.jpg",
    description: `  The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.`,
    name: "Joseph William",
    position: "Software Developer, Google",
  },

  {
    id: 3,
    img: "/assets/img1.jpg",
    description: `  The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English.`,
    name: "Maluka Kamil",
    position: "Business Consultant, Zoom",
  },
];

const Testimonials = () => {
  return (
    <div className="mt-20 mb-20 px-2 sm:px-6">
      <div>
        <MainTitle title="What Our Users Say About Us" />
      </div>

      <Swiper
        spaceBetween={10}
        // pagination
        pagination={{
          clickable: true,
        }}
        // centeredSlides={true}
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
        modules={[Pagination]}
        className="mySwiper space-x-0 !z-50"
      >
        {testimonialData?.map(({ id, img, description, name, position }) => (
          <SwiperSlide key={id} className="!bg-inherit w-full mx-auto">
            <SingleTestimonial
              key={id}
              src={img}
              description={description}
              name={name}
              position={position}
            />
          </SwiperSlide>
        ))}

        <SwiperNabButtons />
      </Swiper>
    </div>
  );
};

export default Testimonials;
