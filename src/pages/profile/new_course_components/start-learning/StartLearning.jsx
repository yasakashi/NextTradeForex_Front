import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import LearningOverview from "./LearningOverview";
import LearningComments from "./learning-comments/LearningComments";
import {
  useGetCourseTopicsMutation,
  useGetTopicLessonsMutation,
} from "../../../../redux/features/api/course/courseBuilderApi";
import { useGetCoursesQuery } from "../../../../redux/features/api/course/courseApii";

const StartLearning = () => {
  const { courseId } = useParams();

  const [activeTab, setActiveTab] = useState("overview");

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
        <LearningOverview
          
          isLoading={getCourseTopicsLoading}
        />
      ) : activeTab === "comments" ? (
        <LearningComments />
      ) : null}
    </div>
  );
};

export default StartLearning;
