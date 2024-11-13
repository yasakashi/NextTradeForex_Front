import React, { useEffect, useRef, useState } from "react";
import ModalLayout from "../../../common/modal_layout";
import { CgClose } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import BootstrapTabs from "../../../common/bootstrap_tabs";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { CustomSelectBox } from "./custom_select_box";
import CustomTextField, {
  CustomTextArea,
} from "../../../common/custom_text_field";
import imgTest from "../../../asset/img/AUDUSD-Technical-Analysis_id_6897558c-55cd-4da4-86fc-0699d8a01460_size775-1-300x163.png.jpg";
import {
  ArrowLeftCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/16/solid";
import { CustomDivider } from "./new_cource_card";
import ContainedButtonPrimary from "../../../common/contained_button_primary";
import DropZone from "./dropzone";

const LibraryModal = ({
  set_open,
  open,
  title,
  has_side_bar_action,
  onSave,
  file,
  set_file,
  accept_file,
  error,
  ...props
}) => {
  const [current_tab, set_current_tab] = useState(`Upload files`);
  // let [file, set_file] = useState<File | null>(null);

  const [open_details, set_open_details] = useState(false);
  return (
    <ModalLayout
      onClose={() => {
        set_open(false);
      }}
      open={open}
    >
      <div className="flex w-[70vw] h-[85vh]">
        {has_side_bar_action && (
          <div className="w-60 border-r-2 border-gray-300  pt-6 pl-4 pr-4 flex flex-col items-start">
            <p className="text-sm font-medium mb-3">Actions</p>
            {[
              "Add media",
              "Create gallery",
              "Create audio playlist",
              "Create video playlist",
              "Featured image",
              "Insert from URL",
            ].map((item, i) => (
              <div key={item} className="flex flex-col w-full items-start">
                <button className="mt-2 mb-2 text-sm text-blue-500 ">
                  {item}
                </button>
                {i === 4 && <CustomDivider />}
              </div>
            ))}
          </div>
        )}
        <div className="h-full w-full flex flex-col">
          <div className="flex w-full justify-between p-4 pb-0">
            <h2 className="text-xl font-medium text-black">{title}</h2>
            <button onClick={() => set_open(false)}>
              <CgClose color="black" />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 8,
              borderBottom: "1px solid #c7c7c7",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <BootstrapTabs
              onClick={(item) => set_current_tab(item)}
              current_tab={current_tab}
              items={[
                { title: "Upload files" },
                { title: "Media Library", disabled: true },
              ]}
            />

            <button
              className=" mr-2 relative bottom-1 flex items-center"
              onClick={() => {
                set_open_details((pre) => !pre);
              }}
            >
              <motion.div animate={{ rotateY: open_details ? 180 : 0 }}>
                <ArrowLeftCircleIcon style={{ width: 22, margin: "0px 6px" }} />
              </motion.div>
              <motion.span className="text-sm font-medium">
                {open_details ? "Collapse Details" : "  Expand Details"}
              </motion.span>
            </button>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {current_tab === "Media Library" && (
              <motion.div
                layout
                key={`${current_tab} +1`}
                className="flex flex-col min-h-96"
                style={{ width: "100%", height: "75vh" }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Library open={open_details} set_details={set_open_details} />
              </motion.div>
            )}
            {current_tab !== "Media Library" && (
              <DropZone
                accept_file={accept_file}
                key={`${current_tab} -1`}
                file={file}
                set_file={set_file}
                {...props}
              />
            )}
          </AnimatePresence>
          {error ? (
            <div className="px-8 my-9 text-red-600 text-sm capitalize">
              {error}
            </div>
          ) : null}{" "}
        </div>
      </div>
      <motion.div
        key={`${open}+34243`}
        className="flex justify-end w-full p-4 border-t-2 border-gray-300"
        initial={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ transformOrigin: "bottom" }}
        transition={{ ease: "linear" }}
      >
        <ContainedButtonPrimary
          title="Select"
          onClick={async () => {
            onSave?.(file);
          }}
          disabled={!file}
        />
      </motion.div>
    </ModalLayout>
  );
};

export default LibraryModal;

const Library = ({ open, set_details }) => {
  const [item_details, set_item_details] = useState(null);
  const [show_copy_tooltip, set_show_copy_tooltip] = useState(null);
  // const check_copy = async () => {
  //   try {
  //     const read = await navigator.clipboard.readText();
  //   } catch (error) {}
  // };

  useEffect(() => {
    if (item_details) {
      set_show_copy_tooltip(false);
      set_details(true);
    } else {
      set_details(false);
    }

    // return () => {
    //   if (!!item_details) {
    //     set_details(false);
    //   }
    // };
  }, [item_details]);
  return (
    <motion.div className="h-full flex flex-col">
      <motion.div className="flex" style={{ flex: 1, overflow: "hidden" }}>
        {/* select files section */}

        <AnimatePresence mode="popLayout" presenceAffectsLayout>
          <motion.div
            style={{}}
            className="flex flex-col w-full p-4 h-full"
            transition={{ ease: "linear" }}
            layout
          >
            <div
              className="flex flex-row  items-start justify-between"
              style={{ height: 64 }}
            >
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-2">Filter media</p>
                <div className="flex">
                  <CustomSelectBox
                    container_width={200}
                    options={[
                      { title: "All media items" },
                      { title: "Uploaded to this post" },
                      { title: "Images" },
                      { title: "Audio" },
                      { title: "Video" },
                      { title: "Documents" },
                      { title: "Spreadsheets" },
                      { title: "Archives" },
                      { title: "Unattached" },
                      { title: "Mine" },
                    ]}
                  />
                  <div className="ml-2">
                    <CustomSelectBox container_width={200} />
                  </div>
                </div>
              </div>
              <div className="">
                <p className="text-sm font-medium mb-2">Search</p>
                <CustomTextField style={{ height: 30 }} />
                {/* <h1>s</h1> */}
              </div>
            </div>
            {/* library images thumbnails           */}
            <div
              className="flex flex-wrap overflow-auto justify-between"
              style={{ height: "calc(100% - 70px)", marginTop: 8 }}
            >
              {new Array(100).toSorted().map((item, i) => (
                <div key={i} className="relative">
                  <AnimatePresence mode="wait" initial={false}>
                    {i + 1 === item_details && (
                      <motion.div
                        initial={{ scale: 0 }}
                        exit={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 right-0 w-5 h-5 bg-blue-500"
                      >
                        <CheckIcon color="white" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.img
                    src={imgTest}
                    alt=""
                    width={160}
                    style={{ alignSelf: "flex-start", border: "4px solid " }}
                    animate={{
                      borderColor: item_details === i + 1 ? "#3b82f6" : "white",
                    }}
                    className="m-1 cursor-pointer "
                    onClick={() => {
                      set_item_details((pre) => (pre === i + 1 ? null : i + 1));
                      // set_details((pre) => !pre);
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
          {/* file details section */}
          {open && (
            <motion.div
              className="h-full border-l-2 border-gray-300 bg-gray-100"
              initial={{ scaleX: 0 }}
              style={{ transformOrigin: "right" }}
              layout
              key={`${open} +1`}
              transition={{ ease: "linear" }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
            >
              <div
                style={{
                  width: "fit-content",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
                className="p-4"
              >
                <p className="text-sm font-medium mb-2 self-start">
                  ATTACHMENT DETAILS
                </p>
                <div className="flex md:flex-col lg:flex-row mb-2">
                  <img
                    src={imgTest}
                    alt=""
                    width={120}
                    height={100}
                    className="border border-lime-800 mr-3"
                  />
                  <div className="flex flex-col items-start">
                    <p className="text-sm font-medium">
                      USDJPY-Technical-Analysis_id_2faab2e4-bafc-459f-8f60-b244dae75d9d_size775.jpg
                    </p>
                    <p className="text-sm">April 30, 2024</p>
                    <p className="text-sm">55 KB</p>
                    <p className="text-sm">775 by 417 pixels</p>
                    <button className="text-blue-500 text-sm mt-2">
                      Edit Image
                    </button>
                  </div>
                </div>
                <CustomDivider />

                {arr.map((item, i) => {
                  const { Component } = item;
                  return (
                    <div
                      className="flex items-start justify-between mt-4 w-full pl-11"
                      key={i}
                    >
                      <p className="text-sm font-light w-40">{item.title}</p>
                      <div className="flex flex-col w-full">
                        <Component />
                        {i === 0 && (
                          <p className="text-xs font-medium">
                            <a
                              href="#"
                              className="text-blue-500 underline pr-1"
                            >
                              Learn how to describe the purpose of the image.
                            </a>
                            Leave empty if the image is purely decorative.
                          </p>
                        )}
                        {i === arr.length - 1 && (
                          <div className="relative mt-4 ml-4">
                            <BorderedButtonPrimary
                              title="Copy URL to clipboard"
                              onClick={async () => {
                                await navigator.clipboard.writeText(`${i}`);
                                set_show_copy_tooltip(i);
                              }}
                            />
                            {show_copy_tooltip === i && (
                              <span className="absolute text-sm text-green-600 top-1 right-24">
                                Copied
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
const arr = [
  { title: "Alt Text", Component: CustomTextArea },
  { title: "Title", Component: CustomTextField },
  { title: "Caption", Component: CustomTextArea },
  { title: "Description", Component: CustomTextArea },
  { title: "File Url", Component: CustomTextField },
];
