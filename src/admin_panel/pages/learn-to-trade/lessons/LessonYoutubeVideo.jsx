import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import CustomTextInput from "../../../../components/ui/CustomTextInput";

const LessonYoutubeVideo = ({ formik }) => {
  return (
    <NewCourceCard title="Youtube Video">
      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          Video ID
        </h5>
        <div className="my-2 relative">
          <CustomTextInput />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LessonYoutubeVideo;