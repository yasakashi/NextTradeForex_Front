import { BiSave } from "react-icons/bi";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import DraftEditor from "../../../components/editor/draft_editor";
import { useState } from "react";
import { EditorState } from "draft-js";

const LessonImageWithText = ({ formik }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openLessonFile, setOpenLessonFile] = useState(false);

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("description", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };
  return (
    <NewCourceCard title="Image With Text">
      <div className="w-full p-4">
        <h5 className="font-medium text-[14px] text-gray-700 capitalize">
          Image
        </h5>
        <div className="mb-8 flex items-center gap-4 relative border-b border-b-gray-300 pb-8">
          <p className="text-[13px] text-gray-700">No image selected</p>

          <CustomButton
            onClick={() => setOpenLessonFile(true)}
            size="sm"
            variant="outlined"
            type="button"
          >
            Add Image
          </CustomButton>

          {formik.errors?.lessonFile && formik.touched?.lessonFile ? (
            <div className="absolute bg-red-600 max-w-[300px] bottom-[110%] left-0 rounded-lg p-2 text-white font-semibold text-sm">
              {formik.errors?.lessonFile}
            </div>
          ) : null}
        </div>

        <h5 className="font-medium pb-2 text-[14px] text-gray-700 capitalize">
          Text
        </h5>
        <div className="mb-2 flex relative">
          <CustomButton
            onClick={() => setOpenLessonFile(true)}
            size="sm"
            variant="outlined"
            type="button"
          >
            Add Media
          </CustomButton>
          <button
            type="button"
            className="bg-gray-600 rounded-sm p-1 pr-3 pl-3 ml-2"
          >
            <BiSave color="white" className="text-xl" />
          </button>

          {formik.errors?.lessonFile && formik.touched?.lessonFile ? (
            <div className="absolute bg-red-600 max-w-[300px] bottom-[110%] left-0 rounded-lg p-2 text-white font-semibold text-sm">
              {formik.errors?.lessonFile}
            </div>
          ) : null}
        </div>
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
          <DraftEditor
            placeholder="Description"
            editorState={editorState}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default LessonImageWithText;
