import { useState } from "react";
import { EditorState } from "draft-js";
import { MdClose } from "react-icons/md";
import { CustomButton } from "../../../components/ui/CustomButton";
import { BiSave } from "react-icons/bi";
import DraftEditor from "./draft_editor";
import LibraryModal from "../../../pages/profile/new_course_components/library_modal";

const EditorWithFile = ({
  formik,
  open,
  setOpen,
  name,
  fileName,
  accept_file = "Image",
  placeholder = "",
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (editorData) => {
    formik.setFieldValue(`${name}`, editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <>
      <div className="relative">
        <div className="my-3 bg-white p-2">
          <div className="w-full pt-2 pl-2">
            <div className="mb-2 flex relative">
              <CustomButton
                onClick={() => setOpen(true)}
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

              {/* {formik.errors[`${name}`] && formik.touched[`${name}`] ? (
                <div className="absolute bg-red-600 max-w-[300px] bottom-[110%] left-0 rounded-lg p-2 text-white font-semibold text-sm">
                  {formik.errors[`${name}`]}
                </div>
              ) : null} */}
            </div>

            <div className="w-full relative">
              {/* <EditorComponent /> */}
              <DraftEditor
                placeholder={placeholder}
                editorState={editorState}
                onChange={handleEditorChange}
              />
            </div>
          </div>
        </div>
        {formik?.values[`${fileName}`] instanceof File ? (
          <div className="w-[160px] aspect-video border-collapse shadow-sm ml-auto relative">
            <img
              className="size-full"
              src={
                formik?.values[`${fileName}`] instanceof File
                  ? URL.createObjectURL(formik.values[`${fileName}`])
                  : ""
              }
              alt="File"
            />
            <div
              onClick={() => formik.setFieldValue(`${fileName}`, null)}
              className="absolute cursor-pointer top-1 right-1 text-gray-500 shadow-md bg-gray-300 rounded-full p-1"
            >
              <MdClose size={18} />
            </div>
          </div>
        ) : null}
      </div>

      <LibraryModal
        file={formik?.values[`${fileName}`]}
        set_file={(file) => {
          formik.setFieldValue(`${fileName}`, file);
        }}
        error={formik.errors[`${fileName}`]}
        onBlur={formik.handleBlur}
        accept_file={accept_file}
        has_side_bar_action={false}
        title="Add Media"
        open={open}
        set_open={setOpen}
        onSave={() => setOpen(false)}
      />
    </>
  );
};

export default EditorWithFile;
