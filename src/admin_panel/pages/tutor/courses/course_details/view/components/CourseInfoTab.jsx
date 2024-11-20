import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { AiOutlineExclamation } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiQuestionMark } from "react-icons/ri";

import {
  useGetCourseTopicsMutation,
  useGetTopicLessonsMutation,
  useGetTopicQuizMutation,
} from "../../../../../../../redux/features/course/courseBuilderApi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const CourseInfoTab = ({ course }) => {
 
  const [descShowMore, setDescShowMore] = useState(false);

  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState({});
  const [quizes, setQuizes] = useState({});

  const [openTopicIndex, setOpenTopicIndex] = useState(null);

  const [
    getCourseTopics,
    { error, isLoading: getCourseTopicsLoading, isSuccess },
  ] = useGetCourseTopicsMutation();
  const [getTopicLessons] = useGetTopicLessonsMutation();
  const [getTopicQuiz] = useGetTopicQuizMutation();

  useEffect(() => {
    async function courseTopics() {
      const topicsRes = await getCourseTopics({
        data: {
          courseId: course?.id,
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
            courseId: course?.id,
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

      if (!quizes[topicId]) {
        const quizRes = await getTopicQuiz({
          data: {
            Id: null,
            courseId: course?.id,
            topicId: topicId,
            quizTitle: "",
            pageindex: 1,
            rowcount: 50,
          },
        });

        if (quizRes?.data?.messageCode === 200) {
          setQuizes((prev) => ({
            ...prev,
            [topicId]: quizRes?.data?.messageData,
          }));
        }
      }
    }
  };

  return (
    <div className="w-full flex flex-col space-y-10">
      {/* about course */}

      <div>
        <h5 className="font-bold text-xl mb-4">About Course</h5>
        <div>
          <div
            className={`font-normal text-[15px] space-y-4 mb-4 w-full overflow-y-hidden text-justify ${
              descShowMore ? "h-auto" : "h-[250px]"
            }`}
            dangerouslySetInnerHTML={{ __html: course?.courseDescription }}
          ></div>
          {descShowMore ? (
            <div
              onClick={() => setDescShowMore(false)}
              className="cursor-pointer hover:underline transition-all text-gray-400 w-max text-base flex items-center gap-2 mt-2 mb-4"
            >
              <FaMinus size={20} />
              <span>Show Less</span>
            </div>
          ) : (
            <div
              className="cursor-pointer hover:underline transition-all text-gray-400 w-max text-base flex items-center gap-2 mt-2 mb-4"
              onClick={() => setDescShowMore(true)}
            >
              <FaPlus size={20} />
              <span>Show More</span>
            </div>
          )}
        </div>
      </div>

      {/* What will you Learn */}
      <div>
        <h5 className="font-bold text-xl mb-4">What will you learn ?</h5>
        <div>{course?.whatWillILearn}</div>
      </div>

      {/* Course Content */}
      <div>
        <h5 className="font-bold text-xl mb-4">Course Content</h5>
      </div>

      {topics.length > 0 && (
        <div className="my-6 space-y-2">
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
                <div className="relative bg-white h-full min-h-[100px]">
                  {/* lessons */}
                  <div className="mb-2 px-2 space-y-2">
                    {/* single lesson */}
                    {/* <div className="flex items-center rounded-md px-4 py-3 ml-auto">
                     
                    </div> */}
                    {lessons[topic?.id]?.map((lesson, lessonIndex) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center gap-2 py-2"
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

                    {quizes[topic?.id]?.map((quiz, quizIndex) => (
                      <div key={quizIndex} className="flex items-center gap-2">
                        <span className="border border-gray-600 p-[2px] rounded-full outline-none">
                          <RiQuestionMark size={11} className="text-gray-500" />
                        </span>
                        <h4 className="text-gray-700 text-base font-normal capitalize">
                          {quiz?.quizTitle}
                        </h4>
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
  );
};

export default CourseInfoTab;
