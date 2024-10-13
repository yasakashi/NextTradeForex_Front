import { useState } from "react";
import NewCourceCard from "./new_cource_card";
// import RichTextExample from "./editor/editor_component";
import { motion } from "framer-motion";
import BootstrapTabs from "../../../common/bootstrap_tabs";

const CourseCategoriesComponent = () => {
  const [checked, setChecked] = useState(false);
  const [categoriesType, setCategoriesType] = useState("All Categories");

  return (
    <NewCourceCard title={"Course Categories"}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <BootstrapTabs
          current_tab={categoriesType}
          onClick={(item) => setCategoriesType(item)}
          items={[{ title: "All Categories" }, { title: "Most Used" }]}
        />
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
              marginRight: 16,
            }}
          >
            <input
              type="checkbox"
              value={`${checked}`}
              id={`${checked}`}
              name={`${checked}`}
              checked={checked}
              className="w-4 h-4 rounded-sm bg-white text-blue-500"
              onChange={() => setChecked((prev) => !prev)}
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
