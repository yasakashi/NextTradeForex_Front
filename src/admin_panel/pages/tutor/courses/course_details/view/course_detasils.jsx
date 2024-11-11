import React, { useEffect, useState } from "react";
import Navbar from "../../../../../../components/Navbar";
import Footer from "../../../../../../components/Footer";
import Rating from "./components/rating";
import { useParams } from "react-router-dom";
import placeholder from "../../../../../../asset/img/placeholder (1).svg";
import {
  yellow_color,

} from "../../../../categories/view/category_details_view_screen";
import { BiShare } from "react-icons/bi";
import { LiaStreamSolid } from "react-icons/lia";
import CourseInfo from "./components/course_info";
import CourseProgressComponent, {
  CourseBy,
} from "./components/course_progress_component";
import { useAppSelector } from "../../../../../../redux/features/generalSlice";
import { course_data_selector } from "../../../../../../redux/features/courseSlise";
import { useGetCoursesQuery } from "../../../../../../redux/features/course/courseApii";

const CourseDetails = () => {
  const { courseId } = useParams();
  const course_data = useAppSelector(course_data_selector);


  const {
    data: { messageData: courses } = { messageData: [] },
    error,
    isLoading,
  } = useGetCoursesQuery({
    data: {
      Id: courseId,
      authorId: null,
      allowQA: null,
      isPublicCourse: null,
      difficultyLevelId: null,
      courseTags: "",
      courseName: "",
      pageindex: 1,
      rowcount: 21,
    },
  });

  const course = courses[0] || {};

  // useEffect(() => {
  //   get_course_cover_image_api(course_data.id)
  //     .then((res) => {
  //       set_cover(res);
  //     })
  //     .catch((err) => {});
  // }, []);

  

  return (
    <div className="w-full">

      <Navbar />
      <div className="mt-12 w-full px-8 mb-12">
        <div className="flex items-center gap-3">
          <Rating rate="4" />
          <div className="flex items-center space-x-1 text-sm text-white font-medium">
            <span>4.00</span>
            <span>(1 Rating)</span>
          </div>
        </div>
        <h3 className="text-white capitalize text-3xl font-bold my-4">
          {course?.courseName}
        </h3>

        <div className="flex justify-between items-center mb-8">
          <div className="flex  items-center w-2/3">
            <h4 className="border border-gray-200 rounded-full size-[34px]  text-sm flex items-center justify-center text-gray-200 uppercase">
              {course?.authorusername?.slice(0, 2)}
            </h4>
            <h6 className="text-white mx-4">
              By{" "}
              <span style={{ color: yellow_color }}>
                {course?.authorusername}
              </span>
            </h6>
            <h6 className="text-white mx-4">
              Categories :{" "}
              <span style={{ color: yellow_color }}>top Categories </span>
            </h6>
          </div>
          <div className="w-fit flex ">
            <button
              style={{ color: yellow_color }}
              className="flex items-center"
            >
              <LiaStreamSolid className="mx-2" />
              Wishlist
            </button>
            <button
              style={{ color: yellow_color }}
              className="flex items-center "
            >
              <BiShare className="mx-2" />
              Share
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          <div item className="col-span-1 md:col-span-2">
            <img
              src={
                course?.featuredImagepath
                  ? course?.featuredImagepath
                  : placeholder
              }
              alt={course?.courseName}
              className="w-full h-[600px] aspect-video"
            />
            <CourseInfo course={course} />
          </div>
          <div item className="col-span-1 md:col-span-1">
            <CourseProgressComponent course={course} />
            <CourseBy course={course} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CourseDetails;
