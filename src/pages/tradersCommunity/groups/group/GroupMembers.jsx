import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getAcceptedGroupMembers } from "../../../../redux/features/groupSlice";
import { useEffect } from "react";

const GroupMembers = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { acceptedMembers, membersLoading, groupId } = useSelector(
    (state) => state.group
  );

  useEffect(() => {
    dispatch(
      getAcceptedGroupMembers({ axiosPrivate, communitygroupId: groupId })
    );
  }, []);
  const formatDate = (dateString) => {
    if (dateString) {
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
    } else return null;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mt-8 mb-2">
      <h2 className="text-gray-800 font-semibold text-lg mb-4">
        Group Members
      </h2>
      <div>
        {membersLoading ? (
          <div className="my-2 text-gray-500">Loading ... </div>
        ) : null}

        <ul className="flex flex-col gap-6 mt-6 pb-6">
          {acceptedMembers?.length
            ? acceptedMembers.map((memeber, index) => (
                <li
                  onClick={() => {}}
                  key={index}
                  className="flex items-center gap-3 hover:bg-slate-100 px-3 py-1 rounded-lg cursor-pointer"
                >
                  <div className="shrink-0 size-[50px] relative">
                    <img
                      className="rounded-full shrink-0 w-full h-ful border-2 border-gray-200 shadow-sm p-[1px] object-fill"
                      src="/assets/bp-avatar.png"
                      alt="Group Memeber"
                    />
                    {memeber?.isonline ? (
                      <span className="absolute size-[8px] rounded-full bg-green-500 z-[100] top-1 right-0"></span>
                    ) : null}
                  </div>
                  <div className="flex flex-col">
                    <div className="text-gray-600 text-base hover:text-gray-800 transition-all font-medium">
                      {memeber?.username}
                    </div>
                    {memeber?.isadmin ? (
                      <span className="text-xs text-blue-600">admin</span>
                    ) : null}
                  </div>
                </li>
              ))
            : !membersLoading && (
                <span className="text-gray-600 text-sm p-4">
                  There aren't any users, yet.
                </span>
              )}
        </ul>
      </div>
    </div>
  );
};

export default GroupMembers;
