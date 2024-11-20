import { AnimatePresence, motion } from "framer-motion";

import React, { useState } from "react";
import { CourseImgTag } from "../../../../pages/profile/my_courses/view/my_courses";
import { LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import Topics from "./components/courseView/Topics";
import Lessons from "./components/courseView/Lessons";
import Meetings from "./components/courseView/Meetings";
import EBooks from "./components/courseView/EBooks";

const CategoriesDetailsView = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [loading, setLoading] = useState(false);

  return (
    <div className="h-full w-full flex flex-col items-center justify-start text-white  relative">
      <div className="text-gray-500 w-full text-center md:text-left md:w-1/2 self-start my-8 px-3.5 sm:w-2/3">
        In this chapter we will be covering topics related to foundation of a
        professional trader. These topics will act as foundation to your trading
        career.
      </div>

      <div className="flex justify-start py-2 mt-4 flex-wrap border-b border-white w-[calc(100%-24px)]">
        {list.map((item, i) => (
          <button
            className={`transition-all mr-2 mt-2`}
            onClick={() => setActiveTab(i)}
            style={{
              backgroundColor: yellow_medium,
              backgroundImage:
                activeTab === i
                  ? "linear-gradient(to left, #2747f0,#0c1f84)"
                  : undefined,
              padding: "4px 16px",
              borderRadius: 50,
            }}
            key={i}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="w-full">
        {loading && (
          <LinearProgress
            style={{ backgroundColor: "transparent" }}
            color="primary"
          />
        )}
      </div>
      <div className="px-4 py-2 mt-10 w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-wrap justify-start mt-4"
          >
            {activeTab === 0 ? (
              <Topics setLoading={setLoading} />
            ) : activeTab === 1 ? (
              <Lessons setLoading={setLoading} />
            ) : activeTab === 6 ? (
              <Meetings setLoading={setLoading} />
            ) : activeTab === 2 ? (
              <EBooks setLoading={setLoading} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CategoriesDetailsView;
const list = [
  { title: "Topics" },
  { title: "Lessons" },
  { title: "E-Books" },
  { title: "Podcasts" },
  { title: "Webinars" },
  { title: "Videos" },
  { title: "Meetings" },
];

export const yellow_color = "#F0D785";
export const yellow_dark = "#9C7049";
export const yellow_medium = "#d0b06e";
export const blue_medium = "#020E51";

export const DetailsCart = ({ img, title, id, descr, item }) => {
  return (
    <div className="sm:w-full  md:w-3/6 lg:w-2/6 px-4">
      <div
        className="flex flex-col  shadow-xl p-4  bg-blue-950 mb-4"
        style={{
          minHeight: 500,
          backgroundColor: "#020E51",
          paddingBottom: 32,
        }}
      >
        <div
          style={{
            height: 250,
            width: "100%",
            overflow: "hidden",
            borderRadius: 6,
          }}
        >
          <CourseImgTag id={id} img={img} />

          {/* <motion.img
            transition={{ ease: "linear" }}
            initial={{ scale: 1 }}
            animate={{ scale: hoverd ? 1.1 : 1 }}
            style={{
              width: "100%",
              height: 250,
            }}
            src={img || imgs?.[index]}
            alt=""
          /> */}
        </div>
        <h5
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#bb914a",
            // margin: "0px 0px px",
            marginTop: 16,
            height: 86,
          }}
        >
          {title}
        </h5>
        <h5
          className="text-white"
          style={{ fontSize: 15, fontWeight: 400, height: 100 }}
        >
          {descr}
        </h5>
        <Link
          to={`/learn_to_trade/courses/${item?.name}/${item?.value}`}
          className="w-max py-3 px-4 text-blue-dark font-normal bg-gradient-to-r from-[#F0D785] to-[#9C7049] mt-4 rounded-full relative overflow-clip shadow-lg outline-blue-dark"
        >
          <motion.div
            transition={{ ease: "linear", duration: 0.5 }}
            whileHover={{
              backgroundPosition: "50px 0px",
            }}
            style={{
              width: "100%",
              height: "100%",

              backgroundPosition: "350px 0px",
              backgroundImage:
                "linear-gradient(to right,rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0))",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          ></motion.div>
          Explore More
        </Link>
      </div>
    </div>
  );
};
