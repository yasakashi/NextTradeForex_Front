import { useState } from "react";
import BorderedButtonPrimary from "../../../common/bordered_button_primary";
import { CustomButton } from "../../../components/ui/CustomButton";
import MAterialTable from "../../components/table/material_table";
import ProfileCover from "../../../asset/img/placeholder.svg";
import { useNavigate } from "react-router-dom";

const AllFeedbacks = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const isLoading = false;

  return (
    <div className="px-8 py-10">
      <div className="flex items-center gap-4">
        <h2 className="font-normal text-2xl text-[#1d2327]">Feedbacks</h2>
        <CustomButton
          onClick={() => navigate("/admin-panel/feedbacks/add-new-feedback")}
          variant="outlined"
          size="sm"
        >
          Add New Feedback
        </CustomButton>
      </div>

      {/* report */}
      <div>
        <ul className="flex items-center">
          <li className="flex items-center gap-1 mt-8">
            <p className="text-black font-bold text-sm">All</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              (1,698)
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>

          <li className="flex items-center gap-1 mt-8">
            <p className="text-[#0073aa] font-normal text-sm">Published</p>
            <span className="text-[#50575e] font-normal text-[13px]">
              (1,698)
            </span>
            <div className="w-[1px] h-[20px] bg-gray-300 mx-2" />
          </li>
        </ul>
      </div>

      <div className="mt-14">
        {/* search */}
        <div className="flex justify-end">
          <div className="flex items-center gap-2 my-10">
            <input
              type="text"
              placeholder="Search Feedbacks ..."
              className="border border-gray-400 rounded-[4px] outline-[#2271b1] active:border-[#2271b1] px-3 py-[5px] text-gray-600"
            />
            <CustomButton variant="outlined" size="sm">
              Search Feedbacks
            </CustomButton>
          </div>
        </div>
        {/* top bar */}
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select className="border-[#8c8f94] bg-white border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]">
              <option>Bulk actions</option>
              <option>Edit</option>
              <option>Move to trash</option>
            </select>
            <CustomButton variant="outlined" size="sm">
              Apply
            </CustomButton>
          </div>

          <div className="flex items-center gap-2">
            <select className="border-[#8c8f94] bg-white border text-sm rounded-[3px] outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-1 pr-[2px]">
              <option>All dates</option>
              <option>January 2024</option>
            </select>
            <CustomButton variant="outlined" size="sm" className="px-4">
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
                        <div className="flex flex-col leading-7">
                          <p className="capitalize text-[#2271b1] font-bold">
                            First Feedback
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
                          title="Quick Edit"
                          onClick={() => {
                            // navigate(`/learn_to_trade/${row.original.title}`);
                            // navigate(
                            //   `/admin-panel/lesson/categories/${row.original.slug}`
                            // );
                          }}
                          style={{ padding: 0, border: "none" }}
                        />

                        <BorderedButtonPrimary
                          title="Trash"
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

export default AllFeedbacks;
