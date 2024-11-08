import { useEffect, useState } from "react";
import {
  useGetCourseTopicsMutation,
  useGetTopicLessonsMutation,
} from "../../../../redux/features/course/courseBuilderApi";
import { Link, useParams } from "react-router-dom";
import { RiQuestionMark } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineExclamation } from "react-icons/ai";

const LearningOverview = () => {
  
  const { courseId, lessonId } = useParams();

  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState({});

  const [openTopicIndex, setOpenTopicIndex] = useState(0);

  const [
    getCourseTopics,
    { error, isLoading: getCourseTopicsLoading, isSuccess },
  ] = useGetCourseTopicsMutation();
  const [getTopicLessons] = useGetTopicLessonsMutation();

  useEffect(() => {
    async function courseTopics() {
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
    }
    courseTopics();
  }, []);

  const handleToggleTopic = async (index, topicId) => {
    setOpenTopicIndex(null);

    if (openTopicIndex === index) {
      setOpenTopicIndex(null);
    } else {
      setOpenTopicIndex(index);
      return;
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

  return (
    <div>
      <div className="w-[80%] mx-auto mt-8 mb-4">
        <h4 className="text-white font-normal text-xl">About lesson</h4>
        <div className="w-full h-[400px] mt-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3HVNrLyYiZgApryJ4U8mwybjt950o3AKphA&s"
            alt=""
            className="aspect-video w-full h-full"
          />
        </div>
      </div>

      {/* prev next buttons */}
      <div className="w-full mt-8 flex justify-center items-center py-3 px-2 bg-blue-light shadow-md">
        <div className="flex gap-8 items-center">
          <button
            className="bg-gold-light_400 text-[#222] px-2 py-1 rounded-lg shadow-lg min-w-[110px] justify-center font-semibold text-ms  flex items-center gap-2"
            type="button"
          >
            Previous
          </button>
          <button
            className="bg-gold-light_400 text-[#222] px-2 py-1 rounded-lg shadow-lg min-w-[110px] justify-center font-semibold text-ms  flex items-center gap-2"
            type="button"
          >
            Next
          </button>
        </div>
      </div>

      {/* topics */}
      {topics.length > 0 && (
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
                      {topic?.topicName}{" "}
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
                    onClick={() => {
                      handleToggleTopic(index, topic?.id);
                    }}
                    className="border-none outline-none cursor-pointer px-3 py-1"
                  >
                    {openTopicIndex === index ? (
                      <IoIosArrowUp size={20} className="text-blue-accent" />
                    ) : (
                      <IoIosArrowDown size={20} className="text-blue-accent" />
                    )}
                  </button>
                </div>
              </div>

              {openTopicIndex === index ? (
                <div className="relative bg-white h-full">
                  {/* lessons */}
                  <div className="mb-2 px-2 space-y-2">
                    {/* single lesson */}
                    <div className="flex items-center rounded-md px-4 py-3 ml-auto">
                      <div className="flex items-center gap-2">
                        <span className="border-none outline-none">
                          <IoDocumentTextOutline
                            size={16}
                            className="text-gray-500"
                          />
                        </span>
                        <h4 className="text-gray-700 text-base font-normal capitalize">
                          Trading Diary
                        </h4>
                      </div>
                    </div>
                    {lessons[topic?.id]?.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center justify-between border border-gray-300 rounded-md px-8 py-3 w-[90%] ml-auto"
                      >
                        <div className="flex items-center gap-2">
                          <button className="border-none outline-none">
                            <FaBars size={20} className="text-gray-500" />
                          </button>
                          <h5>{lesson?.lessonName} : </h5>
                          <p className="text-gray-400 text-sm">
                            {lesson?.lessonDescription} Lesson Name
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Quiz */}
                    <div className="flex items-center rounded-md px-4 py-3 ml-auto">
                      <div className="flex items-center gap-2">
                        <span className="border border-gray-600 p-[2px] rounded-full outline-none">
                          <RiQuestionMark size={11} className="text-gray-500" />
                        </span>
                        <h4 className="text-gray-700 text-base font-normal capitalize">
                          Accumulation/Distribution AD
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningOverview;
