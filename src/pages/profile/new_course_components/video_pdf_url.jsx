import React, { useState } from "react";
import NewCourceCard from "./new_cource_card";
import { AnimatePresence, motion } from "framer-motion";
import LibraryModal from "./library_modal";

import { useParams } from "react-router-dom";
import { CustomButton } from "../../../components/ui/CustomButton";
import { FiMinusCircle } from "react-icons/fi";
import CustomTextInput from "../../../components/ui/CustomTextInput";
import CustomTextArea from "../../../components/ui/CustomTextArea";
import { useFormik } from "formik";
import { useAddCourseVideoPdfMutation } from "../../../redux/features/course/courseApii";
import toast from "react-hot-toast";

const VideoPdfUrl = () => {
  const { courseId } = useParams();
  const [showVieoComponent, setShowVideoComponent] = useState(false);

  const [addCourseVideoPdf, { isLoading }] = useAddCourseVideoPdfMutation();

  const formik = useFormik({
    initialValues: {
      pdfTitle: "",
      pdfDescription: "",
      viewPdfFile: "",
      pdfFile: null,
      downloadable: false,
    },
    onSubmit: async (values, { resetForm }) => {
      console.log({ values });

      const videoPdfFormData = new FormData();

      try {
        videoPdfFormData.append("pdfTitle", values?.pdfTitle);
        videoPdfFormData.append("pdfDescription", values?.pdfDescription);
        videoPdfFormData.append("downloadable", values?.downloadable);
        videoPdfFormData.append("viewPdfFile", values?.viewPdfFile);
        videoPdfFormData.append("pdfFile", values?.pdfFile);

        videoPdfFormData.append("courseId", courseId);
        const addVideoPdfRes = await addCourseVideoPdf({
          data: videoPdfFormData,
        });

        console.log({ addVideoPdfRes });
        if (addVideoPdfRes?.data?.messageCode === 200) {
          toast.success("Video pdf added successfully.");
          resetForm();
          setShowVideoComponent();
        }
      } catch (error) {
        toast.error("Error! please try again.");
        console.log({ error });
      }
    },
  });

  return (
    <NewCourceCard title="Video Pdf Url">
      <form onSubmit={formik.handleSubmit} className="flex flex-col p-4">
        <p className="text-sm font-medium mb-2">video pdf url</p>
        {showVieoComponent ? (
          <AnimatePresence>
            <VideoComponent
              setShowVideoComponent={setShowVideoComponent}
              formik={formik}
            />
          </AnimatePresence>
        ) : null}

        <div style={{ alignSelf: "flex-end", marginTop: 16 }}>
          {showVieoComponent ? (
            <CustomButton size="sm" type="submit">
              {isLoading ? "Sending ..." : "Add Video Pdf"}
            </CustomButton>
          ) : (
            <CustomButton
              onClick={(e) => {
                e.preventDefault();
                setShowVideoComponent(true);
              }}
              size="sm"
              type="button"
            >
              Add Row
            </CustomButton>
          )}
        </div>
      </form>
    </NewCourceCard>
  );
};

export default VideoPdfUrl;

export const VideoComponent = ({ formik, setShowVideoComponent }) => {
  const [open, set_open] = useState(false);

  return (
    <>
      <motion.div className="flex border border-gray-400 relative" layout>
        <button
          onClick={() => setShowVideoComponent(false)}
          type="button"
          className="absolute top-1/2 -right-3"
        >
          <FiMinusCircle
            size={22}
            className="bg-white text-gray-700 z-[1000]"
          />
        </button>

        <div
          className="bg-gray-100 border-r-2 border-gray-300"
          style={{
            width: 24,
            marginRight: 16,
          }}
        ></div>
        <div className="flex flex-col flex-grow overflow-hidden">
          <div className="flex flex-row space-x-6">
            <p className="text-sm font-medium w-36 mt-3">Pdf Title</p>
            <div className="border-l border-gray-300  flex-grow p-4 pt-3">
              <CustomTextInput
                name="pdfTitle"
                value={formik.values?.pdfTitle}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <p className="text-sm font-medium w-36">Pdf Description</p>
            <div className="border-l border-gray-300  flex-grow p-4 pt-0">
              <CustomTextArea
                name="pdfDescription"
                value={formik.values?.pdfDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Pdf description ..."
              />
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <p className="text-sm font-medium w-36 ">Add Pdf file</p>
            <div className="border-l border-gray-300  flex-grow p-4 pt-0">
              <CustomButton
                size="sm"
                variant="outlined"
                type="button"
                onClick={() => {
                  set_open(true);
                }}
              >
                Add file
              </CustomButton>

              <LibraryModal
                accept_file="PDF"
                file={formik.values?.pdfFile}
                set_file={(file) => formik.setFieldValue("pdfFile", file)}
                onSave={(file) => {
                  set_open(false);
                }}
                open={open}
                set_open={set_open}
                title="Select Files"
              />
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <p className="text-sm font-medium w-36">View PDF File</p>
            <div className="border-l border-gray-300  flex-grow p-4 pt-0">
              <CustomTextArea
                name="viewPdfFile"
                value={formik.values?.viewPdfFile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <div className="flex flex-row space-x-6">
            <p className="text-sm font-medium w-36">Downloadable</p>
            <div className="border-l border-gray-300  flex-grow p-4 pt-0">
              <div className="flex items-center mb-2">
                <input
                  id="default-radio-1"
                  type="radio"
                  checked={formik.values?.downloadable === true}
                  onChange={() => {
                    formik.setFieldValue("downloadable", true);
                  }}
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-blue-800 focus:ring-10 dark:bg-blue-500 dark:border-blue-600"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  checked={formik.values?.downloadable === false}
                  onChange={() => {
                    formik.setFieldValue("downloadable", false);
                  }}
                  id="default-radio-2"
                  type="radio"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-blue-800 focus:ring-10 dark:bg-blue-500 dark:border-blue-600"
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
