import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importing AnimatePresence from framer-motion
import { sidebarLinks } from "../../../constants/admin/sidebarLinks";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import SubMenu from "./SubMenu";
import { useMediaQuery } from "react-responsive";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const Sidebar = ({ showSidebar }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [subMenuOpen, setSubMenuOpen] = useState(null); // State for submenu
  let isTap = useMediaQuery({ query: "(max-width:1024px)" });
  const [isOpen, setIsOpen] = useState(isTap ? false : true);

  const Sidebar_animation = isTap
    ? {
        //System view
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: 250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        //System view
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "0",
          transition: {
            damping: 40,
          },
        },
      };

  useEffect(() => {
    if (isTap) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTap]);

  const toggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    setSubMenuOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  const navigate = useNavigate();

  return (
    <div className="absolute lg:relative ">
      <motion.div
        variants={Sidebar_animation}
        animate={isOpen ? "open" : "closed"}
        className=" bg-blue-light text-white fixed top-0 left-0 shadow-xl z-[999] w-[14rem] max-w-[14rem] h-screen overflow-hidden "
      >
        <div className="flex flex-col h-full ">
          <ul className="whitespace-pre px-2.5  text-[0.9rem] py-2 flex flex-col  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
            <li
              className="flex justify-end cursor-pointer lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <IoCloseSharp size={25} />
            </li>

            <>
              <li className="w-full flex items-center justify-center  mb-1">
                <div className="flex flex-col justify-center items-center mb-1  ">
                  <img
                    src="/assets/logo.png"
                    alt="NextTrade"
                    className="w-28 h-38"
                  />
                 
                </div>
              </li>
              <li
                className="font-bold text-base flex items-center justify-between  cursor-pointer transition-colors duration-400 hover:bg-gold-light_400 px-2 py-4 rounded-lg"
                onClick={() => navigate("/")}
              >
                <span>Dashboard</span>
                <MdDashboard size={25} />
              </li>
              {sidebarLinks.map((link, index) => (
                <li
                  key={index}
                  onClick={() => toggle(index)}
                  className="relative text-base "
                >
                  <div className="flex items-center justify-between  cursor-pointer transition-colors duration-400 hover:bg-blue-dark px-2 py-4 rounded-lg">
                    <span className="font-bold"> {link.title}</span>
                    {activeIndex === index ? (
                      <MdOutlineKeyboardArrowUp size={20} color="white" />
                    ) : (
                      <MdOutlineKeyboardArrowDown size={20} color="white" />
                    )}
                  </div>
                  <AnimatePresence>
                    {" "}
                    {/* Using AnimatePresence */}
                    {activeIndex === index && subMenuOpen === index && (
                      <motion.div
                        key="submenu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-slate-100 w-full flex flex-col gap-2 z-10 rounded-lg"
                      >
                        <SubMenu subtitle={link.subtitle} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </>
          </ul>
        </div>
      </motion.div>
      <div
        className="m-3 lg:hidden cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <RxHamburgerMenu size={25} className="text-gray-900" />
      </div>
    </div>
  );
};

export default Sidebar;
