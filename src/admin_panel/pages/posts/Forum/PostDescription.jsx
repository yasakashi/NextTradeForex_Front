import { EditorState } from "draft-js";
import { useState } from "react";
import DraftEditor from "../../../components/editor/draft_editor";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { BiSave } from "react-icons/bi";


const PostDescription = ({ formik }) => {
  const [openPostDescFileModal, setOpenPostDescFileModal] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("courseDescription", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <div className="w-full pt-2 pl-2">
      <div className="mb-2 flex relative">
        <CustomButton
          onClick={() => setOpenPostDescFileModal(true)}
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

        {formik.errors?.courseFile && formik.touched?.courseFile ? (
          <div className="absolute bg-red-600 max-w-[300px] bottom-[110%] left-0 rounded-lg p-2 text-white font-semibold text-sm">
            {formik.errors?.courseFile}
          </div>
        ) : null}
      </div>
      <LibraryModal
        file={formik?.values?.courseFile}
        set_file={(file) => {
          formik.setFieldValue("courseFile", file);
        }}
        error={formik.errors?.courseFile}
        onBlur={formik.handleBlur}
        accept_file="Image"
        has_side_bar_action={false}
        title="Add Media"
        open={openPostDescFileModal}
        set_open={setOpenPostDescFileModal}
        onSave={() => setOpenPostDescFileModal(false)}
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
  );
};

export default PostDescription;
