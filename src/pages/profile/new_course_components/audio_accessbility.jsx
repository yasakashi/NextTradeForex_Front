import React from "react";
import NewCourceCard, { CustomDivider } from "./new_cource_card";

const AudioAccessbility = () => {
  return (
    <NewCourceCard title={"Play.ht - Audio Accessbility"}>
      <div style={{ width: "100%", padding: 16 }}>
        <p style={{ fontSize: 13, color: "#999", marginBottom: 12 }}>
          Please add content to the post and save it as a draft or publish and
          refresh this pagebefore adding an audio.
        </p>

        <CustomDivider />
        <p style={{ marginTop: 12, fontSize: 13, fontWeight: 500 }}>
          Facing issues? Please send us an email at{" "}
          <i className="text-blue-800">support@play.ht</i> explaining the
          problem with screenshots if possible.
        </p>
      </div>
    </NewCourceCard>
  );
};

export default AudioAccessbility;
