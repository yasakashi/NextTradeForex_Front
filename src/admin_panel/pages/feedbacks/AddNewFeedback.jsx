import { useFormik } from "formik";

import * as Yup from "yup";
import FeaturedImageComponent from "../../../pages/profile/new_course_components/featured_image_component";
import PublishComponent from "../../../pages/profile/new_course_components/publish_component";
import { AnimatePresence, motion } from "framer-motion";
import LibraryModal from "../../../pages/profile/new_course_components/library_modal";
import { CustomButton } from "../../../components/ui/CustomButton";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import { useState } from "react";
import { EditorState } from "draft-js";
import DraftEditor from "../../components/editor/draft_editor";
import { BiSave } from "react-icons/bi";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),

  description: Yup.string().required("Description is required"),
});

const AddNewFeedback = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [fileOpen, setFileOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: null,
      featuredImg: null,
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("courseDescription", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <div className="py-10 px-8">
      <h2 className="font-normal text-2xl text-[#1d2327]">Add New Feedback</h2>

      <form onSubmit={formik.handleSubmit} className="mt-5">
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="col-span-4 lg:col-span-3">
            <div className="w-full bg-white rounded-md">
              <CustomTextInput
                name="title"
                placeholder="Add title"
                className="border border-gray-700 py-[10px] placeholder:text-sm rounded-sm"
                value={formik.values?.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik?.touched?.title ? formik.errors?.title : ""}
              />
            </div>
            <div className="border border-gray-700 my-3 bg-white">
              <div className="w-full pt-2 pl-2">
                <div className="mb-2 flex relative">
                  <CustomButton
                    onClick={() => setFileOpen(true)}
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

                  {formik.errors?.file && formik.touched?.file ? (
                    <div className="absolute bg-red-600 max-w-[300px] bottom-[110%] left-0 rounded-lg p-2 text-white font-semibold text-sm">
                      {formik.errors?.file}
                    </div>
                  ) : null}
                </div>
                <LibraryModal
                  file={formik?.values?.file}
                  set_file={(file) => {
                    formik.setFieldValue("file", file);
                  }}
                  error={formik.errors?.file}
                  onBlur={formik.handleBlur}
                  accept_file="Image"
                  has_side_bar_action={false}
                  title="Add Media"
                  open={fileOpen}
                  set_open={setFileOpen}
                  onSave={() => setFileOpen(false)}
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
            </div>

            {formik.touched.description ? (
              <span className="text-red-600 text-sm p-1">
                {formik.errors.description}
              </span>
            ) : null}
            <AnimatePresence presenceAffectsLayout initial={false} mode="sync">
              <motion.div
                initial={{ height: 0 }}
                animate={{ opacity: 1, height: "fit-content" }}
                transition={{ ease: "linear" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div className="lg:hidden space-y-4">
                  <PublishComponent
                  // isLoading={id ? editCourseLoading : isLoading}
                  />
                  <FeaturedImageComponent
                    name="featuredImage"
                    formik={formik}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden lg:block  lg:col-span-1 space-y-4">
            <PublishComponent
            // isLoading={id ? editCourseLoading : isLoading}
            />
            <FeaturedImageComponent name="featuredImage" formik={formik} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewFeedback;
