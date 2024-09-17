import { BsArrowsAngleExpand } from "react-icons/bs";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniCheckBadge } from "react-icons/hi2"; 
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";

import { FaTrashCan } from "react-icons/fa6";
import {
  getSignalChannel,
  removeSignalChannel,
} from "../../../redux/features/signals/signalChannelsSlice";
import CustomBeatLoader from "../../../utils/loaders/CustomBeatLoader";
import useClickOutside from "../../../hooks/useClickOutside";
import {
  getSignals,
  removeSignalAction,
} from "../../../redux/features/signals/SignalSlice";
import { BsArrowsAngleContract } from "react-icons/bs";
import toast from "react-hot-toast";
import SignalItem from "../../../components/tradersCommunity/signalchannel/SignalItem";
import SignalModal from "../../../components/tradersCommunity/signalchannel/SignalModal";

const SignalChannel = ({ id }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const signalChannelOwnerId = JSON.parse(
    localStorage.getItem("signalChannelOwnerId")
  );
  const signalChannelId = localStorage.getItem("signalChannelId");
  const groupId = localStorage.getItem("groupId");
  const name = localStorage.getItem("groupname");

  // const groupId = JSON.parse(localStorage.getItem("groupId"));

  const [showRemoveChannelModal, setShowRemoveChannelModal] = useState(false);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showSignalModal, setShowSignalModal] = useState(false);
  const [fullPage, setFullPage] = useState(false);
  const [activeSignalId, setActiveSignalId] = useState(null);
  const [removingSignalId, setRemovingSignalId] = useState(null);
  const [showSignalDetailModal, setShowSignalDetailModal] = useState(false);
  const [signalData, setSignalData] = useState({});

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  // const { name } = useParams();

  const { signals, signal, signalsLoading, removeSignalLoading } = useSelector(
    (state) => state.addSignal
  );
  const { removeSignalChannelLoading, getSignalChannelLoading, signalChannel } =
    useSelector((state) => state.signalChannel);

  const signalModalRef = useRef(null);
  const channelModal = useRef(null);

  useClickOutside(channelModal, () => {
    setShowChannelModal(false);
  });

  useClickOutside(signalModalRef, () => {
    setShowSignalModal(false);
  });

  useEffect(() => {
    if (signalChannelId) {
      dispatch(
        getSignalChannel({
          axiosPrivate,
          data: {
            communitygroupId: groupId,
            Id: signalChannelId,
          },
        })
      );
    }
    console.log("signalChannelId", signalChannelId);
  }, [signalChannelId]);

  useEffect(() => {
    if (signalChannelId) {
      dispatch(
        getSignals({
          axiosPrivate,
          data: { signalchannelId: signalChannelId },
        })
      );
    }
  }, [signalChannelId, signalChannel, signal]);

  const handleModalToggle = (id) => {
    setShowSignalModal(true);
    setActiveSignalId(activeSignalId === id ? null : id);
  };
  const timeFrames = [
    "timeframe_1min",
    "timeframe_5min",
    "timeframe_15min",
    "timeframe_30min",
    "timeframe_1houre",
    "timeframe_4houre",
    "timeframe_8houre",
    "timeframe_1day",
    "timeframe_1week",
    "timeframe_1month",
  ];
  const converter = (i) => {
    return i.replace("timeframe_", "");
  };

  const alltime = (item) => {
    var l = [];
    timeFrames.forEach((i, index) => {
      if (item[i]) {
        l.push(
          <span className="text-gray-600 text-sm mx-1 px-1" key={index}>
            {converter(i)},
          </span>
        );
      }
    });
    return l;
  };

  const removeSignalHandler = (id) => {
    setRemovingSignalId(id);
    setShowSignalModal(false);
    dispatch(
      removeSignalAction({
        axiosPrivate,
        data: { Id: id, communitygroupId: groupId },
        toast,
      })
    ).then(() => {
      setRemovingSignalId(null);
    });
  };

  const removeSignalChannelModal = async () => {
    const removeRes = await dispatch(
      removeSignalChannel({ axiosPrivate, data: { id: signalChannelId } })
    );
    console.log(removeRes);
    if (removeRes?.payload?.messageCode === 200) {
      setShowRemoveChannelModal(false);
      localStorage.removeItem("signalChannelId");
      setShowRemoveChannelModal(false);
    }
  };

  return (
    <>
      <div className="mt-10 bg-white rounded-sm shadow-sm">
        {signalChannelId && signalChannel ? (
          <div
            className={`border ${
              fullPage
                ? "fixed  z-[1009] h-screen w-full top-0 left-0 bg-white"
                : "h-[630px]"
            }`}
          >
            <div className="h-full w-full">
              {/* chat header */}
              <div className="flex relative justify-between items-center h-11 w-full border-b border-[#ebebeb] px-2">
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
                  {getSignalChannelLoading ? (
                    <CustomBeatLoader />
                  ) : (
                    <div className="flex flex-col items-start justify-start ">
                      <div className="capitalize whitespace-nowrap text-sm">
                        <Link to="#">{signalChannel?.title}</Link>
                      </div>

                      <div className="flex items-center gap-1 text-xs whitespace-nowrap text-gray-500">
                        <span>{signalChannel?.grouptypename}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-5 pr-3">
                  <span
                    onClick={() => setFullPage((prev) => !prev)}
                    className="cursor-pointer"
                  >
                    {fullPage ? (
                      <BsArrowsAngleContract
                        className="text-blue-main font-bold"
                        size={18}
                      />
                    ) : (
                      <BsArrowsAngleExpand
                        className="text-blue-main font-bold"
                        size={18}
                      />
                    )}
                  </span>
                  <div
                    onClick={() => setShowChannelModal((prev) => !prev)}
                    className="cursor-pointer"
                  >
                    <IoEllipsisVerticalSharp
                      size={20}
                      className="text-blue-main"
                    />
                  </div>
                </div>

                {/* channel modal */}
                {showChannelModal && (
                  <div
                    ref={channelModal}
                    className="absolute top-10 right-5 bg-white shadow-md py-4 rounded-md z-[1003] flex flex-col items-start gap-1"
                  >
                    <Link
                      to={`/traders-community/groups/${name}/update-signal-channel/${signalChannelId}`}
                      className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all text-gray-500 text-sm py-2 w-full px-2 rounded-md"
                    >
                      <MdEdit size={14} />

                      <span>Edit Channel</span>
                    </Link>
                    <button
                      className="group flex gap-2 items-center text-red-600 text-sm py-1 rounded-md px-2"
                      onClick={() => {
                        setShowChannelModal(false);
                        setShowRemoveChannelModal(true);
                      }}
                    >
                      <FaTrashCan className="" size={14} />
                      Remove Channel
                    </button>
                  </div>
                )}
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
                        {signalsLoading ? (
                          <div className="mt-10 text-gray-600 text-2xl ">
                            Loading ...
                          </div>
                        ) : (
                          <div className="pt-4 pb-1">
                            {signals?.length ? (
                              <div className="w-full">
                                <div
                                  aria-label="Wednesday, May 29, 2024"
                                  className="bg-black cursor-default rounded-sm py-[3px] px-[7px] opacity-85 inline-block text-xs mx-auto my-3 text-white"
                                >
                                  May 29
                                </div>

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
                                    <div className="flex items-center mb-1">
                                      <div className="font-bold mr-1 flex items-center">
                                        <Link to="#">
                                          {user?.username || "unKnown user"}
                                        </Link>
                                        <span>
                                          <HiMiniCheckBadge size={15} />
                                        </span>
                                      </div>
                                    </div>

                                    {/* user messages */}
                                    <ul className="m-0 p-0">
                                      {/* signal item */}
                                      {signals?.map((item, index) => (
                                        <SignalItem
                                          activeSignalId={activeSignalId}
                                          signalChannel={signalChannel}
                                          item={item}
                                          key={index}
                                          alltime={alltime}
                                          showSignalModal={showSignalModal}
                                          setShowSignalModal={
                                            setShowSignalModal
                                          }
                                          removeSignalHandler={
                                            removeSignalHandler
                                          }
                                          removingSignalId={removingSignalId}
                                          setSignalData={setSignalData}
                                          setShowSignalDetailModal={
                                            setShowSignalDetailModal
                                          }
                                          removeSignalLoading={
                                            removeSignalLoading
                                          }
                                          handleModalToggle={handleModalToggle}
                                          signalModalRef={signalModalRef}
                                          signalChannelId={signalChannelId}
                                        />
                                      ))}

                                      {/* not signals */}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="my-10 flex justify-center items-center gap-2 text-gray-500">
                                NO SIGNALS YET.
                                <Link
                                  to={`/traders-community/groups/${name}/create-signal`}
                                  className="text-blue-main underline font-semibold"
                                >
                                  Create New Signal
                                </Link>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* scroll down icon */}
                    <span className="absolute right-8 bottom-8 z-20 drop-shadow-sm cursor-pointer hover:bg-gray-200 rounded-full p-1 transition">
                      <IoIosArrowDown size={20} className="text-blue-main" />
                    </span>
                  </div>

                  {user?.userid === signalChannelOwnerId ? (
                    <div className="px-3 py-2 border-t w-full flex justify-between items-center">
                      <Link
                        className="text-blue-main text-sm border hover:border-blue-secondary hover:underline transition-all border-blue-main px-3 py-1 rounded-md"
                        to={`/traders-community/groups/${name}/create-signal`}
                      >
                        Create New Signal
                      </Link>

                      <button
                        className="group flex gap-2 items-center text-red-600 text-sm border hover:bg-red-600 hover:text-white transition-all border-red-600 px-3 py-1 rounded-md"
                        onClick={() => setShowRemoveChannelModal(true)}
                      >
                        <FaTrashCan
                          className="group-hover:text-white text-red-600"
                          size={20}
                        />
                        Remove Channel
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* create signl channel */}
            </div>
          </div>
        ) : (
          <div className="min-h-[200px] flex items-center justify-center text-gray-600 text-xl uppercase">
            {signalsLoading ? (
              <div>Loading ... </div>
            ) : (
              <div> Choose a signal channel.</div>
            )}
          </div>
        )}
      </div>

      {showRemoveChannelModal && (
        <div className="fixed inset-0 w-full h-screen z-[1001] flex justify-center items-center">
          <div className="bg-black absolute inset-0 opacity-45 w-full h-screen"></div>
          <div className="bg-white relative rounded-lg shadow-lg w-[300px] md:w-[400px] lg:w-[600px] p-4">
            <div>
              <h4 className="text-gray-700 text-xl">
                Do you want to remove this channel?
              </h4>
              <p className="text-gray-600 text-sm p-3">
                By removing this channel, you will lose all your data including
                signals and other datas!
              </p>
              <div className="flex items-center justify-end gap-3 mt-6 mb-2">
                <button
                  onClick={() => setShowRemoveChannelModal(false)}
                  className="text-gray-800 text-sm border outline-none font-semibold border-gray-500 rounded-md px-5 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={removeSignalChannelModal}
                  className="text-white bg-red-600 rounded-md px-4 py-2 font-semibold outline-none"
                >
                  {removeSignalChannelLoading ? (
                    <CustomBeatLoader color="#fff" />
                  ) : (
                    "Remove"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSignalDetailModal && (
        <SignalModal
          signal={signalData}
          setShowSignalDetailModal={setShowSignalDetailModal}
          alltime={alltime}
        />
      )}
    </>
  );
};

export default SignalChannel;
