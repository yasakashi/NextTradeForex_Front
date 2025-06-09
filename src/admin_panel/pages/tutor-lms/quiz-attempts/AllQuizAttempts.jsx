import { useState } from "react";
import ProfileCover from "../../../../asset/img/placeholder.svg";
import MAterialTable from "../../../components/table/material_table";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";

import SearchFilters from "./SearcchFilters";
import TabBar from "./TabBar";
import { CustomButton } from "../../../../components/ui/CustomButton";

const AllQuizAttempts = () => {
  const [showModal, setShowModal] = useState(false);
  const [openInsModal, setOpenInsModal] = useState(false);

  const isLoading = false;

  const [dateValue, setDateValue] = useState("");
  const [selectedOption, setSelectedOption] = useState("All Courses");
  const [searchValue, setSearchValue] = useState("");

  const data = [
    {
      quizInfo: "Trading diary",
      student: "admin 1",
      course: "A – Z Guide To Trade Forex",
      question: 1,
      totalMarks: 2,
      correctAnswer: 1,
      inCorrectAnswer: 0,
      earnedMarks: "1 ( 100% )",
      result: "pass",
    },
  ];

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
              rows={data}
              columns={[
                {
                  header: "Quiz Info",
                  accessorKey: "file",
                  Cell: ({ row, table }) => {
                    return (
                      <div className="flex flex-col justify-center items-start">
                        <div className="flex flex-col space-y-3">
                          <h4 className="text-sm text-gray-900 font-semibold">
                            {row?.original?.quizInfo}
                          </h4>
                          <p>
                            student :{" "}
                            <span className="text-gray-600">
                              {row?.original?.student}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  },
                },

                {
                  header: "Course",

                  Cell: ({ row }) => {
                    return (
                      <p
                        className="text-blue-800 cursor-pointer"
                        style={{ color: "#2271b1" }}
                      >
                        {row?.original?.course}
                      </p>
                    );
                  },
                },

                {
                  header: "Question",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return (
                      <div className="flex">{row?.original?.question}</div>
                    );
                  },
                },

                {
                  header: "Total Marks",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return (
                      <div className="flex">{row?.original?.totalMarks}</div>
                    );
                  },
                },

                {
                  header: "Correct Answer",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return (
                      <div className="flex">{row?.original?.correctAnswer}</div>
                    );
                  },
                },

                {
                  header: "Incorrect Answer",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return (
                      <div className="flex">
                        {row?.original?.inCorrectAnswer}
                      </div>
                    );
                  },
                },

                {
                  header: "Earned Marks",
                  enableEditing: false,

                  Cell: ({ row }) => {
                    return (
                      <div className="flex">{row?.original?.earnedMarks}</div>
                    );
                  },
                },

                {
                  header: "Result",
                  Cell: ({ row }) => {
                    return (
                      <div className="flex text-[#24a148] bg-[#24a14826] border border-[#24a1484d] rounded-xl px-2 py-[2px] text-[12px] w-max">
                        <p>{row?.original?.result}</p>
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
                      </div>
                    );
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

export default AllQuizAttempts;
