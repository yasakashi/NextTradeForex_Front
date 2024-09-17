import React from "react";
import NewCourceCard from "./new_cource_card";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import CustomTextField from "../../../common/custom_text_field";

const TagsComponent = () => {
  return (
    <NewCourceCard title={"Tags"}>
      <div
        className="flex justify-start"
        style={{ padding: 16, flexDirection: "column" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: 200, marginRight: 8 }}>
            <CustomTextField type={"text"} />
          </div>
          <BorderedButtonPrimary title={"Add"} />
        </div>
        <p style={{ fontSize: 12, marginTop: 16, marginBottom: 32 }}>
          Separate Tags with commas
        </p>
        <a
          style={{
            fontSize: 12,
            textDecoration: "underline",
            cursor: "pointer",
          }}
          className="text-blue-600"
        >
          Choose from the most used Tags
        </a>
      </div>
    </NewCourceCard>
  );
};

export default TagsComponent;
