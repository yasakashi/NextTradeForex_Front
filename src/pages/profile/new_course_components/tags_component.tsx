import React from "react";
import NewCourceCard from "./new_cource_card";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import CustomTextField from "../../../common/custom_text_field";
import { AnimatePresence, motion } from "framer-motion";
import { CgClose } from "react-icons/cg";

const TagsComponent = ({
  set_course_tags,
  course_tags,
}: {
  course_tags?: string;
  set_course_tags?: (val: string) => void;
}) => {
  const [tags, set_tags] = React.useState<string[]>([]);
  const [text, set_text] = React.useState("");
  React.useEffect(() => {
    let new_tags = course_tags?.split(",").filter((item) => item !== "");

    if (new_tags?.length !== 0 && new_tags) {
      set_tags((pre) => [...pre, ...new_tags]);
    }
  }, []);
  React.useEffect(() => {
    set_course_tags?.(tags.join(","));
  }, [tags]);
  return (
    <NewCourceCard title={"Tags"}>
      <div
        className="flex justify-start"
        style={{ padding: 16, flexDirection: "column" }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ width: 200, marginRight: 8 }}>
            <CustomTextField
              type={"text"}
              value={text}
              onChange={(val?: string) => {
                set_text(val || "");
              }}
            />
          </div>
          <BorderedButtonPrimary
            title={"Add"}
            onClick={() => {
              if (text === "") return;
              set_tags((pre) => [...pre, text]);
              set_text("");
            }}
          />
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
        <div className="flex flex-wrap mt-3">
          <AnimatePresence initial={false} mode="popLayout">
            {tags.map((tag, i) => {
              return (
                <motion.div
                  initial={{ scale: 0 }}
                  exit={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={i}
                  style={{
                    marginRight: 8,
                    border: "1px solid black",
                    width: "fit-content",
                    padding: "2px 8px",
                    borderRadius: 4,
                    position: "relative",
                  }}
                >
                  <span
                    className="absolute -top-2 -right-2 cursor-pointer"
                    onClick={() => {
                      set_tags((pre) =>
                        pre.filter((item, index) => index !== i)
                      );
                    }}
                  >
                    <CgClose />
                  </span>
                  <p>{tag}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </NewCourceCard>
  );
};

export default TagsComponent;
