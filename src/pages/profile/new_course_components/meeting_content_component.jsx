import React, { useState } from "react";
import NewCourceCard from "./new_cource_card";

import { CustomButton } from "../../../components/ui/CustomButton";
import MeetingContentModal from "./meeting-content-modal";
import MeetingItem from "./meeting-item";

const MeetingContentComponent = ({ formik }) => {
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedMeetingIndex, setSelectedMeetingIndex] = useState(null);

  const [meetings, set_meeting] = useState([]);

  const addMeeting = () => {
    const newMeeting = {
      meetingTitle: "",
      meetingDescription: "",
      meetingFile: null,
      meetingURL: "",
      meetingDateTime: "",
    };

    formik.setFieldValue("meetings", [...formik.values?.meetings, newMeeting]);
  };

  const removeMeeting = (index) => {
    const updateMeetings = formik.values?.meetings?.filter(
      (_, i) => i !== index
    );

    formik.setFieldValue("meetings", updateMeetings);
  };

  const editMeeting = (index) => {
    setSelectedMeetingIndex(index);

    setShowMeetingModal(true);
  };

  return (
    <>
      <NewCourceCard title="Meeting Content">
        <div className="flex flex-col p-4" style={{ transition: "0.2s" }}>
          <p className="text-sm font-medium mb-2">Meeting Content</p>
          {console.log(formik.values?.meetings)}
          {/* meetings list */}
          <div className="mt-4">
            {/* Meeting Item  */}
            <MeetingItem />
          </div>

          <div style={{ alignSelf: "flex-end", marginTop: 16 }}>
            <CustomButton
              size="sm"
              type="button"
              onClick={() => {
                setShowMeetingModal(true);
                addMeeting();
              }}
            >
              Add Meeting
            </CustomButton>
          </div>
        </div>
      </NewCourceCard>

      <MeetingContentModal
        setShowMeetingModal={setShowMeetingModal}
        showMeetingModal={showMeetingModal}
        meetingIndex={selectedMeetingIndex}
        formik={formik}
      />
    </>
  );
};

export default MeetingContentComponent;
