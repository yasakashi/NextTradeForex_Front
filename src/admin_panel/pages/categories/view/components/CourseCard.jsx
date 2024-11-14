import { motion } from "framer-motion";
import CoverImage from "../../../../../asset/img/placeholder (1).svg";

import { CourseImgTag } from "../../../../../pages/profile/my_courses/view/my_courses";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const CourseCard = ({ course }) => {
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
          <LazyLoadImage
            src={course?.courseFilepath ? course.courseFilepath : CoverImage}
            effect="blur"
            alt="post Imgae"
            className=" z-50 w-full h-full rounded-lg"
            width="100%"
            height="100%"
          />

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
          {course?.courseName}
        </h5>
        <h5
          className="text-white"
          style={{ fontSize: 15, fontWeight: 400, height: 100 }}
        >
          {course?.courseDescription}
        </h5>
        <Link
          to={`/learn_to_trade/course/${course?.courseName}/${course?.id}`}
          // onClick={() => {
          //   onClick?.({ title: title || "Unknown", index });
          // }}
          className="w-max px-4 bg-gradient-to-r from-[#F0D785] to-[#9C7049] py-[10px] mt-4"
          style={{
            // padding: "8px 24px",
            borderRadius: 50,
            position: "relative",
            color: "black",
            overflow: "clip",
          }}
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
            }}
          ></motion.div>
          {/* <Link
            to={`/learn_to_trade/course/${course?.courseName}/${course?.id}`}
            className="px-6 py-3 text-sm font-semibold"
          > */}
          Explore More
          {/* </Link> */}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
