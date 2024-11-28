import { FaUserLarge } from "react-icons/fa6";
import AddReply from "./AddReply";

const CommentItem = () => {
  return (
    <div>
      <div className="flex items-start gap-3">
        {/* comment avatar */}
        <div className="bg-gray-100 p-2 rounded-full w-max">
          <FaUserLarge size={22} className="text-gray-300" />
        </div>

        {/* tutor single comment */}
        <div className="border border-gray-300 rounded-lg p-4 w-full">
          <div>
            <span className="text-[#161d25] font-bold text-sm">admin 1</span>
            <span className="text-gray-500 text-sm px-1">1 second ago</span>
          </div>
          <p className="text-gray-700 text-sm mt-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga,
            laudantium?
          </p>
        </div>
      </div>

      {/* comment replys */}
      <div className="ml-12 space-y-4 mt-8">
        {[1, 2, 3].map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            {/* comment avatar */}
            <div className="bg-gray-100 p-2 rounded-full w-max">
              <FaUserLarge size={20} className="text-gray-300" />
            </div>

            {/* tutor single comment */}
            <div className="border border-gray-300 rounded-lg p-4 w-full">
              <div>
                <span className="text-[#161d25] font-bold text-sm">
                  admin 1
                </span>
                <span className="text-gray-500 text-sm px-1">1 second ago</span>
              </div>
              <p className="text-gray-700 text-sm mt-1">
                Lorem ipsum dolor sit amet consectetur
              </p>
            </div>
          </div>
        ))}
        <div className="pt-8">
          <AddReply />
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
