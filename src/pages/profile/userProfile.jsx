import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Dashboard from "../../components/profile/Dashboard";
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
// import { MdDashboard } from "react-icons/md";
import { ImEmbed } from "react-icons/im";

import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Requests from "../../components/profile/Requests";
import NewCourse from "./new_course";
import MyCourses from "./my_courses/view/my_courses";
import { MdDashboard } from "react-icons/md";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import { get_user_info_api } from "./my_courses/service/get_my_courses_api";
import EnrolledCourses from "./enrolled_courses/view/enrolled_courses";
import EditCourseScreen from "./my_courses/view/edit_course_screen";

const UserProfile = () => {
  return (
    <>
      <div className="bg-blue-dark w-full min-h-screen pb-20">
        <Navbar />

        <div className="wrapper">
          <Routes>
            <Route path="/" element={<UserProfileComponent />} />
            <Route path="/new-course" element={<NewCourse />} />
            <Route path="/edit-course/:id" element={<EditCourseScreen />} />
          </Routes>
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
