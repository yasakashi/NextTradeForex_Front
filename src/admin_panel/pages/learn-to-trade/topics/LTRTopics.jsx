import React, { useEffect, useState } from "react";
import MAterialTable from "../../../components/table/material_table";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import DeleteMenuModal from "../../categories/view/components/delete_menu_modal";
import { CustomSelectBox } from "../../../../pages/profile/new_course_components/custom_select_box";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { useNavigate } from "react-router-dom";

const LTRTopics = () => {
  const [open_delete_dialog, set_open_delete_dialog] = useState({
    open: false,
  });

  const navigate = useNavigate();

  const [lessons, setLessons] = useState([
    {
      title: "capital markets authority (cma) - kenya",
      date: "2024/03/16 at 8:08pm",
      category:
        "Capital Markets Authority (CMA) - Kenya, Regulation Agencies Forex, Financial regulation",
      isFree: false,
      isVisible: true,
      lessonCagegoryId: 1,
      shortCode: "[dflip id='59710'][/dflip]",
      lastModified: "",
    },
  ]);
  const isLoading = false;

  return (
    <div className="flex flex-col px-8 py-10">
      <h1 className="font-semibold text-2xl text-white mb-4">Topics</h1>

      <div>
        <CustomButton
          onClick={() =>
            navigate("/admin-panel/learn-to-trade/topics/add-new-topic")
          }
          className=" mb-10 mt-6"
          variant="outlined"
          size="sm"
        >
          Add New Topic
        </CustomButton>
      </div>

      <MAterialTable
        loading={isLoading}
        // setSearchCourses={setSearchLesson}
        rows={lessons}
        columns={[
          {
            header: "Topics",
            accessorKey: "title",
            Cell: ({ row, table }) => {
              return (
                <div className="flex flex-col justify-center items-start w-48">
                  <p className="capitalize text-[#2271b1] font-bold">
                    Gold Trading bot
                  </p>
                  <div className="flex items-center justify-between">
                    {row.id === open_delete_dialog?.row?.id && (
                      <DeleteMenuModal
                        disabled={false}
                        onYesClick={() => {
                          set_open_delete_dialog({
                            open: false,
                            row: undefined,
                          });
                        }}
                        props={{
                          open: open_delete_dialog.open,
                          onClose() {
                            set_open_delete_dialog({
                              open: false,
                              row: undefined,
                            });
                          },
                        }}
                      />
                    )}
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
                      title="Trash"
                      onClick={() => {
                        set_open_delete_dialog({ open: true, row });
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
                  </div>
                </div>
              );
            },
          },
          {
            header: "Forum",
            Cell: ({ row }) => {
              return (
                <div className="flex flex-col text-[#50575e]">Popular</div>
              );
            },
          },
          {
            header: "Replies",

            Cell: ({ row }) => {
              return (
                <p
                  className="text-blue-800 cursor-pointer"
                  style={{ color: "#2271b1" }}
                >
                  0
                </p>
              );
            },
          },

          {
            header: "Voices",
            enableEditing: false,

            Cell: ({ row }) => {
              return <div className="flex">1</div>;
            },
          },
          {
            header: "Author",
            enableEditing: false,
            Cell: ({ row }) => {
              return <div className="flex text-sm text-gray-700">NextBit</div>;
            },
          },
          {
            header: "Created",
            enableEditing: false,

            Cell: ({ row }) => {
              return <div className="flex flex-col"></div>;
            },
          },
          {
            header: "Last Post ",
            enableEditing: false,
            accessorKey: "isVisible",
            Cell: ({ row }) => {
              return <div>a year ago</div>;
            },
          },
        ]}
      />
    </div>
  );
};

export default LTRTopics;
