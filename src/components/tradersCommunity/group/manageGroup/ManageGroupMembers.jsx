import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import {
  chagneGroupUserType,
  getAcceptedGroupMembers,
} from "../../../../redux/features/groupSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";

const ManageGroupMemebers = () => {
  const groupId = localStorage.getItem("groupId");

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { group, acceptedMembers, changeUserTypeLoading, membersLoading } =
    useSelector((state) => state.group);

  useEffect(() => {
    dispatch(
      getAcceptedGroupMembers({ axiosPrivate, communitygroupId: groupId })
    );
  }, [group]);

  const promoteGroupMemberToAdmin = (userid) => {
    dispatch(
      chagneGroupUserType({
        axiosPrivate,
        data: {
          communitygroupId: groupId,
          userId: userid,
          isadmin: true,
        },
        toast,
      })
    );
  };

  return (
    <div>
      {console.log({ acceptedMembers })}
      {membersLoading ? (
        <div className="my-4 mx-auto flex justify-center items-center">
          <CustomBeatLoader />
        </div>
      ) : null}
      <div>
        <h3 className="text-xl text-gray-600">Administrators</h3>

        {acceptedMembers?.length > 0
          ? acceptedMembers?.map((acceptedMember, index) => {
              return acceptedMember?.isadmin === true ? (
                 <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center mt-8 gap-4 md:gap-6 lg:gap-10 cursor-pointer p-3 rounded-md hover:bg-slate-100 transition-all flex-grow">
                    <div className="shrink-0 size-[50px] relative">
                      <img
                        className="rounded-full shrink-0 w-full h-ful border-2 border-gray-200 shadow-sm p-[1px] object-fill"
                        src="/assets/bp-avatar.png"
                        alt="Group Memeber"
                      />
                      {acceptedMember?.isonline ? (
                        <span className="absolute size-[8px] rounded-full bg-green-500 z-[100] top-1 right-0"></span>
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-600 text-base hover:text-gray-800 transition-all font-medium">
                        {acceptedMember?.username}
                      </div>
                      {acceptedMember?.isadmin ? (
                        <span className="text-xs text-blue-600">admin</span>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null;
            })
          : null}
      </div>

      <div className="my-10 md:my-20">
        <h3 className="text-xl text-gray-600">Moderators</h3>
        <p className="text-white bg-blue-light text-sm p-2 rounded-md mt-4">
          No group moderators were found.
        </p>
      </div>

      <div>
        <h3 className="text-xl text-gray-600">Memebers</h3>

        {acceptedMembers?.length > 0
          ? acceptedMembers?.map((acceptedMember, index) => {
              return acceptedMember?.isadmin === false ? (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center mt-8 gap-4 md:gap-6 lg:gap-10 cursor-pointer p-3 rounded-md hover:bg-slate-100 transition-all flex-grow">
                    <div className="shrink-0 size-[50px] relative">
                      <img
                        className="rounded-full shrink-0 w-full h-ful border-2 border-gray-200 shadow-sm p-[1px] object-fill"
                        src="/assets/bp-avatar.png"
                        alt="Group Memeber"
                      />
                      {acceptedMember?.isonline ? (
                        <span className="absolute size-[8px] rounded-full bg-green-500 z-[100] top-1 right-0"></span>
                      ) : null}
                    </div>
                    <div className="flex flex-col">
                      <div className="text-gray-600 text-base hover:text-gray-800 transition-all font-medium">
                        {acceptedMember?.username}
                      </div>
                      {acceptedMember?.isadmin ? (
                        <span className="text-xs text-blue-600">admin</span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col px-10 items-start">
                    <button className="text-gray-400 text-[13px] hover:underline">
                      Kick & Ban
                    </button>
                    <button className="text-gray-400 text-[13px] hover:underline">
                      Promote To Mod
                    </button>
                    <button
                      onClick={() =>
                        promoteGroupMemberToAdmin(acceptedMember?.userid)
                      }
                      className={`text-gray-400 text-[13px] hover:underline ${
                        changeUserTypeLoading ? "cursor-wait" : ""
                      }`}
                    >
                      Promote To Admin
                    </button>

                    <button className="text-gray-400 text-[13px] hover:underline">
                      Remove From Group
                    </button>
                  </div>
                </div>
              ) : null;
            })
          : null}
      </div>
    </div>
  );
};

export default ManageGroupMemebers;
