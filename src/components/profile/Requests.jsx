import { useEffect, useState } from "react";
import CustomBeatLoader from "../../utils/loaders/CustomBeatLoader";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { getAllMembershipRequests } from "../../redux/features/groupSlice";

const Requests = () => {
  const [reqeustsList, setRequestsList] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [errorMsg, seterrorMsg] = useState(false);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { membershipRequest, groupId, membersLoading } = useSelector(
    (state) => state.group
  );

  useEffect(() => {
    dispatch(
      getAllMembershipRequests({ axiosPrivate, communitygroupId: groupId })
    );
  }, []);

  return (
    <div className="text-white">
      <h3 className="text-white text-xl my-4 font-bold">Membership Requests</h3>
      <div className="mt-10 mb-10 overflow-y-scroll max-h-[40vh] max-w-[90vw] w-full overflow-x-scroll scrollbar-none mx-auto">
        <table className="bg-gray-100 text-gray-900 w-full">
          <thead className="bg-gray-100 text-gray-900">
            <tr className="text-sm text-white">
              <th className="p-3 bg-blue-dark border border-white">
                User Name
              </th>
              <th className="p-3 bg-blue-dark border border-white">
                Product Name
              </th>
              <th className="p-3 bg-blue-dark border border-white">
                Product Type
              </th>
              <th className="p-3 bg-blue-dark border border-white"> Amount </th>
              <th className="p-3 bg-blue-dark border border-white">
                Sender Address
              </th>
              <th className="p-3 bg-blue-dark border border-white">
                Organize Name
              </th>
              <th className="p-3 bg-blue-dark border border-white"> Action </th>
            </tr>
          </thead>
          <tbody className="bg-gray-100 text-[#5a5c69]">
            {membershipRequest?.length ? (
              membershipRequest?.map((user, index) => (
                <tr key={index} className="bg-gray-200 shadow-sm">
                  <td className="p-3 border border-gray-300 text-center ">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {index + 1}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {user?.fname || "unknown"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {user?.lname || "unknown"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {user?.username || "username"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {user?.organizename === null ? "***" : user.organizename}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {user?.userTypeId === "1" ? "Master" : "Student"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {user?.nationalcode || "***"}
                  </td>
                  <td className="p-3 border border-gray-300 text-center ">
                    {user?.isActive ? (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        In Active
                      </span>
                    )}
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
