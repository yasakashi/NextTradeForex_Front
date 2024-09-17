import React from "react";

const PodcastItem = ({ title, date }) => {
  return (
    <li className="border-b list-none py-2 border-[#ffffff14] text-white flex justify-between items-center">
      <a
        href="/"
        className="text-gold-dark_100 text-sm md:text-[16px] xl:text-lg"
      >
        {title}
      </a>
      <span className="text-sm md:text-[16px] ">
        {date}
      </span>
    </li>
  );
};

export default PodcastItem;
