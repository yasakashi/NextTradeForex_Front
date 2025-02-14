import { useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { FaPlus } from "react-icons/fa6";

const activeClass =
  "border-b-2 border-b-[#007cba] text-[#007cba] h-full flex items-center md:px-2 justify-center";

const TabBar = ({ setOpenInsModal, instructorsReport }) => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full h-auto min-h-[80px] py-4 bg-white shadow-sm flex items-center justify-center">
      <div className="w-full h-full flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center gap-2 p-4">
          <h2 className="font-normal text-lg sm:text-xl md:text-2xl text-[#1d2327]">Instructors</h2>

          <CustomButton
            type="button"
            onClick={() => setOpenInsModal(true)}
            size="md"
            variant="outlined"
            className="flex items-center gap-2"
          >
            <FaPlus size={18} />
            Add New
          </CustomButton>
        </div>
        {/* right side */}
        <div className="h-full">
          <ul className="flex flex-col md:flex-row gap-4 items-start md:items-center h-full px-4 space-x-6 text-sm sm:text-base font-normal text-gray-700">
            <li
              className={`cursor-pointer ml-6 ${
                activeTab === "all" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All
              <span className="px-1">
                ({instructorsReport?.allInstructorsCount || 0})
              </span>
            </li>

            <li
              className={`cursor-pointer ${
                activeTab === "approved" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("approved")}
            >
              Approved
              <span className="px-1">
                ({instructorsReport?.approvedInstructorsCount || 0})
              </span>
            </li>

            <li
              className={`cursor-pointer ${
                activeTab === "pending" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending{" "}
              <span className="px-1">
                ({instructorsReport?.pendingInstructorsCount || 0})
              </span>
            </li>

            <li
              className={`cursor-pointer ${
                activeTab === "blocked" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("blocked")}
            >
              Blocked{" "}
              <span className="px-1">
                ({instructorsReport?.blockedInstructorsCount || 0})
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
