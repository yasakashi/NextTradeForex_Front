import { Link } from "react-router-dom";
import { BiMessageRounded } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useState } from "react";

const CummunityNavbar = () => {
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="w-full">
      <div className=" bg-blue-light wrapper">
        <div className="flex justify-between items-center h-20 p-2">
          {/* logo  */}
          <Link to="/" className=" outline-none w-[130px] h-full">
            <img
              className="w-full h-full"
              src="/assets/logo.png"
              alt="next trader forex"
            />
          </Link>

          {/* menu */}
          <nav className="flex-1 px-8">
            <ul className="flex items-center justify-start space-x-4 text-white font-semibold">
              <li className="hover:text-gold-light_400 transition-colors text-sm">
                <Link className="outline-none" to="/">
                  Home
                </Link>
              </li>
              <li className="hover:text-gold-light_400 transition-colors text-sm">
                <Link className="outline-none" to="/traders-community/groups">
                  All Groups
                </Link>
              </li>
              <li className="hover:text-gold-light_400 transition-colors text-sm">
                <Link
                  className="outline-none"
                  to="/traders-community/support-portal"
                >
                  Support Portal
                </Link>
              </li>
            </ul>
          </nav>

          {/* profile & icons */}
          <div className="flex items-center space-x-6">
            <div className="text-white font-bold flex items-center space-x-3">
              <button>
                <BiMessageRounded size={24} />
              </button>
              <button>
                <MdOutlineNotificationsNone size={24} />
              </button>
            </div>
            <div>
              <div className="relative">
                <div
                  onClick={() => setShowProfileDropDown(!showProfileDropDown)}
                  className="flex items-center cursor-pointer"
                >
                  <div className="relative  w-[50px] h-[50px] shrink-0 rounded-full">
                    <img
                      className="w-full h-full rounded-full border-2 p-[1px]"
                      src="/assets/bp-avatar.png"
                      alt="User"
                    />
                    <span className="text-white absolute -top-1 right-0">
                      <FaCheck
                        className="bg-green-500 rounded-full p-[2px]"
                        size={20}
                      />
                    </span>
                  </div>
                  <span className="capitalize text-white ml-2 font-semibold">
                    {user?.username || "unKnown"}
                  </span>
                </div>
                <div className="absolute top-[124%] z-[1000] left-1/2 -translate-x-1/2">
                  {showProfileDropDown && (
                    <div className="bg-white rounded-lg shadow-lg">
                      <ul className=" text-gray-500 font-semibold text-sm">
                        <li className="flex items-center px-14 py-3 space-x-3 hover:bg-gray-200 rounded-lg border-b border-gray-300 ">
                          <CiUser size={20} />
                          <Link to="/user-profile">Profile</Link>
                        </li>

                        <li className="flex items-center px-14 py-3 space-x-3 hover:bg-gray-200 rounded-lg border-b border-gray-300 ">
                          <CiUser size={20} />
                          <Link to="/admin-panel">Admin </Link>
                        </li>
                        <li className="flex items-center px-14 py-3 space-x-3 hover:bg-gray-200 rounded-lg border-b border-gray-300 ">
                          <LuUsers size={20} />
                          <Link to="/traders-community/groups">Groups</Link>
                        </li>
                        <li className="flex items-center px-14 py-3 space-x-3 hover:bg-gray-200 rounded-lg  w-max">
                          <RiLogoutCircleLine size={20} />
                          <Link to="">Log Out</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CummunityNavbar;
