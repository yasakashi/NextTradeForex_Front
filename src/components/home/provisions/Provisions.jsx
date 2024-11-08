import React from "react";
import PodcastItem from "./PodcastItem";

const Provisions = () => {
  return (
    <section className="wrapper mt-[60px] body_max_width">
      <div className="flex flex-col lg:flex-row lg:overflow-auto justify-between items-stretch gap-5">
        {/* ///////////////////////////////////////////// */}
        <div className="flex-1 mb-8 md:mb-16 lg:mb-0">
          <div className="bg-blue-light py-12 md:py-20 lg:py-24 px-6 lg:px-10 rounded-tr-full rounded-br-full">
            <h3 className="mb-2 md:mb-6 text-xl md:text-3xl lg:text-3xl font-extrabold text-white">
              What we Provide
            </h3>
            <p className="text-lg text-[#e9e9e97a] leading-7 font-normal">
              We have courses available for each type of trader. NextTrade is
              one powerful online learning platform that has all the courses
              needed to become a successful trader.
            </p>
          </div>
        </div>

        {/* ///////////////////////////////////////////// */}
        <div className="flex-1 lg:min-h-[200px]">
          <div className="bg-blue-light h-full border-t-[6px] border-gold-light_400 rounded-[4px]">
            <div className=" px-4 md:px-7 py-4 md:py-6 lg:py-8 ">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-extrabold text-xl md:text-3xl lg:text-3xl">
                  Podcasts
                </h3>
                <img
                  src="https://www.nexttradeforex.com/wp-content/uploads/2022/08/topbg_icon1.png"
                  alt="nexttrade"
                />
              </div>

              <ul className="mt-4 max-h-[200px] overflow-auto space-y-4 pl-0 list-none">
                {Array.from(new Array(3).keys()).map((item, index) => (
                  <PodcastItem
                    key={index}
                    title="Text Podcast on Forex"
                    date="Sep 26, 2024, 11:00 PM"
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Provisions;
