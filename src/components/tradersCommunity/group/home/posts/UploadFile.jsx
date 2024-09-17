import { IoImageOutline, IoVideocamOutline } from "react-icons/io5";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { BsCameraReels } from "react-icons/bs";

import { IoIosClose } from "react-icons/io";
import { useEffect, useState } from "react";

const UploadPostFile = ({ setPostFile, fileType, setFileType }) => {
  const [files, setFiles] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setFiles((prevFiles) => [
        ...prevFiles,
        { type: fileType, url: reader.result },
      ]);
    };
    reader.readAsDataURL(file);
    console.log({ file });
    setPostFile(file);
    setErrorMsg("");
  };

  const validateFile = (file) => {
    const type = file.type.split("/")[1];
    const sizeLimit = 1024 * 500 * 1024; //500kb

    const validImageTypes = ["jpeg", "jpg", "png"];
    const validVideoTypes = ["mp4", "avi", "mov"];
    const validAudioTypes = ["mp3", "wav", "mpeg"];

    let isValidType = false;

    if (fileType === "img") {
      isValidType = validImageTypes.includes(type);
    } else if (fileType === "video") {
      isValidType = validVideoTypes.includes(type);
    } else if (fileType === "audio") {
      isValidType = validAudioTypes.includes(type);
    }

    if (!isValidType) return `The selected file type is not supported.`;
    if (file.size > sizeLimit) return `The selected file is larger than 5MB `;

    return null;
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    //clear the file input when fileType changes
    // document.getElementById("upLoadFile")?.value = null;
  }, [fileType]);

  return (
    <div className="flex items-start flex-col mt-4 w-full cursor-pointer p-2 ">
      {!files?.length && (
        <div className="flex items-center gap-3">
          <label htmlFor="uploadFile" className="cursor-pointer shadow-sm">
            <IoImageOutline
              className="text-gray-500 hover:text-blue-600 transition-all"
              size={22}
              onClick={() => setFileType("img")}
            />
          </label>

          <label htmlFor="uploadFile" className="cursor-pointer shadow-sm">
            <BsCameraReels
              className="text-gray-500 hover:text-blue-600 transition-all"
              size={20}
              onClick={() => setFileType("video")}
            />
          </label>

          <label htmlFor="uploadFile" className="cursor-pointer shadow-sm">
            <HiOutlineSpeakerWave
              className="text-gray-500 hover:text-blue-600 transition-all"
              size={22}
              onClick={() => setFileType("audio")}
            />
          </label>
        </div>
      )}

      <div className="w-full">
        <div className="w-full">
          {files?.length > 0 ? (
            <>
              {files.map((file, index) => (
                <div key={index} className="relative w-[80%] mx-auto">
                  {file?.type === "img" && (
                    <img
                      src={file?.url || ""}
                      alt={`upload-${index}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                  {file?.type === "video" && (
                    <video
                      src={file?.url || ""}
                      controls
                      className="w-full h-32 object-cover rounded-md"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {file?.type === "audio" && (
                    <audio src={file?.url || ""} controls className="">
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-0 right-0 p-[1px] bg-gray-300 rounded-full"
                  >
                    <IoIosClose className="text-red-600" size={20} />
                  </button>
                </div>
              ))}
            </>
          ) : null}

          <input
            type="file"
            name="image"
            id="uploadFile"
            onChange={handleFileChange}
            className="w-full hidden rounded bg-white text-black"
            accept={
              fileType === "img"
                ? "image/png, image/jpg, image/jpeg"
                : fileType === "video"
                ? "video/*"
                : fileType === "audio"
                ? "audio/*"
                : ""
            }
          />
        </div>
        {errorMsg && (
          <div className="text-red-500 my-2 text-sm block">{errorMsg}</div>
        )}
      </div>
    </div>
  );
};

export default UploadPostFile;
