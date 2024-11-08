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
import LearningOverview from "./LearningOverview";
import LearningComments from "./LearningComments";

const StartLearning = () => {
  const { courseId, lessonId } = useParams();

  const [activeTab, setActiveTab] = useState("overview");

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
      {/* top nav */}
      <div className="mt-8 mb-4 flex items-center justify-center">
        <ul className="flex flex-wrap justify-center -mb-px border-b border-gray-200 w-full">
          <li onClick={() => setActiveTab("overview")} className="me-2">
            <h5
              className={`inline-block px-4 py-[10px] text-white cursor-pointer font-normal ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-600 rounded-t-lg active"
                  : ""
              }`}
              aria-current="page"
            >
              Overview
            </h5>
          </li>
          <li onClick={() => setActiveTab("comments")} className="me-2">
            <h5
              className={`inline-block px-4 py-[10px] text-white cursor-pointer font-normal ${
                activeTab === "comments"
                  ? "border-b-2 border-blue-600 rounded-t-lg active"
                  : ""
              }`}
              aria-current="page"
            >
              Comments
            </h5>
          </li>
        </ul>
      </div>

      {activeTab === "overview" ? (
        <LearningOverview />
      ) : activeTab === "comments" ? (
        <LearningComments />
      ) : null}
    </div>
  );
};

export default StartLearning;
