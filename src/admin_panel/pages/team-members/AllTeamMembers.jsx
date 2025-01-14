import { useState } from "react";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { CustomButton } from "../../../components/ui/CustomButton";
import MAterialTable from "../../components/table/material_table";
import ProfileCover from "../../../asset/img/placeholder.svg";
import { useNavigate } from "react-router-dom";

const AllTeamMembers = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const isLoading = false;

  return (
    <div className="px-8 py-10">
      <div className="flex items-center gap-4">
        <h2 className="font-normal text-2xl text-[#1d2327]">Team Members</h2>
        <CustomButton
          onClick={() => navigate("/admin-panel/team-members/add-new-member")}
          variant="outlined"
          size="sm"
        >
          Add New Team Member
        </CustomButton>
      </div>

      {/* report */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mt-10">
        <ul className="flex items-center">
          <li className="flex items-center gap-1">
            <p className="text-black font-bold text-sm">All</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              (1,698)
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li className="flex items-center gap-1">
            <p className="text-[#0073aa] font-normal text-sm">Mine</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              (1,698)
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li className="flex items-center gap-1">
            <p className="text-[#0073aa] font-normal text-sm">Published</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              (1,499)
            </span>
          </li>
        </ul>

        <div>
          <div className="flex items-center gap-x-2">
            <input
              type="text"
              placeholder="Search memeber"
              className="border border-gray-500 rounded-[3px] outline-[#2271b1] active:border-[#2271b1] px-3 py-[5px] text-gray-600"
            />
            <CustomButton variant="outlined" size="sm">
              Search Team Member
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="mt-14">
        {/* search */}

        {/* top bar */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select className="border-[#8c8f94] bg-white border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]">
              <option>Bulk actions</option>
              <option>Edit</option>
              <option>Move to Trash</option>
            </select>
            <CustomButton variant="outlined" size="sm">
              Apply
            </CustomButton>
          </div>

          <div className="flex items-center gap-2">
            <select className="border-[#8c8f94] bg-white border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]">
              <option>All dates</option>
              <option>October 2023</option>
              <option>September 2023</option>
            </select>
            <CustomButton variant="outlined" size="sm">
              Filter
            </CustomButton>
          </div>
        </div>

        {/* table */}
        <div>
          <MAterialTable
            loading={isLoading}
            // setSearchCourses={setSearchLesson}
            rows={["amir"]}
            columns={[
              {
                header: "Title",
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
                            amirbasiri
                          </p>
                        </div>
                      </div>
                      <div className="flex hidden z-[1050] relative items-center gap-2">
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
                          title="Quick Edit"
                          onClick={() => {
                            setActiveRowId(row?.original?.id);
                            setShowModal((prev) => !prev);
                          }}
                          className="text-nowrap"
                          style={{ color: "red", padding: 0, border: "none" }}
                        />
                        <BorderedButtonPrimary
                          title="Trash"
                          onClick={() => {
                            // navigate(`/learn_to_trade/${row.original.title}`);
                            // navigate(
                            //   `/admin-panel/lesson/categories/${row.original.slug}`
                            // );
                          }}
                          style={{ padding: 0, border: "none" }}
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
                      </div>
                    </div>
                  );
                },
              },

              {
                header: "Date",
                Cell: ({ row }) => {
                  return (
                    <div className="flex flex-col text-[#50575e]">
                      <p>{new Date().toLocaleString()}</p>
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

export default AllTeamMembers;
