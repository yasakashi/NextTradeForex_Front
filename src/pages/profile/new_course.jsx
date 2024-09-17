import { AnimatePresence, Reorder, motion } from "framer-motion";
import ScreenElements from "./new_course_components/screen_elements";
import useNewCourse from "./hooks/use_new_course";
import AddCourseTitle from "./new_course_components/add_course_title";
import PublishComponent from "./new_course_components/publish_component";
import NewCourceCard from "./new_course_components/new_cource_card";
import TagsComponent from "./new_course_components/tags_component";
import FeaturedImageComponent from "./new_course_components/featured_image_component";
import AudioAccessbility from "./new_course_components/audio_accessbility";
// import ExcerptComponent from "./new_course_components/excerpt_component";
import CourseBuilder from "./new_course_components/course_builder";
import SlugComponent from "./new_course_components/slug_component";
import CourseSettingsComponent from "./new_course_components/course_settings_component";
import CourseCategoriesComponent from "./new_course_components/course_categories_component";
import CategoriesComponent from "./new_course_components/categories_component";
import VideoPdfUrl from "./new_course_components/video_pdf_url";
import AdditionalDate from "./new_course_components/additional_date";
import VideoComponent from "./new_course_components/video_component";
import AddProductComponent from "./new_course_components/add_product_component";
import EditorComponent from "./new_course_components/editor/editor_component";
import MeetingContentComponent from "./new_course_components/meeting_content_component";
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
        set_course_items={set_items_list}
      />
      <AddCourseTitle />
      <EditorComponent />
      <Reorder.Group
        axis="y"
        values={items_list}
        onReorder={(values) => {
          set_items_list?.(values);
        }}
      >
        <AnimatePresence presenceAffectsLayout initial={false} mode="sync">
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
                  {Component ? (
                    <Component />
                  ) : (
                    <NewCourceCard title={item?.title}>
                      {item?.title}
                    </NewCourceCard>
                  )}
                </motion.div>
              </Reorder.Item>
            );
          })}
        </AnimatePresence>
      </Reorder.Group>

      <PublishComponent />
    </motion.div>
  );
};

export default NewCourse;
export const courses_items = [
  { title: "Play.ht - Audio Accessbility", Component: AudioAccessbility },
  { title: "Course Categories", Component: CourseCategoriesComponent },
  { title: "Tags", Component: TagsComponent },
  { title: "Categories", Component: CategoriesComponent },
  { title: "Featured Image", Component: FeaturedImageComponent },
  { title: "video Pdf Url", Component: VideoPdfUrl },
  { title: "Slug", Component: SlugComponent },
  { title: "Meeting Content", Component: MeetingContentComponent },
  // { title: "Excerpt", Component: ExcerptComponent },
  // { title: "Page Builder" },
  { title: "Course Settings", Component: CourseSettingsComponent },
  { title: "Add Product", Component: AddProductComponent },
  { title: "Course Builder", Component: CourseBuilder },
  { title: "Additional Data", Component: AdditionalDate },
  { title: "Video", Component: VideoComponent },
];
