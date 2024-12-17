import React from "react";
import NewCourceCard from "../../pages/profile/new_course_components/new_cource_card";
import CustomRadioButton from "../pages/categories/view/components/customRadioButton";

const LTRCategory = ({ formik }) => {
  const handleCategoryChange = (value) => {
    formik.setFieldValue("lessonCategoryId", value);
  };

  return (
    <NewCourceCard title="Lesson Category">
      <div className="w-full">
        <div className="my-2 space-y-2 p-2">
          <CustomRadioButton
            onChange={() => handleCategoryChange(1)}
            label="All"
            name="lessonCategoryId"
            value={1}
            checked={formik.values.lessonCategoryId === 1}
          />

          <CustomRadioButton
            onChange={() => handleCategoryChange(2)}
            label="Newbie"
            name="lessonCategoryId"
            value={2}
            checked={formik.values.lessonCategoryId === 2}
          />

          <CustomRadioButton
            onChange={() => handleCategoryChange(3)}
            label="Intermediate"
            name="lessonCategoryId"
            value={3}
            checked={formik.values.lessonCategoryId === 3}
          />

          <CustomRadioButton
            onChange={() => handleCategoryChange(4)}
            label="Advanced"
            name="lessonCategoryId"
            value={4}
            checked={formik.values.lessonCategoryId === 4}
          />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LTRCategory;
