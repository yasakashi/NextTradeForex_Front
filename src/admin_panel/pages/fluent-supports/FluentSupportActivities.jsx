import { IoSettingsOutline } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";

const FluentSupportActivities = () => {
  return (
    <div className="flex flex-col px-8 py-10">
      <div className="mx-8 my-4 bg-white rounded-md shadow-md px-6 py-4">
        <div className="flex items-center justify-between gap-8 ">
          <div className="text-base font-medium text-gray-800 text-nowrap w-max">
            Overall Activities
          </div>
          <div className="flex-grow flex justify-end items-center">
            {/* dates */}
            <div></div>

            {/* slect box */}
            <select className="w-full sm:w-[300px] border bg-white outline-blue-400 outline-[1px] border-gray-300 py-[6px] pl-3 text-gray-600 text-sm rounded-md cursor-pointer">
              <option>Next trade</option>
              <option>Nexttrade</option>
            </select>

            {/* Icons */}
            <div className="flex items-start gap-4 mx-4">
              <button
                type="button"
                className="bg-[#409eff] outline-none px-3 py-2 rounded"
              >
                <IoSettingsOutline size={18} className="text-white" />
              </button>

              <button
                type="button"
                className="bg-[#409eff] outline-none px-3 py-2 rounded"
              >
                <SlRefresh size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-base text-gray-800 font-medium flex justify-center my-8">
          No activities found at this moment
        </div>
      </div>
    </div>
  );
};

export default FluentSupportActivities;
