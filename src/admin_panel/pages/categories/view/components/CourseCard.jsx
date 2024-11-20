import { motion } from "framer-motion";
import CoverImage from "../../../../../asset/img/placeholder (1).svg";

import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <Link
      to={`/learn_to_trade/course/${course?.courseName}/${course?.id}`}
      className="sm:w-full  md:w-3/6 lg:w-2/6 px-4 cursor-pointer"
    >
      <div
        className="flex flex-col  shadow-xl p-4  bg-blue-950 mb-4"
        style={{
          minHeight: 500,
          backgroundColor: "#020E51",
          paddingBottom: 32,
        }}
      >
        <div className="h-[250px] w-full overflow-hidden rounded-[6px]">
          <LazyLoadImage
            src={course?.courseFilepath ? course.courseFilepath : CoverImage}
            effect="blur"
            alt="post Imgae"
            className=" z-50 w-full h-full rounded-lg hover:scale-105 transition-transform"
            width="100%"
            height="100%"
          />
        </div>
        <h5 className="text-[22px] font-bold text-gold-light_400 mt-4 pb-10">
          {course?.courseName}
        </h5>
        <div
          dangerouslySetInnerHTML={{ __html: course?.whatWillILearn }}
          className="text-gray-300 text-[15px] font-normal h-[95px] overflow-hidden bg-gradient-to-r from-inherit via-purple-500 to-pink-500"
        ></div>
        <button
          onClick={() =>
            navigate(
              `/learn_to_trade/course/${course?.courseName}/${course?.id}`
            )
          }
          className="w-max px-4 bg-gradient-to-r from-[#F0D785] to-[#9C7049] py-[10px] mt-4"
          style={{
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
              top: 0,
              left: 0,
            }}
          ></motion.div>
          Explore More
        </button>
      </div>
    </Link>
  );
};

export default CourseCard;
