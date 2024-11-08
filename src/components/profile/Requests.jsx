import { useEffect, useState } from "react";
import CustomBeatLoader from "../../utils/loaders/CustomBeatLoader";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  acceptMembershipRequest,
  getAllMembershipRequests,
} from "../../redux/features/groupSlice";
import toast from "react-hot-toast";

const Requests = () => {
  const [errorMsg, seterrorMsg] = useState(false);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const {
    membershipRequest,
    groupId,
    group,
    membersLoading,
    acceptMemberShipLoading,
  } = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(
      getAllMembershipRequests({ axiosPrivate, communitygroupId: groupId })
    );
  }, [group]);

  const acceptMembershipRequestHandler = ({ groupId, userId }) => {
    dispatch(
      acceptMembershipRequest({
        axiosPrivate,
        data: { communitygroupId: groupId, userId },
        toast,
      })
    );
  };

  function formatDate(dateString) {
    if (dateString) {
      const date = new Date(dateString);

      // Format date to "DD Mon YYYY"
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      // Format time to "HH:MM"
      const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Return the formatted date and time as "DD Mon YYYY, HH:MM"
      return `${formattedDate}, ${formattedTime}`;
    } else return null;
  }

  return (
    <div className="text-white">
      <h3 className="text-white text-xl my-4 font-bold">Membership Requests</h3>
      <div className="mt-10 mb-10 overflow-y-scroll max-h-[40vh] max-w-[90vw] w-full overflow-x-scroll scrollbar-none mx-auto">
        <table className="bg-gray-100 text-gray-900 w-full">
          <thead className=" text-gray-900 bg-blue-light">
            <tr className="text-sm text-white">
              <th className="p-3 bg-blue-dark border border-white">Count</th>
              <th className="p-3 bg-blue-dark border border-white">Username</th>
              <th className="p-3 bg-blue-dark border border-white">Group</th>
              <th className="p-3 bg-blue-dark border border-white">
                Requested Time
              </th>
              <th className="p-3 bg-blue-dark border border-white">Action</th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 text-[#5a5c69]">
            {membershipRequest?.length ? (
              membershipRequest?.map((request, index) => (
                <tr key={index} className="bg-gray-200 shadow-sm">
                  <td className="p-3 border border-gray-300 text-center ">
                    {index + 1}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {request?.username || "-"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {request?.communitygrouptitle || "-"}
                  </td>

                  <td className="p-3 border border-gray-300 text-center ">
                    {request?.requestdatetime
                      ? formatDate(request?.requestdatetime) || "-"
                      : null}
                  </td>

                  <td className="p-3 min-w-[200px] border border-gray-300 text-center flex items-center gap-2 justify-center">
                    <button
                      disabled={acceptMemberShipLoading}
                      onClick={() =>
                        acceptMembershipRequestHandler({
                          groupId: request?.communitygroupId,
                          userId: request?.userId,
                        })
                      }
                      className="bg-green-600 disabled:opacity-65 disabled:cursor-not-allowed px-3 py-1 rounded-md text-white text-sm cursor-pointer shadow-md"
                    >
                      {acceptMemberShipLoading ? (
                        <CustomBeatLoader color="#fff" />
                      ) : (
                        "Accept"
                      )}
                    </button>
                    <button className="bg-red-600 px-3 py-1 rounded-md text-white text-sm cursor-pointer shadow-md">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : membersLoading === true ? (
              <tr className="text-center">
                <td
                  colSpan={11}
                  className="pt-10 border border-gray-300 pb-10 "
                >
                  <div className="flex items-center justify-center w-full gap-3">
                    <span className="text-blue-light text-lg">
                      Fetching data ...
                    </span>
                    <CustomBeatLoader />
                  </div>
                </td>
              </tr>
            ) : errorMsg ? (
              <tr className="text-center">
                <td colSpan={11} className="pt-10 border border-gray-300 pb-10">
                  <span className="text-sm text-red-600">
                    Server not responded!. please try again later
                  </span>
                </td>
              </tr>
            ) : (
              <tr className="text-center">
                <td colSpan={11} className="pt-10 border border-gray-300 pb-10">
                  <span>No Request Has Been Found!</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
