import { useEffect, useState } from "react";
import {
  useGetCourseTopicsMutation,
  useGetTopicLessonsMutation,
} from "../../../../../../redux/features/course/courseBuilderApi";

import { Link, useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../../../../../redux/features/course/courseApii";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import CoverImage from "../../../../../../asset/img/placeholder (1).svg";

const Lessons = ({ setLoading }) => {
  const { id } = useParams();

  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);

  const [openTopicIndex, setOpenTopicIndex] = useState(0);

  const [
    getCourseTopics,
    { error: getTopicError, isLoading: getCourseTopicsLoading, isSuccess },
  ] = useGetCourseTopicsMutation();
  const [getTopicLessons, { isLoading: getLessonsLoading }] =
    useGetTopicLessonsMutation();

  const {
    data: { messageData: courses } = { messageData: [] },
    error,
    isLoading,
  } = useGetCoursesQuery({
    data: {
      Id: id,
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

  useEffect(() => {
    async function getLessons() {
      const lessonsRes = await getTopicLessons({
        data: {
          Id: null,
          courseId: id,
          topicId: null,
          lessonName: "",
          pageindex: 1,
          rowcount: 50,
        },
      });

      if (lessonsRes?.data?.messageCode === 200) {
        setLessons(lessonsRes?.data?.messageData);
      }
    }

    getLessons();
  }, []);

  useEffect(() => {
    setLoading(getLessonsLoading);
  }, [getLessonsLoading]);

  useEffect(() => {
    async function courseTopics() {
      const topicsRes = await getCourseTopics({
        data: {
          courseId: id,
          Id: null,
          topicName: "",
          pageindex: 1,
          rowcount: 50,
          lessonorder: "",
        },
      });

      if (topicsRes?.data?.messageCode === 200) {
        setTopics(topicsRes?.data?.messageData);
      }
    }
    courseTopics();
  }, []);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {console.log(lessons)}
      {lessons?.length > 0
        ? lessons?.map((lesson, index) => (
            <Link
              key={index}
              to={`/courses/${course?.courseName}/${course?.courseId}/lesson/${lesson?.id}`}
              className="w-full max-w-[450px] px-4 cursor-pointer"
            >
              <div
                className="flex flex-col  shadow-xl p-4  bg-blue-950 mb-4 rounded-md"
                style={{
                  minHeight: 500,
                  backgroundColor: "#020E51",
                  paddingBottom: 32,
                }}
              >
                <div className="h-[250px] w-full overflow-hidden rounded-[6px]">
                  <LazyLoadImage
                    src={
                      lesson?.featureImagepath
                        ? lesson.featureImagepath
                        : CoverImage
                    }
                    effect="blur"
                    alt="post Imgae"
                    className=" z-50 w-full h-full rounded-lg hover:scale-105 transition-transform"
                    width="100%"
                    height="100%"
                  />
                </div>
                <h5 className="text-[22px] font-bold text-gold-light_400 mt-4 pb-10">
                  {lesson?.lessonName}
                </h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: lesson?.lessonDescription,
                  }}
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
          ))
        : !getLessonsLoading
        ? "Lessons Not found"
        : null}
    </div>
  );
};

export default Lessons;