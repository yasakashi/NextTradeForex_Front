import { useRef, useState } from "react";
import MAterialTable from "../../../components/table/material_table";
import SearchFilters from "./SearcchFilters";
import TabBar from "./TabBar";
import AddNewAnnouncement from "./AddNewAnnouncement";
import { HiDotsVertical } from "react-icons/hi";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { Link } from "react-router-dom";
import useClickOutside from "../../../../hooks/useClickOutside";
import { CiEdit } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import {
  useGetCourseAnnouncementsQuery,
  useRemoveCourseAnnouncementMutation,
} from "../../../../redux/features/api/admin-panel/tutorLmsApi";

const AllAnnouncements = () => {
  const [openInsModal, setOpenInsModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [rowId, setRowId] = useState("");

  const [dateValue, setDateValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [searchValue, setSearchValue] = useState("");

  const {
    data: { messageData: data } = { messageData: [] },
    isLoading,
    isFetching,
    refetch: refetchAnnoucements,
  } = useGetCourseAnnouncementsQuery({
    data: {
      id: null,
      courseId: selectedOption?.id ? selectedOption?.id : null,
      title: "",
      fromregisterdatetime: null,
      toregisterdatetime: null,
      rowcount: 10,
      pageindex: 1,
    },
  });

  const [removeCourseAnnouncement] = useRemoveCourseAnnouncementMutation();

  const removeModalRef = useRef(null);

  useClickOutside(removeModalRef, () => {
    setShowRemoveModal(false);
  });

  const editHandler = () => {
    setOpenInsModal(true);
  };

  const removeAnnouncementHandler = async (id) => {
    const res = await removeCourseAnnouncement({ data: { id } }).unwrap();
    console.log("remove announcement res", res);
  };

  return (
    <>
      <div className="px-8 py-10">
        <h2 className="font-normal text-2xl text-[#1d2327]">Announcements</h2>

        {/* tab bar */}
        <div className="mt-8">
          <TabBar setOpenInsModal={setOpenInsModal} />
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
              loading={isLoading || isFetching}
              // setSearchCourses={setSearchLesson}
              rows={data}
              columns={[
                {
                  header: "Date",
                  accessorKey: "file",
                  Cell: ({ row, table }) => {
                    return (
                      <div className="flex flex-col justify-center items-start">
                        <div className="flex flex-col text-[#50575e]">
                          <p>
                            {new Date(
                              row?.original.registerdatetime
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  },
                },

                {
                  header: "Announcements",

                  Cell: ({ row }) => {
                    return (
                      <div className="flex flex-grow w-[400px]">
                        <div className="space-y-2">
                          <p className="text-gray-700 text-base font-semibold">
                            {row?.original?.title}
                          </p>
                          <h5 className="text-gray-400 text-[15px]">
                            {row?.original?.coursename}
                          </h5>
                        </div>
                      </div>
                    );
                  },
                },

                {
                  header: "Details",
                  Cell: ({ row }) => {
                    return (
                      <div className="w-max flex items-center text-[#50575e]">
                        <CustomButton
                          size="md"
                          variant="outlined"
                          className="mx-4"
                        >
                          Details
                        </CustomButton>

                        <button
                          type="button"
                          onClick={() => {
                            setShowRemoveModal((prev) => !prev);

                            setRowId(row?.original?.id);
                          }}
                          // disabled={removeCourseLoading}
                          className="relative disabled:cursor-not-allowed disabled:opacity-65 group hover:bg-blue-100 p-[5px] rounded-full transition-colors"
                        >
                          <HiDotsVertical
                            className="text-gray-600 group-hover:text-blue-accent group-hover:cursor-pointer transition-colors"
                            size={20}
                          />

                          {showRemoveModal && row?.original?.id === rowId ? (
                            <div
                              ref={removeModalRef}
                              className="absolute -top-5 right-full z-[10000] rounded-md shadow-md w-[100px] h-auto py-2 bg-[#212327] border border-[#212327]"
                            >
                              <ul>
                                <li className="px-2 py-[6px] flex items-center gap-2 hover:bg-[#41454f] cursor-pointer transition-colors text-white font-semibold">
                                  <button
                                    onClick={editHandler}
                                    className="flex w-full gap-2"
                                  >
                                    <CiEdit size={20} />
                                    Edit
                                  </button>
                                </li>
                                <li className="px-2 py-[6px] flex items-center gap-2 hover:bg-[#41454f] cursor-pointer transition-colors text-white">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeAnnouncementHandler(
                                        row?.original?.id
                                      )
                                    }
                                    className="flex gap-2 disabled:cursor-not-allowed items-center border-none outline-none"
                                  >
                                    <IoTrashOutline size={14} />
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          ) : null}
                        </button>
                      </div>
                    );
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
      <AddNewAnnouncement
        refetchAnnoucements={refetchAnnoucements}
        isOpen={openInsModal}
        setIsOpen={setOpenInsModal}
      />
    </>
  );
};

export default AllAnnouncements;

const Label = ({ label }) => {
  return (
    <label className="text-[#41454f] text-[15px] font-medium mb-[6px]">
      {label}
    </label>
  );
};
