import { TvIcon, ClockIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

const BodyFixedModal = () => {
  return (
    <div className="fixed left-0 bottom-[100px] z-[300]">
      <div className="flex flex-col space-y-2 items-start">
        <div className="bg-gold-light_400 px-3 py-2  rounded-tr-full rounded-br-full animate-[glowing_1s_ease-in-out_infinite] -translate-x-[calc(100%-50px)] hover:translate-x-0 duration-500">
          <a className="flex items-center space-x-4 pl-3" href="/">
            <h5 className="text-black text-xl">Live Tv</h5>
            <TvIcon className="w-6 h-6" />
          </a>
        </div>

        <div className="bg-gold-light_400 px-3 py-2  rounded-tr-full rounded-br-full animate-[glowing_1s_ease-in-out_infinite] -translate-x-[calc(100%-50px)] hover:translate-x-0 duration-500">
          <a className="flex items-center space-x-4 pl-3" href="/">
            <h5 className="text-black text-xl">Market Sessions</h5>
            <ClockIcon className="w-6 h-6" />
          </a>
        </div>

        <div className="bg-gold-light_400 px-3 py-2  rounded-tr-full rounded-br-full animate-[glowing_1s_ease-in-out_infinite] -translate-x-[calc(100%-50px)] hover:translate-x-0 duration-500">
          <a className="flex items-center space-x-4 pl-3" href="/">
            <h5 className="text-black text-xl">Live Tranings</h5>
            <VideoCameraIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BodyFixedModal;
