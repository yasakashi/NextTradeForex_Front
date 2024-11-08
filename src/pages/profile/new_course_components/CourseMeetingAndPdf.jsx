import { motion } from "framer-motion";
import MeetingContentComponent from "./meeting_content_component";
import VideoPdfUrl from "./video_pdf_url";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const CourseMeetingAndPdf = ({ page }) => {
  const { courseId } = useParams();
  return (
    <div
      className={`w-full ${
        page === "admin" ? "" : "bg-[#f0f0f1]"
      } top-0 p-0 m-0 min-h-screen`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="wrapper mx-auto flex w-full flex-col max-h-fit "
      >
        <h4
          className={`text-3xl ${
            page === "admin" ? "text-gray-100" : "text-gray-700"
          } font-bold mb-4 mt-4`}
        >
          Add Course Details
        </h4>
        <div className="flex">
          <Link
            className="text-[#1976d2] hover:text-[#1565c0] hover:underline px-3 py-[6px] rounded-md shadow-sm text-base font-medium flex items-center gap-2"
            to={
              page === "admin"
                ? `/admin-panel/tutor/Courses/create-new-course/course-builder/${courseId}`
                : `/user-profile/myCourses/new-course/course-builder/${courseId}`
            }
          >
            <FaArrowLeftLong size={20} className="text-[#1976d2]" />
            Back to Course builder
          </Link>
        </div>
        <div className="mb-20">
          <MeetingContentComponent />
          <VideoPdfUrl />
        </div>
        <div className="flex">
          <Link
            className="text-[#1976d2] hover:text-[#1565c0] hover:underline px-3 py-[6px] rounded-md shadow-sm text-base font-medium"
            to="/user-profile/myCourses"
          >
            Go to profile page ?
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseMeetingAndPdf;
