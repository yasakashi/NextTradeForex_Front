import { IoSearch, IoOptions } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar";
import CourseCard from "../../components/courses/CourseCard";
import { useGetCoursesQuery } from "../../redux/features/course/courseApii";
import CustomRiseLoader from "../../utils/loaders/CustomRiseLoader";

const Courses = () => {
  const location = useLocation();

  const [search, setSearch] = useState(location?.state?.searchValue);
  const [level, setLevel] = useState(null);
  const [isfree, setIsfree] = useState(null);
  const [ispaid, setIspaid] = useState(null);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const { data: { messageData: courses } = { messageData: [] }, isLoading } =
    useGetCoursesQuery({
      data: {
        Id: null,
        authorId: null,
        allowQA: null,
        isPublicCourse: null,
        difficultyLevelId: level,
        courseTags: "",
        courseName: search,
        isfree: isfree,
        ispaid: ispaid,
        pageindex: 1,
        rowcount: 50,
      },
    });

  const clearAllFiltersHandler = () => {
    setSearch("");
    setLevel(null);
    setIsfree(null);
    setIspaid(null);
  };

  return (
    <div>
      <Navbar />
      <div className="wrapper relative mt-10 text-white grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 items-start">
        <div className="hidden md:block col-span-1  md:col-span-1 lg:col-span-1 sticky top-0 left-0">
          <div className="w-full h-full mt-20 bg-blue-light shadow-sm rounded-md py-8 px-4 space-y-8">
            {/* search box */}
            <div className="w-full xl:w-[180px] flex items-center bg-white px-2 rounded-md mx-auto">
              <IoSearch size={20} className="text-[#757c8e]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-full border-none outline-none py-[6px] text-sm text-gray-600 px-2 bg-transparent rounded-xl"
              />
            </div>

            {/* category */}
            <div>
              <h3 className="text-xl font-medium mb-2">Category</h3>
              <label className="flex items-center gap-2">
                <input className="scale-125 cursor-pointer" type="checkbox" />
                <h5>Top courses</h5>
              </label>
            </div>

            {/* level */}
            <div>
              <h3 className="text-xl font-medium mb-2">Level</h3>

              <div className="space-y-1">
                <label className="flex items-center gap-2">
                  <input
                    value={level}
                    checked={level === null}
                    onChange={() => setLevel(null)}
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                  />
                  <h5>All levels</h5>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    value={level}
                    checked={level === 1}
                    onChange={() => setLevel(1)}
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                  />
                  <h5>Newbie</h5>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    value={level}
                    checked={level === 2}
                    onChange={() => setLevel(2)}
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                  />
                  <h5>Intermediate</h5>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    value={level}
                    checked={level === 3}
                    onChange={() => setLevel(3)}
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                  />
                  <h5>Advanced</h5>
                </label>
              </div>
            </div>

            {/* price */}
            <div>
              <h3 className="text-xl font-medium mb-2">Price</h3>
              <div className="space-y-1">
                <label className="flex items-center gap-2">
                  <input
                    checked={isfree === true}
                    onChange={() => {
                      if (isfree === null) {
                        setIsfree(true);
                        setIspaid(null);
                      } else {
                        setIsfree(null);
                      }
                    }}
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                  />
                  <h5>Free</h5>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    checked={ispaid === true}
                    onChange={() => {
                      if (ispaid === null) {
                        setIspaid(true);
                        setIsfree(null);
                      } else {
                        setIspaid(null);
                      }
                    }}
                    className="scale-125 cursor-pointer"
                    type="checkbox"
                  />
                  <h5>Paid</h5>
                </label>
              </div>
            </div>

            <button
              disabled={isLoading}
              type="button"
              onClick={clearAllFiltersHandler}
              className="flex items-center disabled:cursor-not-allowed disabled:opacity-60 capitalize text-sm text-blue-dark btn_bg-gradient_3  shadow-md rounded-lg py-1 px-2 hover:shadow-none"
            >
              <IoMdClose size={20} />
              clear all filters
            </button>
          </div>
        </div>
        <div className="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-4 pl-5">
          {isLoading ? (
            <div className="my-8 text-white flex items-center justify-center text-2xl">
              <CustomRiseLoader color="#fff" />
            </div>
          ) : null}

          <div className="mb-10 mt-2 flex justify-between w-full">
            <div
              onClick={() => setShowMobileMenu(true)}
              className="bg-blue-light p-1 rounded-full md:hidden cursor-pointer shadow-md"
            >
              <IoOptions size={24} className="rotate-90" />
            </div>
            <div></div>
            <select className="text-gray-700 font-normal text-sm outline-blue-light py-[6px] pl-1 w-full md:w-1/2 max-w-[300px] rounded-md shadow-sm">
              <option>Release Date (newest first)</option>
              <option>Release Date (oldest first)</option>
              <option>Course Title (a - z)</option>
              <option>Course Title (z - a)</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-8 mb-20">
            {courses?.length > 0 &&
              courses?.map((course, index) => (
                <CourseCard key={index} course={course} />
              ))}

            {!isLoading && !courses?.length && (
              <div className="bg-blue-light w-full mt-10 font-semibold text-center px-5 py-2 rounded-lg text-white text-lg shadow-md">
                {" "}
                No Record
              </div>
            )}
          </div>
        </div>

        {/* Mobile menue */}
        {showMobileMenu ? (
          <div className="md:hidden fixed top-0 left-0 z-[9999] bg-black/55 w-full h-full">
            <motion.div className="w-full sm:w-[300px] h-screen bg-blue-light shadow-sm rounded-md py-8 px-4 space-y-8">
              {/* close button */}
              <div className="flex flex-end w-full">
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="ml-auto"
                >
                  <IoMdClose size={24} />
                </button>
              </div>
              {/* search box */}
              <div className="w-full xl:w-[180px] flex items-center bg-white px-2 rounded-md mx-auto">
                <IoSearch size={20} className="text-[#757c8e]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="w-full border-none outline-none py-[6px] text-sm text-gray-600 px-2 bg-transparent rounded-xl"
                />
              </div>

              {/* category */}
              <div>
                <h3 className="text-xl font-medium mb-2">Category</h3>
                <label className="flex items-center gap-2">
                  <input className="scale-125 cursor-pointer" type="checkbox" />
                  <h5>Top courses</h5>
                </label>
              </div>

              {/* level */}
              <div>
                <h3 className="text-xl font-medium mb-2">Level</h3>

                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input
                      value={level}
                      checked={level === null}
                      onChange={() => setLevel(null)}
                      className="scale-125 cursor-pointer"
                      type="checkbox"
                    />
                    <h5>All levels</h5>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      value={level}
                      checked={level === 1}
                      onChange={() => setLevel(1)}
                      className="scale-125 cursor-pointer"
                      type="checkbox"
                    />
                    <h5>Newbie</h5>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      value={level}
                      checked={level === 2}
                      onChange={() => setLevel(2)}
                      className="scale-125 cursor-pointer"
                      type="checkbox"
                    />
                    <h5>Intermediate</h5>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      value={level}
                      checked={level === 3}
                      onChange={() => setLevel(3)}
                      className="scale-125 cursor-pointer"
                      type="checkbox"
                    />
                    <h5>Advanced</h5>
                  </label>
                </div>
              </div>

              {/* price */}
              <div>
                <h3 className="text-xl font-medium mb-2">Price</h3>
                <div className="space-y-1">
                  <label className="flex items-center gap-2">
                    <input
                      checked={isfree === true}
                      onChange={() => {
                        if (isfree === null) {
                          setIsfree(true);
                          setIspaid(null);
                        } else {
                          setIsfree(null);
                        }
                      }}
                      className="scale-125 cursor-pointer"
                      type="checkbox"
                    />
                    <h5>Free</h5>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      checked={ispaid === true}
                      onChange={() => {
                        if (ispaid === null) {
                          setIspaid(true);
                          setIsfree(null);
                        } else {
                          setIspaid(null);
                        }
                      }}
                      className="scale-125 cursor-pointer"
                      type="checkbox"
                    />
                    <h5>Paid</h5>
                  </label>
                </div>
              </div>

              <button className="flex items-center capitalize text-sm text-blue-dark btn_bg-gradient_3  shadow-md rounded-lg py-1 px-2 hover:shadow-none">
                <IoMdClose size={20} />
                clear all filters
              </button>
            </motion.div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Courses;
