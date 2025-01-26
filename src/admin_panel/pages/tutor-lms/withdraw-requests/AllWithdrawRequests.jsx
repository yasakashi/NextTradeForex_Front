import { useState } from "react";
import ProfileCover from "../../../../asset/img/placeholder.svg";
import MAterialTable from "../../../components/table/material_table";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";

import SearchFilters from "./SearcchFilters";
import TabBar from "./TabBar";

const AllWithdrawRequests = () => {
  const [showModal, setShowModal] = useState(false);
  const [openInsModal, setOpenInsModal] = useState(false);

  const isLoading = false;

  const [dateValue, setDateValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="px-8 py-10">
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
              loading={isLoading}
              // setSearchCourses={setSearchLesson}
              rows={[]}
              columns={[
                {
                  header: "Request Date",
                  accessorKey: "file",
                  Cell: ({ row, table }) => {
                    return (
                      <div className="flex flex-col justify-center items-start">
                        <div></div>
                      </div>
                    );
                  },
                },

                {
                  header: "Requested By",

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
                  header: "Withdraw Method",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return <div className="flex">Admin</div>;
                  },
                },

                {
                  header: "Withdraw Details",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return <div className="flex">Admin</div>;
                  },
                },

                {
                  header: "Amount",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return <div className="flex">Amir Basiri</div>;
                  },
                },

                {
                  header: "Status",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return <div className="flex">8</div>;
                  },
                },

                {
                  header: "Update",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return <div className="flex">2</div>;
                  },
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllWithdrawRequests;
