import React from "react";
import NewCourceCard from "./new_cource_card";

const CourseSettings = () => {
  return (
    <NewCourceCard title="Course Settings">
      <div className="flex" style={{ width: "100%" }}>
        {/* // general section */}
        <div className="flex w-72"></div>
        <div style={{ width: "calc(100% - 288px)" }}>
          {listing.map((item, i) => (
            <div
              key={i}
              className="descr"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <h2>{item.title}</h2>
              <div style={{ display: "flex", flexDirection: "column" }}></div>
            </div>
          ))}
        </div>
      </div>
    </NewCourceCard>
  );
};

export default CourseSettings;
const listing = [
  { title: "Maximum Students" },
  { title: "Difficulty Level" },
  { title: "Public Course" },
  { title: "Q&A" },
];
