import { FaChartBar } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AiOutlineExclamation } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa6";

import { CustomDivider } from "../../../../../../../pages/profile/new_course_components/new_cource_card";
import { blue_medium } from "../../../../../categories/view/category_details_view_screen";

const CourseProgressComponent = ({ course }) => {
  const nameFormat = (name) => {
    if (name) {
      return name.split(" ").join("-");
    } else return "";
  };

  return (
    <div className="bg-white text-black w-full rounded-md py-8 px-4">
      <h5 className="text-black font-bold text-lg mb-4">Course Progress</h5>
      <div className="flex justify-between">
        <p className="text-base">0/0</p>
        <p className="text-base text-gray-600">0% Complete</p>
      </div>

      <div className="w-full h-1 bg-[#e3e5eb] rounded-lg mt-4 mb-8"></div>

      <div className="my-3 w-full">
        <Link
          className="text-center py-2 border w-full block rounded-lg text-[#020E51] text-[17px] font-semibold bg-gradient-to-r from-[#dbbd75] from-0% via-[#bb965f] via-50% to-[#9f7549] to-100%"
          to={`/courses/${nameFormat(course?.courseName)}/${
            course?.id
          }/lesson/lessonid`}
        >
          Start Learing
        </Link>
      </div>

      {/* warning */}
      <div className="border mt-8 border-[#ed9700b3] flex items-center gap-2 rounded-md px-3 py-4">
        <span className="border-2 rounded-full border-[#ed9700] p-[1px]">
          <AiOutlineExclamation size={20} className="text-[#ed9700]" />
        </span>
        <p className="text-[#41454F]">
          Complete all lessons to mark this course as complete
        </p>
      </div>

      <div className="w-full mt-8 h-[1px] bg-[#e3e5eb] rounded-lg mb-4"></div>

      <ul className="text-gray-600">
        <li className="text-base flex items-center mt-4">
          <FaChartBar className="mr-3" /> Intermediate
        </li>
        <li className="text-base flex items-center my-4">
          <FaGraduationCap className="mr-3" /> total Enrolled
        </li>
        <li className="text-base flex items-center my-4">
          <FaRegClock className="mr-3" />
          {course?.courseDuration && course?.courseDuration > 60
            ? course?.courseDuration / 60
            : course?.courseDuration && course?.courseDuration < 60
            ? course?.courseDuration
            : ""}
          <span className="px-1">
            {course?.courseDuration < 60 ? "Minutes" : "Hours"} Duration
          </span>
        </li>
        <li className="text-base flex items-center">
          <IoReload className="mr-3" /> Last Updated
        </li>
      </ul>
    </div>
  );
};

export default CourseProgressComponent;

export const CourseBy = ({ course }) => {
  return (
    <div className="bg-white text-black w-full rounded-md py-8 px-4 mt-8">
      <h5 className="text-[#212327] font-medium text-base mb-4">A course by</h5>
      <div className="flex justify-start items-center mb-8">
        <p className="flex items-center justify-center uppercase shrink-0 bg-[#030c3b] size-[40px] rounded-full mr-4 text-white aspect-square">
          {course?.authorusername ? course?.authorusername.slice(0, 2) : "N"}
        </p>
        <p className="text-base capitalize text-[#212327] font-bold hover:text-gold-light_400 transition-colors cursor-pointer">
          {course?.authorusername}
        </p>
      </div>

      {/* divider */}
      <div className="w-full mt-8 h-[1px] bg-[#e3e5eb] rounded-lg mb-4"></div>

      {/*  Material Includes */}
      <div>
        <h5 className="font-bold text-[#212327] text-xl mb-4">
          Material Includes
        </h5>
        <div className="text-[#212327] ml-4">{course?.materialsIncluded}</div>
      </div>

      {/*  Requirements */}
      <div className="mt-8">
        <h5 className="font-bold text-[#212327] text-xl mb-4">Requirements</h5>
        <div className="text-[#212327] ml-4">
          {course?.requirementsInstructions}
        </div>
      </div>
    </div>
  );
};
