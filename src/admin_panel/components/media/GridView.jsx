import Img1 from "../../../../public/assets/Algo-trading.png";
import Img2 from "../../../../public/assets/forex-lifestyle2.jpg";
import VidoeCover from "../../../asset/video_cover.svg";
import AudioCover from "../../../asset/audio_cover.svg";

const data = [
  {
    file: Img1,
    name: "",
    format: "image",
  },

  {
    file: Img2,
    name: "",
    format: "image",
  },

  {
    file: Img2,
    name: "test_video",
    format: "video",
  },

  {
    file: Img1,
    name: "",
    format: "image",
  },

  {
    file: Img2,
    name: "",
    format: "audio",
  },

  {
    file: Img2,
    name: "test_video",
    format: "video",
  },
  {
    file: Img1,
    name: "",
    format: "image",
  },

  {
    file: Img2,
    name: "",
    format: "image",
  },

  {
    file: Img2,
    name: "test_video",
    format: "audio",
  },
];

const GridView = () => {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
      {data?.map((item, index) => (
        <div className="max-w-[200px] aspect-square cursor-pointer" key={index}>
          {item?.format === "image" ? (
            <img className="w-full h-full bg-cover" src={item.file} />
          ) : item?.format === "video" ? (
            <div className="w-full h-full border border-gray-300">
              <div className="w-full h-[80%] bg-[#f0f0f1] flex items-center justify-center flex-col">
                <img
                  className="w-[60px] h-[90px] bg-cover"
                  src={VidoeCover}
                  alt="Video"
                />
              </div>
              <div className="w-full h-[20%] flex items-center justify-center bg-white overflow-hidden">
                <span className="text-gray-600 text-[13px] text-center">
                  Text_video.mp4
                </span>
              </div>
            </div>
          ) : item?.format === "audio" ? (
            <div className="w-full h-full border border-gray-300">
              <div className="w-full h-[80%] bg-[#f0f0f1] flex items-center justify-center flex-col">
                <img
                  className="w-[60px] h-[90px] bg-cover"
                  src={AudioCover}
                  alt="Audio"
                />
              </div>
              <div className="w-full h-[20%] flex items-center justify-center bg-white overflow-hidden">
                <span className="text-gray-600 text-[13px] text-center">
                  test.mp3
                </span>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default GridView;
