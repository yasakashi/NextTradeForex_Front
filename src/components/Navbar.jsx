import React, { useRef, useState } from "react";
import Languages from "../common/Languages";
import useClickOutside from "../hooks/useClickOutside";
import { deleteCookie, getCookie } from "../utils/cookie";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { LuUsers } from "react-icons/lu";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { userDataAction } from "../redux/features/userDataSlice";
import GoogleTranslate from "./googleTranslate/GoogleTranslate";
import { TiHome, TiHomeOutline } from "react-icons/ti";
import { useTheme } from "@mui/material";

const Navbar = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileDropDown, setShowProfileDropDown] = useState(false);

  const token = localStorage.getItem("loginToken");
  const user = JSON.parse(localStorage.getItem("user"));

  // const googleTranslateElementInit = () => {
  //   new google.translate.TranslateElement(
  //     { pageLanguage: "en" },
  //     "google_translate_element"
  //   );
  // };

  // useEffect(() => {
  //   googleTranslateElementInit();
  // }, []);

  const navigate = useNavigate();

  const logOutHandler = () => {
    deleteCookie("loginToken");
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };
  const {
    zIndex: { modal },
  } = useTheme();
  return (
    <div className="w-full z-[1000] relative wrapper pt-2 lg:pt-2 bg-blue-light">
      <div className="">
        <div className="flex items-center justify-between lg:justify-normal relative">
          <a href="/" className="max-w-[150px]">
            <img src="/assets/logo.png" className="w-full" alt="Logo" />
          </a>
          {/* _________________________ */}
          <div
            style={{ zIndex: modal + 15 }}
            className={`absolute bg-blue-light pl-8 pr-4 lg:bg-inherit w-full py-4 lg:py-0 lg:relative top-full flex-col lg:flex-row flex lg:justify-end gap-2 z-50 h-[calc(100vh-130px)] lg:h-auto ${
              showMobileMenu
                ? "translate-x-0 duration-300"
                : "-translate-x-[110%] lg:translate-x-0 duration-500 lg:flex"
            }`}
          >
            {token && (
              <div className="flex flex-col lg:mx-auto lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 text-[14px] space-x-0 lg:space-x-4">
                <div className="group inline w-full cursor-pointer lg:w-fit">
                  <button className="outline-none focus:outline-none text-white py-1 flex items-center">
                    <span className="pr-1">Home</span>
                    <span>
                      <svg
                        className="fill-current h-5 w-5 transform group-hover:-rotate-180
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </button>
                  <ul
                    className="bg-gold-light_200 
                  rounded-lg px-6 py-2 
                  transform
                  
                  hidden 
                  group-hover:block
                  lg:group-hover:block 
                  lg:scale-0 
                  lg:group-hover:scale-100 
                  lg:absolute 
                  
                  transition duration-150 ease-in-out origin-top 
                  lg:w-auto w-3/5 
                  cursor-pointer"
                  >
                    <li className="text-blue-light border-b border-blue-light  pt-3 rounded-sm px-3 py-1 hover:text-white ">
                      Who we are
                    </li>
                    <li
                      className="text-blue-light border-b border-blue-light  pt-3 rounded-sm px-3 py-1 hover:text-white"
                      onClick={() => {
                        navigate("/partnership");
                      }}
                    >
                      Partnership
                    </li>
                    {/* <li className="text-blue-light border-b border-blue-light  pt-3 rounded-sm relative px-3 py-1 hover:text-white">
                    <button className="w-full text-left flex items-center outline-none focus:outline-none">
                      <span className="pr-1 flex-1">Langauges</span>
                      <span className="mr-auto">
                        <svg
                          className="fill-current h-5 w-5
                        transition duration-150 ease-in-out"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                    </button>
                    <ul
                      className="bg-gold-light_200 
                      border px-6 py-2 rounded-lg 
                      absolute top-0 right-0 
                      transition duration-150 ease-in-out origin-top-left
                      min-w-32
                      "
                    >
                      <li className="px-3 py-1 text-blue-light border-b pt-3 border-blue-light hover:text-white ">
                        Javascript
                      </li>
                      <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white rounded-sm relative px-3 py-1 ">
                        Java
                      </li>
                      <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white px-3 py-1 ">
                        Go
                      </li>
                      <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white px-3 py-1 ">
                        Rust
                      </li>
                    </ul>
                  </li> */}
                    <li className="text-blue-light border-b border-blue-light  pt-3 px-3 py-1 hover:text-white">
                      Contact Us
                    </li>
                  </ul>
                </div>

                <div className="text-white capitalize">
                  <button
                    onClick={() => {
                      navigate("/learn_to_trade");
                    }}
                  >
                    Learn To Trade
                  </button>
                </div>

                <div className="text-white capitalize">
                  <a href="/">Market pulse</a>
                </div>

                <div className="group inline-block w-full lg:w-fit">
                  <button className="outline-none focus:outline-none text-white  py-1 flex items-center">
                    <span className="pr-1  ">Tools</span>
                    <span>
                      <svg
                        className="fill-current h-5 w-5 transform group-hover:-rotate-180
                        transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                  </button>
                  <ul
                    className="bg-gold-light_200 rounded-lg px-6 py-2 transform 
                  hidden 
                  group-hover:block
                  lg:group-hover:block 
                  lg:scale-0 
                  lg:group-hover:scale-100 
                  lg:absolute 

                transition duration-150 ease-in-out origin-top 
                  lg:w-auto w-3/5
                cursor-pointer"
                  >
                    <li className="text-blue-light border-b border-blue-light  pt-3 rounded-sm relative px-3 py-1 hover:text-white">
                      <button className="w-full text-left flex items-center outline-none focus:outline-none">
                        <span className="pr-1 flex-1">Education</span>
                        <span className="mr-auto">
                          <svg
                            className="fill-current h-5 w-5
                        transition duration-150 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </button>
                      <ul
                        className="bg-gold-light_200 border px-6 py-2 rounded-lg absolute top-0 right-0 
                      transition duration-150 ease-in-out origin-top-left
                      min-w-32
                      "
                      >
                        <li className="px-3 py-1 text-blue-light border-b pt-3 border-blue-light hover:text-white ">
                          Algo Trading
                        </li>
                        <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white rounded-sm relative px-3 py-1 ">
                          Glossary
                        </li>
                        <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white px-3 py-1 ">
                          Market Status
                        </li>
                      </ul>
                    </li>
                    <li className="text-blue-light border-b border-blue-light  pt-3 rounded-sm relative px-3 py-1 hover:text-white">
                      <button className="w-full text-left flex items-center outline-none focus:outline-none">
                        <span className="pr-1 flex-1">Screeners</span>
                        <span className="mr-auto">
                          <svg
                            className="fill-current h-5 w-5
                        transition duration-150 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </button>
                      <ul
                        className="bg-gold-light_200 border px-6 py-2 rounded-lg absolute top-0 right-0 
                      transition duration-150 ease-in-out origin-top-left
                      min-w-32
                      "
                      >
                        <li className="px-3 py-1 text-blue-light border-b pt-3 border-blue-light hover:text-white ">
                          Crypto Screeners
                        </li>
                        <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white rounded-sm relative px-3 py-1 ">
                          Forex Screeners
                        </li>
                        <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white px-3 py-1 ">
                          Stock Screener
                        </li>
                      </ul>
                    </li>
                    <li className="text-blue-light border-b border-blue-light  pt-3 rounded-sm relative px-3 py-1 hover:text-white">
                      <button className="w-full text-left flex items-center outline-none focus:outline-none">
                        <span className="pr-1 flex-1">Calculators</span>
                        <span className="mr-auto">
                          <svg
                            className="fill-current h-5 w-5
                        transition duration-150 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </button>
                      <ul
                        className="bg-gold-light_200 border px-6 py-2 rounded-lg absolute top-0 right-0 
                      transition duration-150 ease-in-out origin-top-left
                      min-w-32
                      "
                      >
                        <li className="px-3 py-1 text-blue-light border-b pt-3 border-blue-light hover:text-white ">
                          Fibonacci Calculator
                        </li>
                        <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white rounded-sm relative px-3 py-1 ">
                          Pip Calculator
                        </li>
                      </ul>
                    </li>
                    <li className="text-blue-light border-b border-blue-light  pt-3 px-3 py-1 hover:text-white">
                      Web Terminal
                    </li>
                    <li className="text-blue-light border-b border-blue-light  pt-3 px-3 py-1 hover:text-white">
                      Market Watch
                    </li>

                    <li className="text-blue-light border-b border-blue-light  pt-3 rounded-sm relative px-3 py-1 hover:text-white">
                      <button className="w-full text-left flex items-center outline-none focus:outline-none">
                        <span className="pr-1 flex-1">Other</span>
                        <span className="mr-auto">
                          <svg
                            className="fill-current h-5 w-5
                        transition duration-150 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </button>
                      <ul
                        className="bg-gold-light_200 border px-3 py-2 rounded-lg absolute top-0 right-0 
                      transition duration-150 ease-in-out origin-top-left
                      min-w-32
                      "
                      >
                        <li className="px-3 py-1 text-blue-light border-b pt-3 border-blue-light hover:text-white ">
                          Correlation
                        </li>
                        <li className="text-blue-light border-b pt-3 border-blue-light hover:text-white rounded-sm relative px-3 py-1 ">
                          Forex Volatillity
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <div className="text-white capitalize">
                  <a href="/">Forum</a>
                </div>

                <div className="text-white capitalize">
                  <Link to="/traders-community">Traders Community</Link>
                </div>

                {/* ************* */}
              </div>
            )}

            {/* __________________ */}

            <div className="flex flex-col lg:flex-row items-start lg:items-start space-x-0 space-y-4 lg:space-y-0 lg:space-x-3 ">
              {token ? (
                <div>
                  <div className="relative">
                    <div
                      onClick={() =>
                        setShowProfileDropDown(!showProfileDropDown)
                      }
                      className="flex items-center cursor-pointer"
                    >
                      <div className="relative size-[40px] shrink-0 rounded-full">
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
                        {user?.username || "user"}
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
                            <li
                              onClick={() =>
                                navigate("/admin-panel/lesson/cateogies")
                              }
                              className="flex items-center justify-center py-3 space-x-3 hover:bg-gray-200 rounded-lg border-b border-gray-300 cursor-pointer"
                            >
                              <TiHomeOutline className="mr-2" />
                              Admin Panel
                            </li>
                            <li
                              onClick={logOutHandler}
                              className="flex items-center px-14 py-3 space-x-3 hover:bg-gray-200 rounded-lg w-max"
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
              ) : (
                <>
                  <div className="bg-gradient-to-b from-white via-bg-gray-100 to-white  py-2 rounded-3xl">
                    <Link
                      to="/login"
                      className="px-4 w-max text-sm  text-gray-700 font-semibold"
                    >
                      Log In
                    </Link>
                  </div>
                  <div className="group relative inline-block bg-gradient-to-b from-[#bb965f] via-[#f0d785] to-[#9c7049] rounded-3xl">
                    <Link
                      to="/register"
                      className="outline-none focus:outline-none  px-2 lg:px-4 py-2 flex items-center w-max"
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}

              <div className="mt-4">
                <GoogleTranslate />
              </div>
            </div>
          </div>
          {/* __________Menu bar Icon________ */}
          <div
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className=" lg:hidden text-white border-2 rounded-lg p-1 cursor-pointer hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </div>

      {showLanguages && <Languages setShowLanguages={setShowLanguages} />}
    </div>
  );
};

export default Navbar;
