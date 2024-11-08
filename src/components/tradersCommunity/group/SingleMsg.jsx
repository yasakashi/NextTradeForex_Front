import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { MdOutlineEdit, MdReply } from "react-icons/md";
import useClickOutside from "../../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { removeMessage } from "../../../redux/features/messageSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import SignalItem from "../signalchannel/SignalItem";

const SingleMsg = ({ msg }) => {
  const [activeMessageModal, setActiveMessageModal] = useState(null);
  const [deletedMsgId, setDeletedMsgId] = useState(null);

  const messageRef = useRef(null);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const toggleEditModalHandler = (id) => {
    if (activeMessageModal === id) {
      setActiveMessageModal(null);
    } else {
      setActiveMessageModal(id);
    }
  };
  const removeMessageHandler = (id) => {
    setDeletedMsgId(id);
    setActiveMessageModal(null);
    dispatch(
      removeMessage({ axiosPrivate, data: { id }, toast, setDeletedMsgId })
    );
  };

  useClickOutside(messageRef, () => {
    setActiveMessageModal(null);
  });
  const formatDate = (isoString) => {
    // Create a Date object from the ISO string
    const date = new Date(isoString);

    // Options for date and time formatting
    const dateOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
    };

    // Format the date and time
    const formattedDate = date.toLocaleDateString("en-GB", dateOptions); // 'en-GB' gives date in "DD Month YYYY" format
    const formattedTime = date.toLocaleTimeString("en-GB", timeOptions); // 'en-GB' gives time in "HH:MM" format

    // Combine formatted date and time
    return `${formattedDate} ${formattedTime}`;
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
  return (
    <div className="group cursor-pointer h-auto opacity-100 pr-5 relative flex flex-row items-center w-auto mb-3 p-0 max-w-full">
      <div
        className={`max-w-[calc(100%-75px)] relative flex flex-col justify-end items-end gap-2 bg-[#e8e8e8] text-black rounded-[4px] text-left py-2 px-1 ${
          msg?.issignaltemplate ? "w-full" : "w-max"
        }`}
      >
        {msg?.issignaltemplate ? (
          <SignalItem
            item={JSON.parse(msg.messagebody)}
            alltime={alltime}
            pageType="signalTemp"
          />
        ) : (
          <div className="bg-[#8b9ae5] w-max p-1 px-4 shadow-sm rounded-md">
            <h4 className="text-sm font-semibold text-gray-800 py-1">
              {msg?.messagetitle}
            </h4>

            <p className="text-sm text-gray-700">{msg?.messagebody}</p>
          </div>
        )}

        <span className="ml-2">
          <span className="text-[10px] whitespace-nowrap px-2">
            {msg?.registerdatetime ? formatDate(msg?.registerdatetime) : null}
          </span>
        </span>
        {activeMessageModal === msg?.id ? (
          <div
            ref={messageRef}
            className="absolute z-[100] shadow-md top-0 right-0 bg-gray-100 rounded-lg"
          >
            <ul>
              <li className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 transition-all text-sm px-10 py-2 rounded-md text-blue-600 text-nowrap">
                <MdOutlineEdit className="text-blue-600" size={14} />
                Edit
              </li>
              <li
                onClick={() => removeMessageHandler(msg?.id)}
                className="flex items-center gap-2 cursor-pointer hover:bg-slate-200 transition-all text-sm px-10 py-2 rounded-md text-red-600 text-nowrap"
              >
                <FaRegTrashAlt className="text-red-600" size={14} />
                Delete
              </li>
            </ul>
          </div>
        ) : null}
      </div>

      {/*  */}
      <span className="hidden transition group-hover:flex items-center space-x-2 ml-1 text-sm">
        <span className="cursor-pointer">
          <CiStar className="text-[#fdae00]" size={15} />
        </span>
        <span className="cursor-pointer">
          <MdReply className="text-[#808080]" size={13} />
        </span>
        <span
          onClick={() => toggleEditModalHandler(msg?.id)}
          className="cursor-pointer"
        >
          <IoEllipsisVerticalSharp size={13} className="text-[#808080]" />
        </span>
      </span>
    </div>
  );
};

export default SingleMsg;
