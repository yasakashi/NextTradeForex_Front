import React from "react";

const EstimateItem = () => {
  return (
    <div className="mx-[40px]">
      <div className="w-full border border-[#ffffff80] py-2 sm:py-3 md:py-4 px-5 text-[#e9e9e97a] max-h-[400px] sm:max-h-[400px] rounded-lg">
        <h2 className="font-extrabold text-gold-light_400 uppercase mb-1 sm:mb-3">
          <a href="/">USD/JPY</a>
        </h2>

        <div className="flex items-center mb-4">
          <p className="text-white mr-1 text-[15px]">
            <strong>hour </strong>
          </p>

          <p className="bg-[#22ab94] py-[2px] px-[10px] rounded-[3px] flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>

            <span className="text-sm text-white">long</span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <p className="text-white bg-gold-light_400 py-[2px] px-4 rounded-2xl text-[14px] mb-[10px]">
            #Technical
          </p>
          <p className="text-white bg-gold-light_400 py-[2px] px-4 rounded-2xl text-[14px] mb-[10px]">
            #Bulish
          </p>
        </div>

        <div className="mb-1 sm:mb-2 md:mb-4 text-lg flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#e4ba73"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-[#e4ba73] mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <div className="flex items-center space-x-2 text-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#e4ba73"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="text-[15px] sm:text-[16px] md:text-[18px]">
              2024-04-19 08:52:13
            </span>
          </div>
        </div>

        <div className="mb-2 sm:mb-4">
          <p className="text-[16px] sm:text-[18px]">
            On the 1 hour chart, we can see more closely the rangebound price
            action between the 153.90 support and the 154.80 resistance. We got
            a spike lower tonight following the israeli retaliation against iran
            but the move was completely erased as Iran dow
          </p>
        </div>

        <div className="flex justify-end">
          <a href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#e4ba73"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default EstimateItem;
