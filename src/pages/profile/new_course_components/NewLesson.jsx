import { useState } from "react";
import ModalLayout from "../../../common/modal_layout";
import WarningComponent from "../../../common/WarningComponenet";
import LibraryModal from "./library_modal";
import DraftEditor from "../../../admin_panel/components/editor/draft_editor";

import { CgClose } from "react-icons/cg";
import { BiSave } from "react-icons/bi";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiImageAddFill } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa";
import { GrAttachment } from "react-icons/gr";

const NewLesson = ({ showNewLessonModal, setShowNewLessonModal }) => {
  const [open, set_open] = useState(false);
  return (
    <ModalLayout
      className="w-full sm:w-[70vw] md:w-[50vw] lg:w-[60vw] max-w-[100vh] h-[80vh] overflow-hidden flex flex-col justify-between"
      onClose={setShowNewLessonModal}
      open={showNewLessonModal}
    >
      <div className="flex w-full flex-col border-b border-gray-300">
        <div className="flex justify-between items-center py-4 px-8 w-full">
          <h4 className="font-semibold">Add Lesson</h4>
          <button onClick={() => setShowNewLessonModal(false)}>
            <CgClose />
          </button>
        </div>
      </div>
      {/* main */}
      <div className="px-8 py-8 bg-[#eff1f7] flex-grow h-full overflow-y-scroll scrollbar-thin space-y-8">
        {/* lsesson Name */}
        <label className="w-full flex flex-col">
          <span className="text-gray-600 text-sm font-semibold mb-3">
            Lesson Name
          </span>
          <input
            type="text"
            className="px-4 py-[6px] border border-gray-300 rounded-md bg-white placeholder:text-gray-600 outline-blue-400"
          />
          <WarningComponent description="Lesson titles are displayed publicly wherever required." />
        </label>

        {/* Lesson Content */}
        <div>
          <span className="text-gray-600 text-sm font-semibold mb-3">
            Lesson Content
          </span>
          <div className="relative">
            <div className="mb-2 flex mt-3">
              <button
                className="flex items-center gap-2 text-blue-accent px-3 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-sm transition-all text-sm "
                onClick={() => {
                  set_open(true);
                }}
              >
                <MdOutlinePermMedia size={20} />
                Add Media
              </button>
              <button className="bg-gray-600 rounded-sm p-1 pr-3 pl-3 ml-2">
                <BiSave color="white" className="text-xl" />
              </button>
            </div>
            <LibraryModal
              accept_file="Image"
              file=""
              set_file={(file) => console.log(file)}
              onSave={(val) => {
                console.log(val);
              }}
              has_side_bar_action={false}
              title="Add Media"
              open={open}
              set_open={set_open}
            />
            <div className="w-full relative h-[300px]">
              {/* <EditorComponent /> */}
              <DraftEditor
                h={300}
                editorState=""
                set_editor_value={(val) => console.log({ val })}
              />
            </div>
          </div>

          <WarningComponent description="The idea of a summary is a short text to prepare students for the activities within the topic or week. The text is shown on the course page under the topic name" />
        </div>

        {/* feature Image */}
        <div>
          <span className="text-gray-600 text-sm font-semibold mb-3">
            Feature Image
          </span>

          <div className="mt-3 border h-[150px] border-gray-300 rounded-md p-4 bg-white grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-full bg-slate-200 rounded-md flex items-center justify-center w-full">
              <div className="flex items-center gap-2 text-gray-400">
                <RiImageAddFill size={24} />
                <span className="text-gray-400 text-sm">Upload Image</span>
              </div>
            </div>

            <div className="w-full h-full flex items-center justify-start">
              <div className="flex flex-col space-y-2 text-sm">
                <span>Size : 700 x 430 pixels</span>
                <span>File support : JPG | PNG | JPEG</span>
                <button className="flex items-center gap-2 w-max text-sm bg-blue-accent px-3 py-[6px] text-white border border-blue-accent rounded-md shadow-sm">
                  <FaRegImage size={16} />
                  Upload Image
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Source */}
        <div>
          <span className="text-gray-600 text-sm font-semibold mb-3">
            Video Source
          </span>

          <div className="mt-3">
            <select className="bg-white border border-gray-300 py-2 pl-2 w-full mb-3 outline-blue-400">
              <option disabled>Select video source</option>
              <option>Youtube</option>
            </select>

            <div className="border-2 border-blue-accent border-dashed h-[110px] flex items-center justify-center px-8 rounded-md">
              <input
                type="text"
                className="w-full placeholder:text-gray-600 px-3 py-[6px] rounded-sm border border-gray-300 outline-blue-400"
                placeholder="Page YouTube Video URL"
              />
            </div>
          </div>
        </div>

        {/* Video Playback time */}
        <div>
          <span className="text-gray-600 text-sm font-semibold mb-3">
            Video playback time
          </span>

          <div className="mt-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  className="py-2 px-3 w-full border border-gray-300 rounded-md placeholder:text-gray-500 outline-blue-400"
                  placeholder="00"
                />
                <span className="text-sm text-gray-500">Hour</span>
              </div>

              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  className="py-2 px-3 w-full border border-gray-300 rounded-md placeholder:text-gray-500 outline-blue-400"
                  placeholder="00"
                />
                <span className="text-sm text-gray-500">Minute</span>
              </div>

              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  className="py-2 px-3 w-full border border-gray-300 rounded-md placeholder:text-gray-500 outline-blue-400"
                  placeholder="00"
                />
                <span className="text-sm text-gray-500">Second</span>
              </div>
            </div>
          </div>
        </div>

        {/* Uplaod excercise file to the lesson */}
        <div>
          <span className="text-gray-600 text-sm font-semibold mb-3">
            Upload exercise files to the Lesson
          </span>

          <div className="mt-3">
            <button className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md flex items-center gap-2">
              <GrAttachment size={20} />
              Upload Attachments
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 flex items-center justify-between px-8 py-4">
        <button
          onClick={() => setShowNewLessonModal(false)}
          className="text-blue-accent px-4 py-[6px] hover:bg-blue-accent hover:text-white border border-blue-accent rounded-md"
        >
          Cancel
        </button>
        <button className="bg-blue-accent px-4 py-[6px] text-white border border-blue-accent rounded-md shadow-sm">
          Update Lesson
        </button>
      </div>
    </ModalLayout>
  );
};

export default NewLesson;
