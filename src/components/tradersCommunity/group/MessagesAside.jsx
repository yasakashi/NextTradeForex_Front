import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import {
  getAcceptedGroupMembers,
  getUserGroups,
  setGroupId,
} from "../../../redux/features/groupSlice";
import toast from "react-hot-toast";
import Moment from "react-moment";

const activeClass = "bg-blue-main text-gray-100";

const MessagesAside = () => {
  const groupId = localStorage.getItem("groupId");

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, userGroups, group, acceptedMembers } = useSelector(
    (state) => state.group
  );

  const [activeTab, setActiveTab] = useState("newest");
  const [filterItem, setFilterItem] = useState({
    fieldname: "createdatetime",
    ascending: false,
  });

  useEffect(() => {
    dispatch(
      getAcceptedGroupMembers({ axiosPrivate, communitygroupId: groupId })
    );
  }, [group]);

  useEffect(() => {
    dispatch(getUserGroups({ axiosPrivate, toast, sortitem: [filterItem] }));
  }, [filterItem]);

  const changeGroupIdhandler = (groupid) => {
    dispatch(setGroupId(groupid));
  };

  const handleSelectChange = (value) => {
    // const value = e.target.value;
    let sortConfig = {};

    switch (value) {
      case "lastactive":
        sortConfig = { fieldname: "createdatetime", ascending: false };
        break;
      case "newlycreated":
        sortConfig = { fieldname: "createdatetime", ascending: true };
        break;
      case "alphabetical":
        sortConfig = { fieldname: "title", ascending: true };
        break;
      default:
        sortConfig = { fieldname: "createdatetime", ascending: true };
    }

    setFilterItem(sortConfig);
  };

  return (
    <div className="p-6">
      <h3 className="text-lg pb-3 font-bold text-gray-900 border-b-2 border-blue-500 w-max ">
        Groups
      </h3>
      <div className="my-4 flex items-center flex-wrap gap-3 text-xs font-medium text-gray-500">
        <span
          onClick={() => {
            setActiveTab("newest");
            handleSelectChange("newlycreated");
          }}
          className={` border rounded-[5px] shadow-sm px-3 py-1 hover:bg-blue-light hover:text-gray-100 transition-all cursor-pointer ${
            activeTab === "newest" ? activeClass : ""
          }`}
        >
          Newest
        </span>
        <span
          onClick={() => {
            setActiveTab("active");
            handleSelectChange("active");
          }}
          className={`border rounded-[5px] shadow-sm px-3 py-1 hover:bg-blue-light hover:text-gray-100 transition-all cursor-pointer ${
            activeTab === "active" ? activeClass : ""
          }`}
        >
          Active
        </span>
        <span
          onClick={() => {
            setActiveTab("popular");
            handleSelectChange("popular");
          }}
          className={`border rounded-[5px] shadow-sm px-3 py-1 hover:bg-blue-light hover:text-gray-100 transition-all cursor-pointer ${
            activeTab === "popular" ? activeClass : ""
          }`}
        >
          Popular
        </span>
        <span
          onClick={() => {
            setActiveTab("alphabetical");
            handleSelectChange("alphabetical");
          }}
          className={`border rounded-[5px] shadow-sm px-3 py-1 hover:bg-blue-light hover:text-gray-100 transition-all cursor-pointer ${
            activeTab === "alphabetical" ? activeClass : ""
          }`}
        >
          Alphabetical
        </span>
      </div>

      <ul className="flex flex-col gap-2 mt-6 pb-6">
        {acceptedMembers?.length > 0
          ? acceptedMembers?.map((acceptedMember, index) => {
              return acceptedMember?.isadmin === false ? (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center cursor-pointer gap-2 px-3 py-1 rounded-md hover:bg-slate-100 transition-all flex-grow">
                    <div className="shrink-0 size-[35px] relative">
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
      </ul>
    </div>
  );
};

export default MessagesAside;
