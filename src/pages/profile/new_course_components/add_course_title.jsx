import React from "react";

const AddCourseTitle = ({ formik }) => {
  return (
    <input
      name="courseName"
      value={formik.values.courseName}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      type="text"
      className="w-full px-3 py-2 rounded-[3px] outline-blue-500 placeholder:text-gray-400 border border-gray-700"
      placeholder="Add title"
    />
  );
};

export default AddCourseTitle;
