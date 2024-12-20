import React, { useState } from "react";
import NewCourceCard from "./new_cource_card";


import { IoCloseSharp } from "react-icons/io5";
import { CustomButton } from "../../../components/ui/CustomButton";

const TagsComponent = ({ formik, name }) => {
  const [inputValue, setInputValue] = useState("");
  const [tagError, setTagError] = useState("");

  const addTagHandler = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") {
      setTagError("Tag cannot be empty!");
      return;
    }

    if (formik?.values?.tags?.includes(trimmedValue)) {
      setTagError("Already exist!");
      return;
    }

    const updatedTags = [...formik.values?.tags, inputValue];

    if (
      inputValue.trim() &&
      !formik?.values?.tags.includes(inputValue.trim())
    ) {
      formik.setFieldValue("tags", updatedTags);

      setInputValue("");
    }
  };

  const removeTagHandler = (tag) => {
    const currentTags = [...formik?.values?.tags];

    const newTags = currentTags.filter((oldTag) => oldTag !== tag);

    formik.setFieldValue("tags", newTags);

    console.log("Updated Tags: ", newTags);
  };

  return (
    <NewCourceCard title={"Tags"}>
      <div
        className="flex justify-start"
        style={{ padding: 16, flexDirection: "column" }}
      >
        <div className="flex gap-2">
          <input
            name={name}
            className="border w-[230px] lg:w-[80%] border-gray-300 rounded-md px-3 py-2 lg:py-[6px] outline-[#1976d2] outline-[1px] text-gray-700 placeholder:text-gray-400 placeholder:text-sm"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onInput={() => setTagError("")}
            placeholder="Add a tag"
          />
          <CustomButton
            variant="outlined"
            type="button"
            onClick={addTagHandler}
            size="sm"
          >
            Add
          </CustomButton>
        </div>
        {tagError ? (
          <span className="text-red-600 text-xs p-1">{tagError}</span>
        ) : null}
        <div className="flex flex-wrap gap-2 items-center mt-4 mb-2">
          {formik?.values?.tags?.map((tag, index) => (
            <div
              className="flex items-center gap-1 text-base text-gray-600"
              key={index}
            >
              <button
                onClick={() => removeTagHandler(tag)}
                className="border-none outline-none bg-blue-600 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <IoCloseSharp size={14} />
              </button>
              {tag.split(" ").join("-")}
            </div>
          ))}
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
      </div>
    </NewCourceCard>
  );
};

export default TagsComponent;
