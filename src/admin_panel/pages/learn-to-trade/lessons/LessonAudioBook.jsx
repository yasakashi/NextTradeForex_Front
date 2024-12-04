import { useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { Link } from "react-router-dom";

const LessonAudioBook = ({ formik }) => {
  const [openLessonFile, setOpenLessonFile] = useState(false);

  return (
    <NewCourceCard title="Audio Book">
      <div className="w-full p-4">
        <div className="mb-2 flex items-center gap-4 relative">
          <p className="text-[13px] text-gray-700">No image selected</p>

          <CustomButton
            onClick={() => setOpenLessonFile(true)}
            size="sm"
            variant="outlined"
            type="button"
          >
            Add File
          </CustomButton>

          {formik.errors?.lessonFile && formik.touched?.lessonFile ? (
            <div className="absolute bg-red-600 max-w-[300px] bottom-[110%] left-0 rounded-lg p-2 text-white font-semibold text-sm">
              {formik.errors?.lessonFile}
            </div>
          ) : null}
        </div>

        <p className="text-sm text-gray-800">
          Please click on this
          <Link to="#" className="px-1 text-blue-accent underline">
            link
          </Link>
          to record audio book.
        </p>
        <LibraryModal
          file={formik?.values?.lessonFile}
          set_file={(file) => {
            formik.setFieldValue("lessonFile", file);
          }}
          error={formik.errors?.lessonFile}
          onBlur={formik.handleBlur}
          accept_file="Image"
          has_side_bar_action={false}
          title="Add Media"
          open={openLessonFile}
          set_open={setOpenLessonFile}
          onSave={() => setOpenLessonFile(false)}
        />
        <div className="w-full relative overflow-y-scroll">
          {/* <EditorComponent /> */}
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LessonAudioBook;