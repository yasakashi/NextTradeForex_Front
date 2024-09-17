import { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";

import { Link } from "react-router-dom";

const SideBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div
      className={`fixed top-0 duration-300 left-0 w-[260px] bg-white h-screen z-[1000] shadow-lg ${
        showSidebar ? "translate-x-0" : "-translate-x-[200px]"
      }`}
    >
      <div className="w-full h-20 py-3 px-4 bg-blue-light flex justify-between items-center">
        <div></div>
        <img
          className="h-full w-[140px]"
          src="/assets/logo.png"
          alt="Nexttrade Logo"
        />

        <FaBarsStaggered
          onClick={() => setShowSidebar((prev) => !prev)}
          className="text-[#34b7f1] mr-1 cursor-pointer drop-shadow-xl"
          size={25}
        />
      </div>
      <div className="pt-10 px-4">
        <ul>
          <li>
            <Link
              className="text-gray-700 font-medium hover:text-gray-800 transition-all text-sm flex items-center gap-3"
              to="/traders-community/groups"
            >
              <HiUserGroup size={20} />
              Groups
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
