import React, { memo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
// import { courses_items } from "../new_course";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const courses_items = [];

const CourseItemSelector = ({
  course_items,
  set_course_items,
  is_layout_column,
  set_is_layout_column,
  check_additional_setting,
  set_additional_setting,
}) => {
  const [is_open, set_is_open] = useState(false);
  return (
    <div
      style={{
        // position: "absolute",
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "flex-end",
      }}
    >
      <button
        className="top-0 right-0 w-fit flex justify-between items-center border-2 border-gray-500 rounded-b-[4px] py-[6px] px-3 border-t-0 text-sm bg-white outline-none"
        onClick={() => set_is_open((pre) => !pre)}
      >
        Screen Options
        {is_open ? (
          <IoMdArrowDropup size={24} className="text-gray-500" />
        ) : (
          <IoMdArrowDropdown size={24} className="text-gray-500" />
        )}
      </button>

      <AnimatePresence mode="wait" initial={false}>
        {is_open && (
          <motion.div
            initial={{ height: 0 }}
            exit={{ height: 0 }}
            animate={{ height: "fit-content" }}
            transition={{
              ease: "linear",
              duration: 0.3,
              // bounce: 10,
            }}
            style={{
              // position: "absolute",
              width: "100%",
              display: "flex",
              padding: "0px 24px",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "white",
              boxShadow: "0px 0px 8px rgba(0,0,0,0.5)",
              overflow: "hidden",
              borderRadius: 4,
            }}
            key={`${is_open}`}
          >
            <h4
              style={{
                marginBottom: 24,
                marginTop: 8,
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Screen Elements
            </h4>
            <h3 style={{ fontSize: 13, marginBottom: 8 }}>
              Some screen elements can be shown or hidden by using the
              checkboxes. They can be expanded and collapsed by clickling on
              their headings, and arranged by dragging their headings or by
              clicking on the up and down arrows.
            </h3>

            {courses_items?.map((item, i) => {
              const val = course_items?.find(
                (a) => a?.title === item?.title
              )?.title;
              return (
                <motion.div
                  style={{
                    color: "white",
                    alignSelf: "flex-start",
                    // width: 180,
                    marginTop: 8,
                    marginRight: 16,
                    marginBottom: i === courses_items.length - 1 ? 16 : 0,
                  }}
                  key={i}
                >
                  <input
                    type="checkbox"
                    value={val || false}
                    id={item.title}
                    name={item.title}
                    checked={val || false}
                    // inline
                    // className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-600 dark:bg-blue-700 dark:border-blue-600 dark:focus:ring-blue-600 dark:ring-offset-blue-800"
                    // label={item.title}
                    //   style={{color:"black"}}
                    onChange={() => {
                      set_course_items((pre) => {
                        if (course_items.some((s) => item.title === s.title))
                          return pre.filter((f) => f.title !== item.title);
                        return [...pre, item];
                      });
                    }}
                  />

                  <label
                    className=""
                    style={{ color: "black", marginLeft: 6, fontSize: 13 }}
                    htmlFor={item.title}
                  >
                    {item.title}
                  </label>
                </motion.div>
              );
            })}
            <h2
              style={{
                marginBottom: 24,
                marginTop: 8,
                fontSize: 15,
                fontWeight: "600",
                width: "100%",
              }}
            >
              Layout
            </h2>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                checked={is_layout_column === true}
                className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-600 dark:bg-blue-700 dark:border-blue-600 dark:focus:ring-blue-600 dark:ring-offset-blue-800"
                type="radio"
                id="column_1"
                value={true}
                name="column_1"
                onChange={(e) => {
                  set_is_layout_column((pre) => (pre ? false : true));
                }}
              />
              <label
                htmlFor="column_1"
                style={{ marginRight: 24, marginLeft: 4, fontSize: 13 }}
              >
                1 column
              </label>
              <input
                type="radio"
                id="column_2"
                className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-600 dark:bg-blue-700 dark:border-blue-600 dark:focus:ring-blue-600 dark:ring-offset-blue-800"
                checked={is_layout_column === false}
                value={false}
                name="column_2"
                onChange={(e) => {
                  set_is_layout_column((pre) => (pre ? false : true));
                }}
              />
              <label htmlFor="column_2" style={{ marginLeft: 4, fontSize: 13 }}>
                2 columns
              </label>
            </div>
            <h2
              style={{
                marginBottom: 16,
                marginTop: 16,
                fontSize: 15,
                fontWeight: "600",
                width: "100%",
              }}
            >
              Additional settings
            </h2>
            <div
              style={{
                marginBottom: 16,
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="checkbox"
                value={`${check_additional_setting}`}
                className="w-4 h-4 border border-blue-300 rounded bg-blue-50 focus:ring-3 focus:ring-blue-600 dark:bg-blue-700 dark:border-blue-600 dark:focus:ring-blue-600 dark:ring-offset-blue-800"
                id={"additional_settings"}
                name={"additional_settings"}
                checked={check_additional_setting === true}
                onChange={() => {
                  set_additional_setting((pre) => !check_additional_setting);
                  // set_course_items((pre) => {
                  //   if (course_items.some((s) => item.title === s.title))
                  //     return pre.filter((f) => f.title !== item.title);
                  //   return [...pre, item];
                  // });
                }}
              />

              <label
                style={{ color: "black", marginLeft: 6, fontSize: 13 }}
                htmlFor={"additional_settings"}
              >
                Enable full-height editor and distraction-free functionality.
              </label>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default memo(CourseItemSelector);
