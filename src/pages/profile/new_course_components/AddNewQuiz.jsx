import { useState } from "react";
import ModalLayout from "../../../common/modal_layout";
import { CgClose } from "react-icons/cg";
import QuizInfo from "./QuizInfo";

const AddNewQuiz = ({ setShowQuizModal, showQuizModal }) => {
  return (
    <ModalLayout
      className="w-full sm:w-[70vw] md:w-[50vw] lg:w-[60vw] max-w-[100vh] h-[80vh] overflow-hidden flex flex-col justify-between"
      onClose={setShowQuizModal}
      open={showQuizModal}
    >
      <div className="flex w-full flex-col border-b border-gray-300">
        <div className="flex justify-between items-center py-4 px-8 w-full">
          <h4 className="font-semibold">Add Lesson</h4>
          <button onClick={() => setShowQuizModal(false)}>
            <CgClose />
          </button>
        </div>

        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-700 text-sm font-semibold">
              Quiz Info
            </span>
            <div className="bg-blue-accent rounded-full size-[20px] text-white flex items-center justify-center text-sm">
              1
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-700 text-sm font-semibold">
              Questions
            </span>
            <div className="bg-gray-200 border border-gray-300 rounded-full size-[20px] text-gray-700 flex items-center justify-center text-sm">
              2
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-700 text-sm font-semibold">
              Settings
            </span>
            <div className="bg-gray-200 border border-gray-300 rounded-full size-[20px] text-gray-700 flex items-center justify-center text-sm">
              3
            </div>
          </div>
        </div>
      </div>
      {/* main */}
      <div className="px-8 py-8 bg-[#eff1f7] flex-grow h-full overflow-y-scroll scrollbar-thin space-y-8">
        <QuizInfo />
      </div>

      <div className="border-t border-gray-300 flex items-center justify-between px-8 py-4">
        <button
          onClick={() => setShowQuizModal(false)}
          className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md"
        >
          Cancel
        </button>
        <button className="bg-blue-accent px-4 py-[6px] text-white border border-blue-accent rounded-md shadow-sm">
          Save & Next
        </button>
      </div>
    </ModalLayout>
  );
};

export default AddNewQuiz;
