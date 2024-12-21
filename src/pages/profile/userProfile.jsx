import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import MyGroups from "../../components/profile/MyGroups";
import MyProfile from "../../components/profile/MyProfile";
import MySignals from "../../components/profile/MySignals";
import { GrGroup } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaGraduationCap } from "react-icons/fa";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { FaChartLine } from "react-icons/fa6";
import { ImEmbed } from "react-icons/im";
import { NavLink, Outlet } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { IoRocket } from "react-icons/io5";
import { GiWallet } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa6";
import { TiPin } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import Requests from "../../components/profile/Requests";
import MyCourses from "./my_courses/view/my_courses";
import { MdDashboard } from "react-icons/md";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import EnrolledCourses from "./enrolled_courses/view/enrolled_courses";
import Rating from "../../admin_panel/pages/tutor/courses/course_details/view/components/rating";
import { AiFillPlusSquare } from "react-icons/ai";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [closeMenu, setCloseMenu] = useState(false);
  const [role, setRole] = useState("unknown");

  useEffect(() => {
    switch (user?.userTypeId) {
      case 1:
        setRole("Super Admin");
        break;
      case 2:
        setRole("Admin");
        break;
      case 3:
        setRole("Instructor");
        break;
      case 4:
        setRole("Student");
        break;
      case 5:
        setRole("Guest");
        break;
      default:
        setRole("UnKnown");
        break;
    }
  }, []);

  return (
    <>
      {/* {isLoading && (
        <div className="w-full h-screen fixed inset-0 z-[1001] flex justify-center items-center">
          <div className="w-full h-full absolute bg-black opacity-65"></div>
          <div className="z-[1002]">
            <CustomCircleLoader />
          </div>
        </div>
      )} */}
      <div className="bg-blue-dark w-full min-h-screen pb-20">
        <Navbar />

        <div className="px-4 md:px-8 lg:px-12 xl:px-24">
          <header className="mt-6 sm:mt-10 md:mt-14 lg:mt-20 flex space-x-6 items-center justify-between w-full border-b pb-4">
            <div className="flex items-center space-x-6">
              <img
                className="size-[100px] rounded-full border-4 shadow-lg border-white"
                src="/assets/bp-avatar.png"
                alt="user img"
              />

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 text-white">
                  <span>Hello,</span>
                  <h4 className="font-semibold text-xl">
                    {user?.username || "---"}
                    <span className="text-sm text-gray-400 mx-1 font-normal">
                      ({role})
                    </span>
                  </h4>
                </div>
                <Rating rate="4" />
              </div>

              {/*  */}
            </div>
            <Link
              to="/user-profile/myCourses/new-course"
              className="flex items-center gap-2 btn_bg-gradient_3 bg-auto shadow-xl text-blue-dark px-4 py-2 rounded-md text-base font-semibold"
            >
              <AiFillPlusSquare size={20} />
              Create a New Course
            </Link>
          </header>

          <div className="flex">
            <div
              className={`flex-initial md:relative w-full sm:w-[40%] md:w-auto md:flex-[3] fixed z-[1000] min-h-screen top-0 left-0 bg-blue-dark pt-2 duration-300 ${
                closeMenu
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }`}
            >
              <div className="flex md:hidden justify-end items-center my-4 px-6">
                <IoMdClose
                  className="text-gold-light_400 border border-gold-light_400 rounded-full hover:bg-gold-light_400 hover:text-white transition-all cursor-pointer"
                  size={24}
                  onClick={() => setCloseMenu(false)}
                />
              </div>
              <ul className="text-base">
                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/dashboard`}
                  >
                    <MdDashboard size={20} />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/profile`}
                  >
                    <CgProfile size={20} />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/groups`}
                  >
                    <GrGroup size={20} />
                    My Groups
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/requests`}
                  >
                    <ImEmbed size={20} />
                    Requests
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/signals`}
                  >
                    <FaChartLine size={20} />
                    Signals
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/enrolled-courses`}
                  >
                    <FaGraduationCap size={20} />
                    Enrolled Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/order-history`}
                  >
                    <RiShoppingCart2Fill size={20} />
                    Order History
                  </NavLink>
                </li>
              </ul>

              {user?.userTypeId === 3 ? (
                <>
                  <div className="w-full h-[1px] bg-white my-2" />

                  <ul>
                    <li className="text-gray-400 text-sm p-3">Instructor</li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                            isActive ? "bg-gold-light_400" : ""
                          }`
                        }
                        to={`/user-profile/myCourses`}
                      >
                        <IoRocket size={20} />
                        My courses
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                            isActive ? "bg-gold-light_400" : ""
                          }`
                        }
                        to={`/user-profile/my-posts`}
                      >
                        <TiPin size={20} />
                        My Posts
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        end
                        className={({ isActive }) =>
                          `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                            isActive ? "bg-gold-light_400" : ""
                          }`
                        }
                        to={`/user-profile/withdrawals`}
                      >
                        <GiWallet size={20} />
                        Withdrawals
                      </NavLink>
                    </li>
                  </ul>
                </>
              ) : null}

              <div className="w-full h-[1px] bg-white my-2" />

              <ul className="">
                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/user-profile/settings`}
                  >
                    <IoMdSettings size={20} />
                    Settings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                        isActive ? "bg-gold-light_400" : ""
                      }`
                    }
                    to={`/`}
                  >
                    <LuLogOut size={20} />
                    logout
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="md:flex-[9] w-full border-l-0 md:border-l min-h-[60vh] p-8">
              <div className="md:hidden flex">
                <button
                  onClick={() => setCloseMenu(true)}
                  className="text-blue-400 text-sm border border-blue-400 rounded-md px-3 py-1 cursor-pointer mb-3"
                >
                  Show Menu
                </button>
              </div>

              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;

const UserProfileComponent = () => {
  const [activeTab, setActiveTab] = useState("myProfile");
  const router = useNavigate();

  const changeTabHandler = (tab) => {
    setActiveTab(tab);
  };
  return (
    <>
      <header className="mt-20 flex space-x-6 items-center border-b pb-4 justify-between">
        <div className="flex space-x-6 items-center">
          <img
            className="size-[100px] rounded-full border-4 shadow-lg border-white"
            src="/assets/bp-avatar.png"
            alt="user img"
          />

          <div className="flex flex-col gap-2 text-white">
            <span>Hello,</span>
            <h4 className="font-semibold text-xl">Amir Basiri</h4>
          </div>
        </div>
        <button
          onClick={() => {
            router(`/user-profile/new-course`);
          }}
          className="flex w-max h-full items-center  bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] px-3 rounded-lg  space-x-2"
          style={{ padding: "8px 24px", borderRadius: 4, position: "relative" }}
        >
          <span
            style={{
              width: 16,
              height: 4,
              backgroundColor: "#030c3b",
              borderRadius: 50,
            }}
          ></span>
          <span
            style={{
              width: 4,
              height: 16,
              backgroundColor: "#030c3b",
              position: "absolute",
              left: 22,
              borderRadius: 50,
            }}
          ></span>
          <i
            style={{
              fontWeight: "bold",
              color: "#030c3b",
              fontStyle: "normal",
            }}
          >
            Create a New Course
          </i>
        </button>
      </header>
      <div className="flex">
        <div className="md:flex-[2] lg:flex-[1]">
          <ul className="text-sm">
            <li
              onClick={() => changeTabHandler("dashboard")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "dashboard" ? "bg-gold-light_400" : null
              }`}
            >
              <MdDashboard size={20} />
              Dashboard
            </li>
            <li
              onClick={() => changeTabHandler("myProfile")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "myProfile" ? "bg-gold-light_400" : null
              }`}
            >
              <CgProfile size={20} />
              My Profile
            </li>
            <li
              onClick={() => setActiveTab("myGroups")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "myGroups" ? "bg-gold-light_400" : null
              }`}
            >
              <GrGroup size={20} />
              My Groups
            </li>

            <li
              onClick={() => setActiveTab("requests")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "requests" ? "bg-gold-light_400" : null
              }`}
            >
              <ImEmbed size={20} />
              Requests
            </li>

            {/* <li
          onClick={() => setActiveTab("myGroups")}
          className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
            activeTab === "myGroups" ? "bg-gold-light_400" : null
          }`}
        >
          <Link
            className="outline-none"
            to="/traders-community/all-membership-request"
          >
            All Membership Request
          </Link>
        </li> */}

            <li
              onClick={() => setActiveTab("mySignals")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "mySignals" ? "bg-gold-light_400" : null
              }`}
            >
              <FaChartLine size={20} />
              My Signals
            </li>

            <li
              onClick={() => setActiveTab("enrolledCourses")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "enrolledCourses" ? "bg-gold-light_400" : null
              }`}
            >
              <FaGraduationCap size={20} />
              Enrolled Courses
            </li>
            <li
              onClick={() => setActiveTab("orderHistory")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "orderHistory" ? "bg-gold-light_400" : null
              }`}
            >
              <RiShoppingCart2Fill size={20} />
              Order History
            </li>
          </ul>

          {/* // -----------------------------------------------my course section */}
          <div className="w-full h-[1px] bg-white my-2" />
          <ul className="">
            <li
              onClick={() => setActiveTab("my_cources")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "my_cources" ? "bg-gold-light_400" : null
              }`}
            >
              <IoMdSettings size={20} />
              My Cources
            </li>
          </ul>
          <ul className="">
            <li
              onClick={() => setActiveTab("Withdrawals")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "Withdrawals" ? "bg-gold-light_400" : null
              }`}
            >
              <PiHandWithdrawDuotone size={20} />
              Withdrawals
            </li>
          </ul>
          <div className="w-full h-[1px] bg-white my-2" />
          <ul className="">
            <li
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg ${
                activeTab === "settings" ? "bg-gold-light_400" : null
              }`}
            >
              <IoMdSettings size={20} />
              Settings
            </li>
            <li
              onClick={() => setActiveTab("logOut")}
              className="flex items-center gap-3 py-2 px-2 hover:bg-gold-light_400 cursor-pointer transition-all text-white rounded-tl-lg rounded-bl-lg"
            >
              <LuLogOut size={20} />
              Logout
            </li>
          </ul>
        </div>
        <div className="md:flex-[5] lg:flex-[5] border-l min-h-[60vh] p-4">
          {activeTab === "myGroups" ? (
            <MyGroups />
          ) : activeTab === "myProfile" ? (
            <MyProfile />
          ) : activeTab === "enrolledCourses" ? (
            <EnrolledCourses />
          ) : activeTab === "mySignals" ? (
            <MySignals />
          ) : activeTab === "requests" ? (
            <Requests />
          ) : activeTab === "my_cources" ? (
            <MyCourses />
          ) : null}
        </div>
      </div>
    </>
  );
};
