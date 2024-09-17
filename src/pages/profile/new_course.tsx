import { AnimatePresence, Reorder, motion } from "framer-motion";
import ScreenElements from "./new_course_components/screen_elements";
import useNewCourse from "./hooks/use_new_course";
import AddCourseTitle from "./new_course_components/add_course_title";
import PublishComponent from "./new_course_components/publish_component";

import TagsComponent from "./new_course_components/tags_component";
import FeaturedImageComponent from "./new_course_components/featured_image_component";
// import AudioAccessbility from "./new_course_components/audio_accessbility";
// import ExcerptComponent from "./new_course_components/excerpt_component";
// import CourseBuilder from "./new_course_components/course_builder";
// import SlugComponent from "./new_course_components/slug_component";
import CourseSettingsComponent from "./new_course_components/course_settings_component";
// import CourseCategoriesComponent from "./new_course_components/course_categories_component";
import CategoriesComponent from "./new_course_components/categories_component";
// import VideoPdfUrl from "./new_course_components/video_pdf_url";
import AdditionalDate from "./new_course_components/additional_date";
// import VideoComponent from "./new_course_components/video_component";
import AddProductComponent from "./new_course_components/add_product_component";
// import EditorComponent from "./new_course_components/editor/editor_component";
// import MeetingContentComponent from "./new_course_components/meeting_content_component";
import { Formik } from "formik";
import { create_course_api } from "./service/create_course_api";
// import store from "../../redux/store";
// import { show_message } from "../../redux/features/generalSlice";
// import DraftEditor from "../../admin_panel/components/editor/draft_editor";
import { upload_course_cover_api } from "./service/upload_course_cover_api";
// import 'bootstrap/dist/css/bootstrap.min.css';

const NewCourse = () => {
  const {
    items_list,
    set_items_list,
    check_additional_setting,
    is_layout_colum,
    set_additional_setting,
    set_is_layout_column,
  } = useNewCourse();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        maxHeight: "fit-content",
      }}
    >
      <ScreenElements
        check_additional_setting={check_additional_setting}
        is_layout_column={is_layout_colum}
        set_additional_setting={set_additional_setting}
        set_is_layout_column={set_is_layout_column}
        course_items={items_list}
        edit_title={""}
        set_course_items={set_items_list}
      />
      <Formik
        initialValues={init_values}
        onSubmit={async (values, props) => {
          // console.log({ values });
          try {
            let course = await create_course_api({
              ...values,
              file: undefined,
              registerdatetime: new Date(),
              coursename: values.coursename,
              courseduringtime: Number(
                `${values.total_course_duration_hours || 0}`
              ),
              courseprice: Number(values.courseprice) || 0,
              startdate: values.startdate,
              enddate: values.enddate,
              lessencount: Number(values.lessoncount) || 0,
              allowdownload: values.allowdownload,
              isprelesson: values.isprelesson,
              coursetgas: values.coursetags,
              issitecourse: values.issitecourse,
              grouptypeId: values.grouptypeId,
              coursedescription: values.coursedescription,
              coursetypeId: values.courseleveltypeId,
              courseleveltypeId: values.courseleveltypeId,
            });
            if (!values.file) return props.resetForm();
            let form_data = new FormData();
            form_data.append("coverPicture", values.file);
            form_data.append("id", course.id);
            await upload_course_cover_api(form_data);
            props.resetForm();
          } catch (error) {}
        }}
        // validateOnMount
        // validationSchema={{}}
      >
        {(formik) => {
          return (
            <>
              <div className="w-full bg-white rounded-md">
                <AddCourseTitle
                  value={formik.values.coursename}
                  set_value={(val) => formik.setFieldValue("coursename", val)}
                />
              </div>
              {/* <EditorComponent /> */}
              {/* <DraftEditor /> */}
              <Reorder.Group
                axis="y"
                values={items_list}
                onReorder={(values) => {
                  set_items_list?.(values);
                }}
              >
                <AnimatePresence
                  presenceAffectsLayout
                  initial={false}
                  mode="sync"
                >
                  {items_list.map((item, i) => {
                    const { Component } = item;

                    return (
                      <Reorder.Item key={item?.title} value={item}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ opacity: 1, height: "fit-content" }}
                          transition={{ ease: "linear" }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <Component
                            /**
                             * props relaterd to additional data component
                             */
                            materials_included={formik.values.materialsincluded}
                            requirements={
                              formik.values.requirementsinstructions
                            }
                            targeted_audience={formik.values.targetedaudience}
                            what_will_learn={formik.values.whatlearn}
                            total_course_duration_minutes={
                              formik.values.total_course_duration_minutes
                            }
                            total_course_duration_hours={
                              formik.values.total_course_duration_hours
                            }
                            total_course_duration_hours_change={(val) =>
                              formik.setFieldValue(
                                "total_course_duration_hours",
                                val
                              )
                            }
                            total_course_duration_minutes_change={(val) =>
                              formik.setFieldValue(
                                "total_course_duration_minutes",
                                val
                              )
                            }
                            materials_included_change={(val) =>
                              formik.setFieldValue("materialsincluded", val)
                            }
                            requirements_change={(val) =>
                              formik.setFieldValue(
                                "requirementsinstructions",
                                val
                              )
                            }
                            what_will_learn_change={(val) =>
                              formik.setFieldValue("whatlearn", val)
                            }
                            targeted_audience_change={(val) =>
                              formik.setFieldValue("targetedaudience", val)
                            }
                            allowdownload={formik.values.allowdownload}
                            set_allow_download={(val) =>
                              formik.setFieldValue("allowdownload", val)
                            }
                            course_discription={formik.values.coursedescription}
                            set_course_discription={(val) =>
                              formik.setFieldValue("coursedescription", val)
                            }
                            end_date={formik.values.enddate}
                            start_date={formik.values.startdate}
                            set_start_date={(val) =>
                              formik.setFieldValue("startdate", val)
                            }
                            set_end_date={(val) =>
                              formik.setFieldValue("enddate", val)
                            }
                            course_price={formik.values.courseprice}
                            set_course_price={(val) =>
                              formik.setFieldValue("courseprice", val)
                            }
                            is_admin_accepted={formik.values.isadminaccepted}
                            set_is_admin_accepted={(val) => {
                              formik.setFieldValue("isadminaccepted", val);
                            }}
                            is_pre_lesson={formik.values.isprelesson}
                            lesson_count={formik.values.lessoncount}
                            set_is_pre_lesson={(val) =>
                              formik.setFieldValue("isprelesson", val)
                            }
                            set_lesson_count={(val) => {
                              formik.setFieldValue("lessoncount", val);
                            }}
                            /**
                             * props for course setting component
                             */
                            courseLevelTypeId={formik.values.courseleveltypeId}
                            set_courseLevelTypeId={(val) =>
                              formik.setFieldValue("courseleveltypeId", val)
                            }
                            allowQA={formik.values.allowQA}
                            set_allow_QA={(val) => {
                              formik.setFieldValue("allowQA", val);
                            }}
                            is_publish_course={formik.values.issitecourse}
                            set_is_publish_course={(val) =>
                              formik.setFieldValue("issitecourse", val)
                            }
                            /**
                             * props related to categories component
                             */
                            set_category_type_id={(id) => {
                              formik.setFieldValue("grouptypeId", id);
                            }}
                            /**
                             *  props related to tags components
                             *
                             */
                            set_course_tags={(val) => {
                              formik.setFieldValue("coursetags", val);
                            }}
                            /**
                             * props related to add product component
                             */
                            set_course_type_id={(val) => {
                              formik.setFieldValue("coursetypeId", val);
                            }}
                            /**
                             * props related to feature cover
                             */
                            file={formik.values.file}
                            set_file={(file) => {
                              formik.setFieldValue("file", file);
                            }}
                          />
                        </motion.div>
                      </Reorder.Item>
                    );
                  })}
                  <PublishComponent
                    publish={() => formik.submitForm()}
                    save_draft={formik.submitForm}
                    // issitecourse={formik.values.issitecourse}
                    // set_issitecourse={(val) =>
                    //   formik.setFieldValue("issitecourse", val)
                    // }
                  />
                </AnimatePresence>
              </Reorder.Group>
            </>
          );
        }}
      </Formik>
    </motion.div>
  );
};

