import { FaUserLarge } from "react-icons/fa6";
import AddComment from "./AddComment";
import CommentItem from "./CommentItem";

export const LearningComments = () => {
  return (
    <div className="w-full md:w-[80%] lg:w-[50%] max-w-[670px] bg-white rounded-[5px] p-5 mx-auto mt-10">
      <h4 className="text-[#212327] font-medium text-lg mb-9">
        Join the conversation
      </h4>

      <div>
        {/* add new comment */}
        <AddComment />

        {/* comments and reply */}
        <div className="mt-10 space-y-4">
          {/* comments list */}
          <CommentItem />
        </div>
      </div>
    </div>
  );
};

export default LearningComments;
