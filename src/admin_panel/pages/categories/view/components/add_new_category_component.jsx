import React, { useState } from "react";

import LibraryModal from "../../../../../pages/profile/new_course_components/library_modal";
import BorderedButtonPrimary from "../../../../../common/bordered_button_primary";
// import EditorComponent from "../../../../../pages/profile/new_course_components/editor/editor_component";
import CustomRadioButton from "./customRadioButton";
import ContainedButtonPrimary from "../../../../../common/contained_button_primary";
import DraftEditor from "../../../../components/editor/draft_editor";
import { IoIosArrowDown } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { ClickAwayListener, Collapse } from "@mui/material";
import { Row } from "../../../../../pages/profile/new_course_components/categories_component";

import { MdKeyboardArrowRight } from "react-icons/md";
import CustomTextInput from "../../../../../components/ui/CustomTextInput";
import CustomTextArea from "../../../../../components/ui/CustomTextArea";
import { CustomButton } from "../../../../../components/ui/CustomButton";
import { useFormik } from "formik";
import { EditorState } from "draft-js";

const AddNewCategoryComponent = ({ categories }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [customImgOpen, setCustomImgOpen] = useState(false);
  const [categoryFileOpen, setCategoryFileOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      parentId: "",
      description: "",
      customDescription: "",
      customFile: null,
      chartImage: "",
      isVisible: true,
      isVisibleDropdown: true,
      categoryImage: null,
      isTopCategory: false,
      coursesOfCategory: false,
    },

    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleEditorChange = (editorData) => {
    formik.setFieldValue("customDescription", editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="pb-16">
      <h4 className="mb-6 text-lg text-white">Add new Category</h4>

      <div className="mt-4">
        <h4 className="text-sm text-white mb-1">Name</h4>
        <CustomTextInput
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Category name"
          className="text-gray-700"
        />
      </div>

      <div className="mt-4">
        <div className="mt-4">
          <h4 className="text-sm text-white mb-1">Slug</h4>
          <CustomTextInput
            name="slug"
            value={formik.values.slug}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="text-gray-700"
            placeholder="Slug"
          />
        </div>
        <h6 className="text-xs text-white mt-2">
          The “slug” is the URL-friendly version of the name. It is usually all
          lowercase and contains only letters, numbers, and hyphens.
        </h6>
      </div>
      <div style={{ color: "black" }}>
        <h5 className="mt-4 text-white">Parent Category</h5>

        <GroupedSelectBox options={categories} />
        <h6 className="text-xs text-white mt-1">
          Assign a parent term to create a hierarchy. The term Jazz, for
          example, would be the parent of Bebop and Big Band.
        </h6>
      </div>
      <div>
        <h5 className="mt-4 text-white">Description</h5>
        <CustomTextArea
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="h-[100px] text-gray-700"
          placeholder="Description"
        />
        <h6 className="text-xs text-white mt-1">
          The description is not prominent by default; however, some themes may
          show it.
        </h6>
        <div className="my-4">
          <CustomButton
            size="sm"
            variant="outlined"
            onClick={() => {
              setCustomImgOpen(true);
            }}
          >
            Add Media
          </CustomButton>
        </div>

        <LibraryModal
          file={formik?.values?.customFile}
          set_file={(file) => {
            formik.setFieldValue("customFile", file);
          }}
          error={formik.errors?.customFile}
          onBlur={formik.handleBlur}
          accept_file="Image"
          title="Add Media"
          open={customImgOpen}
          set_open={setCustomImgOpen}
          onSave={() => setCustomImgOpen(false)}
        />
        <DraftEditor
          placeholder="Custom Description ..."
          editorState={editorState}
          onChange={handleEditorChange}
        />
        {/* <EditorComponent /> */}
        <div>
          <h5 className="mt-4 text-white">Chart Image</h5>
          <CustomTextArea
            name="chartImage"
            value={formik.values.chartImage}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="h-[100px] text-gray-700"
            placeholder="Chart Image"
          />
        </div>
        <div className="mt-4 text-white">
          <h5>Is Visible</h5>

          <div className="my-2 space-y-2">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isVisible", e.target.value === "Yes");
              }}
              label="Yes"
              label_color="white"
              name="isVisible"
              checked={formik.values.isVisible === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isVisible", e.target.value === "Yes");
              }}
              label="No"
              label_color="white"
              name="isVisible"
              checked={formik.values.isVisible === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-white">Is Visible Dropdown</h5>
          <div className="my-2 space-y-2">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "isVisibleDropdown",
                  e.target.value === "Yes"
                );
              }}
              label="Yes"
              label_color="white"
              name="isVisibleDropdown"
              checked={formik.values.isVisibleDropdown === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "isVisibleDropdown",
                  e.target.value === "Yes"
                );
              }}
              label="No"
              label_color="white"
              name="isVisibleDropdown"
              checked={formik.values.isVisibleDropdown === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-white">Is This Top Category?</h5>
          <div className="my-2 flex items-center space-x-4">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isTopCategory", e.target.value === "Yes");
              }}
              label="Yes"
              label_color="white"
              name="isTopCategory"
              checked={formik.values.isTopCategory === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue("isTopCategory", e.target.value === "Yes");
              }}
              label="No"
              label_color="white"
              name="isTopCategory"
              checked={formik.values.isTopCategory === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-white">Category Image</h5>
          <div className="flex items-center">
            <h5 className="mr-6 text-white">No file Selected</h5>

            <CustomButton
              type="button"
              size="sm"
              variant="outlined"
              onClick={() => {
                setCategoryFileOpen(true);
              }}
            >
              Add Image
            </CustomButton>
          </div>

          <LibraryModal
            file={formik?.values?.categoryImage}
            set_file={(file) => {
              formik.setFieldValue("categoryImage", file);
            }}
            error={formik.errors?.categoryImage}
            onBlur={formik.handleBlur}
            accept_file="Image"
            title="Add Media"
            open={categoryFileOpen}
            set_open={setCategoryFileOpen}
            onSave={() => setCategoryFileOpen(false)}
          />
        </div>
        <div className="mt-4">
          <h5 className="text-white">Courses Of Category</h5>
          <div className="my-2 flex items-center space-x-4">
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "coursesOfCategory",
                  e.target.value === "Yes"
                );
              }}
              label="Yes"
              label_color="white"
              name="coursesOfCategory"
              checked={formik.values.coursesOfCategory === true}
            />
            <CustomRadioButton
              onChange={(e) => {
                formik.setFieldValue(
                  "coursesOfCategory",
                  e.target.value === "Yes"
                );
              }}
              label="No"
              label_color="white"
              name="coursesOfCategory"
              checked={formik.values.coursesOfCategory === false}
            />
          </div>
        </div>
        <div className="mt-4">
          <CustomButton type="submit" size="sm">
            Add New Category
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default AddNewCategoryComponent;

