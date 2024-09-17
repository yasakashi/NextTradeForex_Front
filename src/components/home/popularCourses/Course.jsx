import React from "react";

const Course = ({ img, alt, title }) => {
  return (
    <div className="bg-blue-light transition rounded-[10px] overflow-hidden h-[400px] p-4 pb-4 md:pb-7">
      <div className="h-[78%] overflow-hidden">
        <a href="/">
          <img
            className="h-full w-full hover:scale-105 transition object-cover"
            src={img}
            alt={alt}
          />
        </a>
      </div>

      <div className="pt-5 h-[22%] flex items-center">
        <h3 className="text-gold-light_400 text:xl lg:text-2xl font-semibold">
          <a href="">{title}</a>
        </h3>
      </div>
    </div>
  );
};

export default Course;
