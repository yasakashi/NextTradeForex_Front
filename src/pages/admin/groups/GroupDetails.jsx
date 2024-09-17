import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import {
  getGroupSignalChannels,
  getSignalChannel,
} from "../../../redux/features/signals/signalChannelsSlice";
import toast from "react-hot-toast";
import { getGroup } from "../../../redux/features/groupSlice";

const GroupDetails = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { groupId, group } = useSelector((state) => state.group);
  const { signalChannels, signalChanneslLoading } = useSelector(
    (state) => state.signalChannel
  );

  useEffect(() => {
    dispatch(
      getGroupSignalChannels({
        axiosPrivate,
        data: { communitygroupId: groupId },
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getGroup({ axiosPrivate, id: groupId }));
  }, [groupId]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  return (
    <div>
      <div>
        <h4 className="text-gray-700 text-base font-bold">Group Details</h4>
        <div className="shadow-md mt-5 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <label>
            <span className="font-semibold text-base text-gray-600">
              Group Name :
            </span>
            <span className="text-sm">Forex</span>
          </label>

          <label>
            <span className="font-semibold text-base text-gray-600">
              Group owner :
            </span>
            <span className="text-sm">Amir basiri</span>
          </label>

          <label>
            <span className="font-semibold text-base text-gray-600">
              Group Type :
            </span>
            <span className="text-sm">Public</span>
          </label>

          <label>
            <span className="font-semibold text-base text-gray-600">
              Members :
            </span>
            <span className="text-sm">13</span>
          </label>

          <label>
            <span className="font-semibold text-base text-gray-600">
              Channels :
            </span>
            <span className="text-sm">4</span>
          </label>

          <label>
            <span className="font-semibold text-base text-gray-600">
              Messages :
            </span>
            <span className="text-sm">17</span>
          </label>

          <label>
            <span className="font-semibold text-base text-gray-600">
              Created At :
            </span>
            <span className="text-sm">
              {formatDate("2024-06-04T11:52:09.02")}
            </span>
          </label>

          <label className="col-span-1 md:col-span-2 lg:col-span-3">
            <span className="font-semibold text-base text-gray-600">
              Description :
            </span>
            <span className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
              nam hic harum ipsum eveniet.
            </span>
          </label>
        </div>
      </div>
      {/* signal Channels */}
      <div className="mt-8 bg-[#1c2434]">
        <h4 className="text-gray-700 text-base font-bold">Signal Channels</h4>

        <div className="shadow-md mt-5 rounded-lg p-4"></div>
      </div>
    </div>
  );
};

export default GroupDetails;
