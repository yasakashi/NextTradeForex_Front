import React, { useState } from "react";
import NewCourceCard from "./new_cource_card";
import { BiSave } from "react-icons/bi";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { motion } from "framer-motion";
import { FiMinusCircle } from "react-icons/fi";

import { CustomButton } from "../../../components/ui/CustomButton";
import MeetingContentModal from "./meeting-content-modal";
import MeetingItem from "./meeting-item";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import LibraryModal from "./library_modal";
import DraftEditor from "../../../admin_panel/components/editor/draft_editor";
import { EditorState } from "draft-js";

const MeetingContentComponent = ({ formik }) => {
  const [showMeetingComponent, setShowMeetingComponent] = useState(false);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState(0);

  const [tempMeetingData, setTempMeetingData] = useState({
    meetingTitle: "",
    meetingDescription: "",
    meetingURL: "",
    meetingDateTime: "",
    meetingFile: null,
  });

  const addOrUpdateMeeting = () => {
    if (tempMeetingData.meetingTitle.trim() === "") {
      // Prevent adding/editing empty meetings
      return;
    }

    let newMeetings = [...formik.values.meetings];

    if (selectedMeetingIndex !== null) {
      // Update existing meeting
      newMeetings[selectedMeetingIndex] = tempMeetingData;
    } else {
      // Add new meeting
      newMeetings = [...newMeetings, tempMeetingData];
    }

    formik.setFieldValue("meetings", newMeetings);
    setShowMeetingComponent(false);
    setTempMeetingData({
      meetingTitle: "",
      meetingDescription: "",
      meetingURL: "",
      meetingDateTime: "",
    });
    setSelectedMeetingIndex(null);
  };

  const handleEditMeeting = (index) => {
    // Populate temp data with the selected meeting for editing
    const selectedMeeting = formik.values.meetings[index];
    setTempMeetingData(selectedMeeting);
    setSelectedMeetingIndex(index);
    setShowMeetingComponent(true);
  };

  const handleTempDataChange = (name, value) => {
    setTempMeetingData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <NewCourceCard title="Meeting Content">
        <div className="flex flex-col p-4" style={{ transition: "0.2s" }}>
          <p className="text-sm font-medium mb-2">Meeting Content</p>

          {/* meetings list */}
          <div className="mt-4 space-y-2">
            {/* Meeting Item  */}
            {formik.values.meetings
              ?.filter((meeting) => meeting.meetingTitle?.trim()) // Only display meetings with a title
              .map((meeting, index) => (
                <MeetingItem
                  key={index}
                  meeting={meeting}
                  onEdit={() => handleEditMeeting(index)} // Pass index for editing
                  onRemove={() => {
                    const updatedMeetings = formik.values.meetings.filter(
                      (_, i) => i !== index
                    );
                    formik.setFieldValue("meetings", updatedMeetings);
                  }}
                />
              ))}
          </div>
          <div className="mt-8">
            {showMeetingComponent && (
              <MeetingComponent
                tempMeetingData={tempMeetingData}
                handleTempDataChange={handleTempDataChange}
                setShowMeetingComponent={setShowMeetingComponent}
              />
            )}
          </div>

          <div style={{ alignSelf: "flex-end", marginTop: 16 }}>
            {showMeetingComponent ? (
              <CustomButton
                size="sm"
                type="button"
                onClick={addOrUpdateMeeting}
              >
                {selectedMeetingIndex !== null ? "Save Changes" : "Add Meeting"}
              </CustomButton>
            ) : (
              <CustomButton
                size="sm"
                type="button"
                onClick={() => {
                  setShowMeetingComponent(true);
                  setSelectedMeetingIndex(null); // Reset selected index when adding a new meeting
                }}
              >
                Add Row
              </CustomButton>
            )}
          </div>
        </div>
      </NewCourceCard>
    </>
  );
};

export default MeetingContentComponent;

const MeetingComponent = ({
  tempMeetingData,
  handleTempDataChange,
  setShowMeetingComponent,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [open, set_open] = useState(false);

  const handleEditorChange = (editorData) => {
    handleTempDataChange("meetingDescription", editorData.plainText);

    // Update the editor state
    setEditorState(editorData.state);
  };

  const handleSave = () => {
    setShowMeetingModal(false);
  };
  return (
    <motion.div
      className="flex border border-gray-400 relative"
      layout
      style={{ transformOrigin: "top" }}
    >
      <div className="bg-gray-100 border-r-2 w-[24px] mr-4 border-gray-300"></div>

      <button
        type="button"
        className="absolute top-1/2 -right-3 z-[1000]"
        onClick={() => {
          setShowMeetingComponent(false);
        }}
      >
        <FiMinusCircle size={22} className="bg-white text-gray-700 z-[1000]" />
      </button>

      <div className="flex flex-col" style={{ width: "calc(100% - 40px)" }}>
        <div className="flex flex-row space-x-6">
          <p className="text-sm font-medium w-36 mt-3">Meeting Title</p>
          <div className="border-l border-gray-300  flex-grow p-4 pt-3">
            <CustomTextInput
              name="meetingTitle"
              placeholder="Meeting Title"
              value={tempMeetingData.meetingTitle}
              onChange={(e) =>
                handleTempDataChange("meetingTitle", e.target.value)
              }
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
                  type="button"
                  onClick={() => {
                    setShowMeetingComponent(true);
                  }}
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
                accept_file="Image"
                // file={formik?.values.meetingFile}
                set_file={(file) => {
                  handleTempDataChange("meetingFile", file);
                }}
                onSave={(val) => {
                  handleTempDataChange("meetingFile", val);
                }}
                has_side_bar_action={false}
                title="Add Media"
                open={open}
                set_open={set_open}
              />
              <div style={{ width: "100%", position: "relative" }}>
                {/* <EditorComponent /> */}
                <DraftEditor
                  value={editorState} // Pass the editor state
                  onChange={handleEditorChange}
                  placeholder="Meeting description ..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-6">
          <p className="text-sm font-medium w-36">Meeting Url</p>
          <div className="border-l border-gray-300  flex-grow p-4 pt-0">
            <CustomTextInput
              name="meetingURL"
              placeholder="Meeting URL"
              value={tempMeetingData.meetingURL}
              onChange={(e) =>
                handleTempDataChange("meetingURL", e.target.value)
              }
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
              value={tempMeetingData.meetingDateTime}
              onChange={(date) =>
                handleTempDataChange("meetingDateTime", date.format())
              }
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
