import { useState } from "react";
import ProfileCover from "../../../../asset/img/placeholder.svg";
import MAterialTable from "../../../components/table/material_table";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";

import SearchFilters from "./SearcchFilters";

const AllStudents = () => {
  const [showModal, setShowModal] = useState(false);

  const isLoading = false;

  const [dateValue, setDateValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="px-8 py-10">
      <div className="flex items-center gap-4">
        <h2 className="font-normal text-2xl text-[#1d2327]">Students</h2>
      </div>

      <div className="mt-14">
        <SearchFilters
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          dateValue={dateValue}
          setDateValue={setDateValue}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <div>
          <MAterialTable
            loading={isLoading}
            // setSearchCourses={setSearchLesson}
            rows={["amir"]}
            columns={[
              {
                header: "Username",
                accessorKey: "file",
                Cell: ({ row, table }) => {
                  return (
                    <div className="flex flex-col justify-center items-start">
                      <div className="flex items-center gap-2">
                        <div className="size-[60px]">
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
                      <div className="flex z-[1050] relative items-center gap-2">
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
                      basiriamir@gmail.com
                    </p>
                  );
                },
              },

              {
                header: "Site Role",
                enableEditing: false,

                Cell: ({ row }) => {
                  return <div className="flex">Admin</div>;
                },
              },

              {
                header: "Forum Role",
                enableEditing: false,

                Cell: ({ row }) => {
                  return <div className="flex">Admin</div>;
                },
              },

              {
                header: "Name",
                enableEditing: false,

                Cell: ({ row }) => {
                  return <div className="flex">Amir Basiri</div>;
                },
              },

              {
                header: "Posts",
                enableEditing: false,

                Cell: ({ row }) => {
                  return <div className="flex">8</div>;
                },
              },

              {
                header: "Active Subscribers?",
                enableEditing: false,

                Cell: ({ row }) => {
                  return <div className="flex">2</div>;
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

export default AllStudents;

const Label = ({ label }) => {
  return (
    <label className="text-[#41454f] text-[15px] font-medium mb-[6px]">
      {label}
    </label>
  );
};
