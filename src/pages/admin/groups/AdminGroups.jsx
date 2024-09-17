import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { getSignalChannel } from "../../../redux/features/signals/signalChannelsSlice";
import {
  clearGroupId,
  getAllGroups,
  setGroupId,
} from "../../../redux/features/groupSlice";
import { useEffect } from "react";
import CustomBeatLoader from "../../../utils/loaders/CustomBeatLoader";
import { Link } from "react-router-dom";

const AdminGroups = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { allGroups, isLoading, errorMsg } = useSelector(
    (state) => state.group
  );

  useEffect(() => {
    dispatch(getAllGroups({ axiosPrivate }));
  }, []);

  function formatDate(timeString) {
    const time = new Date(timeString);
    const options = { month: "short", year: "numeric" };
    return time.toLocaleString("en-US", options);
  }
  return (
    <div className="flex items-start justify-center ">
      <div className="text-left w-full">
        <h4 className="text-gold-light_400 p-4 rounded-lg font-semibold text-xl">
          Groups
        </h4>
        <div className="mt-6 min-w-[700px] overflow-y-scroll h-[60vh] overflow-x-scroll scrollbar-none text-[#5a5c69] mx-auto">
          <table className="bg-gray-100 text-gray-900 w-full">
            <thead className="bg-gray-100 sticky top-0 text-gray-900">
              <tr className="bg-blue-light text-white text-sm text-center">
                <th className="px-3 py-3"> select</th>
                <th className="px-3 py-3"> row</th>
                <th className="px-3 py-3"> Group Name</th>
                <th className="px-3 py-3"> Type </th>
                <th className="px-3 py-3"> Memebers </th>
                <th className="px-3 py-3"> Messages </th>
                <th className="px-3 py-3"> Owner Username </th>
                <th className="px-3 py-3"> Channels </th>
                <th className="px-3 py-3"> Description </th>
                <th className="px-3 py-3"> Created At </th>
                <th className="px-3 py-3"> </th>
              </tr>
            </thead>

            <tbody className="bg-gray-100 text-[#5a5c69]">
              {allGroups?.length ? (
                allGroups.map((group, index) => (
                  <tr
                    key={index}
                    className="bg-link-water shadow-sm cursor-pointer hover:bg-[#e4e9f5] transition-all text-sm"
                  >
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      <input type="checkbox" />
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {index + 1}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {group?.title || "---"}
                    </td>

                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {group?.grouptypename || "---"}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {group?.membercount || 0}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {group?.messagecount || 0}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {group?.ownerusername || "---"}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {group?.signalchannelcount || 0}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {group?.description || "---"}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center ">
                      {formatDate(group?.createdatetime)}
                    </td>
                    <td className="py-2 px-1 border border-gray-300 text-center bg-gold-light_400 text-white">
                      <Link
                        onClick={() => dispatch(setGroupId(group?.id))}
                        to="/admin/groups/group-detail"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : isLoading == true ? (
                <tr className="text-center">
                  <td
                    colSpan={11}
                    className="pt-10 border border-gray-300 pb-10 "
                  >
                    <div className="flex items-center justify-center w-full gap-3">
                      <span className="text-blue-light text-lg">
                        Fetching data ...{" "}
                      </span>
                      <CustomBeatLoader />
                    </div>
                  </td>
                </tr>
              ) : errorMsg ? (
                <tr className="text-center">
                  <td
                    colSpan={11}
                    className="pt-10 border border-gray-300 pb-10"
                  >
                    <span className="text-sm text-red-600">
                      Server not responded!. please try again later
                    </span>
                  </td>
                </tr>
              ) : (
                <tr className="text-center">
                  <td
                    colSpan={11}
                    className="pt-10 border border-gray-300 pb-10"
                  >
                    <span>Data Not Found!</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminGroups;
