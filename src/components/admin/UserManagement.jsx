import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersListAction } from "../../redux/features/admin/usersListSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { userDataAction } from "../../redux/features/userDataSlice";
import CustomCircleLoader from "../../utils/loaders/CustomCircleLoader";
import CustomBeatLoader from "../../utils/loaders/CustomBeatLoader";
import { LiaEditSolid } from "react-icons/lia";
import UserDetailModal from "./modals/UserDetailModal";

const UserManagement = () => {
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { usersList, isLoading, errorMsg } = useSelector(
    (state) => state.usersList
  );

  useEffect(() => {
    dispatch(usersListAction({ axiosPrivate }));
  }, []);

  return (
    <div className="w-full min-h-screen p-4 bg-blue-dark">
      <div className="mt-10 w-full">
        <div className="bg-blue-dark p-4 rounded-lg shadow-lg text-white">
          <h2 className="text-gold-light_400 text-2xl font-bold">Users List</h2>

          <div className="mt-6 overflow-y-scroll h-[60vh] overflow-x-scroll scrollbar-none text-[#5a5c69] mx-auto">
            <table className="bg-gray-100 text-gray-900 w-full">
              <thead className="bg-gray-100 sticky top-0 text-gray-900">
                <tr className="bg-blue-light text-white text-sm">
                  <th className="p-3"> select</th>
                  <th className="p-3"> row</th>
                  <th className="p-3 px-6">First Name</th>
                  <th className="p-3"> Last Name </th>
                  <th className="p-3"> Username </th>
                  <th className="p-3"> Organize Name </th>
                  <th className="p-3"> User Type </th>
                  <th className="p-3"> National Code </th>
                  <th className="p-3"> Status </th>
                  <th className="p-3"> More </th>
                </tr>
              </thead>
              {console.log(showUserDetail)}
              <tbody className="bg-gray-100 text-[#5a5c69]">
                {usersList.length ? (
                  usersList.map((user, index) => (
                    <tr key={index} className="bg-link-water shadow-sm">
                      <td className="p-3 border border-gray-300 text-center ">
                        <input type="checkbox" />
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {index + 1}
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {user.fname || "unknown"}
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {user.lname || "unknown"}
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {user.username}
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {user.organizename === null ? "***" : user.organizename}
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {user.userTypeId === "1" ? "Master" : "Student"}
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {user.nationalcode || "***"}
                      </td>
                      <td className="p-3 border border-gray-300 text-center ">
                        {user.isActive ? (
                          <span className="text-green-600 font-medium">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            In Active
                          </span>
                        )}
                      </td>

                      <td
                        onClick={() => {
                          setShowUserDetail(true);
                          setUserDetail(user);
                        }}
                        className="p-3 border border-gray-300 text-center "
                      >
                        <LiaEditSolid className="cursor-pointer" size={20} />
                        {showUserDetail && (
                          <UserDetailModal
                            userDetail={userDetail}
                            setShowUserDetail={setShowUserDetail}
                            setUserDetail={setUserDetail}
                          />
                        )}
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
    </div>
  );
};

export default UserManagement;
