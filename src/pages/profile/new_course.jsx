import { AnimatePresence, Reorder, motion } from "framer-motion";
import AddCourseTitle from "./new_course_components/add_course_title";
import PublishComponent from "./new_course_components/publish_component";
import VideoPdfUrl from "./new_course_components/video_pdf_url";
import AdditionalDate from "./new_course_components/additional_date";
import VideoComponent from "./new_course_components/video_component";
import AddProductComponent from "./new_course_components/add_product_component";

import MeetingContentComponent from "./new_course_components/meeting_content_component";
import ExcerptComponent from "./new_course_components/excerpt_component";

import TagsComponent from "./new_course_components/tags_component";
import FeaturedImageComponent from "./new_course_components/featured_image_component";
import AudioAccessbility from "./new_course_components/audio_accessbility";

import CourseSettingsComponent from "./new_course_components/course_settings_component";
import CourseCategoriesComponent from "./new_course_components/course_categories_component";
import CategoriesComponent from "./new_course_components/categories_component";

import CourseItemSelector from "./new_course_components/course_item_picker";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  courseInitialValues,
  courseValidationSchema,
} from "../../constants/learning/course/newCourse";

const NewCourse = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: courseInitialValues,
    validationSchema: courseValidationSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });


  return (
    <div className="w-full bg-[#f0f0f1] top-0 p-0 m-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="wrapper mx-auto flex w-full flex-col max-h-fit "
      >
        {/* <CourseItemSelector /> */}
        {console.log(formik.errors)}
        <h4 className="text-3xl text-gray-700 font-bold mb-4 mt-8">
          Add New Course
        </h4>
        {console.log(formik.values)}
        <form>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-4 lg:col-span-3">
              <div className="w-full bg-white rounded-md">
                <AddCourseTitle formik={formik} />
              </div>

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
                  <MeetingContentComponent formik={formik} />

                  <div className="lg:hidden space-y-4">
                    <AudioAccessbility />

                    <CourseCategoriesComponent />

                    <TagsComponent name="coursetags" formik={formik} />

                    <FeaturedImageComponent />
                  </div>

                  <ExcerptComponent />

                  <CourseSettingsComponent />

                  <AddProductComponent />

                  <AdditionalDate />

                  <VideoComponent />

                  <div>
                    <PublishComponent
                      onClick={() =>
                        navigate(
                          "/user-profile/myCourses/new-course/course-builder"
                        )
                      }
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hidden lg:block  lg:col-span-1 space-y-4">
              <AudioAccessbility />

              <CourseCategoriesComponent />

              <TagsComponent name="coursetags" formik={formik} />

              <FeaturedImageComponent />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default NewCourse;
