import React from "react";
import BorderedButtonPrimary from "../../../../../../../common/bordered_button_primary";
import { CustomDivider } from "../../../../../../../pages/profile/new_course_components/new_cource_card";
import { FaChartBar } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";
import { IoReload } from "react-icons/io5";
import { blue_medium } from "../../../../../categories/view/category_details_view_screen";

const CourseProgressComponent = () => {
  return (
    <div className="bg-white text-black w-full rounded-md py-8 px-4">
      <h5 className="text-black font-bold text-lg mb-4">Course Progress</h5>
      <div className="flex justify-between">
        <p className="text-base">0/0</p>
        <p className="text-base">0% Complete</p>
      </div>
      <BorderedButtonPrimary
        title="Complete Course"
        style={{ width: "100%", marginBottom: 16, marginTop: 42 }}
      />
      <CustomDivider />

      <p className="text-base flex items-center mt-4">
        <FaChartBar className="mr-3" /> Intermediate
      </p>
      <p className="text-base flex items-center my-4">
        <FaGraduationCap className="mr-3" /> total Enrolled
      </p>
      <p className="text-base flex items-center">
        <IoReload className="mr-3" /> Last Updated
      </p>
    </div>
  );
};

export default CourseProgressComponent;

export const CourseBy = () => {
  return (
    <div className="bg-white text-black w-full rounded-md py-8 px-4 mt-8">
      <h5 className="text-black  text-base mb-4">A course by</h5>
      <div className="flex justify-start items-center mb-8">
        <p
          style={{
            backgroundColor: blue_medium,
            padding: 8,
            borderRadius: 50,
            marginRight: 16, 
            color:"white"
          }}
        >
          MM
        </p>
        <p className="text-base">Maria Markova</p>
      </div>
      <CustomDivider />

      <p className="text-lg font-bold mt-4"> Tags
      </p>
            <p style={{border:"1px solid gray",borderRadius:6,width:"fit-content", marginTop:24 ,padding:"4px 8px"}}>XFSADFE</p>
    </div>
  );
};
