import { FaUserLarge } from "react-icons/fa6";

const AddReply = () => {
  return (
    <form className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 p-2 rounded-full w-max">
          <FaUserLarge size={26} className="text-gray-300" />
        </div>

        <textarea
          placeholder="Write your comment here ..."
          className="w-full min-h-[80px] p-4 border-2 rounded-lg border-gray-300 placeholder:text-gray-500 outline-blue-500 text-[#222]"
        ></textarea>
      </div>

      {/* submit button */}
      <div className="flex justify-end">
        <button className="btn_bg-gradient_3 px-2 py-1 rounded-lg text-sm font-semibold text-blue-light">
          Reply
        </button>
      </div>
    </form>
  );
};

export default AddReply;
