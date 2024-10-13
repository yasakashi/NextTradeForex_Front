import React, { useState } from "react";
import NewCourceCard from "./new_cource_card";
import { AnimatePresence, motion } from "framer-motion";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
import CustomTextField, {
  CustomTextArea,
} from "../../../common/custom_text_field";
import ModalLayout from "../../../common/modal_layout";
import LibraryModal from "./library_modal";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { CustomSelectBox } from "./custom_select_box";
// import { menuType, SearchAutoCompelate } from "./course_builder";
import { add_course_pdf_api } from "../../../admin_panel/pages/tutor/courses/course_atachments/service/course_pdf_api";
import { useParams } from "react-router-dom";

const VideoPdfUrl = () => {
  const [videos, set_videos] = useState([]);

  return (
    <NewCourceCard title="Video Pdf Url">
      <div className="flex flex-col p-4">
        <p className="text-sm font-medium mb-2">video pdf url</p>
        <AnimatePresence>
          {videos.map((video, i) => {
            return (
              <VideoComponent
                key={video.order_id}
                set_video={set_videos}
                values={video}
              />
            );
          })}
        </AnimatePresence>

        <div style={{ alignSelf: "flex-end", marginTop: 16 }}>
          <ContainedButtonPrimary
            title={"Add Row"}
            onClick={() => {
              set_videos((pre) => [...pre, { order_id: Math.random() }]);
            }}
          />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default VideoPdfUrl;
export const VideoComponent = ({ values, set_video, add_pdf_to_list }) => {
  const [open, set_open] = React.useState(false);
  const items = [
    { label: "lesson 1", id: "lesson1" },
    { label: "lesson 2", id: "lesson2" },
    { label: "lesson 3", id: "lesson3" },
  ];

  const { id } = useParams();
  return (
    <Formik
      initialValues={{
        title: "",
        description: "",
        view: "",
        file: null,
        type: "None",
        downloadable: false,
        pre_lessons: [],
      }}
      onSubmit={(values, props) => {
        // add_course_pdf_api({
        //   name: values.title,
        //   allowDownload: values.downloadable,
        //   registerdatetime: new Date(),
        //   duedatetime: new Date(),
        //   courseId: id,
        // })
        //   .then((res) => {
        //     add_pdf_to_list?.(res);
        //     props.resetForm();
        //   })
        //   .catch((err) => {});
      }}
    >
      {(formik) => {
        return (
          <Form className="w-full">
            <motion.div
              className="flex border border-gray-400 relative"
              layout
              key={values?.order_id}
              style={{ transformOrigin: "top" }}
              // initial={{ scaleY: 0 }}
              // exit={{ scaleY: 0 }}
              // animate={{ scaleY: 1 }}
            >
              {/* add and remove button */}
              {/* <button
                className="absolute -top-3 -right-3"
                onClick={() => {
                  set_video?.((pre) => [...pre, { order_id: Math.random() }]);
                }}
              >
                <PlusCircleIcon className="w-6 opacity-0 hover:opacity-100 bg-white" />
              </button>
              <button
                className="absolute top-1/2 -right-3"
                onClick={() => {
                  set_video?.((pre) =>
                    pre.filter((item) => item.order_id !== values?.order_id)
                  );
                }}
              >
                <MinusCircleIcon className="w-6 opacity-0 hover:opacity-100 bg-white" />
              </button> */}

              <div
                className="bg-gray-100 border-r-2 border-gray-300"
                style={{
                  width: 24,
                  marginRight: 16,
                }}
              ></div>
              <div className="flex flex-col flex-grow overflow-hidden">
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36 mt-3">Pdf Title</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-3">
                    <CustomTextField
                      value={formik.values.title}
                      onChange={(val) => formik.setFieldValue("title", val)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36">Pdf Description</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                    <CustomTextArea
                      value={formik.values.description}
                      set_value={(val) =>
                        formik.setFieldValue("description", val)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36 ">Add Pdf file</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                    <BorderedButtonPrimary
                      onClick={() => set_open(true)}
                      title={"Add File"}
                    />
                    <LibraryModal
                      accept_file="PDF"
                      file={formik.values.file}
                      set_file={(file) => formik.setFieldValue("file", file)}
                      onSave={(file) => {
                        formik.setFieldValue("file", file);
                        set_open(false);
                      }}
                      open={open}
                      set_open={set_open}
                      title="Select Files"
                      has_side_bar_action={false}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36">View PDF File</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                    <CustomTextField
                      value={formik.values.view}
                      onChange={(val) => formik.setFieldValue("view", val)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36">Downloadable</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                    <div className="flex items-center mb-2">
                      <input
                        id="default-radio-1"
                        type="radio"
                        readOnly
                        checked={!!formik.values.downloadable}
                        onChange={() => {
                          formik.setFieldValue("downloadable", true);
                        }}
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-blue-800 focus:ring-10 dark:bg-blue-500 dark:border-blue-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        checked={!formik.values.downloadable}
                        onChange={() => {
                          formik.setFieldValue("downloadable", false);
                        }}
                        id="default-radio-2"
                        type="radio"
                        readOnly
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-blue-800 focus:ring-10 dark:bg-blue-500 dark:border-blue-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36">Type</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                    <CustomSelectBox
                      onChange={(val) => {
                        formik.setFieldValue("type", val);
                      }}
                      options={[
                        { title: "None", value: "None" },
                        { title: "Intro", value: "intro" },
                        { title: "Lessons", value: "lessons" },
                      ]}
                    />
                  </div>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  {formik.values.type === "lessons" && (
                    <motion.div
                      className="flex flex-row space-x-6"
                      key={formik.values.type}
                      initial={{ height: 0 }}
                      animate={{ height: "fit-content" }}
                      exit={{ height: 0 }}
                    >
                      <p className="text-sm font-medium w-36">PDF Lessons</p>
                      <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                        {/* <SearchAutoCompelate
                          selected_item={formik.values.pre_lessons}
                          items={items}
                          handler={(val) =>
                            formik.setFieldValue("pre_lessons", val)
                          }
                        /> */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <div className="flex justify-end mt-2">
              <ContainedButtonPrimary
                onClick={formik.submitForm}
                title="Save"
                style={{ alignSelf: "flex-end", marginTop: 16 }}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
