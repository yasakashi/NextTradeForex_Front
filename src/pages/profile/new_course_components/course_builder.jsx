import React from "react";
import NewCourceCard, { CustomDivider } from "./new_cource_card";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
import ModalLayout from "../../../common/modal_layout";
import { Plus, PlusCircleIcon } from "@heroicons/react/24/outline";
import { CgClose } from "react-icons/cg";
import CustomTextField from "../../../common/custom_text_field";
import { CiWarning } from "react-icons/ci";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";

const CourseBuilder = () => {
  const [is_open, set_is_open] = React.useState(false);
  return (
    <NewCourceCard title={"Course Builder"}>
      <div className="p-4">
        <ContainedButtonPrimary
          // icon={<PlusCircleIcon className="size-6 text-blue-500"/>}
          title={"Add new topic"}
          onClick={(e) => set_is_open((pre) => !pre)}
        />
        <ModalLayout onClose={set_is_open} open={is_open}>
          <div
            style={{
              display: "flex",
              minWidth: "50vw",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <h4 style={{ fontWeight: 600 }}>Add Topic</h4>
              <button onClick={() => set_is_open(false)}>
                <CgClose style={{}} />
              </button>
            </div>
            <CustomDivider />
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 14, fontWeight: 600 }} className="pb-2">
                Topic Name
              </p>
              <CustomTextField />
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
                  Topic titles are displayed publicly wherever required. Each
                  topic may contain one or more lessons, quiz and assignments.
                </p>
              </div>
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  margin: "16px 0px",
                  marginTop: 42,
                }}
              >
                Topic Summery
              </h3>
              <textarea
                className="resize rounded-md focus:border-blue-500"
                style={{ width: "100%", border: "1px solid black" }}
              ></textarea>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              marginBottom: 16,
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
              Topic titles are displayed publicly wherever required. Each topic
              may contain one or more lessons, quiz and assignments.
            </p>
          </div>
          <CustomDivider />
          <div className="flex justify-between items-center p-4">
            <BorderedButtonPrimary
              title={"Cancel"}
              onClick={(e) => {
                set_is_open(false);
              }}
            />
            <ContainedButtonPrimary
              title={"Add Topic"}
              // onClick={() => set_is_open(false)}
            />
          </div>
        </ModalLayout>
      </div>
    </NewCourceCard>
  );
};

export default CourseBuilder;
