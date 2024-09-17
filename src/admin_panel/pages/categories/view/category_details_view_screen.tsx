import { AnimatePresence, motion } from "framer-motion";

import useCategoryDetails from "../hook/use_category_details";
import React from "react";
import { CourseImgTag } from "../../../../pages/profile/my_courses/view/my_courses";
import { LinearProgress } from "@mui/material";

const CategoriesDetailsView = () => {
  const { set_topic_id, topic_id, items, loading } = useCategoryDetails();

  return (
    <div className="h-full w-full flex flex-col items-center justify-start text-white  relative">
      <div className="text-gray-500 w-1/2 self-start my-8 px-3.5 sm:w-2/3">
        In this chapter we will be covering topics related to foundation of a
        professional trader. These topics will act as foundation to your trading
        career.
      </div>

      <div
        className="flex justify-start py-2 mt-4 flex-wrap"
        style={{ borderBottom: "1px solid white", width: "calc(100% - 24px)" }}
      >
        {list.map((item, i) => (
          <button
            className={`transition-all mr-2 mt-2`}
            onClick={() => set_topic_id(i)}
            style={{
              backgroundColor: yellow_medium,
              backgroundImage:
                topic_id === i
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
      <div className="px-4 py-2 w-full">
        <AnimatePresence initial={false} mode="wait">
          {items.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={topic_id}
              className="flex w-full flex-wrap justify-start mt-4"
            >
              {items?.map((item, i) => (
                <DetailsCart key={i} index={i} title={item.name} descr="" />
              ))}
            </motion.div>
          )}
          {!items.length && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex h-96 justify-center items-center"
            >
              <h1>No Data</h1>
            </motion.div>
          )}
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
export const DetailsCart = ({
  index,
  img,
  title,
  hide_descr,
  onClick,
  id,
  descr,
}: {
  index: number;
  id?: string | number;
  img?: any;
  title?: string;
  descr?: string;
  hide_descr?: boolean;
  onClick?: (val: any) => void;
}) => {
  const [hoverd, set_hovered] = React.useState(false);
  return (
    <div
      className="sm:w-full  md:w-3/6 lg:w-2/6 px-4"
      // style={{minWidth:300}}
      onMouseEnter={() => set_hovered(true)}
      onMouseLeave={() => set_hovered(false)}
    >
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
        <button
          onClick={() => {
            onClick?.({ title: title || "Unknown", index });
          }}
          className="w-max  bg-gradient-to-r from-[#F0D785] to-[#9C7049]   mt-4"
          style={{
            // padding: "8px 24px",
            borderRadius: 50,
            position: "relative",
            color: "black",
            overflow: "clip",
          }}
        >
          <motion.div
            transition={{ ease: "linear", duration: 0.2 }}
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
            }}
          ></motion.div>
          <div
            className=""
            style={{
              padding: "13px 25px",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            Explore More
          </div>
        </button>
      </div>
    </div>
  );
};

const imgs = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3eE4IwgbB-YO5-cuoAyvfGlHJRKk3P4nMFQ&s",
  "https://img.freepik.com/free-vector/illustration-financial-concept_53876-37658.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1720224000&semt=ais_user",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3eE4IwgbB-YO5-cuoAyvfGlHJRKk3P4nMFQ&s",
  "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/07/finance.jpeg.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Px9ijQq3SgFxc8AdEf5hNKh6rt2KoGXXaw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW90pHVig3xEI-_lBuk2nsLWa3JaXn4Kn8qw&s",
  "https://extension.harvard.edu/wp-content/uploads/sites/8/2022/07/careers-in-corporate-finance.jpg",
];
