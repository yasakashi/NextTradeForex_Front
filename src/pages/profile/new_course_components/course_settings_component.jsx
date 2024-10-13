import React from "react";
import NewCourceCard from "./new_cource_card";
import CustomTextField from "../../../common/custom_text_field";
import { ImWarning } from "react-icons/im";
import { IoSettingsSharp } from "react-icons/io5";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import CustomSelectBox from "./custom_select_box";
const CourseSettings = () => {
  return (
    <NewCourceCard title="Course Settings">
      <div className="flex" style={{ width: "100%" }}>
        {/* // general section */}
        <div className="flex flex-col w-72">
          <div
            className="flex items-center"
            style={{ padding: "12px 24px", borderLeft: "4px solid #21759b" }}
          >
            <IoSettingsSharp />
            <h2 style={{ marginLeft: 8, fontSize: 16, fontWeight: 600 }}>
              General
            </h2>
          </div>
          <div
            style={{ flex: 1, width: "100%", backgroundColor: "#fbf7fc" }}
          ></div>
        </div>
        <div
          style={{ width: "calc(100% - 288px)", padding: 16, paddingTop: 40 }}
        >
          {listing.map((item, i) => (
            <div
              key={i}
              className="descr"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 24,
                justifyContent: "space-between",
              }}
            >
              <p style={{ width: 200, fontSize: 14, fontWeight: 600 }}>
                {item.title}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "calc(100% - 180px)",
                }}
              >
                {item?.has_check_box ? (
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value=""
                      className="sr-only peer"
                      onChange={(e) => e.stopPropagation()}
                    />
                    <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                ) : i === 1 ? (
                  <select className="outline-blue-400 text-base py-1 pl-2 text-gray-600 rounded-sm shadow-sm border border-gray-300">
                    <option>All levels</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                ) : (
                  <input
                    type="number"
                    className="border w-full border-gray-300 rounded-md px-3 py-2 lg:py-[6px] outline-blue-400 outline-[1px] text-gray-700 placeholder:text-gray-400 placeholder:text-sm"
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 24,
                  }}
                >
                  <PiWarningCircle style={{ color: "#555", fontSize: 24 }} />
                  <p
                    style={{
                      fontSize: 13,
                      color: "#444",
                      lineHeight: 1.5,
                      marginLeft: 8,
                    }}
                  >
                    {item.descr}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NewCourceCard>
  );
};

export default CourseSettings;
const listing = [
  {
    title: "Maximum Students",
    descr:
      "Number of students that can enrol in this course. Set 0 for no limits.",
  },
  { title: "Difficulty Level", descr: "Course difficulty level" },
  {
    title: "Public Course",
    descr: "Make This Course Public. No enrollment required.",
    has_check_box: true,
  },
  {
    title: "Q&A",
    descr: "Enable Q&A section for your course",

    has_check_box: true,
  },
];
