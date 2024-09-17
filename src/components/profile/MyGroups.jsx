import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserGroups } from "../../redux/features/groupSlice";
import { useEffect } from "react";
import CustomCircleLoader from "../../utils/loaders/CustomCircleLoader";

const MyGroups = () => {
  const { createGroupStatus, isLoading, errorMsg, userGroups } = useSelector(
    (state) => state.group
  );
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(getUserGroups({ axiosPrivate }));
  }, []);
  return (
    <div>
      <div className="flex items-center flex-wrap gap-4 justify-between">
        <div className="bg-white h-[40px] lg:h-[44px] p-1 pl-[14px] relative rounded-xl flex justify-between items-center">
          <input
            className="bg-transparent text-gray-600 border-none outline-none w-full h-full pr-5 placeholder:text-gray-600"
            type="text"
            placeholder="Search ..."
          />
          <button className="flex w-max h-full items-center  bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] px-3 rounded-lg  space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <div className="my-10">
          <Link
            className="border-2 text-gray-200 font-medium text-base border-gold-light_400 px-5 py-3 rounded-lg outline-none hover:bg-gold-light_400 transition"
            to="/traders-community/groups/create"
          >
            Create a group
          </Link>
        </div>
      </div>
      <div>
        <h5 className="my-4 text-xl font-semibold text-gray-300">My Groups </h5>
        {isLoading ? (
          <div className="w-full h-screen fixed inset-0 z-[1001] flex justify-center items-center">
            <div className="w-full h-full absolute bg-black opacity-65"></div>
            <div className="z-[1002]">
              <CustomCircleLoader />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {userGroups?.map((item, index) => (
              <div
                key={index}
                className="bg-blue-light shadow-xl cursor-pointer hover:scale-105 w-[240px] transition-all  px-4 py-3 rounded-lg"
              >
                <h4 className="text-gold-light_400 text-center font-semibold text-xl">
                  {item?.title || "---"}
                </h4>
                <span className="flex justify-center py-3 text-sm text-gray-200">
                  {item?.grouptypename || "---"}
                </span>

                <div className="my-3 flex justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-gray-100">0</span>
                    <span className="text-gray-400 text-sm ">Members</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-gray-100">10</span>
                    <span className="text-gray-400 text-sm ">Posts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyGroups;
