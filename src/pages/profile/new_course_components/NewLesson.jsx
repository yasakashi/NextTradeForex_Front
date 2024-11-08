import { useEffect, useRef, useState } from "react";
import ModalLayout from "../../../common/modal_layout";
import WarningComponent from "../../../common/WarningComponenet";
import LibraryModal from "./library_modal";
import DraftEditor from "../../../admin_panel/components/editor/draft_editor";

import { CgClose } from "react-icons/cg";
import { BiSave } from "react-icons/bi";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";
import { useAddTopicLessonMutation } from "../../../redux/features/course/courseBuilderApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditorState } from "draft-js";
import toast from "react-hot-toast";

const NewLesson = ({
  showNewLessonModal,
  setShowNewLessonModal,
  topicId,
  courseId,
}) => {
  const [open, set_open] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const featuredImgRef = useRef(null);
  const fileAttachementRef = useRef(null);

  const [addTopicLesson, { isLoading }] = useAddTopicLessonMutation();

  const lessonValidationSchema = Yup.object({
    lessonName: Yup.string().required("Lesson name is required."),
    lessonDescription: Yup.string().required("Lesson description is required"),
    featureImage: Yup.mixed().required("featured image is required."),
    videoSource: Yup.string().required("video source is required."),
    lessonFile: Yup.mixed().required("Lesson file is required."),
    videoPlaybackTime: Yup.string().required(
      "Video playback time is required."
    ),
    attachments: Yup.mixed().required("Attachements is required."),
  });

  const newLessonInitialValues = {
    lessonName: "",
    lessonDescription: "",
    featureImage: null,
    videoSource: null,
    lessonFile: null,
    videoPlaybackTime: 1,
    attachments: null,
  };

  const formik = useFormik({
    initialValues: newLessonInitialValues,
    validationSchema: lessonValidationSchema,

    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      const formData = new FormData();

      formData.append("courseId", courseId);
      formData.append("topicId", topicId);
      formData.append("lessonName", values?.lessonName);
      formData.append("lessonDescription", values?.lessonDescription);
      formData.append("videoSource", values?.videoSource);
      formData.append("videoPlaybackTime", values?.videoPlaybackTime);
      // formData.append("fileattachments", values?.attachments);
      if (values?.featureImage instanceof File) {
        formData.append("featureImage", values?.featureImage);
      }
      if (values?.lessonFile instanceof File) {
        formData.append("lessonFile", values?.lessonFile);
      }
      if (values?.attachments instanceof File) {
        formData.append("attachments", values?.attachments);
      }

      try {
        // const addCourseRes = await addNewCourse({ data: formData });
        // console.log({ addCourseRes });
        const response = await addTopicLesson({ data: formData });
        if (response?.data?.messageCode === 200) {
          resetForm();
          setShowNewLessonModal(false);
          toast.success("Lesson added.");
        }

        console.log({ response });
        if (response?.error?.status === 400) {
          toast.error("Please fill the inputs.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
  useEffect(() => {
    const totalSeconds =
      parseInt(hours) * 60 * 60 + parseInt(minutes) * 60 + parseInt(seconds);
    formik.setFieldValue("videoPlaybackTime", totalSeconds);
  }, [hours, minutes, seconds]);
  const handleEditorChange = (editorData) => {
    formik.setFieldValue("lessonDescription", editorData.plainText);

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <ModalLayout
        className="w-full  sm:w-[600px] md:w-[800px] lg:w-[1000px] h-[93vh] overflow-x-hidden overflow-y-hidden flex flex-col justify-between mx-auto"
        onClose={setShowNewLessonModal}
        open={showNewLessonModal}
      >
        <div className="flex w-full flex-col border-b border-gray-300">
          <div className="flex justify-between items-center py-4 px-8 w-full">
            <h4 className="font-semibold">Add Lesson</h4>
            <button onClick={() => setShowNewLessonModal(false)}>
              <CgClose />
            </button>
          </div>
        </div>

        {/* main */}
        <div className="px-8 py-8 bg-[#eff1f7] flex-grow h-full overflow-y-scroll scrollbar-thin space-y-8">
          {/* lsesson Name */}
          <label className="w-full flex flex-col">
            <span className="text-gray-600 text-sm font-semibold mb-3">
              Lesson Name
            </span>
            <input
              name="lessonName"
              value={formik.values.lessonName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="px-4 py-[6px] border border-gray-300 rounded-md bg-white placeholder:text-gray-600 outline-blue-400"
            />
            <WarningComponent description="Lesson titles are displayed publicly wherever required." />

            {formik.touched?.lessonName ? (
              <span className="text-red-600 text-sm p-1">
                {formik.errors?.lessonName}
              </span>
            ) : null}
          </label>

          {/* Lesson Content */}
          <div>
            <span className="text-gray-600 text-sm font-semibold mb-3">
              Lesson Content
            </span>
            <div className="relative">
              <div className="mb-2 flex mt-3">
                <button
                  className="flex items-center gap-2 text-blue-accent px-3 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-sm transition-all text-sm "
                  onClick={() => {
                    set_open(true);
                  }}
                  type="button"
                >
                  <MdOutlinePermMedia size={20} />
                  Add Media
                </button>
                <button
                  type="button"
                  className="bg-gray-600 rounded-sm p-1 pr-3 pl-3 ml-2"
                >
                  <BiSave color="white" className="text-xl" />
                </button>
              </div>
              {formik.touched?.lessonFile ? (
                <span className="text-red-600 text-sm p-1">
                  {formik.errors?.lessonFile}
                </span>
              ) : null}

              <div className="w-full relative h-[300px]">
                {/* <EditorComponent /> */}
                <DraftEditor
                  h={300}
                  // editorState=""
                  // set_editor_value={(val) => console.log({ val })}
                  placeholder="Lesson description ..."
                  value={editorState} // Pass the editor state
                  onChange={handleEditorChange}
                />
              </div>
              {formik.touched?.lessonDescription ? (
                <span className="text-red-600 text-sm p-1">
                  {formik.errors?.lessonDescription}
                </span>
              ) : null}
            </div>

            <WarningComponent description="The idea of a summary is a short text to prepare students for the activities within the topic or week. The text is shown on the course page under the topic name" />
          </div>

          {/* feature Image */}
          <div>
            <span className="text-gray-600 text-sm font-semibold mb-3">
              Feature Image
            </span>

            <div className="mt-3 border h-[150px] border-gray-300 rounded-md p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                onClick={() => {
                  featuredImgRef.current.click();
                }}
                className="h-full cursor-pointer bg-slate-200 rounded-md flex items-center justify-center w-full"
              >
                <input
                  accept="image/*"
                  ref={featuredImgRef}
                  type="file"
                  className="hidden"
                  name="featureImage"
                  // value={formik.values.featureImage}
                  onChange={(e) => {
                    formik.setFieldValue("featureImage", e.target.files[0]);
                  }}
                />
                {formik.values.featureImage ? (
                  <img
                    className="w-[160px] object-contain h-[140px]"
                    src={URL.createObjectURL(formik.values.featureImage)}
                  />
                ) : (
                  <div className="flex items-center gap-2 text-gray-400">
                    <RiImageAddFill size={24} />
                    <span className="text-gray-400 text-sm">Upload Image</span>
                  </div>
                )}
              </div>

              <div className="w-full h-full flex items-center justify-start">
                <div className="flex flex-col space-y-2 text-sm">
                  <span>Size : 700 x 430 pixels</span>
                  <span>File support : JPG | PNG | JPEG</span>
                  <button
                    onClick={() => {
                      featuredImgRef.current.click();
                    }}
                    type="button"
                    className="flex items-center gap-2 w-max text-sm bg-blue-accent px-3 py-[6px] text-white border border-blue-accent rounded-md shadow-sm"
                  >
                    <FaRegImage size={16} />
                    Upload Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          {formik.touched?.featureImage ? (
            <span className="text-red-600 text-sm p-1">
              {formik.errors?.featureImage}
            </span>
          ) : null}
          {/* Video Source */}
          <div>
            <span className="text-gray-600 text-sm font-semibold mb-3">
              Video Source
            </span>

            <div className="mt-3">
              <select className="bg-white border border-gray-300 py-2 pl-2 w-full mb-3 outline-blue-400">
                <option disabled>Select video source</option>
                <option>Youtube</option>
              </select>

              <div className="border-2 border-blue-accent border-dashed h-[110px] flex items-center justify-center px-8 rounded-md">
                <input
                  name="videoSource"
                  value={formik.values.videoSource}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  className="w-full placeholder:text-gray-600 px-3 py-[6px] rounded-sm border border-gray-300 outline-blue-400"
                  placeholder="Page YouTube Video URL"
                />
              </div>
            </div>

            {formik.touched?.videoSource ? (
              <span className="text-red-600 text-sm p-1">
                {formik.errors?.videoSource}
              </span>
            ) : null}
          </div>

          {/* Video Playback time */}
          <div>
            <span className="text-gray-600 text-sm font-semibold mb-3">
              Video playback time
            </span>

            <div className="mt-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-2">
                  <input
                    type="number"
                    className="py-2 px-3 w-full border border-gray-300 rounded-md placeholder:text-gray-500 outline-blue-400"
                    placeholder="00"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                  />
                  <span className="text-sm text-gray-500">Hour</span>
                </div>

                <div className="flex flex-col space-y-2">
                  <input
                    type="number"
                    className="py-2 px-3 w-full border border-gray-300 rounded-md placeholder:text-gray-500 outline-blue-400"
                    placeholder="00"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                  />
                  <span className="text-sm text-gray-500">Minute</span>
                </div>

                <div className="flex flex-col space-y-2">
                  <input
                    type="number"
                    className="py-2 px-3 w-full border border-gray-300 rounded-md placeholder:text-gray-500 outline-blue-400"
                    placeholder="00"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                  />
                  <span className="text-sm text-gray-500">Second</span>
                </div>
              </div>
            </div>
            {formik.touched?.videoPlaybackTime ? (
              <span className="text-red-600 text-sm p-1">
                {formik.errors?.videoPlaybackTime}
              </span>
            ) : null}
          </div>

          {/* Uplaod excercise file to the lesson */}
          <div>
            <span className="text-gray-600 text-sm font-semibold mb-3">
              Upload exercise files to the Lesson
            </span>

            <div className="mt-3">
              <button
                onClick={() => fileAttachementRef.current.click()}
                type="button"
                className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md flex items-center gap-2"
              >
                <GrAttachment size={20} />
                Upload Attachments
              </button>
            </div>

            <input
              onChange={(e) => {
                formik.setFieldValue("attachments", e.target.files[0]);
              }}
              ref={fileAttachementRef}
              type="file"
              className="hidden"
            />
          </div>

          {formik.touched?.attachments ? (
            <span className="text-red-600 text-sm p-1">
              {formik.errors?.attachments}
            </span>
          ) : null}
        </div>

        <div className="border-t border-gray-300 flex items-center justify-between px-8 py-4">
          <button
            type="button"
            onClick={() => setShowNewLessonModal(false)}
            className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-accent disabled:cursor-not-allowed px-4 py-[6px] text-white border border-blue-accent rounded-md shadow-sm"
          >
            {isLoading ? "Sending ..." : "Add Lesson"}
          </button>
        </div>
      </ModalLayout>

      <LibraryModal
        accept_file="Image"
        file={formik.values.lessonFile}
        set_file={(file) => formik.setFieldValue("lessonFile", file)}
        onSave={(val) => {
          set_open(false);
        }}
        has_side_bar_action={false}
        title="Add Media"
        open={open}
        set_open={set_open}
      />
    </form>
  );
};

export default NewLesson;
