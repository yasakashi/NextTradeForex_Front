import { HiOutlineHome } from "react-icons/hi";

const LiveGroupItem = () => {
  return (
    <div className="flex items-center gap-2 w-full px-4 py-1 hover:bg-slate-100 transition-all hover:cursor-pointer">
      <img className="size-[30px] border border-gray-200" src="/assets/mystery-group-50.png" alt="group" />
      <h4 className="text-[13px] flex-grow">Lux Capital Trading</h4>
      <div className="">
        <HiOutlineHome size={16} className="text-gray-600" />
      </div>
    </div>
  );
};

export default LiveGroupItem;
