import { FiMessageSquare, FiUser, FiRefreshCw } from "react-icons/fi";
import { SlNotebook } from "react-icons/sl";
import { GrNotes } from "react-icons/gr";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getTickets } from "../../../../redux/features/tickeSlice";
import { useParams } from "react-router-dom";
import DraftEditor from "../../../components/editor/draft_editor";
import LibraryModal from "../../../../pages/profile/new_course_components/library_modal";
import { EditorState } from "draft-js";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { BiSave } from "react-icons/bi";

const AdminTicketView = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openFile, setOPenFile] = useState(false);
  const [fileInput, setFileInput] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [reply, setReply] = useState("");
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tickets, getTicketsLoading, errorMsg } = useSelector(
    (state) => state.ticket
  );

  const ticket = tickets?.length > 0 ? tickets[0] : {};

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(
      getTickets({
        axiosPrivate,
        data: {
          Id: id,
          priorityId: null,
          creatoruserId: null,
          isanswerd: null,
        },
      })
    );
  }, []);

  const handleEditorChange = (editorData) => {
    setReply(editorData.htmlContent); // Use HTML content

    // Update the editor state
    setEditorState(editorData.state);
  };

  return (
    <div className="pt-10 px-4 bg-[#f1f2f5] w-full min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* ticket */}

        <div className="col-span-1 md:col-span-3 bg-white py-4 px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="p-[6px] rounded-md shadow-sm flex items-center justify-center bg-gray-200 text-gray-600 cursor-pointer">
                <FiMessageSquare size={22} />
              </span>

              <span className="p-[6px] rounded-md shadow-sm flex items-center justify-center bg-gray-200 text-gray-600 cursor-pointer">
                <SlNotebook size={20} />
              </span>
              <span>
                <FiUser size={22} />
              </span>
            </div>
            {/* --------- */}
            <div className="flex items-center space-x-4">
              <span className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md w-max">
                <FiRefreshCw size={14} />
              </span>

              <span className="bg-gray-300 text-gray-600 text-sm px-2 py-1 rounded-md">
                close
              </span>

              <div className="flex items-center space-x-2 text-gray-600">
                <span>
                  <GrNotes size={15} />
                </span>
                <h5>Nexttrade Forex</h5>
                <span>
                  <CiMenuKebab size={22} />
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-6" />

          {/*ticket title  */}
          <div className="text-gray-600 text-lg font-semibold">
            <h5>New ticket text</h5>
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-6" />

          <div className="flex items-center space-x-6 pb-8">
            <img
              className="rounded-full size-[60px] border border-gray-300"
              src="/public/assets/bp-avatar.png"
              alt="User Image"
            />
            <div className="flex flex-col leading-7">
              <p className="text-base cursor-pointer text-gray-800 font-semibold text-nowrap">
                {ticket?.creatorusername}
                <span className="text-xs text-gray-500 px-1 group-hover:text-blue-accent">
                  replied
                </span>
              </p>
              <span className="text-sm font-normal text-gray-600">
                new reply
              </span>
            </div>
          </div>

          <div className="w-full h-[1px] bg-gray-300 my-6" />

          <div className="flex flex-col space-x-6">
            <div className="flex items-center justify-start space-x-4">
              <img
                className="rounded-full size-[60px] border border-gray-300"
                src="/public/assets/bp-avatar.png"
                alt="User Image"
              />
              <div className="flex flex-col leading-7">
                <p className="text-base cursor-pointer text-gray-800 font-semibold text-nowrap">
                  amir basiri
                  <span className="text-xs text-gray-500 px-1 group-hover:text-blue-accent">
                    started the conversation
                  </span>
                </p>
              </div>
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: ticket?.textbody }}
              className="text-sm pt-8 font-normal text-gray-600"
            ></div>
          </div>

          {/* reply */}

          <div className="w-full pt-2 pl-2 border border-gray-300 rounded-md mt-8 mb-8">
            <div className="mb-2 flex relative">
              <CustomButton
                onClick={() => setOPenFile(true)}
                size="sm"
                variant="outlined"
                type="button"
              >
                Add Media
              </CustomButton>
              <button
                type="button"
                className="bg-gray-600 rounded-sm p-1 pr-3 pl-3 ml-2"
              >
                <BiSave color="white" className="text-xl" />
              </button>
            </div>
            <LibraryModal
              file={fileInput}
              set_file={(file) => {
                setFileInput(file);
              }}
              error={fileError}
              accept_file="Image"
              has_side_bar_action={false}
              title="Add Media"
              open={openFile}
              set_open={setOPenFile}
              onSave={() => setOPenFile(false)}
            />
            <div className="w-full relative overflow-y-scroll">
              {/* <EditorComponent /> */}
              <DraftEditor
                placeholder="Write your reply ..."
                editorState={editorState}
                onChange={handleEditorChange}
              />
            </div>
          </div>
        </div>

        {/* user info */}
        <div className="col-span-1 bg-white mt-10 h-max shadow-sm">
          <div className="flex flex-col items-start space-x-6 pb-8">
            <img
              className="rounded-full -mt-8 ml-4 shadow-md p-[1px] size-[70px] border border-gray-300"
              src="/public/assets/bp-avatar.png"
              alt="User Image"
            />
            <div className="flex w-full mt-2 flex-col leading-7">
              <p className="text-base cursor-pointer text-gray-800 font-semibold text-nowrap">
                {ticket?.creatorusername}
              </p>
              <span className="text-sm text-blue-accent hover:underline font-normal ">
                new reply
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTicketView;
