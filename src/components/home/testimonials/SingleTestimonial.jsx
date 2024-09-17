import React from "react";

const SingleTestimonial = ({ src, description, name, position }) => {
  return (
    <div className="mx-[40px]">
      <div className="bg-[#020E51] z-20 border border-[#001795] shadow-xl rounded-2xl p-6 sm:p-10 w-full text-left">
        <div className="size-16 border-[3px] shadow-md shadow-gold-light_400 mb-5 overflow-hidden rounded-full">
          <img
            className="w-full h-full overflow-hidden object-cover"
            src={src}
            alt={name}
          />
        </div>

        <div className="mb-8">
          <p className="text-lg text-[#d0d0d08a] leading-7">{description}</p>
        </div>

        <div>
          <h5 className="text-[19px] text-gold-light_400 font-semibold">
            {name}
          </h5>
          <p className="text-xs text-[#848484]">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleTestimonial;
