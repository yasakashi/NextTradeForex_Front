import { useRef, useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { HiDotsVertical } from "react-icons/hi";
import { VscColorMode } from "react-icons/vsc";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import useClickOutside from "../../../../hooks/useClickOutside";

const Question = ({ question, removeSingleQuestionHandler }) => {
  const [showQuestionMenu, setShowQuestionMenu] = useState(false);

  const questionRef = useRef(null);

  useClickOutside(questionRef, () => {
    setShowQuestionMenu(false);
  });

  return (
    <div className="border border-gray-300 bg-white px-6 py-2 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div>
          <RxDragHandleDots2 className="text-gray-500" size={20} />
        </div>
        <p className="text-gray-600 text-base">{question?.questionTitle}</p>
      </div>

      <div className="flex items-center gap-9">
        <div className="flex items-center gap-3">
          <div className="bg-blue-accent p-[5px] rounded-[3px]">
            <VscColorMode className="text-white" size={20} />
          </div>
          <span className="text-gray-700 text-sm">True/False</span>
        </div>
        <div
          onClick={() => setShowQuestionMenu((prev) => !prev)}
          className="relative group hover:bg-blue-100 p-[5px] rounded-full transition-colors"
        >
          <HiDotsVertical
            className="text-gray-600 group-hover:text-blue-accent group-hover:cursor-pointer transition-colors"
            size={20}
          />

          {showQuestionMenu ? (
            <div
              ref={questionRef}
              className="absolute top-full right-full z-[100] rounded-md shadow-md w-[110px] h-auto py-3 bg-white border border-gray-300"
            >
              <ul>
                <li className="px-2 py-1 flex items-center gap-2 hover:bg-slate-200 cursor-pointer transition-colors text-blue-accent">
                  <CiEdit size={14} />
                  Edit
                </li>
                <li
                  onClick={() => removeSingleQuestionHandler(question?.id)}
                  className="px-2 py-1 flex items-center gap-2 hover:bg-slate-200 cursor-pointer transition-colors text-red-500"
                >
                  <IoTrashOutline size={14} />
                  Remove
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Question;