export default NewCourse;
export const courses_items = [
  { title: "Additional Data", Component: AdditionalDate },
  { title: "Course Settings", Component: CourseSettingsComponent },
  // { title: "Play.ht - Audio Accessbility", Component: AudioAccessbility },
  // { title: "Course Categories", Component: CourseCategoriesComponent },
  { title: "Tags", Component: TagsComponent },
  { title: "Categories", Component: CategoriesComponent },
  { title: "Featured Image", Component: FeaturedImageComponent },
  // { title: "video Pdf Url", Component: VideoPdfUrl },
  // { title: "Slug", Component: SlugComponent },
  // { title: "Meeting Content", Component: MeetingContentComponent },
  // { title: "Excerpt", Component: ExcerptComponent },
  // { title: "Page Builder" },
  { title: "Add Product", Component: AddProductComponent },
  // { title: "Course Builder", Component: CourseBuilder },
  // { title: "Video", Component: VideoComponent },
];
interface new_course_props {
  coursename: string;

  total_course_duration_hours: string;
  total_course_duration_minutes: string;
  file?: File;
  issitecourse: boolean;
  coursetypeId: number;
  courseprice?: number;
  startdate?: Date;
  enddate?: Date;
  lessoncount?: number;
  allowdownload?: boolean;
  coursecoverimage?: string;
  courseleveltypeId: string;
  coursedurationtime?: number;
  registerdatetime?: Date;
  isprelesson?: boolean;
  coursedescription?: string;
  isadminaccepted?: boolean;
  coursetags?: string;
  courseintrofile?: string;
  grouptypeId?: number;
  courseintrofilecontenttype?: string;
  courseintrofilefileextention?: string;
  courseintrofileurl?: string;
  allowQA?: boolean;
  whatlearn?: string;
  targetedaudience?: string;
  materialsincluded: string;
  requirementsinstructions?: string;
  // is_public_course: boolean;
}

const init_values: new_course_props = {
  // file: null,
  coursename: "",
  materialsincluded: "",
  targetedaudience: "",
  total_course_duration_hours: "",
  total_course_duration_minutes: "",
  whatlearn: "",
  issitecourse: false,
  coursetypeId: 0,
  allowdownload: false,
  allowQA: false,
  coursecoverimage: "",
  coursedescription: "",
  coursedurationtime: 0,
  courseintrofile: "",
  courseintrofilecontenttype: "",
  courseintrofilefileextention: "",
  courseintrofileurl: "",
  courseleveltypeId: "",
  courseprice: 0,
  coursetags: "",
  enddate: new Date(),
  startdate: new Date(),
  grouptypeId: 0,
  isadminaccepted: false,
  isprelesson: false,
  lessoncount: 0,
  registerdatetime: new Date(),
  requirementsinstructions: "",

  // is_public_course: false,
};
