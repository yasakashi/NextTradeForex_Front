import { Link, useNavigate } from "react-router-dom";
import { BiMessageRounded } from "react-icons/bi";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import NotificationModal from "../modals/NotificationModal";
import MessagesModal from "../modals/MessagesModal";
import useClickOutside from "../../hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { logoutAction } from "../../redux/features/loginSlice";
import toast from "react-hot-toast";
import { getUserNotReadMessages } from "../../redux/features/messageSlice";

const CummunityNavbar = () => {
  const token = localStorage.getItem("loginToken");

  const [showProfileDropDown, setShowProfileDropDown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const messageRef = useRef(null);
  const notiveRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const { userNotReadMessagesCount } = useSelector(
    (state) => state.siteMessage
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const logoutHandler = () => {
    dispatch(logoutAction({ axiosPrivate, toast, navigate }));
  };

  useEffect(() => {
    dispatch(
      getUserNotReadMessages({
        axiosPrivate,
        data: { reciverusername: user?.username },
      })
    );
  }, []);

  useClickOutside(messageRef, () => {
    setShowMessages(false);
  });

  useClickOutside(notiveRef, () => {
    setShowNotification(false);
  });

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
              <div className="relative">
                <button
                  className="relative"
                  onClick={() => setShowMessages((prev) => !prev)}
                >
                  <BiMessageRounded size={24} />
                  <span className="absolute flex items-center justify-center -top-0 right-0 bg-red-400 text-white p-[2px] text-xs rounded-full">
                    {userNotReadMessagesCount === ""
                      ? 0
                      : userNotReadMessagesCount}
                  </span>
                </button>
                {showMessages && (
                  <div
                    ref={messageRef}
                    className="absolute top-[120%] z-[1001] left-1/2 -translate-x-1/2"
                  >
                    <MessagesModal />
                  </div>
                )}
              </div>
              <div className="relative">
                <button onClick={() => setShowNotification((prev) => !prev)}>
                  <MdOutlineNotificationsNone size={24} />
                </button>

                {showNotification && (
                  <div
                    ref={notiveRef}
                    className="absolute top-[120%] z-[1001] left-1/2 -translate-x-1/2"
                  >
                    <NotificationModal />
                  </div>
                )}
              </div>
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
                    {user?.username}
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
                          <Link to="/admin-panel/lesson/categories">Admin</Link>
                        </li>
                        <li className="flex items-center px-14 py-3 space-x-3 hover:bg-gray-200 rounded-lg border-b border-gray-300 ">
                          <LuUsers size={20} />
                          <Link to="/traders-community/groups">Groups</Link>
                        </li>
                        <li
                          onClick={logoutHandler}
                          className="flex items-center px-14 py-3 space-x-3 hover:bg-gray-200 rounded-lg  w-max"
                        >
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
