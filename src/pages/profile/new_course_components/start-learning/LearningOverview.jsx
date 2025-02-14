import { useEffect, useState } from "react";
import {
  useGetCourseTopicsMutation,
  useGetTopicLessonsMutation,
} from "../../../../redux/features/api/course/courseBuilderApi";
import { Link, useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineExclamation } from "react-icons/ai";
import { motion } from "framer-motion";
import { useGetCoursesQuery } from "../../../../redux/features/api/course/courseApii";
import { FaArrowDownLong } from "react-icons/fa6";

const LearningOverview = ({ isLoading }) => {
  const { courseId } = useParams();

  const [activeLesson, setActiveLesson] = useState();

  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState({});

  const [openTopicIndex, setOpenTopicIndex] = useState(0);

  const [
    getCourseTopics,
    { error, isLoading: getCourseTopicsLoading, isSuccess },
  ] = useGetCourseTopicsMutation();
  const [getTopicLessons, { isLoading: lessonsLoading }] =
    useGetTopicLessonsMutation();

  // course topics
  useEffect(() => {
    (async () => {
      const topicsRes = await getCourseTopics({
        data: {
          courseId: courseId,
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
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (topics?.length > 0) {
        const tId = topics[0]?.id || "";
        const cId = topics[0]?.courseId || "";

        if (!lessons[tId]) {
          const lessonsRes = await getTopicLessons({
            data: {
              Id: null,
              courseId: cId,
              topicId: tId,
              lessonName: "",
              pageindex: 1,
              rowcount: 50,
            },
          });

          if (lessonsRes?.data?.messageCode === 200) {
            setLessons((prev) => ({
              ...prev,
              [tId]: lessonsRes?.data?.messageData,
            }));
          }
        }
      }
    })();
  }, [topics?.length]);

  // course
  const {
    data: { messageData: [course = {}] = [] } = { messageData: [] },
    error: getCourseError,
    isLoading: courseLoading,
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

  const handleToggleTopic = async (index, topicId) => {
    if (openTopicIndex === index) {
      setOpenTopicIndex(null);
    } else {
      setOpenTopicIndex(index);

      if (!lessons[topicId]) {
        const lessonsRes = await getTopicLessons({
          data: {
            Id: null,
            courseId: courseId,
            topicId: topicId,
            lessonName: "",
            pageindex: 1,
            rowcount: 50,
          },
        });
        if (lessonsRes?.data?.messageCode === 200) {
          setLessons((prev) => ({
            ...prev,
            [topicId]: lessonsRes?.data?.messageData,
          }));
        }
      }
    }
  };

  const lessonPreviewHandler = (lesson) => {
    setActiveLesson(lesson);
  };

  const handleNextVideo = async () => {
    if (activeLesson) {
      const currentLessons = lessons[topics[openTopicIndex]?.id] || [];
      const currentIndex = currentLessons.findIndex(
        (lesson) => lesson.lessonName === activeLesson.lessonName
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < currentLessons.length) {
        setActiveLesson(currentLessons[nextIndex]);
      } else {
        // Move to the next topic if exists
        const nextTopicIndex = openTopicIndex + 1;
        if (nextTopicIndex < topics.length) {
          const nextTopicId = topics[nextTopicIndex]?.id;
          setOpenTopicIndex(nextTopicIndex);
          const nextLessonsRes = await getTopicLessons({
            data: {
              Id: null,
              courseId: courseId,
              topicId: nextTopicId,
              lessonName: "",
              pageindex: 1,
              rowcount: 50,
            },
          });
          if (nextLessonsRes?.data?.messageCode === 200) {
            setLessons((prev) => ({
              ...prev,
              [nextTopicId]: nextLessonsRes?.data?.messageData,
            }));
            setActiveLesson(nextLessonsRes?.data?.messageData[0]); // Set the first lesson of the next topic as active
          }
        }
      }
    }
  };

  const handlePrevVideo = async () => {
    if (activeLesson) {
      const currentLessons = lessons[topics[openTopicIndex]?.id] || [];
      const currentIndex = currentLessons.findIndex(
        (lesson) => lesson.lessonName === activeLesson.lessonName
      );
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        setActiveLesson(currentLessons[prevIndex]);
      } else {
        // Move to the previous topic if exists
        const prevTopicIndex = openTopicIndex - 1;
        if (prevTopicIndex >= 0) {
          const prevTopicId = topics[prevTopicIndex]?.id;
          setOpenTopicIndex(prevTopicIndex);
          const prevLessonsRes = await getTopicLessons({
            data: {
              Id: null,
              courseId: courseId,
              topicId: prevTopicId,
              lessonName: "",
              pageindex: 1,
              rowcount: 50,
            },
          });
          if (prevLessonsRes?.data?.messageCode === 200) {
            setLessons((prev) => ({
              ...prev,
              [prevTopicId]: prevLessonsRes?.data?.messageData,
            }));
            setActiveLesson(
              prevLessonsRes?.data?.messageData[
                prevLessonsRes?.data?.messageData.length - 1
              ]
            ); // Set the last lesson of the previous topic as active
          }
        }
      }
    }
  };

  return (
    <>
      {/* prev next buttons */}
      {activeLesson ? (
        <div className="w-full flex justify-center items-center py-3 px-2 bg-blue-light shadow-md">
          <div className="flex gap-8 items-center">
            <button
              onClick={handlePrevVideo}
              className="bg-gold-light_400 text-[#222] px-2 py-1 rounded-lg shadow-lg min-w-[110px] justify-center font-semibold text-ms  flex items-center gap-2"
              type="button"
            >
              Previous
            </button>
            <button
              onClick={handleNextVideo}
              className="bg-gold-light_400 text-[#222] px-2 py-1 rounded-lg shadow-lg min-w-[110px] justify-center font-semibold text-ms  flex items-center gap-2"
              type="button"
            >
              Next
            </button>
          </div>
        </div>
      ) : null}

      <div className="w-[80%] mx-auto mt-8 mb-4 h-auto scrollbar-none">
        <div className="">
          <h4 className="text-white font-normal text-xl">
            {activeLesson?.lessonName
              ? activeLesson?.lessonName
              : course?.courseName}
          </h4>

          <div className="w-full h-auto mt-4 sm:w-[600px] md:w-[720px] lg:w-[720px] xl:w-[920px] mx-auto">
            <h4 className="text-white text-base my-2"></h4>
            <div className="my-8 border border-gray-300 aspect-video w-full rounded-lg shadow-sm">
              {activeLesson?.lessonFilepath &&
              activeLesson?.lessonFilecontenttype.includes("video") ? (
                <video
                  key={activeLesson.lessonFilepath}
                  // width="600"
                  controls
                  className="h-full w-full aspect-video bg-cover object-fill bg-center rounded-lg"
                >
                  <source
                    src={activeLesson.lessonFilepath}
                    type={activeLesson.lessonFilecontenttype}
                  />
                  Your browser does not support the video tag.
                </video>
              ) : null}

              {!activeLesson?.lessonFilepath ? (
                <>
                  {course?.courseFilepath ? (
                    <img
                      src={course?.courseFilepath}
                      alt=""
                      className="aspect-video w-full rounded-lg h-full max-w-[800px] mx-auto"
                    />
                  ) : (
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HVNrLyYiZgApryJ4U8mwybjt950o3AKphA&s"
                      alt=""
                      className="aspect-video w-full rounded-lg h-full max-w-[800px] mx-auto"
                    />
                  )}
                </>
              ) : null}
            </div>

            <p
              dangerouslySetInnerHTML={{
                __html: activeLesson?.lessonDescription,
              }}
              className="text-base text-white py-3"
            ></p>
          </div>
        </div>

        {/* topics */}

        {/* {isLoading && (
          <motion.div
            key={`${isLoading}`}
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              width: "100%",
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
            }}
            className="w-full my-14"
          >
            <motion.div
              style={{
                width: 80,
                height: 80,
                border: "5px solid white",
                alignSelf: "center",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
              }}
              animate={{
                scale: [0.5, 1, 0.5, 1, 0.5, 1],
                rotate: [0, 270, 0, 270, 0, 270],
                borderRadius: ["20%", "50%", "20%", "50%", "20%", "50%"],
              }}
            />
          </motion.div>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start mt-8">
          {/* topics */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white text-xl font-semibold">Course Topics</h4>
            {getCourseTopicsLoading ? (
              <div className="text-gray-200 text-lg py-3">
                Fetching data ...
              </div>
            ) : null}
            {topics?.length > 0 && (
              <div className="my-10 mb-10 space-y-2">
                {topics.map((topic, index) => (
                  <div
                    key={index}
                    className={`border border-gray-300 rounded-md ${
                      openTopicIndex === index ? "" : ""
                    } flex flex-col`}
                  >
                    <div className="flex items-center justify-between border bg-[#eff1f6] px-8 py-3">
                      <div className="flex items-center gap-2">
                        <div className="text-[#222] text-base flex items-center gap-2">
                          <h5 className="capitalize font-medium">
                            {topic?.topicName}
                          </h5>
                          <Link
                            className="border border-gray-600 p-[1px] rounded-full"
                            to="#"
                          >
                            <AiOutlineExclamation
                              className="text-gray-600"
                              size={13}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="flex items-center gap-10">
                        <button
                          type="button"
                          onClick={() => handleToggleTopic(index, topic?.id)}
                          className="border-none outline-none cursor-pointer px-3 py-1"
                        >
                          {openTopicIndex === index ? (
                            <IoIosArrowUp
                              size={20}
                              className="text-blue-accent"
                            />
                          ) : (
                            <IoIosArrowDown
                              size={20}
                              className="text-blue-accent"
                            />
                          )}
                        </button>
                      </div>
                    </div>

                    {openTopicIndex === index ? (
                      <div className="relative bg-white h-full">
                        {/* lessons */}
                        <div className="mb-2 px-2 space-y-2">
                          {/* single lesson */}
                          {lessonsLoading ? (
                            <p className="p-4 text-gray-600 text-base">
                              Loading data ...
                            </p>
                          ) : null}
                          {lessons[topic?.id]?.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center rounded-md px-4 py-3 ml-auto group"
                              onClick={() => lessonPreviewHandler(lesson)}
                            >
                              <div className="flex items-center gap-2">
                                <span className="border-none outline-none">
                                  <IoDocumentTextOutline
                                    size={16}
                                    className="text-gray-500 group-hover:text-blue-accent transition-colors"
                                  />
                                </span>

                                <h4
                                  className={` text-base font-normal capitalize group-hover:text-blue-accent group-hover:cursor-pointer transition-colors ${
                                    activeLesson?.id === lesson?.id
                                      ? "text-blue-accent"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {lesson?.lessonName}
                                </h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* attachments */}
          <div>
            <h4 className="text-white text-xl font-semibold mb-10">
              Attachments
            </h4>

            <div className="bg-white w-full rounded-lg shadow-md p-4">
              <div>
                <h5 className="text-gray-600 font-medium mb-2">Documents</h5>

                {!activeLesson || !activeLesson?.fileattachments?.length > 0 ? (
                  <span className="text-gray-700 text-sm px-2">No record.</span>
                ) : (
                  <div>
                    {activeLesson?.fileattachments?.map((attachment, index) => (
                      <Link
                        to={attachment?.lessonFilepath}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        className="bg-gray-100 shadow-sm p-2 rounded-md flex items-center justify-between space-x-3"
                      >
                        <div className="flex items-center gap-2 grow">
                          <img
                            className="w-9"
                            src="/assets/pdf-icon.png"
                            alt="Icon"
                          />
                          <span className="text-sm md:text-base line-clamp-1">
                            {attachment?.lessonFilename}
                          </span>
                        </div>
                        <div className="bg-gray-200 w-10 flex items-center justify-center aspect-square rounded-full">
                          <FaArrowDownLong size={16} />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-full h-[1px] bg-gray-300 my-3" />

              <div>
                <h5 className="text-gray-600 font-medium mb-2">Links</h5>
                {!activeLesson || !activeLesson?.videoSource ? (
                  <span className="text-gray-700 text-sm px-2">No record.</span>
                ) : (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    to={activeLesson?.videoSource}
                    className="text-blue-500 font-normal text-sm md:text-base flex items-center gap-2 group"
                  >
                    <img
                      className="w-10"
                      src="/assets/youtube.png"
                      alt="Youtube"
                    />
                    <span className="group-hover:underline cursor-pointer transition-all">
                      {" "}
                      Watch on youtube
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lessonsLoading ? (
        <div className="fixed inset-0 w-full h-screen bg-black/70 flex items-center justify-center">
          <motion.div
            key={`${isLoading}`}
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              width: "100%",
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
            }}
            className="w-full my-14"
          >
            <motion.div
              style={{
                width: 80,
                height: 80,
                border: "5px solid white",
                alignSelf: "center",
              }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 3,
              }}
              animate={{
                scale: [0.5, 1, 0.5, 1, 0.5, 1],
                rotate: [0, 270, 0, 270, 0, 270],
                borderRadius: ["20%", "50%", "20%", "50%", "20%", "50%"],
              }}
            />
          </motion.div>
        </div>
      ) : null}
    </>
  );
};

export default LearningOverview;
