import React from "react";

const Item = () => {
  return (
    <div className="w-[90%] md:w-[94%] lg:w-[70%] xl:w-[60%] mx-auto shadow-xl">
      <div className="relative aspect-auto w-full">
        <div className="z-1 w-full">
          <img
            className="w-full h-full object-fit"
            src="/assets/fundamental.png"
            alt="Market-Pulse"
          />
        </div>

        <div className="z-2 w-[90%] sm:w-[60%] md:w-[80%] lg:w-[80%] h-fit absolute top-1/2 translate-y-[10%] right-[5%] md:top-[40%] md:-bottom-[7%] md:right-[10%] lg:top-1/2 lg:-translate-y-1/2 lg:left-[50%] bg-blue-light rounded-[20px] p-4 md:p-8 text-[#ffffff80] shadow-2xl">
          <a href="/">
            <h4 className="text-gold-light_400 text-xl font-bold leading-9">
              Market-Pulse
            </h4>
          </a>
          <p className="text-[15px] md:text-[16px] font-medium  md:leading-7 pb-2 md:pb-4">
            Gain insights, boost profiles; visit our Market Pulse page tody.
          </p>

          <ul>
            <li className="border-b border-[#ffffff2b] text-[15px] p-1">
              Fundamental Analysis{" "}
            </li>
            <li className="border-b border-[#ffffff2b] text-[15px] p-1">
              Technical Analysis
            </li>
            <li className="border-b border-[#ffffff2b] text-[15px] p-1">
              Market Sentiments{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Item;
