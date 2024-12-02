import { useFormik } from "formik";
import CustomTextArea from "../../../../components/ui/CustomTextArea";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import { CustomButton } from "../../../../components/ui/CustomButton";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import { useEffect, useState } from "react";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import ExcerptComponent from "../../../../pages/profile/new_course_components/excerpt_component";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import FeaturedImageComponent from "../../../../pages/profile/new_course_components/featured_image_component";
import CategoriesComponent from "../../../../pages/profile/new_course_components/categories_component";
import { EditorState } from "draft-js";
import { BiSave } from "react-icons/bi";
import DraftEditor from "../../../../admin_panel/components/editor/draft_editor";
import TagsComponent from "../../../../pages/profile/new_course_components/tags_component";
import LTRTopicAttributes from "../../../components/LTRTopicAttributes";

const AddNewTopic = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openTopicFile, setOpenTopicFile] = useState(false);

  const isLoading = false;

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      topicFile: null,

      excerpt: "",
      featuredImage: null,
    },
  });

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("description", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <div className="flex flex-col px-8 py-10">
      <h1 className="font-semibold text-2xl text-white mb-4">Add New Topic</h1>

      <form
        onSubmit={formik.handleSubmit}
        className="space-x-0 lg:space-x-4 grid grid-cols-1 lg:grid-cols-4 items-start"
      >
        <div className="col-span-1 lg:col-span-3">
          <CustomTextInput
            name="title"
            placeholder="Add title"
            className="border border-gray-700 py-[10px] placeholder:text-sm rounded-sm"
            value={formik.values?.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik?.touched?.title ? formik.errors?.title : ""}
          />
          <NewCourceCard title="Video">
            <div className="w-full p-4 flex flex-col relative space-y-8">
              {/* description */}
              <div className="w-full pt-2 pl-2">
                <div className="mb-2 flex relative">
                  <CustomButton
                    onClick={() => setOpenTopicFile(true)}
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

                  {formik.errors?.topicFile && formik.touched?.topicFile ? (
                    <div className="absolute bg-red-600 max-w-[300px] bottom-[110%] left-0 rounded-lg p-2 text-white font-semibold text-sm">
                      {formik.errors?.topicFile}
                    </div>
                  ) : null}
                </div>
                <LibraryModal
                  file={formik?.values?.topicFile}
                  set_file={(file) => {
                    formik.setFieldValue("topicFile", file);
                  }}
                  error={formik.errors?.topicFile}
                  onBlur={formik.handleBlur}
                  accept_file="Image"
                  has_side_bar_action={false}
                  title="Add Media"
                  open={openTopicFile}
                  set_open={setOpenTopicFile}
                  onSave={() => setOpenTopicFile(false)}
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
          </NewCourceCard>

          <div className="lg:hidden space-y-4">
            <LTRTopicAttributes name="topicAttributes" formik={formik} />
            <TagsComponent name="courseTags" formik={formik} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <LTRTopicAttributes name="topicAttributes" formik={formik} />
          <TagsComponent name="courseTags" formik={formik} />
          <PublishComponent isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AddNewTopic;
