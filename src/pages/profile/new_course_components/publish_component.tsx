import React from "react";
import NewCourceCard, { CustomDivider } from "./new_cource_card";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { bold_font, light_font } from "../../../constants/style/fonts";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
const PublishComponent = ({
  save_draft,
  publish,
}: // issitecourse,
// set_issitecourse,
{
  save_draft: () => void;
  publish: () => {};
  // issitecourse: boolean;
  // set_issitecourse: (val: boolean) => void;
}) => {
  return (
    <NewCourceCard title={"Publish"}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          <BorderedButtonPrimary title={"Save Draft"} onClick={publish}/>
          <BorderedButtonPrimary title={"Priview"} disabled />
        </div>
        <div
          style={{
            display: "flex",
            margin: "8px 0px",
            alignItems: "center",
            padding: "0px 16px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M1.75 2a.75.75 0 0 0 0 1.5H2v9h-.25a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 .75.75v1.5c0 .414.336.75.75.75h.5a.75.75 0 0 0 .75-.75V3.5h.25a.75.75 0 0 0 0-1.5h-7.5ZM3.5 5.5A.5.5 0 0 1 4 5h.5a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5v-.5Zm.5 2a.5.5 0 0 0-.5.5v.5A.5.5 0 0 0 4 9h.5a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5H4Zm2-2a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-.5.5h-.5A.5.5 0 0 1 6 6v-.5Zm.5 2A.5.5 0 0 0 6 8v.5a.5.5 0 0 0 .5.5H7a.5.5 0 0 0 .5-.5V8a.5.5 0 0 0-.5-.5h-.5ZM11.5 6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.75a.75.75 0 0 0 0-1.5H14v-5h.25a.75.75 0 0 0 0-1.5H11.5Zm.5 1.5h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H12a.5.5 0 0 1-.5-.5V8a.5.5 0 0 1 .5-.5Zm0 2.5a.5.5 0 0 0-.5.5v.5a.5.5 0 0 0 .5.5h.5a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5H12Z"
              clipRule="evenodd"
            />
          </svg>

          <p style={{ ...light_font, margin: "0px 8px" }}>Status:</p>
          <p style={bold_font}>{"Draft"}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0px 16px",
            marginBottom: 8,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <p style={{ ...light_font, margin: "0px 8px" }}>Visibility:</p>
          <p style={{ ...bold_font }}>{"Public"}</p>
        </div>
        <CustomDivider />
        <div
          style={{
            padding: 16,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <label className="inline-flex items-center cursor-pointer">
            <span style={{ marginRight: 16 }} className="font-semibold">
              Is Owned By site
            </span>
            <input
              type="checkbox"
              checked={issitecourse}
              className="sr-only peer"
              onChange={(e) => {
                set_issitecourse(!issitecourse);
                e.stopPropagation();
              }}
            />
            <div className="relative w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label> */}
          <ContainedButtonPrimary
            title={"Submit for Preview"}
            onClick={publish}
            disabled
          />
        </div>
      </div>
    </NewCourceCard>
  );
};

export default PublishComponent;
