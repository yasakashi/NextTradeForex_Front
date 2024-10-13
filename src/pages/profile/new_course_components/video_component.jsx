import React, { useState } from "react";
import { CustomSelectBox } from "./custom_select_box";
import { AnimatePresence, motion } from "framer-motion";
import CustomTextField from "../../../common/custom_text_field";
import DropZone from "./dropzone";
import { CiWarning } from "react-icons/ci";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
// import { add_course_video_api } from "../../../admin_panel/pages/tutor/courses/course_atachments/service/course_videos_api";
// import { useParams } from "react-router-dom";

const VideoComponent = () => {
  const [is_youtube, set_is_youtube] = useState(undefined);

  return (
    <div className="w-full transition-all bg-white p-4 border border-gray-600 rounded-sm">
      <motion.div className="flex flex-col" style={{}}>
        <p className="text-sm font-bold text-gray-700 mb-4">
          Course Intro Video
        </p>
        <div style={{ width: "100%", marginBottom: 16 }}>
          <CustomSelectBox
            onChange={(val) => {
              set_is_youtube(val);
            }}
            options={[
              { title: "Youtube", value: "youtube" },
              { title: "Select Video Sourse", value: "select file" },
            ]}
          />
        </div>

        <AnimatePresence initial={false} mode="wait">
          {is_youtube === "youtube" && (
            <motion.div
              className="border-dashed border-blue-500 border-2 w-full"
              style={{
                borderRadius: 6,

                // margin: "auto",
                padding: "0px 24px",
                overflow: "hidden",
              }}
              initial={{ height: 0 }}
              animate={{ height: "fit-content" }}
              exit={{ height: 0 }}
              key={`${is_youtube}+`}
            >
              <CustomTextField
                type="url"
                onChange={(val) => {}}
                placeHolder="Paste YouTube Video URL"
                style={{ padding: "16px 8px" }}
              />
            </motion.div>
          )}
          {is_youtube === "select file" && (
            <motion.div
              initial={{ height: 0, scale: 0 }}
              animate={{ height: "fit-content", scale: 1 }}
              exit={{ height: 0, scale: 0 }}
              className="w-full"
              key={`${is_youtube}-`}
            >
              <DropZone
                accept_file="Video"
                // file={formik.values.file}
                // set_file={(file) => formik.setFieldValue("file", file)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <p
          style={{
            fontWeight: 600,
            fontSize: 14,
            marginBottom: 8,
            marginTop: 16,
          }}
        >
          Type
        </p>
        <CustomSelectBox
          onChange={(val) => {}}
          options={[
            { title: "None", value: "None" },
            { title: "Intro", value: "intro" },
            { title: "Lessons", value: "lessons" },
          ]}
        />
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            className=""
            style={{
              borderRadius: 6,
              overflow: "hidden",
            }}
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0 }}
          >
            <p style={{ fontSize: 14, fontWeight: 600 }} className="pb-2 mt-10">
              Video Lessons
            </p>
            {/* <SearchAutoCompelate
                        selected_item={formik.values.pre_lessons}
                        items={items}
                        handler={(val) =>
                          formik.setFieldValue("pre_lessons", val)
                        }
                      /> */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: 16,
              }}
            >
              <CiWarning style={{ color: "black" }} />
              <p
                style={{
                  fontSize: 12,
                  opacity: 0.7,
                  marginLeft: 4,
                }}
              >
                Lessons that will be added in the initial state of the Video
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <ContainedButtonPrimary
        // onClick={() => formik.submitForm()}
        title="Save"
        style={{ alignSelf: "flex-end", marginTop: 16 }}
      />
    </div>
  );
};

export default VideoComponent;
