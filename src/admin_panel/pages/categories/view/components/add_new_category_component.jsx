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

const AddNewCategoryComponent = ({ categories }) => {
  const [open, set_open] = useState(false);

  return (
    <div className="pb-16 text-white">
      <h4 className="mb-6 text-lg text-white">Add new Category</h4>

      <div className="mt-4">
        <h4 className="text-sm mb-1">Name</h4>
        <CustomTextInput placeholder="Category name" />
      </div>

      <div className="mt-4">
        <div className="mt-4">
          <h4 className="text-sm mb-1">Slug</h4>
          <CustomTextInput placeholder="Slug" />
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
        <CustomTextArea className="h-[100px]" placeholder="Description" />
        <h6 className="text-xs text-white mt-1">
          The description is not prominent by default; however, some themes may
          show it.
        </h6>
        <div className="my-4">
          <CustomButton
            size="sm"
            variant="outlined"
            onClick={() => {
              set_open(true);
            }}
          >
            Add Media
          </CustomButton>
        </div>

        <LibraryModal
          accept_file="Image"
          has_side_bar_action
          title="Add Media"
          open={open}
          set_open={set_open}
        />
        <DraftEditor />
        {/* <EditorComponent /> */}
        <div>
          <h5 className="mt-4 text-white">Chart Image</h5>
          <CustomTextArea className="h-[100px]" placeholder="Chart Image" />
        </div>
        <div className="mt-4 text-white">
          <h5>Is Visible</h5>
          <div className="my-2">
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
          <CustomRadioButton label="No" label_color="white" />
        </div>
        <div className="mt-4">
          <h5>Is Visible Dropdown</h5>
          <div className="my-2">
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
          <CustomRadioButton label="No" label_color="white" />
        </div>
        <div className="mt-4">
          <h5>Is This Top Category?</h5>
          <div className="my-2 flex">
            <CustomRadioButton label="No" label_color="white" />
            <span className="w-4"></span>
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
        </div>
        <div className="mt-4">
          <h5>Category Image</h5>
          <div className="flex items-center">
            <h5 className="mr-6">No file Selected</h5>

            <CustomButton
              size="sm"
              variant="outlined"
              onClick={() => {
                set_open(true);
              }}
            >
              Add Image
            </CustomButton>
          </div>
        </div>
        <div className="mt-4">
          <h5>Courses Of Category</h5>
          <div className="my-2 flex">
            <CustomRadioButton label="No" label_color="white" />
            <span className="w-4"></span>
            <CustomRadioButton label="Yes" label_color="white" />
          </div>
        </div>
        <div className="mt-4">
          <ContainedButtonPrimary title="Add New Category" />
        </div>
      </div>
    </div>
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
