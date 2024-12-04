import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { Link } from "react-router-dom";

const LessonTable = ({ formik }) => {
  return (
    <NewCourceCard title="Table">
      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          Table Title
        </h5>
        <div className="my-2 relative">
          <CustomTextInput />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8" />

      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          Table Shortcode ID
        </h5>
        <p className="text-xs text-gray-600 py-1">
          Please create or copy any table shortocde from here and add shortcode
          in this field{" "}
          <Link to="#" className="text-blue-accent px-1 uppercase">
            Tables
          </Link>
        </p>
        <div className="my-2 relative">
          <CustomTextInput />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LessonTable;
