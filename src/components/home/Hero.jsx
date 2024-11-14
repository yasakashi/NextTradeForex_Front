import React from "react";
import HeroTemp from "../HeroTemp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <HeroTemp>
      <div className="relative body_max_width">
        <div className="wrapper pt-10 lg:pt-20 pb-[60px] bg-blue-light">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0">
            <div className="flex order-2 lg:order-1 mx-auto text-center md:mx-auto lg:text-left lg:mx-0 flex-col max-w-[520px] md:max-w-[700px] lg:max-w-[520px]">
              <h1 className="text-[35px] md:text-[45px] leading-[43px] md:leading-[54px] font-semibold mb-5 lg:mb-8 text-white">
                <span className="text-gold-light_100">Studying</span> Online is
                now much easier
              </h1>
              <p className="text-[#ffffff7d] text-[17px] mb-[30px]">
                NextTrade is a platform that will guide you expertly through the
                learning process of trading.
              </p>
              <div className="bg-white h-[45px] lg:h-[55px] p-1 pl-[14px] relative rounded-xl flex justify-between items-center">
                <input
                  className="bg-transparent border-none outline-none w-full h-full pr-5 placeholder:text-gray-600"
                  type="text"
                  placeholder="Search ..."
                />
                <Link
                  to="/course-category/top-courses"
                  className="flex w-max h-full items-center  bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] px-3 rounded-lg  space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>

                  <span className="w-max hidden md:block">Search Courses</span>
                </Link>
              </div>
            </div>
            {/* //////////////////////////// */}
            <div className="order-1 lg:order-2">
              <div className="max-w-[750px] lg:-mr-[100px]">
                <img
                  className="size-full md:mx-auto"
                  src="/assets/banner-new.png"
                  alt="Banner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroTemp>
  );
};

export default Hero;
