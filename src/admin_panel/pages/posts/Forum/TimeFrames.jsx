import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const timeFrameItems = [
  { id: 1, name: "1 minute", value: "1_minute" },
  { id: 2, name: "10 minutes", value: "10_minutes" },
  { id: 3, name: "15 minutes", value: "15_minutes" },
  { id: 4, name: "30 minutes", value: "30_minutes" },
  { id: 5, name: "1 hour", value: "1_hour" },
  { id: 6, name: "4 hours", value: "4_hours" },
  { id: 7, name: "8 hours", value: "8_hours" },
  { id: 8, name: "12 hours", value: "12_hours" },
  { id: 9, name: "1 day", value: "1_day" },

];

const TimeFrames = ({ formik }) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleRemoveItems = (frame) => {
    const old = [...formik.values?.timeFrames];

    const newValues = old.filter((item) => item !== frame);

    formik.setFieldValue("timeFrames", newValues);
  };
  return (
    <div className="relative">
      <h5 className="font-medium text-[13px] text-gray-700">
        Timeframe
        <span className="text-red-600">*</span>
      </h5>
      <div
        className="bg-transparent border border-gray-300 rounded-md flex-wrap mt-1 relative text-blue-ligth text-sm flex items-center gap-2  w-full p-2 cursor-pointer"
        onClick={() => setDropDownOpen((prev) => !prev)}
      >
        {formik?.values?.timeFrames?.length > 0
          ? formik.values?.timeFrames.map((frame, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center border border-[#cccccc] text-gray700 text-[12px] rounded-md cursor-pointer px-2 py-[2px] bg-gray-100"
              >
                {timeFrameItems.find((item) => item.value === frame)?.name}
                <button
                  type="button"
                  onClick={() => handleRemoveItems(frame)}
                  className="ml-2 text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            ))
          : // <div className="text-blue-light text-base capitalize">{label}</div>
            "select items"}

        <IoIosArrowDown
          className="text-gray-400 rounded-full absolute right-2 top-1/2 -translate-y-1/2 z-40"
          size={20}
        />
      </div>

      <div
        className={`relative z-[1000] text-gray-500 divide-y divide-gray-100 rounded-lg shadow w-full bg-white mt-1 ${
          dropDownOpen ? "block" : "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700 font-semibold">
          {timeFrameItems.map((item, index) => (
            <li key={index}>
              <label className="inline-flex items-center w-full px-4 py-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="timeFrames"
                  value={item.value}
                  onChange={(e) =>
                    formik.setFieldValue("timeFrames", [
                      ...formik.values.timeFrames,
                      e.target.value,
                    ])
                  }
                  checked={formik.values?.timeFrames?.includes(
                    `${item?.value}`
                  )}
                  className="cursor-pointer"
                />
                <span className="ml-2">{item?.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TimeFrames;
