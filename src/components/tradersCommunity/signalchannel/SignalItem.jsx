import { GoArrowUpRight } from "react-icons/go";
import CustomBeatLoader from "../../../utils/loaders/CustomBeatLoader";
import { CiLock, CiStar } from "react-icons/ci";
import { MdReply } from "react-icons/md";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

const SignalItem = ({
  item,
  alltime,
  signalChannel,
  activeSignalId,
  showSignalModal,
  setShowSignalModal,
  removeSignalHandler,
  removingSignalId,
  setSignalData,
  setShowSignalDetailModal,
  removeSignalLoading,
  handleModalToggle,
  signalModalRef,
  signalChannelId,
}) => {
  const user = localStorage.getItem("user");
  return (
    <div
      className={`group cursor-pointer h-auto opacity-100 pr-5 flex flex-row items-center mb-5 p-0 max-w-full relative `}
    >
      <div
        onClick={() => {
          setSignalData(item);
          setShowSignalDetailModal(true);
        }}
        className="grid grid-cols-2 relative shadow-lg justify-evenly w-[calc(100%-75px)] bg-link-water text-black rounded-[4px] text-left py-3 px-3"
      >
        <div className="">
          <span className="text-sm font-semibold text-gray-700">Analysis</span>
          <div className="p-4">
            <div className="flex items-center gap-2">
              <ul>
                <li>{alltime(item)}</li>
              </ul>
              <div className="text-xs gap-1 bg-[#22ab94] text-white px-2 py-1 rounded-sm w-max flex items-center">
                <GoArrowUpRight size={18} />
                long
              </div>
            </div>
            <ul className="flex flex-wrap items-center gap-2 my-2">
              <li className="bg-gold-light_400 rounded-[20px] px-2 text-xs cursor-pointer w-max text-white py-1">
                #{item?.analysistypename}
              </li>
              <li className="bg-gold-light_400 rounded-[20px] px-2 text-xs cursor-pointer w-max text-white py-1">
                #{item?.marketsyclename}
              </li>
            </ul>
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-700">
            Trading Setup
          </span>
          <div className="w-[80%] px-4 mt-3 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-red-600 text-sm uppercase">SL</span>
              <span className="text-red-600 text-sm">{item?.sl}</span>
            </div>
            {item?.tp1 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm uppercase">TP1</span>
                <span className="text-green-600 text-sm">{item?.tp1}</span>
              </div>
            )}

            {item?.tp2 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm uppercase">TP2</span>
                <span className="text-green-600 text-sm">{item?.tp2}</span>
              </div>
            )}

            {item?.tp3 && (
              <div className="flex justify-between items-center">
                <span className="text-green-600 text-sm uppercase">TP3</span>
                <span className="text-green-600 text-sm">{item?.tp3}</span>
              </div>
            )}
          </div>
        </div>
        {removingSignalId === item.id && removeSignalLoading && (
          <div className="absolute flex items-center justify-center w-full h-full rounded-md bg-black opacity-30 top-0 left-0">
            <CustomBeatLoader color="#fff" />
          </div>
        )}

        {signalChannel?.owneruserid !== user.userid &&
        signalChannel?.isneedpaid ? (
          <div className="absolute flex items-center justify-center w-full h-full bg-gray-200 opacity-50 top-0 left-0">
            <CiLock size={40} />
          </div>
        ) : null}

        {/* CiLock */}
        {/* check if channel is paid */}
      </div>

      <span
        className={` transition group-hover:flex items-center space-x-2 ml-1 text-sm ${
          showSignalModal ? "flex" : "hidden"
        }`}
      >
        <span className="cursor-pointer">
          <CiStar className="text-[#fdae00]" size={15} />
        </span>
        <span className="cursor-pointer">
          <MdReply className="text-[#808080]" size={13} />
        </span>
        <span
          onClick={() => handleModalToggle(item.id)}
          className="cursor-pointer"
        >
          <IoEllipsisVerticalSharp size={13} className="text-[#808080]" />
        </span>
      </span>

      {activeSignalId === item.id && showSignalModal ? (
        <div
          ref={signalModalRef}
          className="absolute top-1/2 -translate-y-1/2 z-[1003] right-20 bg-white shadow-md rounded-md p-2"
        >
          {/* <Link
            to={`/traders-community/groups/${name}/update-signal/${signalChannelId}`}
            className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer transition-all text-gray-500 text-sm px-7 py-2 rounded-md"
          >
            <MdEdit size={14} />

            <span>Show Signal</span>
          </Link> */}

          <div className="flex items-center gap-2 cursor-pointer transition-all text-sm px-7 py-2 rounded-md">
            <FaRegTrashAlt className="text-red-600" size={14} />

            <span
              onClick={() => {
                setShowSignalModal(false);
                removeSignalHandler(item?.id);
              }}
              className="text-red-600 hover:underline"
            >
              Remove Signal
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SignalItem;
