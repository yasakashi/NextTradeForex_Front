import React, { useCallback, useRef } from "react";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
const DropZone = ({
  file,
  set_file,
  accept_file,
}: {
  file?: File | null;
  set_file?: React.Dispatch<React.SetStateAction<File | null>>;
  accept_file: "Video" | "Image" | "PDF";
}) => {
  //   let [file, set_file] = React.useState<File | null>(null);
  const show_img_ref = useRef<HTMLImageElement | null>(null);
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    set_file?.(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:
      accept_file === "Image"
        ? {
            "image/jpeg": [],
            "image/png": [],
            "image/webp": [],
            "image/heic": [],
            "image/jfif": [],
          }
        : accept_file === "PDF"
        ? { "application/pdf": [] }
        : {
            "video/mp4": [],
            "video/mkv": [],
            "video/webm": [],
          },
    maxFiles: 1,
  });
  return (
    <motion.div
      layout
      style={{ width: "100%", padding: 16 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-96 justify-center items-center"
      animate={{ opacity: 1 }}
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64  border-gray-300  rounded-lg cursor-pointer "
      >
        <div
          style={{ width: "100%" }}
          className="flex flex-col items-center justify-center pt-5 pb-6"
          {...getRootProps()}
        >
          <p className="text-xl font-light mb-1">Drop files to upload</p>
          <p className="text-sm font-light">or</p>
          <BorderedButtonPrimary
            onClick={(e) => {}}
            style={{ padding: "12px 32px", margin: "16px 0px 32px" }}
            title={"Select Files"}
          />

          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-950 dark:text-gray-950">
            {/* <span className="font-semibold">Click to upload</span> or */}
            Maximum upload file size: 2 GB.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Want unlimited storage space?{" "}
            <a className="cursor-pointer text-blue-500">
              Move your media files to the Infinite Uploads cloud.Dismiss
            </a>
          </p>
        </div>
        <input {...getInputProps()} />
      </label>
      {file && accept_file === "Image" && (
        <div
          style={{
            width: 200,
            height: 200,
            alignSelf: "flex-start",
            position: "relative",
            borderRadius: 6,
            marginTop: 16,
            overflow: "clip",
          }}
        >
          <img
            src={URL.createObjectURL(file) || ""}
            ref={show_img_ref}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      )}
      {file && accept_file !== "Image" && <p className="text-black self-start">{file.name}</p>}
    </motion.div>
  );
};

export default DropZone;
