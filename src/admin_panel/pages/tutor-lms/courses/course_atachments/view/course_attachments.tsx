import React from "react";
import Navbar from "../../../../../../components/Navbar";
import { IconButton, Tab, Tabs } from "@mui/material";
import { useParams } from "react-router-dom";
import useCourses from "../../hook/use_courses";
import useMyCourses from "../../../../../../pages/profile/my_courses/hook/use_my_courses";
import { yellow_color } from "../../../../categories/view/category_details_view_screen";
import { AnimatePresence, motion } from "framer-motion";
import { BiPlus } from "react-icons/bi";
import MAterialTable from "../../../../../components/table/material_table";
// import { AddTopic } from "../../../../../../pages/profile/new_course_components/course_builder";
import ModalLayout from "../../../../../../common/modal_layout";
// import { MeetingComponent } from "../../../../../../pages/profile/new_course_components/meeting_content_component";
import { VideoComponent as PDF } from "../../../../../../pages/profile/new_course_components/video_pdf_url";
import ContainedButtonPrimary from "../../../../../../common/contained_button_primary";
import VideoComponent from "../../../../../../pages/profile/new_course_components/video_component";
import { MRT_ColumnDef } from "material-react-table";
import AddCourseTitle from "../../../../../../pages/profile/new_course_components/add_course_title";
import CategoriesComponent from "../../../../../../pages/profile/new_course_components/categories_component";
import FeaturedImageComponent from "../../../../../../pages/profile/new_course_components/featured_image_component";
import TagsComponent from "../../../../../../pages/profile/new_course_components/tags_component";
import NewCourceCard from "../../../../../../pages/profile/new_course_components/new_cource_card";
import { Form, Formik } from "formik";
import PublishComponent from "../../../../../../pages/profile/new_course_components/publish_component";
import { get_course_topics_api } from "../service/course_topics_api";
import { get_course_meetings_api } from "../service/course_metting_api";
import { get_course_pdf_api } from "../service/course_pdf_api";
import {
  add_course_video_api,
  get_course_videos_api,
} from "../service/course_videos_api";
import {
  add_course_lessons_api,
  get_course_lessons_api,
} from "../service/course_lessons_api";

