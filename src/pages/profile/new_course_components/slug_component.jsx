import React from "react";
import NewCourceCard from "./new_cource_card";
import CustomTextField from "../../../common/custom_text_field";

const SlugComponent = () => {
  return (
    <NewCourceCard title={"Slug"}>
      <div style={{ width: 250, padding:16 }}>
        <CustomTextField />
      </div>
    </NewCourceCard>
  );
};

export default SlugComponent;
