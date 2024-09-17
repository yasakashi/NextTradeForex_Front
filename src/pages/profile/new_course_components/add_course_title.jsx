import React from "react";

const AddCourseTitle = () => {
  return (
    <input
      type="text"
      className="form-control"
      style={{
        width: "100%",
        height: 45,
        marginTop: 16,
        borderRadius: 4,
        padding: "0px 16px", 
      marginBottom:4
      }}
      placeholder="Add title"
    />
  );
};

export default AddCourseTitle;
