import SingleMsg from "./SingleMsg";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { IoIosArrowDown, IoIosSend } from "react-icons/io";
import { RiAttachment2 } from "react-icons/ri";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getMessages,
  sendMessageAction,
} from "../../../redux/features/messageSlice";
import WriteMessageSignalTemp from "./WriteMessageSignalTemp";
import { FaChartLine } from "react-icons/fa6";

const Messages = () => {
  const [messagetitle, setMessagetitle] = useState("");
  const [messagebody, setMessagebody] = useState("");
  const [showSignalMode, setShowSignalMode] = useState(false);

  const groupId = localStorage.getItem("groupId");

  const { sendMessageLoading, sentMessage, siteMessages } = useSelector(
    (state) => state.siteMessage
  );
  // "{\"timeframe_1min\":false,\"timeframe_5min\":true,\"timeframe_15min\":false,\"timeframe_30min\":false,\"timeframe_1houre\":false,\"timeframe_4houre\":false,\"timeframe_8houre\":false,\"timeframe_1day\":true,\"timeframe_1week\":false,\"timeframe_1month\":false,\"positiontypeId\":1,\"analysistypeId\":\"2\",\"marketsycleid\":\"2\",\"instrumenttypeid\":\"2\",\"entrypointtypeId\":\"2\",\"sl\":\"45\",\"tp1\":\"454\",\"tp2\":\"25\",\"tp3\":\"585\",\"resistance3\":\"222\",\"resistance2\":\"5\",\"resistance1\":\"82\",\"entryPoint\":\"822\",\"support1\":\"58\",\"support2\":\"525\",\"support3\":\"85\",\"description\":\"Loremipsumdolorsit,ametconsecteturadipisicingelit.Dignissimos,delectus?\\n\",\"timeframe_8hour\":true}";
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(
      getMessages({
        axiosPrivate,
        data: {
          isvisited: null,
          fromdate: null,
          todate: null,
          reciveruserId: null,
        },
      })
    );
  }, [sentMessage]);

  const sendMsgHandler = async () => {
    const response = await dispatch(
      sendMessageAction({
        axiosPrivate,

        data: {
          messagetitle,
          messagebody,
          reciverusername: "amirbasiri000111",
          forallluser: false,
          communitygroupId: groupId,
        },
      })
    );
    if (response?.payload?.messageCode === 200) {
      setMessagetitle("");
      setMessagebody("");
    }
  };

  return (
    <>
      <div className="mt-10 mb-16 bg-white rounded-sm shadow-md">
        <div className="border h-[730px]">
          <div className="h-full w-full">
            {/* chat header */}
            <div className="flex justify-between items-center h-11 w-full border-b border-[#ebebeb] px-2">
              <div className="flex items-center space-x-2">
                <div className="text-sm mr-auto">
                  <span>
                    <Link to="#">
                      <img
                        className="w-8 h-8"
                        src="/assets/community/mystery-group-50 .png"
                        alt="group name"
                      />
                    </Link>
                  </span>
                </div>
                <div className="flex flex-col items-start justify-start ">
                  <div className="capitalize whitespace-nowrap text-sm">
                    <Link to="#">Next Trade Forex Group</Link>
                  </div>

                  {/* <div className="flex items-center gap-1 text-xs whitespace-nowrap text-gray-500">
                  <span>6</span>
                  <p>participants</p>
                </div> */}
                </div>
              </div>
              <div className="flex items-center space-x-5 pr-3">
                <span className="cursor-pointer">
                  <BsArrowsAngleExpand
                    className="text-blue-main font-bold"
                    size={18}
                  />
                </span>
                <div className="cursor-pointer">
                  <IoEllipsisVerticalSharp
                    size={20}
                    className="text-blue-main"
                  />
                </div>
              </div>
            </div>

            {/* chat content */}
            <div className="relative flex w-full flex-row h-[calc(100%-44px)] box-border">
              <div className="relative max-w-full w-full h-full flex flex-col">
                {/* conversation start */}
                <div className="relative z-10"></div>

                {/* messages content */}
                <div className="relative h-full">
                  <div className="h-full overflow-auto text-center">
                    <div className="m-0 overflow-y-scroll scrollbar-thin h-full">
                      <div className="pt-4 pb-1">
                        {/* user message */}
                        <div className="w-full">
                          {/* <div
                          aria-label="Wednesday, May 29, 2024"
                          className="bg-black cursor-default rounded-sm py-[3px] px-[7px] opacity-85 inline-block text-xs mx-auto my-3 text-white"
                        >
                          May 29
                        </div> */}

                          <div className="mb-4 text-left box-border">
                            {/* user pic */}
                            <div className="sticky top-3  left-4 w-9 h-9 z-10 block">
                              <span>
                                <Link to="#">
                                  <img
                                    className="w-full h-full"
                                    src="/assets/bp-avatar.png"
                                    alt="user name"
                                  />
                                </Link>
                              </span>
                            </div>

                            {/* user content */}
                            <div className="pl-16 -mt-9">
                              {/* user info */}
                              {/* <div className="flex items-center mb-1">
                              <div className="font-bold mr-1 flex items-center">
                                <Link to="#">Amirbasiri</Link>
                                <span>
                                  <HiMiniCheckBadge size={15} />
                                </span>
                              </div>
                            </div> */}

                              {/* user messages */}
                              <ul className="m-0 p-0">
                                {siteMessages?.length
                                  ? siteMessages.map((msg, index) => (
                                      <SingleMsg msg={msg} key={index} />
                                    ))
                                  : null}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* scroll down icon */}
                  <span className="absolute right-8 bottom-8 z-20 drop-shadow-sm cursor-pointer hover:bg-gray-200 rounded-full p-1 transition">
                    <IoIosArrowDown size={20} className="text-blue-main" />
                  </span>
                </div>

                {/* message Input */}
                <div className="bg-white flex items-center gap-1 border-t border-[#d7d8db9e] z-10 w-full">
                  <div className="px-2">
                    <RiAttachment2 className="text-gray-500" size={24} />
                  </div>
                  <div className="relative border border-gray-200 w-full overflow-y-auto overflow-x-hidden">
                    <div>
                      <input
                        name="messageTitle"
                        value={messagetitle}
                        onChange={(e) => setMessagetitle(e.target.value)}
                        className="placeholder:text-sm w-full h-full border-none outline-none py-3 pl-4 pr-0 outline-offset-0"
                        type="text"
                        placeholder="Message title"
                      />
                    </div>
                    <div>
                      <textarea
                        name="messageBody"
                        value={messagebody}
                        onChange={(e) => setMessagebody(e.target.value)}
                        className="placeholder:text-sm w-full h-full border-none outline-none py-3 pl-4 pr-0 outline-offset-0 resize-none"
                        placeholder="Write your message ..."
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-4">
                    <button
                      disabled={sendMessageLoading}
                      onClick={() => setShowSignalMode(true)}
                      className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer drop-shadow-xl"
                    >
                      <FaChartLine className="text-blue-main " size={24} />
                    </button>
                    <button
                      disabled={sendMessageLoading}
                      onClick={sendMsgHandler}
                      className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer drop-shadow-xl"
                    >
                      <IoIosSend className="text-blue-main " size={24} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSignalMode ? (
        <WriteMessageSignalTemp setShowSignalMode={setShowSignalMode} />
      ) : null}
    </>
  );
};

export default Messages;
