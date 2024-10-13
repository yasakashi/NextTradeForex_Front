import { Link } from "react-router-dom";

const MySignals = () => {
  return (
    <div>
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="bg-white h-[40px] lg:h-[44px] p-1 pl-[14px] relative rounded-xl flex justify-between items-center">
          <input
            className="bg-transparent text-gray-600 border-none outline-none w-full h-full pr-5 placeholder:text-gray-600"
            type="text"
            placeholder="Search ..."
          />
          <button className="flex w-max h-full items-center  bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] px-3 rounded-lg  space-x-2">
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
          </button>
        </div>
        <div className="my-10">
          <Link
            className="border-2 text-gray-200 font-medium text-base border-gold-light_400 px-5 py-3 rounded-lg outline-none hover:bg-gold-light_400 transition"
            to="/traders-community/create-signal-channel"
          >
            Create a Signal Channal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MySignals;