export const GroupedSelectBox = ({ options, onChange }) => {
  const [is_open, set_is_open] = useState(false);
  const [level, set_level] = useState(null);

  const [opened_item, set_opened_item] = useState(null);
  // const [search, set_search] = React.useState("");
  React.useEffect(() => {
    onChange?.(level?.id);
  }, [level]);
  return (
    <ClickAwayListener
      onClickAway={() => {
        set_is_open(false);
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <div
          className="border border-gray-600"
          style={{
            display: "flex",
            width: "100%",
            // border: "1px solid #c7c7c7",
            padding: "8px 8px",
            borderRadius: 4,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            height: 32,
          }}
        >
          <p className="text-sm">{level?.name}</p>
          <button
            onClick={() => {
              set_is_open((pre) => !pre);
            }}
          >
            <IoIosArrowDown
              color="black"
              style={{
                transform: `rotateX(${is_open ? 180 : 0}deg)`,
                transition: "0.2s",
              }}
            />
          </button>
        </div>
        <AnimatePresence>
          {is_open && (
            <motion.div
              key={`${is_open}+1`}
              style={{
                position: "absolute",
                width: "100%",
                backgroundColor: "white",
                boxShadow: "0px 0px 1px #333",
                top: 36,
                zIndex: 1000,
                maxHeight: 400,
                overflowY: "auto",
              }}
              initial={{ opacity: 0, y: 16 }}
              exit={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              {/* {
              <CustomTextField
                value={search}
                placeHolder="Search..."
                style={{ height: 42,position:"absolute" }}
                onChange={(val) => set_search(val || "")}
              />
            } */}
              <div
                style={{
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "white",
                }}
              >
                <p
                  onClick={() => {
                    set_level?.(null);
                    set_is_open(false);
                  }}
                  className="hover:bg-blue-100"
                  style={{
                    fontSize: 13,
                    padding: "16px 0px 8px 8px",
                    cursor: "pointer",
                  }}
                >
                  {"None"}
                </p>
                {options?.map((item, i) => (
                  <motion.div key={i}>
                    {!item?.childs ? (
                      <div key={i} style={{ padding: "0px 8px" }}>
                        <Row
                          checked={(id) => level?.id === id}
                          id={item.id}
                          name={item.name}
                          onChange={({ id, name }) => {
                            set_level({ id, name });
                            // set_is_open(false)
                          }}
                        />
                      </div>
                    ) : (
                      <p
                        onClick={() => {
                          if (item.childs)
                            return set_opened_item((pre) =>
                              pre === item.id ? null : item.id
                            );
                          set_level?.(item);
                          set_is_open(false);
                        }}
                        className="hover:bg-blue-100 flex items-center"
                        style={{
                          fontSize: 13,
                          padding: "8px 0px 8px 8px",
                          cursor: "pointer",
                        }}
                      >
                        <MdKeyboardArrowRight
                          style={{
                            transform: `scale(1.5) rotate(${
                              item.id === opened_item ? 90 : 0
                            }deg)`,
                            marginRight: 8,
                            transition: "0.2s",
                          }}
                        />

                        {item?.name}
                      </p>
                    )}
                    <Collapse in={opened_item === item.id}>
                      <div className="pl-5">
                        {item.childs?.map((child) => {
                          return (
                            <Row
                              key={child.id}
                              checked={(id) => level?.id === id}
                              name={child.name}
                              onChange={({ id, name }) => {
                                set_level({ id, name });
                              }}
                              id={child.id}
                            />
                          );
                        })}
                      </div>
                    </Collapse>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  );
};
