import { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import avatar from "./../../assets/img/avatar.jpg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { deleteCookie, getCookie } from "../../utils/cookie";
const DashboardView = () => {
  const [openSetting, setOpenSetting] = useState(false);
  // const profileData = JSON.parse(getCookie("loginToken"));
  // console.log(profileData);

  const navigate = useNavigate();

  const userProfileHandler = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    // deleteCookie("token");
    // deleteCookie("userData");
    // navigate("/Login-page");
  };

  return (
    <div className="flex justify-start bg-blue-light  h-[70px] shadow-xl px-[25px] md:px-[15px]">
      <div className="flex items-center gap-[15px] relative">
        <div
          className="flex items-center gap-[15px] relative cursor-pointer"
          onClick={() => setOpenSetting(!openSetting)}
        >
          <div className="flex items-start gap-[5px] flex-col font-semibold">
            <p className="text-white leading-3">
              {/* {profileData?.first_name} {profileData?.last_name} (
              {profileData?.personal_code}) */}
              Amir basiri
            </p>
            <div className="flex items-center justify-between  w-full">
              <p className="text-gray-400 leading-5">
                Role :
                {/* {profileData?.organizational_unit}</p>
              {openSetting ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )} */}
                <span className="text-gold-light_400 ml-1 ">Admin</span>
              </p>
            </div>
          </div>
          {/* {profileData?.profile_image ? (
            <img
              src={profileData?.profile_image}
              alt=""
              className=" h-[40px] w-[40px] md:h-[50px] md:w-[50px] object-cover rounded-full  flex items-center justify-center relative"
            />
          ) : (
            <img
              src={avatar}
              alt="Avatar"
              className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] rounded-full  flex items-center justify-center relative"
            />
          )} */}
          <motion.ul
            initial="closed"
            variants={{
              open: { opacity: 1, y: 0 },
              closed: { opacity: 0, y: "-100%" },
            }}
            animate={openSetting ? "open" : "closed"}
            className="absolute top-[45px] z-20 bg-[#f8f9fc] flex flex-col justify-between mt-4 w-[175px] max-w-[175px] md:w-[200px] rounded-br-[5px] rounded-bl-[5px] font-bold border-b-[1px] shadow-xl"
          >
            {openSetting && (
              <>
                <li
                  onClick={userProfileHandler}
                  className={`transition-all duration-300 py-2 rounded-[5px] cursor-pointer hover:border hover:border-[#E86E00] pr-3`}
                >
                  Profile{" "}
                </li>
          

                <li
                  // onClick={handleLogout}
                  className="cursor-pointer transition-all duration-300 hover:border hover:border-[#E86E00] pr-3 py-2 rounded-[5px] "
                >
                  Log out
                </li>
              </>
            )}
          </motion.ul>
        </div>

        <div className="flex items-center gap-[25px] border-l-[1px] pl-[15px] md:pl-[25px]">
          <FaRegBell size={20} color="#bb914a" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
