import { MdClose } from "react-icons/md";
import CreateSignal from "../../../pages/tradersCommunity/signalChannals/CreateSignal";

const WriteMessageSignalTemp = ({ setShowSignalMode }) => {
  return (
    <div className="fixed top-0 right-0 flex justify-center items-center inset-0 bg-[#000000c8] w-full h-full z-[1000]">
      <div
        onClick={() => setShowSignalMode(false)}
        className="absolute top-10 right-10 z-[1000] cursor-pointer bg-white p-1 rounded-full shadow-lg"
      >
        <MdClose size={28} className="text-red-500" />
      </div>
      <div className="w-[100%] h-full overflow-y-scroll">
        <CreateSignal pageType="groupChat" />
      </div>
    </div>
  );
};

export default WriteMessageSignalTemp;
