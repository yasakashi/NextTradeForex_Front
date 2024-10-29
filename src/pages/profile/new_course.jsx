import { AnimatePresence, Reorder, motion } from "framer-motion";
import AddCourseTitle from "./new_course_components/add_course_title";
import PublishComponent from "./new_course_components/publish_component";
import VideoPdfUrl from "./new_course_components/video_pdf_url";
import AdditionalDate from "./new_course_components/additional_date";
import VideoComponent from "./new_course_components/video_component";
import AddProductComponent from "./new_course_components/add_product_component";

import ExcerptComponent from "./new_course_components/excerpt_component";

import TagsComponent from "./new_course_components/tags_component";
import FeaturedImageComponent from "./new_course_components/featured_image_component";
import AudioAccessbility from "./new_course_components/audio_accessbility";

import CourseSettingsComponent from "./new_course_components/course_settings_component";
import CourseCategoriesComponent from "./new_course_components/course_categories_component";
import CategoriesComponent from "./new_course_components/categories_component";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  courseInitialValues,
  courseValidationSchema,
} from "../../constants/learning/course/newCourse";
import CustomTextInput from "../../components/ui/CustomTextInput";
import DraftEditor from "../../admin_panel/components/editor/draft_editor";

import { EditorState } from "draft-js";
import { useState } from "react";
import { useAddNewCourseMutation } from "../../redux/features/course/courseApii";
import LibraryModal from "./new_course_components/library_modal";
import { BiSave } from "react-icons/bi";
import { CustomButton } from "../../components/ui/CustomButton";
import CourseAuthor from "./new_course_components/CourseAuthor";
import toast from "react-hot-toast";

const NewCourse = ({ page }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openCourseDescFileModal, setOpenCourseDescFileModal] = useState(false);

  const [addNewCourse, { isLoading }] = useAddNewCourseMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: courseInitialValues,
    validationSchema: courseValidationSchema,
    onSubmit: async (values) => {
      console.log({ values });

      const formData = new FormData();

      formData.append("courseName", values?.courseName);
      formData.append("courseDescription", values?.courseDescription);
      // formData.append("courseFile", values?.courseFile);
      formData.append("excerpt", values?.excerpt);
      formData.append("authorId", values?.authorId);
      formData.append("maximumStudents", values?.maximumStudents);
      formData.append("difficultyLevelId", values?.difficultyLevelId);
      formData.append("isPublicCourse", values?.isPublicCourse);
      formData.append("allowQA", values?.allowQA);
      formData.append("coursePrice", values?.coursePrice);
      formData.append("whatWillILearn", values?.whatWillILearn);
      formData.append("targetedAudience", values?.targetedAudience);
      formData.append("courseDuration", values?.courseDuration);
      formData.append("materialsIncluded", values?.materialsIncluded);
      formData.append("courseIntroVideo", values?.courseIntroVideo);
      formData.append("meetings", "2");
      formData.append("videoPdfUrls", "dlkjaslfkj");
      // formData.append("featuredImage", values?.featuredImage);
      formData.append("courseCategoryIds", "2");
      formData.append(
        "requirementsInstructions",
        values?.requirementsInstructions
      );
      if (values?.courseFile instanceof File) {
        formData.append("courseFile", values?.courseFile);
      }

      if (values?.featuredImage instanceof File) {
        formData.append("featuredImage", values?.featuredImage);
      }

      if (values?.courseTags?.length > 0) {
        const arrayString = values?.courseTags.slice().join(", ") + ",";
        formData.append("courseTags", arrayString);
      }

      // if (values?.categoryids?.length > 0) {
      //   const arrayString = values?.categoryids?.slice().join(",");
      //   formData.append("courseCategoryIds", arrayString);
      // }

      try {
        const addCourseRes = await addNewCourse({ data: formData });
        console.log({ addCourseRes });

        if (addCourseRes?.data?.messageCode === 200) {
          toast.success("Course created successfully.");
          navigate(
            `/user-profile/myCourses/new-course/course-builder/${addCourseRes?.data?.messageData}`
          );
        }
      } catch (error) {
        toast.error("Error! please try again.");
        console.error("Error submitting form:", error);
      }
    },
  });

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("courseDescription", editorData.plainText);

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <div
      className={`w-full top-0 p-0 m-0 ${
        page === "admin" ? "" : "bg-[#f0f0f1]"
      }`}
    >
      {console.log(formik.values)}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="wrapper mx-auto flex w-full flex-col max-h-fit "
      >
        <h4
          className={`text-3xl ${
            page === "admin" ? "text-gray-100" : "text-gray-700"
          } font-bold mb-4 mt-6`}
        >
          Add New Course
        </h4>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-4 lg:col-span-3">
              <div className="w-full bg-white rounded-md">
                <CustomTextInput
                  name="courseName"
                  placeholder="Add title"
                  className="border border-gray-700 py-[10px] placeholder:text-sm rounded-sm"
                  value={formik.values?.courseName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik?.touched?.courseName ? formik.errors?.courseName : ""
                  }
                />
              </div>
              <div className="border border-gray-700 my-3 bg-white">
                <div className="w-full pt-2 pl-2">
                  <div className="mb-2 flex">
                    <CustomButton
                      onClick={() => setOpenCourseDescFileModal(true)}
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
                  </div>
                  <LibraryModal
                    file={formik?.values?.courseFile}
                    set_file={(file) => {
                      formik.setFieldValue("courseFile", file);
                    }}
                    accept_file="Image"
                    has_side_bar_action={false}
                    title="Add Media"
                    open={openCourseDescFileModal}
                    set_open={setOpenCourseDescFileModal}
                    onSave={() => setOpenCourseDescFileModal(false)}
                  />
                  <div style={{ width: "100%", position: "relative" }}>
                    {/* <EditorComponent /> */}
                    <DraftEditor
                      placeholder="Course description ..."
                      value={editorState} // Pass the editor state
                      onChange={handleEditorChange}
                    />
                  </div>
                </div>

                {/* <DraftEditor
                  placeholder="Course description ..."
                  value={editorState} // Pass the editor state
                  onChange={handleEditorChange} */}
              </div>

              {formik.touched.courseDescription ? (
                <span className="text-red-600 text-sm p-1">
                  {formik.errors.courseDescription}
                </span>
              ) : null}
              <AnimatePresence
                presenceAffectsLayout
                initial={false}
                mode="sync"
              >
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ opacity: 1, height: "fit-content" }}
                  transition={{ ease: "linear" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="lg:hidden space-y-4">
                    <AudioAccessbility />

                    <CourseCategoriesComponent
                      name="categoryids"
                      formik={formik}
                    />

                    <TagsComponent name="courseTags" formik={formik} />

                    <FeaturedImageComponent
                      name="featuredImage"
                      formik={formik}
                    />
                  </div>

                  <ExcerptComponent name="excerpt" formik={formik} />

                  <CourseAuthor formik={formik} />
                  <CourseSettingsComponent formik={formik} />

                  <AddProductComponent name="coursePrice" formik={formik} />

                  <AdditionalDate formik={formik} />

                  <VideoComponent name="courseIntroVideo" formik={formik} />

                  <div>
                    <PublishComponent isLoading={isLoading} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden lg:block  lg:col-span-1 space-y-4">
              <AudioAccessbility />

              <CourseCategoriesComponent name="categoryids" formik={formik} />

              <TagsComponent name="coursetags" formik={formik} />

              <FeaturedImageComponent name="featuredImage" formik={formik} />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewCourse;
