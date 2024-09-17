import React from "react";

const SingleCategory = () => {
  return (
    <div className="group bg-white cursor-pointer shadow-md shadow-[#00000026] rounded-[20px] relative p-5 text-[#272042]">
      <div className="relative overflow-hidden rounded-[20px] ">
        <div className="overflow-hidden mb-0 transition ">
          <img
            className="max-h-[250px] w-full object-cover group-hover:scale-105 transition"
            src="/assets/SEC.jpeg"
            alt="Category"
          />
        </div>
        {/* overlay */}
        <div className="group-hover:bg-[#ffffffd1] duration-300 absolute w-full h-full top-0"></div>

        {/*  */}

        <div className="absolute overflow-hidden duration-300 left-[15px] right-[15px] z-[11]  -bottom-[5rem] group-hover:bottom-8">
          <h5 className="text-2xl mb-4 font-bold text-[#051b95]">
            Securities Commissions
          </h5>

          <p className="font-light text-xs leading-[18px] text-[#272042] min-h-10">
            Delving into the pivotal role of Securities Commissions in ensuring
            fair and transparent trading.
          </p>

          <div className="table w-full font-medium text-[13px] text-[#7a7a7a] leading-[16px]">
            <div className="table-cell">
              <img className="mr-2 inline" src="/assets/weekicon.png" alt="Icon" />
              <span>0 Leassons</span>
            </div>

            <div className="table-cell text-right">
              <a
                className="bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-xl rounded-lg py-3 px-4 text-[#020e51] inline-block font-medium text-[14px] leading-[15px]"
                href="/"
              >
                View More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;
