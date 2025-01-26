import { useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { FaPlus } from "react-icons/fa6";

const activeClass =
  "border-b-2 border-b-[#007cba] text-[#007cba] h-full flex items-center px-2 justify-center";

const TabBar = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full h-[80px] bg-white shadow-sm flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex items-center gap-2 p-4">
          <h2 className="font-normal text-2xl text-[#1d2327]">
            Withdraw Requests
          </h2>
        </div>
        {/* right side */}
        <div className="h-full">
          <ul className="flex items-center h-full px-4 space-x-6 text-base font-normal text-gray-700">
            <li
              className={`cursor-pointer ${
                activeTab === "all" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("all")}
            >
              All <span>(189)</span>
            </li>

            <li
              className={`cursor-pointer ${
                activeTab === "approved" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("approved")}
            >
              Approved <span>(0)</span>
            </li>

            <li
              className={`cursor-pointer ${
                activeTab === "pending" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending <span>(1)</span>
            </li>

            <li
              className={`cursor-pointer ${
                activeTab === "rejected" ? activeClass : ""
              }`}
              onClick={() => setActiveTab("rejected")}
            >
              Rejected <span>(0)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabBar;
