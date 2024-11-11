import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CustomTextArea } from "../../../../../../../common/custom_text_field";
import CourseInfoTab from "./CourseInfoTab";

const CourseInfo = ({ course }) => {
  const [value, set_value] = useState(0);

  const [activeTab, setActiveTab] = useState("info");
  return (
    <>
      

      <div className="text-base bg-[#061258] font-medium text-center text-white border mt-4 border-[#041996]">
        <ul className="flex flex-wrap -mb-px">
          <li onClick={() => setActiveTab("info")} className="me-2">
            <h5
              className={`inline-block px-4 py-[10px] text-white font-normal ${
                activeTab === "info"
                  ? "border-b-2 border-[#bb914a] rounded-t-lg active"
                  : ""
              }`}
              aria-current="page"
            >
              Course Info
            </h5>
          </li>
          <li onClick={() => setActiveTab("reviews")} className="me-2">
            <h5
              className={`inline-block px-4 py-[10px] text-white font-normal ${
                activeTab === "reviews"
                  ? "border-b-2 border-[#bb914a] rounded-t-lg active"
                  : ""
              }`}
              aria-current="page"
            >
              Reviews
            </h5>
          </li>
        </ul>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          style={{ width: "100%", color: "white", marginTop: 24 }}
          key={value}
          initial={{ opacity: 0, y: 8 }}
          exit={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {activeTab === "reviews" && <Review />}
          {activeTab === "info" && <CourseInfoTab course={course} />}
          {/* {activeTab === "info" && <QA />} */}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CourseInfo;

const QA = () => {
  return (
    <div className="w-full flex flex-col">
      <h5 className="font-bold text-2xl mb-4">Question & Answer</h5>
      <CustomTextArea />

      <button className="self-end mt-4 bg-gradient-to-r from-[#F0D785] to-[#9C7049] text-black font-semibold py-1 px-4 rounded-md">
        {" "}
        Ask Question
      </button>
    </div>
  );
};

const Review = () => {
  return (
    <div className="w-full flex flex-col">
      <h5 className="font-bold text-2xl mb-4">Student Ratings & Reviews</h5>
    </div>
  );
};
