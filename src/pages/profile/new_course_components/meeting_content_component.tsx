import React from "react";
import NewCourceCard from "./new_cource_card";
import { AnimatePresence, motion } from "framer-motion";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import CustomTextField from "../../../common/custom_text_field";
// import EditorComponent from "./editor/editor_component";
import LibraryModal from "./library_modal";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { BiSave } from "react-icons/bi";
import DraftEditor from "../../../admin_panel/components/editor/draft_editor";
import { Form, Formik } from "formik";
import { convertToRaw, EditorState } from "draft-js";
import { useParams } from "react-router-dom";
import { add_course_mettings_api } from "../../../admin_panel/pages/tutor/courses/course_atachments/service/course_metting_api";

interface MeetingProps {
  id: number;
}

const MeetingContentComponent = () => {
  const [meetings, set_meeting] = React.useState<MeetingProps[]>([]);

  return (
    <NewCourceCard title="Meeting Content">
      <div className="flex flex-col p-4" style={{ transition: "0.2s" }}>
        <p className="text-sm font-medium mb-2">Meeting Content</p>
        <AnimatePresence mode="sync">
          {meetings.map((meeting, i) => {
            return (
              <MeetingComponent
                key={meeting.id}
                set_meeting={set_meeting}
                values={meeting}
              />
            );
          })}
        </AnimatePresence>

        <div style={{ alignSelf: "flex-end", marginTop: 16 }}>
          <ContainedButtonPrimary
            title={"Add Row"}
            onClick={() => {
              set_meeting((pre) => [...pre, { id: Math.random() }]);
            }}
          />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default MeetingContentComponent;
export const MeetingComponent = ({
  values,
  set_meeting,
  add_to_meetings_list,
}: {
  values?: MeetingProps;
  set_meeting?: React.Dispatch<React.SetStateAction<MeetingProps[]>>;
  add_to_meetings_list?: (val: any) => void;
}) => {
  const [open, set_open] = React.useState(false);
  const { id } = useParams();
  return (
    <Formik
      initialValues={{
        title: "",
        description: EditorState.createEmpty(),
        file: null,
        url: "",
        date: new Date(),
      }}
      onSubmit={(values, props) => {
        let row = convertToRaw(values.description.getCurrentContent())
          .blocks.map((item) => item.text)
          .join(" ");

        let dueDate = new Date(values.date);
        dueDate.setHours(23, 59, 59, 59);  
        const isoDate = dueDate.toISOString().split('.')[0].split("T"); 
        console.log(isoDate?.[0]);
        
        add_course_mettings_api({
          name: values.title,
          courseId: id,
          registerdatetime: new Date(),
          duedatetime: `${isoDate?.[0]}T00:00:00`,
        })
          .then((res) => {
            add_to_meetings_list?.(res);
            props.resetForm();
          })
          .catch((err) => {});
      }}
    >
      {(formik) => {
        return (
          <Form>
            <motion.div
              className="flex border border-gray-400 relative"
              layout
              key={values?.id}
              style={{ transformOrigin: "top" }}
              // initial={{ scaleY: 0 }}
              // exit={{ scaleY: 0 }}
              // animate={{ scaleY: 1 }}
            >
              {/* add and remove button */}
              {/* <button
        className="absolute -top-3 -right-3"
        onClick={() => {
          set_meeting?.((pre) => [...pre, { id: Math.random() }]);
        }}
      >
        <PlusCircleIcon className="w-6 opacity-0 hover:opacity-100 bg-white" />
      </button>
      <button
        className="absolute top-1/2 -right-3"
        onClick={() => {
          set_meeting?.((pre) => pre.filter((item) => item.id !== values?.id));
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
              <div
                className="flex flex-col"
                style={{ width: "calc(100% - 40px)" }}
              >
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36 mt-3">Meeting Title</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-3">
                    <CustomTextField
                      value={formik.values.title}
                      onChange={(val) => formik.setFieldValue("title", val)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36">
                    Meeting Description
                  </p>
                  <div
                    style={{
                      width: "calc(100% - 170px)",
                      position: "relative",
                    }}
                    className="border-l border-gray-300 p-4 pt-0 overflow-hidden"
                  >
                    <div className="w-full">
                      <div className="mb-2 flex">
                        <BorderedButtonPrimary
                          title="Add Media"
                          onClick={() => {
                            set_open(true);
                          }}
                        />
                        <button className="bg-gray-600 rounded-sm p-1 pr-3 pl-3 ml-2">
                          <BiSave color="white" className="text-xl" />
                        </button>
                      </div>
                      <LibraryModal
                        accept_file="Image"
                        file={formik.values.file}
                        set_file={(file) => {
                          formik.setFieldValue("file", file);
                        }}
                        onSave={(val) => {
                          formik.setFieldValue("file", val);
                        }}
                        has_side_bar_action={false}
                        title="Add Media"
                        open={open}
                        set_open={set_open}
                      />
                      <div style={{ width: "100%", position: "relative" }}>
                        {/* <EditorComponent /> */}
                        <DraftEditor
                          editorState={formik.values.description}
                          set_editor_value={(val) => {
                            formik.setFieldValue("description", val);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36">Meeting Url</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                    <CustomTextField
                      type="url"
                      value={formik.values.url}
                      onChange={(val) => formik.setFieldValue("url", val)}
                    />
                  </div>
                </div>
                <div className="flex flex-row space-x-6">
                  <p className="text-sm font-medium w-36">Date And Time</p>
                  <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                    <CustomTextField
                      disable_key_down
                      type="date"
                      value={
                        new Date(formik.values?.date || "")
                          .toISOString()
                          .split("T")?.[0]
                      }
                      onChange={(val) => formik.setFieldValue("date", val)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="flex mt-2 justify-end">
              <ContainedButtonPrimary
                title="Save"
                onClick={() => formik.submitForm()}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
