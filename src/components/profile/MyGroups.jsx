import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getUserGroups } from "../../redux/features/groupSlice";
import { useEffect } from "react";
import CustomCircleLoader from "../../utils/loaders/CustomCircleLoader";
import { AiFillPlusSquare } from "react-icons/ai";

const MyGroups = () => {
  const { createGroupStatus, isLoading, errorMsg, userGroups } = useSelector(
    (state) => state.group
  );
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    dispatch(getUserGroups({ axiosPrivate }));
  }, []);

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
            to="/user-profile/myCourses/new-course"
            className="flex items-center gap-2 btn_bg-gradient_3 bg-auto shadow-xl text-blue-dark px-4 py-2 rounded-md text-base font-semibold"
          >
            <AiFillPlusSquare size={20} />
            Create a Group
          </Link>
        </div>
      </div>
      <div>
        <h5 className="my-4 text-xl font-semibold text-gray-300">My Groups </h5>

        <div className="bg-white shadow-xl rounded-lg w-full p-4 overflow-x-scroll">
          <table className="w-full sm:min-w-[600px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-gray-600 font-normal text-base border border-gray-300 text-center px-2 py-1"></th>
                <th className="text-gray-600 font-normal text-base border border-gray-300 text-center px-2 py-1">
                  Group Name
                </th>
                <th className="text-gray-600 font-normal text-base border border-gray-300 text-center px-2 py-1">
                  Type
                </th>
                <th className="text-gray-600 font-normal text-base border border-gray-300 text-center px-2 py-1">
                  Members
                </th>
                <th className="text-gray-600 font-normal text-base border border-gray-300 text-center px-2 py-1">
                  Signal Channels
                </th>
                <th className="text-gray-600 font-normal text-base border border-gray-300 text-center px-2 py-1">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {userGroups?.length > 0
                ? userGroups?.map((group, index) => (
                    <tr key={index}>
                      <td className="text-center border border-gray-300 text-[15px] text-gray-700 px-2 py-1">
                        {index + 1}
                      </td>
                      <td className="group text-center border border-gray-300 text-[15px] text-gray-700 px-2 py-1">
                        <Link
                          className="text-blue-accent font-medium group-hover:underline cursor-pointer"
                          to={`/traders-community/groups/${group?.title}`}
                        >
                          {group?.title}
                        </Link>
                      </td>
                      <td className="text-center border border-gray-300 text-[15px] text-gray-700 px-2 py-1">
                        {group?.grouptypename}
                      </td>
                      <td className="text-center border border-gray-300 text-[15px] text-gray-700 px-2 py-1">
                        {group?.membercount ? group?.membercount : 0}
                      </td>
                      <td className="text-center border border-gray-300 text-[15px] text-gray-700 px-2 py-1">
                        {group?.signalchannelcount
                          ? group?.signalchannelcount
                          : 0}
                      </td>
                      <td className="text-center border border-gray-300 text-[15px] text-gray-700 px-2 py-1">
                        {formatDate(group?.createdatetime)}
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
        {/* {isLoading ? (
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
        )} */}
      </div>
    </div>
  );
};

export default MyGroups;
