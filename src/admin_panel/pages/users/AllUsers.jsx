import { useState } from "react";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { CustomButton } from "../../../components/ui/CustomButton";
import MAterialTable from "../../components/table/material_table";
import ProfileCover from "../../../asset/img/placeholder.svg";
import { useNavigate } from "react-router-dom";
import {
  useGetPanelAllUsersQuery,
  useGetPanelUsersReportQuery,
} from "../../../redux/features/api/admin-panel/panelUsersApi";

const AllUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [userTypeId, setUserTypeId] = useState(null);
  const [forumRoleId, setForumRoleId] = useState(null);

  const navigate = useNavigate();

  const { data: { messageData: data } = { messageData: [] }, isLoading , isFetching } =
    useGetPanelAllUsersQuery({
      data: {
        username: searchUser,
        fname: "",
        lname: "",
        mobile: "",
        usertypeid: userTypeId,
        forumroleid: forumRoleId,
      },
    });

  const {
    data: { messageData: [totalUsers = {}] = [] } = { messageData: [] },
    totalUsersLoading,
  } = useGetPanelUsersReportQuery({
    data: {
      username: searchUser,
      fname: "",
      lname: "",
      mobile: "",
    },
  });

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
    <div className="px-8 py-14">
      <div className="flex items-center gap-4">
        <h2 className="font-normal text-2xl text-[#1d2327]">Users</h2>
        <CustomButton
          onClick={() => navigate("/admin-panel/users/add-new-user")}
          variant="outlined"
          size="sm"
        >
          Add New User
        </CustomButton>
      </div>

      {/* report */}
      <div>
        <ul className="flex items-center flex-wrap mt-8 gap-2">
          <li
            onClick={() => {
              setUserTypeId(null);
              setForumRoleId(null);
            }}
            className="flex cursor-pointer items-center"
          >
            <p className="text-black font-bold text-sm">All</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.allUsersCount || 0})
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setUserTypeId(2)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm">Adminstrator</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.administratorCount || 0})
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setUserTypeId(4)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm">Student</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.studentCount || 0})
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setUserTypeId(3)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm">Instructor</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.instructorCount || 0})
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setUserTypeId(7)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm">Director</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.directorCount || 0})
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setForumRoleId(1)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm">Keymaster</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.keymasterCount || 0})
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setForumRoleId(3)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm">Participant</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.participantCount || 0})
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setForumRoleId(4)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm">Customer</p>
            <span className="text-[#50575e] font-normal text-[13px]">(0)</span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li
            onClick={() => setForumRoleId(4)}
            className="flex cursor-pointer items-center"
          >
            <p className="text-[#0073aa] font-normal text-sm text-nowrap">
              Pending Email Activation
            </p>
            <span className="text-[#50575e] font-normal text-[13px]">
              ({totalUsers?.pendingEmailActivationCount || 0})
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-10">
        {/* search */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2 my-10">
            <input
              value={searchInput}
              onChange={(e) => {
                setSearchUser(e.target.value);
                setSearchInput(e.target.value);
              }}
              type="text"
              placeholder="Search Users"
              className="border border-gray-400 rounded-[3px] outline-[#2271b1] active:border-[#2271b1] px-3 py-[5px] text-gray-600"
            />
            <CustomButton
              type="button"
              onClick={() => setSearchUser(searchInput)}
              variant="outlined"
              size="sm"
            >
              Search Users
            </CustomButton>
          </div>
        </div>
        {/* top bar */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select className="border-[#8c8f94] bg-white border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]">
              <option>Bulk actions</option>
              <option>Send password reset</option>
              <option>Resend activation</option>
              <option>Activate users</option>
            </select>
            <CustomButton variant="outlined" size="sm">
              Apply
            </CustomButton>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={userTypeId}
              onChange={(e) => setUserTypeId(e.target?.value)}
              className="border-[#8c8f94] bg-white border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]"
            >
              <option value={null}>Change role to ...</option>
              <option value={6}>Executive</option>
              <option value={7}>Director</option>
              <option value={3}>Instructor</option>
              <option value={4}>Student</option>
              <option value={2}>Adminstrator</option>
              <option value={null}>_No role for this site_</option>
            </select>
            <CustomButton variant="outlined" size="sm">
              Change
            </CustomButton>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={forumRoleId}
              onChange={(e) => setForumRoleId(e.target?.value)}
              className="border-[#8c8f94] bg-white border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]"
            >
              <option value={null}>Change forum role to ...</option>
              <option value={1}>Keymaster</option>
              <option value={2}>Moderator</option>
              <option value={3}>Participant</option>
              <option value={4}>Spectator</option>
              <option value={6}>Blocked</option>
            </select>
            <CustomButton variant="outlined" size="sm">
              Change
            </CustomButton>
          </div>
        </div>

        {/* table */}
        <div className="w-full">
          <MAterialTable
            loading={isLoading || isFetching}
            // setSearchCourses={setSearchLesson}
            rows={data}
            columns={[
              {
                header: "Username",
                accessorKey: "file",
                Cell: ({ row, table }) => {
                  return (
                    <div className="flex flex-col justify-center items-start">
                      <div className="flex items-center gap-2">
                        <div className="size-[40px]">
                          <img
                            className="w-full h-full bg-cover"
                            src={ProfileCover}
                            alt="User Profile"
                          />
                        </div>

                        <div className="flex flex-col leading-7">
                          <p className="capitalize text-[#2271b1] font-bold">
                            {row?.original?.username}
                          </p>
                        </div>
                      </div>
                      <div className="hidden z-[1050] relative items-center gap-2">
                        <BorderedButtonPrimary
                          title="Edit"
                          onClick={() => {
                            // navigate(
                            //   `/admin-panel/lesson/categories/edit/${row.original.title}`
                            // );
                          }}
                          style={{ padding: 0, border: "none" }}
                        />

                        <BorderedButtonPrimary
                          title="Delete Permanently"
                          onClick={() => {
                            setActiveRowId(row?.original?.id);
                            setShowModal((prev) => !prev);
                          }}
                          style={{ color: "red", padding: 0, border: "none" }}
                        />
                        <BorderedButtonPrimary
                          title="View"
                          onClick={() => {
                            // navigate(`/learn_to_trade/${row.original.title}`);
                            // navigate(
                            //   `/admin-panel/lesson/categories/${row.original.slug}`
                            // );
                          }}
                          style={{ padding: 0, border: "none" }}
                        />

                        <BorderedButtonPrimary
                          title="Copy URL"
                          onClick={() => {
                            // navigate(`/learn_to_trade/${row.original.title}`);
                            // navigate(
                            //   `/admin-panel/lesson/categories/${row.original.slug}`
                            // );
                          }}
                          style={{ padding: 0, border: "none" }}
                        />

                        <BorderedButtonPrimary
                          title="Download File"
                          onClick={() => {
                            // navigate(`/learn_to_trade/${row.original.title}`);
                            // navigate(
                            //   `/admin-panel/lesson/categories/${row.original.slug}`
                            // );
                          }}
                          style={{ padding: 0, border: "none" }}
                        />

                        {showModal && row?.original?.id === activeRowId ? (
                          <div
                            ref={modalRef}
                            className="absolute -top-5 right-0 z-[1000] rounded-md shadow-md w-[210px] h-auto py-2 bg-[#212327] border border-[#212327]"
                          >
                            <ul>
                              <li className="px-2 py-[6px] flex items-center gap-2 hover:bg-[#41454f] cursor-pointer transition-colors text-red-500">
                                <button
                                  onClick={() =>
                                    removeCourseHandler(row?.original?.id)
                                  }
                                  disabled={removeLoading}
                                  type="button"
                                  className="flex gap-2 disabled:cursor-not-allowed items-center border-none outline-none"
                                >
                                  <IoTrashOutline size={14} />
                                  Remove Permanently
                                </button>
                              </li>
                            </ul>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                },
              },

              {
                header: "Email",

                Cell: ({ row }) => {
                  return (
                    <p
                      className="text-blue-800 cursor-pointer"
                      style={{ color: "#2271b1" }}
                    >
                      {row?.original?.email}
                    </p>
                  );
                },
              },

              {
                header: "Site Role",
                enableEditing: false,

                Cell: ({ row }) => {
                  return (
                    <div className="flex">{row?.original?.userTypeName}</div>
                  );
                },
              },

              {
                header: "Forum Role",
                enableEditing: false,

                Cell: ({ row }) => {
                  return (
                    <div className="flex">
                      {row?.original?.forumRoleName
                        ? row?.original?.forumRoleName
                        : "-"}
                    </div>
                  );
                },
              },

              {
                header: "Name",
                enableEditing: false,

                Cell: ({ row }) => {
                  return (
                    <div className="flex items-center space-x-1 capitalize">
                      <span>{row?.original?.fname} </span>
                      <span>{row?.original?.lname}</span>
                    </div>
                  );
                },
              },

              {
                header: "Posts",
                enableEditing: false,

                Cell: ({ row }) => {
                  return (
                    <div className="flex justify-center">
                      {row?.original?.posts}
                    </div>
                  );
                },
              },

              {
                header: "Active Subscribers?",
                enableEditing: false,

                Cell: ({ row }) => {
                  return (
                    <div className="flex justify-center">
                      {row?.original?.activeSubscriber}
                    </div>
                  );
                },
              },

              {
                header: "Date",
                Cell: ({ row }) => {
                  return (
                    <div className="flex justify-center text-[#50575e]">
                      <p>{formatDate(row?.original?.registerDate)}</p>
                    </div>
                  );
                },
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
