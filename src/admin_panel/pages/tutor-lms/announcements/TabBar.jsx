import { useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { FaPlus, FaBullhorn } from "react-icons/fa6";

const TabBar = ({ setOpenInsModal }) => {
  return (
    <div className="w-full h-[200px] md:h-[100px] bg-white shadow-sm flex items-center justify-center">
      <div className="w-full h-full flex flex-col md:flex-row items-center justify-between">
        {/* left side */}
        <div className="flex items-center gap-4 p-4">
          <div className="size-[50px] bg-[#007cba1a] rounded-full flex items-center justify-center">
            <FaBullhorn className="text-[#007cba]" size={24} />
          </div>
          <div className="space-y-2">
            <h5 className="text-gray-400 text-base">Create Annoucement</h5>
            <p className="text-gray-700 text-xl">
              Notify all students of your course
            </p>
          </div>
        </div>

        {/* right side */}
        <div className="p-4">
          <CustomButton
            type="button"
            onClick={() => setOpenInsModal(true)}
            size="md"
            className="flex items-center gap-2"
          >
            <FaPlus size={18} />
            Add New Announcement
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
