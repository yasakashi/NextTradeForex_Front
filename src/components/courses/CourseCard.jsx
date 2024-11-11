import { LazyLoadImage } from "react-lazy-load-image-component";
import { FaRegUser } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa6";

import CoverImage from "../../asset/img/placeholder (1).svg";
import Rating from "../../admin_panel/pages/tutor/courses/course_details/view/components/rating";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-blue-light p-3 rounded-md max-w-[280px] w-full h-[550px]">
      {/* img */}
      <div className="w-full h-full max-h-[180px] bg-cover object-cover z-50 relative">
        <LazyLoadImage
          src={course?.courseFilepath ? course.courseFilepath : CoverImage}
          effect="blur"
          alt="post Imgae"
          className=" z-50 w-full h-full rounded-lg"
          width="100%"
          height="100%"
        />
      </div>

      {/* course detail */}
      <div className="my-4 space-y-3">
        <div>
          <Rating rate={4} />
        </div>

        <h4 className="font-bold text-gold-light_400 text-lg capitalize">
          {course?.courseName}
        </h4>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaRegUser size={14} />
            <span className="text-gray-200">2</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaRegClock size={14} />
            <span className="text-gray-200">
              {course?.courseDuration > 59
                ? Math.floor(course?.courseDuration / 60)
                : course?.courseDuration}{" "}
              {course?.courseDuration > 59 ? "H" : "M"}
            </span>
          </div>
        </div>
      </div>

      {/* course by */}
      <div className="flex  items-center mt-16">
        <div className="border bg-blue-dark border-gray-200 rounded-full size-[34px]  text-sm flex items-center justify-center text-gray-200 uppercase">
          {/* {course?.authorusername?.slice(0, 2)} */}A
        </div>

        <p className="px-3 text-[#757c8e] text-sm">
          By
          <Link to="#" className="text-gold-light_400 px-1">
            {course?.authorusername}
          </Link>
          In{" "}
          <Link to="#" className="text-gold-light_400 px-1">
            Top courses
          </Link>
        </p>
      </div>

      {/* divider */}
      <div className="w-ful h-[1px] bg-gray-100 my-3"></div>

      {/* start learning button */}

      <div className="mt-10 mb-6">
        <Link
          to={`/course/${course?.id}`}
          className="btn_bg-gradient_3 text-blue-dark py-[10px] px-5 rounded-full font-medium text-base"
        >
          Start Learning
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
