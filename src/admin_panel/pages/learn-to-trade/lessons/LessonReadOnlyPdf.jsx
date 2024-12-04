import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import { Link } from "react-router-dom";
import CustomTextArea from "../../../../components/ui/CustomTextArea";

const LessonReadOnlyPdf = ({ formik }) => {
  return (
    <NewCourceCard title="Read Only PDF">
      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          PDF Title
          <span className="text-red-700 text-base">*</span>
        </h5>

        <div className="my-2 relative">
          <CustomTextInput />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8" />

      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          PDF Shortcode ID
          <span className="text-red-700 text-base">*</span>
        </h5>
        <p className="text-xs text-gray-600 py-1">
          Please click on this link and copy PDF shortcode and add it here{" "}
          <Link to="#" className="text-blue-accent px-1 uppercase">
            PDF
          </Link>
        </p>
        <div className="my-2 relative">
          <CustomTextInput />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8" />

      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          Author
          <span className="text-red-700 text-base">*</span>
        </h5>

        <div className="my-2 relative">
          <CustomTextInput placeHolder="Author Name" />
        </div>
      </div>

      <div className="w-full h-[1px] bg-gray-300 my-8" />

      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          Short Description
          <span className="text-red-700 text-base">*</span>
        </h5>

        <div className="my-2 relative">
          <CustomTextArea className="h-[100px]" placeHolder="short Description" />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LessonReadOnlyPdf;
