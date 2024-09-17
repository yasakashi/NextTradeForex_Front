import { Link } from "react-router-dom";
import CummunityNavbar from "../../../components/tradersCommunity/Navbar";

import { RiArrowRightWideLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import GroupCard from "../../../components/tradersCommunity/groups/GroupCard";
import Footer from "../../../components/Footer";
import GroupsPageBanner from "../../../components/tradersCommunity/groups/GroupsPageBanner";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  getAllGroups,
  getUserGroups,
} from "../../../redux/features/groupSlice";
import { useEffect, useState } from "react";
import CustomBeatLoader from "../../../utils/loaders/CustomBeatLoader";
import { clearSignalChannelId } from "../../../redux/features/signals/SignalSlice";
import toast from "react-hot-toast";
import SideBar from "../../../components/tradersCommunity/SideBar";

const CommunityGroups = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { isLoading, allGroups, groupsForDisplay, userGroups } = useSelector(
    (state) => state.group
  );
  const [fetchStatus, setFetchStatus] = useState("allgroups");
  const [filterItem, setFilterItem] = useState({
    fieldname: "createdatetime",
    ascending: false,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(clearSignalChannelId());
    if (fetchStatus === "allgroups") {
      dispatch(
        getAllGroups({
          axiosPrivate,
          toast,
          sortitem: [filterItem],
          title: search,
        })
      );
    } else if (fetchStatus === "mygroups") {
      dispatch(getUserGroups({ axiosPrivate, toast }));
    }
  }, [fetchStatus, filterItem, search]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
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
    <>
      <SideBar />
      {/* {isLoading && (
        <div className="w-full h-screen fixed inset-0 z-[1001] flex justify-center items-center">
          <div className="w-full h-full absolute bg-black opacity-65"></div>
          <div className="z-[1002]">
            <CustomCircleLoader />
          </div>
        </div>
      )} */}
      <div className="bg-link-water w-full min-h-screen h-auto">
        <CummunityNavbar />
        <div className="px-14 md:px-20 lg:px-12 xl:px-20 max_w_main mx-auto">
          {/* banner */}
          <GroupsPageBanner
            setFetchStatus={setFetchStatus}
            allGroups={allGroups?.length}
            userGroups={userGroups?.length}
          />

          {/* searhc filter */}
          <div className="bg-white rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-2 shadow-md">
            <div className="">
              <div className="flex justify-between items-center border rounded-lg shadow-sm min-w-[300px] max-w-[500px]">
                <input
                  className="border-none outline-none bg-transparent p-2 w-full h-full"
                  type="text"
                  placeholder="Search Groups"
                  vlaue={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="bg-blue-light shadow-lg rounded-tr-lg rounded-br-lg py-3 px-4 text-white cursor-pointer">
                  <CiSearch size={24} />
                </span>
              </div>
            </div>

            <div className="w-full justify-start mt-6 md:mt-0   md:justify-end ml-auto flex items-center text-gray-600">
              <h4 className="w-max whitespace-nowrap">Order By : </h4>
              <select
                onChange={handleSelectChange}
                className="bg-gray-200 ml-2 w-full max-w-[300px] outline-none border-none text-sm text-grayo-600 shadow-sm py-2 pl-2 pr-1 rounded-md"
              >
                <option value="lastactive">Last Active</option>
                <option value="mostmembers">Most Members</option>
                <option value="newlycreated">Newly Created</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {isLoading && (
            <div className="w-full flex items-center justify-center mt-14">
              <CustomBeatLoader />
            </div>
          )}
          {/* groups items */}
          <div className="mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-4 p-1 m-1">
              {groupsForDisplay?.map((item, index) => (
                <GroupCard {...item} key={index} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center pb-[200px] mt-20">
            <div className="flex justify-center items-center gap-1">
              <div
                className={` bg-blue-light text-white size-[50px] flex items-center justify-center rounded-lg text-xl cursor-pointer hover:bg-blue-light hover:text-white transition-colors`}
              >
                1
              </div>
              <div className="bg-white size-[50px] flex items-center justify-center rounded-lg text-xl cursor-pointer hover:bg-blue-light hover:text-white transition-colors">
                2
              </div>
              <div className="bg-white size-[50px] flex items-center justify-center rounded-lg text-xl cursor-pointer hover:bg-blue-light hover:text-white transition-colors">
                <RiArrowRightWideLine size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityGroups;
