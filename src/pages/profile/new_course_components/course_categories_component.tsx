import React from "react";
import NewCourceCard from "./new_cource_card";
// import RichTextExample from "./editor/editor_component";
import { motion } from "framer-motion";
import BootstrapTabs from "../../../common/bootstrap_tabs";
const CourseCategoriesComponent = () => {
  const [checked, set_checked] = React.useState(false);
  const [categories_type, set_categories_type] = React.useState<
    "All Categories" | "Most Used"
  >(`All Categories`);
  return (
    <NewCourceCard title={"Course Categories"}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          // height: 400,
        }}
      >
        <BootstrapTabs
          current_tab={categories_type}
          onClick={(item) => {
            set_categories_type(item);
          }}
          items={[{ title: "All Categories" }, { title: "Most Used" }]}
        />
        {/* <div style={{ display: "flex", position: "absolute" }}>
          <motion.button
            onClick={() => {
              set_categories_type("all");
            }}
            style={{
              padding: 8,
              fontSize: 13,
              borderBottom: "1px solid transparent",
            }}
            animate={{
              boxShadow:
                categories_type === "all"
                  ? `0px 1px 0px #fff, 0px 0px 1px #000`
                  : "none",
              borderBottomColor:
                categories_type === "all" ? "white" : "transparent",
              color: categories_type === "all" ? "#21759b" : "black",
            }}
          >
            All Categories
          </motion.button>
          <motion.button
            style={{
              padding: 8,
              fontSize: 13,
              borderBottom: "1px solid transparent",
            }}
            animate={{
              boxShadow:
                categories_type !== "all"
                  ? `0px 1px 0px #fff, 0px 0px 1px #000`
                  : "none",
              color: categories_type !== "all" ? "#21759b" : "black",

              borderBottomColor:
                categories_type !== "all" ? "white" : "transparent",
            }}
            onClick={() => {
              set_categories_type("custom");
            }}
          >
            Most Used
          </motion.button>
        </div> */}
        <div
          style={{
            width: "100%",
            border: "1px solid #c7c7c7",
            borderRadius: 0,
            display: "flex",
            alignItems: "center",
            padding: "24px 16px",
          }}
        >
          <div
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              // width: 180,
              marginRight: 16,
            }}
          >
            <input
              type="checkbox"
              value={`${checked}`}
              id={`${checked}`}
              name={`${checked}`}
              checked={checked}
              // inline
              // className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              className="w-4 h-4  rounded-sm bg-white text-blue-500"
              // label={item.title}
              //   style={{color:"black"}}
              onChange={() => {
                set_checked((pre) => !pre);
              }}
            />

            <label
              style={{ color: "black", marginLeft: 6, fontSize: 13 }}
              htmlFor={`${checked}`}
            >
              Top Courses
            </label>
          </div>
        </div>
        {/* <RichTextExample /> */}
      </div>
    </NewCourceCard>
  );
};

export default CourseCategoriesComponent;
