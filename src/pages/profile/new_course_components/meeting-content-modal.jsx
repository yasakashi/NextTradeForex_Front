import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMinusCircle } from "react-icons/fi";
import { BiSave } from "react-icons/bi";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

import ModalLayout from "../../../common/modal_layout";
import CustomTextField from "../../../common/custom_text_field";
import LibraryModal from "./library_modal";
import DraftEditor from "../../../admin_panel/components/editor/draft_editor";
import { CustomButton } from "../../../components/ui/CustomButton";
import CustomTextInput from "../../../components/ui/CustomTextInput";

const MeetingContentModal = ({
  showMeetingModal,
  setShowMeetingModal,
  formik,
  meetingIndex,
}) => {
  const [open, set_open] = useState(false);

  const handleSave = () => {
    setShowMeetingModal(false);
  };

  return (
    <ModalLayout
      className="w-full sm:w-[70vw] md:w-[80vw] lg:w-[70vw] max-w-[1100px] h-[90vh] flex flex-col justify-between p-4 overflow-hidden rounded-lg"
      onClose={setShowMeetingModal}
      open={showMeetingModal}
    >
      <div className="w-full h-full overflow-y-scroll overflow-x-hidden scrollbar-thin px-4">
        <motion.div
          className="flex border border-gray-400 relative"
          layout
          key={formik?.values?.id}
          style={{ transformOrigin: "top" }}
        >
          <div
            className="bg-gray-100 border-r-2 border-gray-300"
            style={{
              width: 24,
              marginRight: 16,
            }}
          ></div>
          <div className="flex flex-col" style={{ width: "calc(100% - 40px)" }}>
            <div className="flex flex-row space-x-6">
              <p className="text-sm font-medium w-36 mt-3">Meeting Title</p>
              <div className="border-l border-gray-300  flex-grow p-4 pt-3">
                <CustomTextInput
                  name={`meetings[${meetingIndex}].meetingTitle`}
                  placeholder="Meeting Title"
                  onChange={formik?.handleChange}
                  value={formik.values?.meetings[meetingIndex]?.meetingTitle}
                  error={formik.errors?.meetings?.[meetingIndex]?.meetingTitle}
                />
              </div>
            </div>
            <div className="flex flex-row space-x-6">
              <p className="text-sm font-medium w-36">Meeting Description</p>
              <div className="relative border-l border-gray-300 p-4 pt-0 overflow-hidden w-[calc(100%-170px)]">
                <div className="w-full">
                  <div className="mb-2 flex">
                    <CustomButton
                      size="sm"
                      variant="outlined"
                      onClick={() => {
                        set_open(true);
                      }}
                    >
                      Add Media
                    </CustomButton>
                    <button className="bg-gray-600 rounded-sm p-1 pr-3 pl-3 ml-2">
                      <BiSave color="white" className="text-xl" />
                    </button>
                  </div>
                  <LibraryModal
                    accept_file="Image"
                    file={formik?.values.meetingFile}
                    set_file={(file) => {
                      formik.setFieldValue("meetingFile", file);
                    }}
                    onSave={(val) => {
                      formik.setFieldValue("meetingFile", val);
                    }}
                    has_side_bar_action={false}
                    title="Add Media"
                    open={open}
                    set_open={set_open}
                  />
                  <div style={{ width: "100%", position: "relative" }}>
                    {/* <EditorComponent /> */}
                    <DraftEditor
                      editorState={
                        formik.values?.meetings[meetingIndex]
                          ?.meetingDescription
                      }
                      set_editor_value={(val) => {
                        formik.setFieldValue(
                          `meetings[${meetingIndex}].meetingDescription`,
                          val
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-row space-x-6">
              <p className="text-sm font-medium w-36">Meeting Url</p>
              <div className="border-l border-gray-300  flex-grow p-4 pt-0">
                <CustomTextInput
                  name={`meetings[${meetingIndex}].meetingURL`}
                  placeholder="Enter meeting URL ..."
                  onChange={formik?.handleChange}
                  value={formik.values?.meetings[meetingIndex]?.meetingURL}
                  error={formik.errors?.meetings?.[meetingIndex]?.meetingURL}
                />
              </div>
            </div>

            {/* Meeting Date and Time */}
            <div className="flex flex-row space-x-6">
              <p className="text-sm font-medium w-36">Date And Time</p>
              <div className="border-l  border-gray-300  flex-grow p-4 pt-0">
                <DatePicker
                  format="MM/DD/YYYY HH:mm:ss"
                  plugins={[<TimePicker hideSeconds position="bottom" />]}
                  calendarPosition="top-right"
                  inputClass="w-full block py-2 px-3 border border-gray-300"
                  containerClassName="w-full"
                  value={formik.values?.meetings[meetingIndex]?.meetingDateTime}
                  onChange={(date) =>
                    formik.setFieldValue(
                      `meetings[${meetingIndex}].meetingDateTime`,
                      date.format()
                    )
                  }
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-end gap-4 mt-2 border-t border-gray-300 pt-2">
        <CustomButton
          onClick={() => setShowMeetingModal(false)}
          size="sm"
          variant="destructive"
        >
          Cancell
        </CustomButton>
        <CustomButton onClick={handleSave} size="sm">
          Add Row
        </CustomButton>
      </div>
    </ModalLayout>
  );
};

export default MeetingContentModal;
