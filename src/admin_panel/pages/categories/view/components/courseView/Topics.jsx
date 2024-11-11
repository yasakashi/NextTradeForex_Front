import { useEffect, useState } from "react";
import {
  useGetCourseTopicsMutation,
  useGetTopicLessonsMutation,
} from "../../../../../../redux/features/course/courseBuilderApi";

import { AiOutlineExclamation } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiQuestionMark } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaBars } from "react-icons/fa6";

const Topics = ({ setLoading }) => {
  const { id } = useParams();

  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState({});

  const [openTopicIndex, setOpenTopicIndex] = useState(0);

  const [
    getCourseTopics,
    { error, isLoading: getCourseTopicsLoading, isSuccess },
  ] = useGetCourseTopicsMutation();
  const [getTopicLessons] = useGetTopicLessonsMutation();

  useEffect(() => {
    setLoading(getCourseTopicsLoading);
  }, [getCourseTopicsLoading]);

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

  const handleToggleTopic = async (index, topicId) => {
    setOpenTopicIndex(null);

    if (openTopicIndex === index) {
      setOpenTopicIndex(null);
    } else {
      setOpenTopicIndex(index);

      if (!lessons[topicId]) {
        const lessonsRes = await getTopicLessons({
          data: {
            Id: null,
            courseId: id,
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
    <div className="w-full">
      {topics.length > 0 && (
        <div className="my-6 space-y-2">
          {topics.map((topic, index) => (
            <div
              key={index}
              className={`border border-gray-300 rounded-md w-full ${
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
                    {lessons[topic?.id]?.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center gap-2"
                      >
                        <span className="border-none outline-none">
                          <IoDocumentTextOutline
                            size={16}
                            className="text-gray-500"
                          />
                        </span>
                        <h4 className="text-gray-700 text-base font-normal capitalize">
                          {lesson?.lessonName}
                        </h4>
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

export default Topics;
