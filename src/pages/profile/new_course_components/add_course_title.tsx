import { TextField } from "@mui/material";
import React from "react";

const AddCourseTitle = ({
  value,
  set_value,
}: {
  value?: string;
  set_value?: (val: any) => void;
}) => {
  return (
    <TextField
      size="small" 
      fullWidth
      type="text"
      value={value}
      onChange={(e) => {
        set_value?.(e.target.value);
      }}
      style={{
        width: "100%",
        // height: 45,
        // marginTop: 16,
        borderRadius: 4,
        // padding: "0px 16px",

        // marginBottom: 4,
      }}
      placeholder="Add title"
    />
  );
};

export default AddCourseTitle;
