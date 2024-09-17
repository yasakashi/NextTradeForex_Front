import React from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const MultiSelect = ({
  formikTargetValues,
  handleRemoveItems,
  options,
  setDropDownOpen,
  dropDownOPen,
  handleChange,
  label,
  name,
}) => {
  return (
    <div className="relative">
      <span className="text-gray-400 text-sm">{label}</span>
      <div
        className="bg-[#d1b06e] flex-wrap mt-1 relative text-blue-ligth text-sm flex items-center gap-2 rounded-lg  w-full p-2 cursor-pointer"
        onClick={() => setDropDownOpen((prev) => !prev)}
      >
        {formikTargetValues?.length ? (
          formikTargetValues.map((skill) => (
            <div
              key={skill}
              className="flex flex-wrap items-center bg-blue-light text-white text-sm rounded-lg cursor-pointer px-2 py-1"
            >
              {skill}
              <button
                onClick={() => handleRemoveItems(skill)}
                className="ml-2 text-white"
              >
                <FaTimes />
              </button>
            </div>
          ))
        ) : (
          <div className="text-blue-light text-base capitalize">{label}</div>
        )}

        <IoIosArrowDown
          className="text-white bg-blue-dark rounded-full absolute right-2 top-1/2 -translate-y-1/2 z-40"
          size={20}
        />
      </div>
      <div
        className={`absolute z-50 text-gray-500 divide-y divide-gray-100 rounded-lg shadow w-full bg-white mt-1 ${
          dropDownOPen ? "" : "hidden"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700 font-semibold">
          {options.map((item, index) => (
            <li key={index}>
              <label className="inline-flex items-center w-full px-4 py-2">
                <input
                  type="checkbox"
                  name={name}
                  value={item}
                  onChange={handleChange}
                  checked={formikTargetValues?.includes(item)}
                  className="form-checkbox"
                />
                <span className="ml-2">{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelect;
