import React from "react";
import { motion } from "framer-motion";
import {
  TiPin,
  TiHome,
  TiArchive,
  TiDatabase,
  TiAdjustContrast,
  TiMessage,
  TiMediaPlayOutline,
  TiAdjustBrightness,
} from "react-icons/ti";
import { Link, useLocation, useNavigate } from "react-router-dom";
import store from "../../../redux/store";
import { show_message } from "../../../redux/features/generalSlice";
import { LiaToolboxSolid } from "react-icons/lia";
import { FaPooStorm } from "react-icons/fa";
import { FaDollarSign, FaPager } from "react-icons/fa6";
import { BsCommand } from "react-icons/bs";
import { BiChart, BiSupport, BiVideo } from "react-icons/bi";
import { GrOrderedList, GrSettingsOption } from "react-icons/gr";
import { MdFeedback } from "react-icons/md";
import {
  yellow_color,
  yellow_dark,
  yellow_medium,
} from "../../pages/categories/view/category_details_view_screen";
import { PiMemberOfBold, PiStrategy, PiWebcamBold } from "react-icons/pi";
import { CiLock, CiSettings } from "react-icons/ci";
import { useTheme } from "@mui/material";

const AdminSidebar = () => {
  const [open_item, set_open_item] = React.useState<null | number>(null);
  const { pathname } = useLocation();
  const {
    zIndex: { drawer },
  } = useTheme();
  React.useMemo(() => {
    const route = pathname.split("/");
    const active_route = `/${route?.[route.length - 2]}/${
      route?.[route.length - 1]
    }`;
    const list_index = list.findIndex((item) =>
      item.sub_categories?.some((sub) => sub?.route === active_route)
    );
    if (list_index) {
      set_open_item(list_index);
    }
  }, []);
  const navigate = useNavigate();
  const [hoveed, set_hoverd] = React.useState<null | number>(null);
  return (
    <div
      className="h-full bg-white shadow-lg fixed top-0 left-0 z-[1000] overflow-y-scroll overflow-x-hidden scrollbar-thin"
      style={{ width: 200 }}
    >
      <Link to="/" className="w-full relative">
        <h2
          style={{ height: 38, backgroundColor: yellow_medium }}
          className={`bg-yellow-500 cursor-pointer flex items-center pr-2 pl-2`}
        >
          <TiHome size={25} className="mr-" color={"white"} />
          <span className="ml-1 text-white relative top-1 font-bold">
            NextTradeForex
          </span>
        </h2>
      </Link>

      {list.map((item, i) => {
        const { Icon } = item;
        return (
          <motion.div
            onMouseEnter={() => {
              if (open_item === i) return;
              set_hoverd(i);
            }}
            onMouseLeave={() => {
              set_hoverd(null);
            }}
            key={i}
            style={{ boxShadow: "0px -2px 5px 0px rgba(0,0,0,0.16)" }}
            className={`w-full relative  transition-colors relative${
              open_item === i ? "bg-yellow-50" : "bg-yellow-200"
            }`}
          >
            <motion.h2
              whileHover={{ backgroundColor: yellow_color }}
              style={{
                height: 38,
                backgroundColor: i === open_item ? yellow_medium : "#fff",
              }}
              className={`hover:bg-yellow-500 font-semibold text-sm ${
                i === open_item ? "bg-yellow-500 text-white" : ""
              } cursor-pointer flex items-center pr-2 pl-2`}
              onClick={() => {
                if (open_item === i) return set_open_item(null);
                set_open_item(i);
              }}
            >
              <Icon
                size={25}
                className="mr-1"
                color={open_item === i ? "white" : "black"}
              />

              {item.title}
            </motion.h2>
            <motion.div
              style={{}}
              className="w-full overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: open_item === i ? "fit-content" : 0 }}
            >
              {item?.sub_categories?.map((sub, index) => {
                const he = sub.route ? pathname.includes(sub?.route) : false;
                return (
                  <motion.div
                    whileHover={{ backgroundColor: yellow_color }}
                    key={index}
                    style={{ backgroundColor: he ? yellow_medium : "#fff" }}
                    className={`h-8 pl-9 cursor-pointer flex items-center text-sm  ${
                      he ? "bg-yellow-500 text-white" : ""
                    }`}
                    onClick={() => {
                      if (!sub.route)
                        return store.dispatch(
                          show_message({
                            message: "Under Development ...!",
                            color: "info",
                            mode: true,
                          })
                        );
                      navigate(`/admin-panel${sub?.route}`);
                    }}
                  >
                    {sub.title}
                  </motion.div>
                );
              })}
            </motion.div>
            {hoveed === i && open_item !== hoveed && (
              <div
                className="absolute bg-white shadow-md z-[10001]"
                style={{ right: -200, top: 0, zIndex: drawer + 5 }}
              >
                <motion.div
                  whileHover={{ backgroundColor: yellow_color }}
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "8px solid transparent",
                    borderRight: "12px solid #fff",
                    top: 10,
                    borderBottom: "8px solid transparent",
                    position: "absolute",
                    left: -12,
                  }}
                ></motion.div>
                {item?.sub_categories?.map((sub, index) => {
                  const he = sub.route ? pathname.includes(sub?.route) : false;
                  return (
                    <motion.div
                      whileHover={{ backgroundColor: yellow_color }}
                      key={index}
                      style={{
                        width: 200,
                        padding: "8px 16px",
                        backgroundColor: he ? yellow_medium : "#fff",
                      }}
                      className={`h-8 cursor-pointer flex items-center text-sm  ${
                        he ? "bg-yellow-500 text-white" : ""
                      }`}
                      onClick={() => {
                        // const showing = store.getState().general.message.mode;
                        if (!sub.route)
                          return store.dispatch(
                            show_message({
                              message: "Under Development ...!",
                              color: "info",
                              mode: true,
                            })
                          );
                        navigate(`/admin-panel${sub?.route}`);
                      }}
                    >
                      {sub.title}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default AdminSidebar;
const list = [
  {
    title: "Lessons",
    Icon: TiPin,
    sub_categories: [
      { title: "All Lessons" },
      { title: "Add Lesson" },
      { title: "Tags" },
      { title: "Categories", route: "/lesson/cateogies" },
      { title: "Reorder" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Bluehost",
    Icon: TiArchive,
    sub_categories: [
      { title: "Home" },
      { title: "MaretPlase" },
      { title: "-Featured" },
      { title: "-Themes" },
      { title: "-SEO" },
      { title: "Staging" },
      { title: "Settings" },
      { title: "-Help" },
    ],
  },
  {
    title: "Dashboard",
    Icon: TiDatabase,
    sub_categories: [
      { title: "Home" },
      { title: "Updates" },
      { title: "Site Reviews" },
    ],
  },
  {
    title: "Tutor LMS",
    Icon: TiAdjustContrast,
    sub_categories: [
      // { title: "Courses" },
      { title: "Courses", route: "/tutor/courses" },
      { title: "Lessons", route: "/tutor/lessons" },
      { title: "Email" },
      { title: "Categories" },
      { title: "Tags" },
      { title: "Students" },
      { title: "Instractors" },
      { title: "Announcements" },
      { title: "Q & A" },
      { title: "Quiz Attempts" },
      { title: "Withdraw Requests" },
      { title: "Add-ons" },
      { title: "Tools" },
      { title: "Settings" },
      { title: "What's New" },
      { title: "Upgrade to Pro" },
    ],
  },
  {
    title: "Email Templates",
    Icon: TiMessage,
    sub_categories: [
      { title: "All Emails" },
      { title: "Add New" },
      { title: "Extentions" },
      { title: "Try Premium Version" },
    ],
  },
  {
    title: "Posts",
    Icon: TiPin,
    sub_categories: [
      { title: "All Posts" },
      { title: "Add New" },
      { title: "Tags" },
      { title: "Categories" },
      { title: "Reorder" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Media",
    Icon: TiMediaPlayOutline,
    sub_categories: [{ title: "Library" }, { title: "Add New" }],
  },
  // {
  //   title: "Totur",
  //   Icon: TiAdjustBrightness,
  //   sub_categories: [
  //     { title: "Lessons", route: "/tutor/lessons" },
  //     { title: "Courses", route: "/tutor/courses" },
  //   ],
  // },
  {
    title: "Market Pulse",
    Icon: TiAdjustBrightness,
    sub_categories: [
      { title: "Indicators" },
      { title: "Market pulse", route: "/lessons/market-pulse" },
      { title: "Crypto" },
      { title: "Indices" },
      { title: "Comodities" },
      { title: "Stocks" },
      { title: "Forex Chart" },
      { title: "Srategy" },
    ],
  },
  {
    title: "Tools",
    Icon: LiaToolboxSolid,
    sub_categories: [
      { title: "PDF Books" },
      { title: "Tables" },
      { title: "Webinar" },
      { title: "Podcast" },
    ],
  },
  {
    title: "Posts",
    Icon: FaPooStorm,
    sub_categories: [{ title: "Forum post" }, { title: "Blog post" }],
  },
  {
    title: "Pages",
    Icon: FaPager,
    sub_categories: [{ title: "All Pages" }, { title: "Add New" }],
  },
  { title: "Commands", Icon: BsCommand },
  {
    title: "Fluent Support",
    Icon: BiSupport,
    sub_categories: [
      { title: "Dashboard" },
      { title: "Tickets" },
      { title: "Workflows" },
      { title: "Activities" },
      { title: "Settings" },
      { title: "Reports" },
    ],
  },
  {
    title: "PDF Books",
    Icon: GrOrderedList,
    sub_categories: [
      { title: "All Books", route: "/pdf_books/all_books" },
      { title: "Add New Book" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Feedbacks",
    Icon: MdFeedback,
    sub_categories: [{ title: "All Feedbacks" }, { title: "Add New" }],
  },
  {
    title: "Videos",
    Icon: BiVideo,
    sub_categories: [
      { title: "All Videos" },
      { title: "Add New" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Teem Members",
    Icon: PiMemberOfBold,
    sub_categories: [{ title: "All Team Members" }, { title: "Add New" }],
  },
  {
    title: "Webinars",
    Icon: PiWebcamBold,
    sub_categories: [
      { title: "All Webinars" },
      { title: "Add New" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "User Login History",
    Icon: CiLock,
    sub_categories: [{ title: "Login List" }, { title: "Pro Features" }],
  },
  {
    title: "Blog",
    Icon: GrSettingsOption,
    sub_categories: [
      { title: "All Blog" },
      { title: "Add New" },
      { title: "Tags" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Forex Chart",
    Icon: BiChart,
    sub_categories: [
      { title: "All Forex Charts" },
      { title: "Add New" },
      { title: "Tags" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Strategies",
    Icon: PiStrategy,
    sub_categories: [
      { title: "All Strategies" },

      { title: "Add New" },
      { title: "Tags" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Stocks",
    Icon: CiSettings,
    sub_categories: [
      { title: "All Stocks" },
      { title: "Add New" },
      { title: "Tags" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
  {
    title: "Indices",
    Icon: FaDollarSign,
    sub_categories: [
      { title: "All Indices" },
      { title: "Add New" },
      { title: "Tags" },
      { title: "Categories" },
      { title: "Taxonomy Order" },
    ],
  },
];