const CourseAttachments = () => {
  const { id, title } = useParams();
  // const { courses_list } = useMyCourses({ id });
  const [is_open, set_is_open] = React.useState<{
    is_open: boolean;
    id: null | number;
  }>({ id: null, is_open: false });
  const [topics, set_topics] = React.useState<any[]>([]);
  const [meetings, set_meetings] = React.useState<any[]>([]);
  const [pdfs, set_pdfs] = React.useState<any[]>([]);
  const [lessons, set_lessons] = React.useState<any[]>([]);
  const [videos, set_videos] = React.useState<any[]>([]);
  const [tab_value, set_tab_value] = React.useState(0);

  // const course = courses_list?.[0];
  React.useEffect(() => {
    if (tab_value === 0) {
      get_course_topics_api({ courseId: id }).then((res) => {
        set_topics(res);
      });
    } else if (tab_value === 2) {
      get_course_meetings_api({ courseId: id })
        .then((res) => {
          set_meetings(res);
        })
        .catch((err) => {});
    } else if (tab_value === 1) {
      get_course_lessons_api({ courseId: id })
        .then((res) => {
          set_lessons(res);
        })
        .catch((err) => {});
    } else if (tab_value === 3) {
      get_course_pdf_api({ courseId: id })
        .then((res) => {
          set_pdfs(res);
        })
        .catch((err) => {});
    } else if (tab_value === 4) {
      get_course_videos_api({ courseId: id })
        .then((res) => {
          set_videos(res);
        })
        .catch((err) => {});
    }
  }, [tab_value]);

  return (
    <div className="text-white">
      <Navbar />
      <div className="py-8 px-8 text-white">
        <h2 className="font-semibold text-3xl mb-2">{title}</h2>
        <div className="flex items-center justify-between mb-2">
          <Tabs
            className="text-white"
            value={tab_value}
            color="white"
            onChange={(e, val) => {
              set_tab_value(val);
            }}
            style={{ color: "white" }}
            TabIndicatorProps={{
              sx: { color: "white", backgroundColor: yellow_color },
            }}
          >
            {items.map((item, i) => {
              return (
                <Tab
                  style={{
                    color: tab_value === i ? yellow_color : "white",
                    textTransform: "capitalize",
                    minWidth: 50,
                    padding: 0,
                    marginRight: 16,
                  }}
                  label={item.title}
                  title={item.title}
                  key={item.title}
                  color="primary"
                />
              );
            })}
          </Tabs>
          {items.map((item, i) => {
            const { Component } = item;
            const open = is_open.id === i && !!is_open?.is_open;
            if (Component)
              return (
                <Component
                  key={i}
                  set_topics_to_list={(val: any) => {
                    set_topics?.((pre) => [...pre, val]);
                  }}
                  add_to_meetings_list={(val: any) => {
                    set_meetings((pre) => [...pre, val]);
                  }}
                  is_open={open}
                  set_is_open={() => {
                    set_is_open({ id: null, is_open: false });
                  }}
                  add_pdf_to_list={(value: any) => {
                    set_pdfs((pre) => [...pre, value]);
                  }}
                  add_lesson_to_list={(val: any) => {
                    set_lessons((pre) => [...pre, val]);
                  }}
                  add_videos_to_list={(val: any) => {
                    set_videos((pre) => [...pre, val]);
                  }}
                />
              );
            return;
          })}
          <IconButton
            onClick={() => {
              set_is_open({ is_open: true, id: tab_value });
            }}
            className=" bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] "
          >
            <BiPlus color="white" />
          </IconButton>
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={tab_value}
            transition={{ ease: "linear" }}
            initial={{ opacity: 0, y: 8 }}
            exit={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ width: "100%" }}
          >
            <MAterialTable
              columns={items?.[tab_value].table_headers || []}
              rows={
                tab_value === 0
                  ? topics
                  : tab_value === 2
                  ? meetings
                  : tab_value === 3
                  ? pdfs
                  : tab_value === 1
                  ? lessons
                  : tab_value === 4
                  ? videos
                  : []
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseAttachments;
interface Props {
  title: string;
  Component?: any;
  table_headers?: MRT_ColumnDef<any>[];
}

const items: Props[] = [
  {
    title: "Topics",
    // Component: AddTopic,
    table_headers: [
      { header: "Name", accessorKey: "name" },
      { header: "Summery", accessorKey: "summery" },
    ],
  },
  {
    title: "Lessons",
    Component: ({
      is_open,
      set_is_open,
      add_lesson_to_list,
    }: {
      is_open: boolean;
      set_is_open: (val: boolean) => void;
      add_lesson_to_list: (val: any) => void;
    }) => {
      const { id } = useParams();
      return (
        <ModalLayout
          onClose={set_is_open}
          open={is_open}
          width="xl"
          style={{ overflow: "auto", color: "black" }}
        >
          <Formik
            initialValues={{
              lesson_level: "",
              category_name: "",
              title: "",
              tags: "",
              file: null,
            }}
            onSubmit={(values, props) => {
              let end_date = new Date();
              end_date.setHours(new Date().getHours() + 30);
              add_course_lessons_api({
                courseId: id,
                lessonname: values.title,
                lessondescription: "asd",
                lessontime: 30,
                starttime: new Date(),
                enddate: end_date,
              })
                .then((res) => {
                  add_lesson_to_list(res);
                  props.resetForm();
                })
                .catch((err) => {});
            }}
          >
            {(formik) => {
              return (
                <Form style={{ width: "80vw", overflow: "auto" }}>
                  <div className="flex flex-col py-4 px-4 items-start">
                    <h2 className="font-semibold mb-2">Add New Lesson</h2>
                    <AddCourseTitle
                      value={formik.values.title}
                      set_value={(val) => formik.setFieldValue("title", val)}
                    />
                    <CategoriesComponent
                      category_id={formik.values.category_name}
                      set_category_type_id={(id) => {
                        formik.setFieldValue("category_name", id);
                      }}
                    />
                    <FeaturedImageComponent
                      file={formik.values.file}
                      set_file={(file) => {
                        formik.setFieldValue("file", file);
                      }}
                    />
                    <TagsComponent
                      course_tags={formik.values.tags}
                      set_course_tags={(val) => {
                        formik.setFieldValue("tags", val);
                      }}
                    />
                    <NewCourceCard title="Lesson Levels">
                      <div className="py-4 px-4">
                        {[
                          { title: "All" },
                          { title: "Newbie" },
                          { title: "Intermidiate" },
                          { title: "Advanced" },
                        ].map((item, i) => {
                          return (
                            <div className="flex items-center mb-2" key={i}>
                              <input
                                id={item.title}
                                type="radio"
                                readOnly
                                checked={
                                  formik.values.lesson_level === item.title
                                }
                                onChange={() => {
                                  formik.setFieldValue(
                                    "lesson_level",
                                    item.title
                                  );
                                }}
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-blue-800 focus:ring-10 dark:bg-blue-500 dark:border-blue-600"
                              />
                              <label
                                htmlFor={item.title}
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                              >
                                {item.title}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </NewCourceCard>
                    <PublishComponent
                      publish={formik.submitForm}
                      save_draft={formik.submitForm}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </ModalLayout>
      );
    },
    table_headers: [
      { header: "Title", accessorKey: "title" },
      { header: "Title", accessorKey: "tags" },
    ],
  },
  {
    title: "Meetings",
    Component: ({
      is_open,
      set_is_open,
      add_to_meetings_list,
    }: {
      is_open: boolean;
      set_is_open: (val: boolean) => void;
      add_to_meetings_list?: (val: any) => void;
    }) => {
      return (
        <ModalLayout onClose={set_is_open} open={is_open}>
          <div className="flex flex-col py-4 px-4 items-start">
            <h2 className="font-semibold mb-2">Add New Meeting Content</h2>
            {/* <MeetingComponent add_to_meetings_list={add_to_meetings_list} /> */}
          </div>
        </ModalLayout>
      );
    },
    table_headers: [
      { header: "Title", accessorKey: "name" },
      { header: "Description", accessorKey: "description" },
      { header: "Meeting URL", accessorKey: "url" },
    ],
  },
  {
    title: "PDF",
    Component: ({
      is_open,
      set_is_open,
      add_pdf_to_list,
    }: {
      is_open: boolean;
      set_is_open: (val: boolean) => void;
      add_pdf_to_list: (val: any) => void;
    }) => {
      return (
        <ModalLayout
          onClose={set_is_open}
          open={is_open}
          width="lg"
          style={{ minWidth: "50vw" }}
        >
          <div className="flex flex-col py-4 px-4 items-start w-full">
            <h2 className="font-semibold mb-2">Add New PDF</h2>
            <PDF add_pdf_to_list={add_pdf_to_list} />
          </div>
        </ModalLayout>
      );
    },
    table_headers: [
      { header: "Title", accessorKey: "name" },
      { header: "Description", accessorKey: "description" },
      { header: "View Pdf", accessorKey: "view" },
      {
        header: "Downloadable",
        accessorKey: "allowDownload",
        Cell({ row }) {
          return row.original?.allowDownload ? "Yes" : "No";
        },
      },
    ],
  },
  {
    title: "Videos",
    Component: ({
      is_open,
      set_is_open,
      add_videos_to_list,
    }: {
      is_open: boolean;
      set_is_open: (val: boolean) => void;
      add_videos_to_list: (val: any) => void;
    }) => {
      return (
        <ModalLayout onClose={set_is_open} open={is_open} width="lg">
          <div className="flex flex-col py-4 px-4 items-start min-w-96">
            <h2 className="font-semibold mb-2">Add New Video</h2>
            <VideoComponent add_video_to_list={add_videos_to_list} />
          </div>
        </ModalLayout>
      );
    },
    table_headers: [
      { header: "Link", accessorKey: "name" },
      { header: "Video", accessorKey: "video" },
    ],
  },
  {
    title: "Students",
    table_headers: [{ header: "Name" }],
  },
];
