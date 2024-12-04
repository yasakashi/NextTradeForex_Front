import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import { Link } from "react-router-dom";

const LessonWidgetScript = ({ formik }) => {
  return (
    <NewCourceCard title="Widget Script">
      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          Script
        </h5>
        <div className="my-2 relative">
          <CustomTextArea className="h-[160px]"/>
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LessonWidgetScript;
