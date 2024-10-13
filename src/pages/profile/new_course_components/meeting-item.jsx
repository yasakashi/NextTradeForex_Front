import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const MeetingItem = () => {
  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-md px-8 py-3 w-[90%] ml-auto">
      <div className="flex items-center gap-2">
        <button className="border-none outline-none">
          <FaBars size={20} className="text-gray-500" />
        </button>
        <h5>Meeting 1 </h5> :
        <p className="text-gray-400 text-sm">Meeting 1 description</p>
      </div>

      <div className="flex items-center gap-6">
        <button className="border-none outline-none">
          <BiSolidEdit size={20} className="text-gray-500" />
        </button>
        <button className="border-none outline-none">
          <FaRegTrashAlt size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default MeetingItem;
