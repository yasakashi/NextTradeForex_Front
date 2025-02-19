import { useState } from "react";
import { BiSave } from "react-icons/bi";
import { useFormik } from "formik";
import { ContentState, convertFromHTML, EditorState } from "draft-js";
import { CustomButton } from "../../../../components/ui/CustomButton";
import CustomTextInput from "../../../../components/ui/CustomTextInput";
import NewCourceCard from "../../../../pages/profile/new_course_components/new_cource_card";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import PublishComponent from "../../../../pages/profile/new_course_components/publish_component";
import DraftEditor from "../../../../admin_panel/components/editor/draft_editor";
import TagsComponent from "../../../../pages/profile/new_course_components/tags_component";
import LTRTopicAttributes from "../../../components/LTRTopicAttributes";

import * as Yup from "yup";
import { useAddNewLTRTopicMutation } from "../../../../redux/features/learnToTrade/LearnToTradeApi";
import toast from "react-hot-toast";
import AdminPanelTitle from "../../../components/AdminPanelTitle";

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  ,
  "image/web",
];

const FILE_SIZE = 500 * 1024;

const AddNewTopic = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openTopicFile, setOpenTopicFile] = useState(false);

  const [addNewLTRTopic, { isLoading }] = useAddNewLTRTopicMutation();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      file: null,
      typeId: 1,
      statusId: 1,
      forumId: 772,
      tags: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required."),
      description: Yup.string().required("Description is required."),
      file: Yup.mixed()
        .required("File is required.")
        .test("fileSize", "File must be less than 500 KB", (value) => {
          return typeof value === "string" || !value
            ? true
            : value.size < FILE_SIZE;
        })
        .test(
          "fileFormat",
          "File must be in JPG, PNG, JPEG, or WEBP format",
          (value) => {
            return typeof value === "string" || !value
              ? true
              : SUPPORTED_FORMATS.includes(value?.type);
          }
        ),
    }),

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();

      formData.append("title", values?.title);
      formData.append("description", values?.description);
      formData.append("typeId", values?.typeId);
      formData.append("statusId", values?.statusId);
      formData.append("forumId", Number(values?.forumId));
      formData.append("topicfile", values?.file);
      formData.append("topicTags", "tags");

      try {
        const response = await addNewLTRTopic({ data: formData }).unwrap();

        if (response?.data?.messageCode === 200) {
          toast.success("Topic created.");
          resetForm();

          const blocksFromHTML = convertFromHTML("");
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong! please try again.");
      }
    },
  });

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("description", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <div className="flex flex-col px-8 py-10">
      <AdminPanelTitle title="Add New Topic" />
      {/* <h1 className="font-semibold text-2xl text-white mb-4">Add New Topic</h1> */}

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
          <NewCourceCard title="Topic">
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
            <TagsComponent name="tags" formik={formik} />
            <PublishComponent isLoading={isLoading} />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <LTRTopicAttributes name="topicAttributes" formik={formik} />
          <TagsComponent name="tags" formik={formik} />
          <PublishComponent isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};
export default AddNewTopic;
