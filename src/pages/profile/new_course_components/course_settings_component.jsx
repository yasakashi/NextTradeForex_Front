import React from "react";
import NewCourceCard from "./new_cource_card";
import { IoSettingsSharp } from "react-icons/io5";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import WarningComponent from "../../../common/WarningComponenet";

const CourseSettings = ({ formik }) => {
  return (
    <NewCourceCard title="Course Settings">
      <div className="flex" style={{ width: "100%" }}>
        {/* // general section */}
        <div className="flex flex-col w-72">
          <div className="flex items-center py-3 px-6 border-l-4 border-[#2c89b4]">
            <IoSettingsSharp />
            <h2 className="ml-2 text-base font-semibold">General</h2>
          </div>
          <div className="flex-1 w-full bg-[#fbf7fc]"></div>
        </div>

        <div className="w-[calc(100%-288px)] p-4 pt-10 flex flex-col space-y-8">
          {/* Maximum student */}
          <div className="descr grid grid-cols-3 items-start">
            <CourseTitle title="Maximum Students" />

            <div className="w-full col-span-2">
              <CustomTextInput
                name="maximumStudents"
                type="number"
                placeholder="1"
                onChange={formik.handleChange}
                onBlure={formik.handleBlur}
                value={formik?.values?.maximumStudents}
                onBlur={formik.handleBlur}
                className="w-full col-span-2"
                min="1"
                error={
                  formik?.touched?.maximumStudents
                    ? formik?.errors?.maximumStudents
                    : ""
                }
              />
              <WarningComponent description="Number of students that can enrol in this course. Set 0 for no limits." />
            </div>
          </div>

          {/* Difficulty level */}
          <div className="descr grid grid-cols-3 items-start">
            <CourseTitle title="Difficulty Level" />
            <div className="w-full col-span-2">
              <select
                name="difficultyLevelId"
                onChange={formik.handleChange}
                value={formik?.values?.difficultyLevelId}
                className="w-full col-span-2 bg-white border border-gray-300 py-[8px] text-gray-600  pl-2 rounded-lg outline-blue-500"
              >
                <option value="1">All levels</option>
                <option value="2">Beginner</option>
                <option value="3">Intermediate</option>
                <option value="4">Expert</option>
              </select>
              <WarningComponent description="Course difficulty level." />
            </div>
          </div>

          <div className="descr grid grid-cols-3 items-start">
            <CourseTitle title="Public Course" />

            <div className="flex flex-col gap-2 w-full col-span-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  name="isPublicCourse"
                  type="checkbox"
                  checked={formik?.values?.isPublicCourse}
                  className="sr-only peer"
                  onChange={(e) => {
                    e.stopPropagation();
                    formik.setFieldValue("isPublicCourse", e.target.checked);
                  }}
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <WarningComponent description="Make This Course Public. No enrollment required." />
            </div>
          </div>

          {/* Q & A */}
          <div className="descr grid grid-cols-3 items-start">
            <CourseTitle title="Q&A" />

            <div className="flex flex-col gap-2 w-full col-span-2">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  name="allowQA"
                  type="checkbox"
                  checked={formik?.values?.allowQA}
                  className="sr-only peer"
                  onChange={(e) => {
                    e.stopPropagation();
                    formik.setFieldValue("allowQA", e.target.checked);
                  }}
                />
                <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              <WarningComponent description="Enable Q&A section for your course" />
            </div>
          </div>
        </div>
      </div>
    </NewCourceCard>
  );
};

export default CourseSettings;
const listing = [
  {
    name: "maximumStudents",
    title: "Maximum Students",
    descr:
      "Number of students that can enrol in this course. Set 0 for no limits.",
  },
  {
    name: "difficultyLevelId",
    title: "Difficulty Level",
    descr: "Course difficulty level",
  },
  {
    name: "isPublicCourse",
    title: "Public Course",
    descr: "Make This Course Public. No enrollment required.",
    has_check_box: true,
  },
  {
    name: "allowQA",
    title: "Q&A",
    descr: "Enable Q&A section for your course",

    has_check_box: true,
  },
];

const CourseTitle = ({ title }) => {
  return (
    <label className="col-span-1 text-base font-medium text-gray-800">
      {title}
    </label>
  );
};
