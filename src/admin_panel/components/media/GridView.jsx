// import Img1 from "../../../assets/Algo-trading.png";
// import Img2 from "../../../assets/forex-lifestyle2.jpg";
import VidoeCover from "../../../asset/video_cover.svg";
import AudioCover from "../../../asset/audio_cover.svg";
import { useState } from "react";
import { MdClose } from "react-icons/md";

const GridView = ({ data }) => {
  const [showFileModal, setShowFileModal] = useState(false);
  const [file, setFile] = useState({
    type: "",
    fileURL: "",
    fileName: "",
  });

  const fileClickHandler = (data) => {
    setShowFileModal(true);
    setFile({
      type: data?.filecontenttype,
      fileURL: data?.fileurl,
      fileName: data?.filename,
    });
  };

  return (
    <>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {data?.map((item, index) => (
          <div
            className="max-w-[200px] aspect-square cursor-pointer"
            key={index}
          >
            {item?.filecontenttype?.includes("image") ? (
              <img
                onClick={() => fileClickHandler(item)}
                className="w-full border border-gray-300 h-full bg-cover"
                src={item.fileurl}
              />
            ) : item?.filecontenttype?.includes("video") ? (
              <div className="w-full h-full border border-gray-300">
                <div className="w-full h-[80%] bg-[#f0f0f1] flex items-center justify-center flex-col">
                  <img
                    onClick={() => fileClickHandler(item)}
                    className="w-[60px] h-[90px] bg-cover"
                    src={VidoeCover}
                    alt="Video"
                  />
                </div>
                <div className="w-full h-[20%] flex items-center justify-center bg-white overflow-hidden">
                  <span className="text-gray-600 text-[13px] text-center line-clamp-1">
                    {item?.filename}
                  </span>
                </div>
              </div>
            ) : item?.filecontenttype?.includes("audio") ? (
              <div className="w-full h-full border border-gray-300">
                <div className="w-full h-[80%] bg-[#f0f0f1] flex items-center justify-center flex-col">
                  <img
                    onClick={() => fileClickHandler(item)}
                    className="w-[60px] h-[90px] bg-cover"
                    src={AudioCover}
                    alt="Audio"
                  />
                </div>
                <div className="w-full h-[20%] flex items-center justify-center bg-white overflow-hidden">
                  <span className="text-gray-600 text-[13px] text-center">
                    {item?.filename}
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {showFileModal ? (
        <div className="fixed bg-black/70 w-full h-screen inset-0 z-[1003] flex items-center justify-center">
          <div className="w-full max-w-[500px] aspect-video relative flex items-center justify-center">
            <button
              className="absolute z-[1004] size-[40px] rounded-full flex items-center justify-center shadow-md top-2 right-2 bg-red-400 text-white p-2"
              onClick={() => setShowFileModal(false)}
            >
              <MdClose size={22} />
            </button>
            {file?.type?.includes("image") ? (
              <img
                src={file.fileURL}
                alt={file.fileName}
                className="w-full h-full object-contain"
              />
            ) : file?.type?.includes("video") ? (
              <video
                src={file.fileURL}
                controls
                className="w-full h-full object-contain"
              ></video>
            ) : file?.type?.includes("audio") ? (
              <audio src={file.fileURL} controls className="w-full"></audio>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GridView;
