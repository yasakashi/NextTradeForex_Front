import { BiSolidEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";

const MeetingItem = ({ meeting, onEdit, onRemove }) => {
  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-md px-8 py-3 w-[90%] ml-auto">
      <div className="flex items-center gap-2">
        <span className="border-none outline-none">
          <FaBars size={20} className="text-gray-500" />
        </span>
        <h5>{meeting?.meetingTitle} </h5> :
        <p className="text-gray-400 text-sm">{meeting?.meetingDescription}</p>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onEdit}
          className="border-none outline-none"
        >
          <BiSolidEdit size={20} className="text-gray-500" />
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="border-none outline-none"
        >
          <FaRegTrashAlt size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default MeetingItem;
