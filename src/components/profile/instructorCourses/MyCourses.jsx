import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const activeClass =
  "content-none before:w-[100%] before:bg-gold-light_400 before:h-[3px] before:absolute before:left-0 before:bottom-0 before:z-[9999] text-gold-light_400";

const MyCourses = () => {
  const [courseType, setCourseType] = useState("published");

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl text-white my-4">My courses</h2>
       
      </div>
      <div className="mt-8">
        <div className="w-full border-b border-b-gray-300">
          <ul className="flex items-center overflow-x-scroll scrollbar-none space-x-4 text-white text-base font-medium w-full pb-2 ml-4">
            <li>
              <Link to="#published"
                className={`relative pb-2 cursor-pointer w-max hover:text-gold-light_400 transition-all ${
                  courseType === "published" ? activeClass : ""
                }`}
                onClick={() => setCourseType("published")}
              >
                Publish (0)
              </Link>
            </li>

            <li>
              <Link to="#pending"
                className={`relative pb-2 cursor-pointer w-max hover:text-gold-light_400 transition-all ${
                  courseType === "pending" ? activeClass : ""
                }`}
                onClick={() => setCourseType("pending")}
              >
                Pending (0)
              </Link>
            </li>

            <li>
              <Link
                to="#draft"
                className={`relative pb-2 cursor-pointer w-max hover:text-gold-light_400 transition-all ${
                  courseType === "draft" ? activeClass : ""
                }`}
                onClick={() => setCourseType("draft")}
              >
                Draft (0)
              </Link>
            </li>
          </ul>
        </div>
        <div className="my-8 text-white">Course1</div>
      </div>
    </div>
  );
};

export default MyCourses;
