import React, { useEffect, useState } from "react";
import MAterialTable from "../../../components/table/material_table";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import DeleteMenuModal from "../../categories/view/components/delete_menu_modal";
import { CustomSelectBox } from "../../../../pages/profile/new_course_components/custom_select_box";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { useNavigate } from "react-router-dom";

const LTRPodcasts = () => {
  const [open_delete_dialog, set_open_delete_dialog] = useState({
    open: false,
  });

  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);
  const isLoading = false;

  const test = {
    
  }

  return (
    <div className="flex flex-col px-8 py-10">
      <h1 className="font-semibold text-2xl text-white mb-4">Videos</h1>

      <div>
        <CustomButton
          onClick={() =>
            navigate("/admin-panel/learn-to-trade/podcasts/add-new-podcast")
          }
          className=" mb-10 mt-6"
          variant="outlined"
        >
          Add New Podcast
        </CustomButton>
      </div>

      <MAterialTable
        loading={isLoading}
        // setSearchCourses={setSearchLesson}
        rows={lessons}
        columns={[
          {
            header: "Title",
            accessorKey: "title",
            Cell: ({ row, table }) => {
              return (
                <div className="flex flex-col justify-center items-start w-48">
                  <p style={{ color: "#2271b1", fontWeight: "bold" }}>
                    {row.original?.lessonName}
                  </p>
                  <div className="flex items-center">
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
                        //   `/admin-panel/lesson/cateogies/edit/${row.original.title}`
                        // );
                      }}
                      style={{ padding: 4, border: "none" }}
                    />

                    <BorderedButtonPrimary
                      title="Trash"
                      onClick={() => {
                        set_open_delete_dialog({ open: true, row });
                      }}
                      style={{ color: "red", padding: 4, border: "none" }}
                    />
                    <BorderedButtonPrimary
                      title="View"
                      onClick={() => {
                        // navigate(`/learn_to_trade/${row.original.title}`);
                        // navigate(
                        //   `/admin-panel/lesson/cateogies/${row.original.slug}`
                        // );
                      }}
                      style={{ padding: 4, border: "none" }}
                    />
                  </div>
                </div>
              );
            },
          },
          {
            header: "Audio",

            Cell: ({ row }) => {
              return (
                <p
                  className="text-blue-800 cursor-pointer"
                  style={{ color: "#2271b1" }}
                >
                  Add Audio
                </p>
              );
            },
          },
          {
            header: "Author",

            Cell: ({ row }) => {
              return (
                <p
                  className="text-blue-800 cursor-pointer"
                  style={{ color: "#2271b1" }}
                >
                  NextBit
                </p>
              );
            },
          },
          {
            header: "Date",
            Cell: () => {
              return (
                <div className="flex flex-col">
                  <p>Published</p>
                  <p>{new Date().toLocaleString()}</p>
                </div>
              );
            },
          },

          {
            header: "Is Free",
            enableEditing: false,

            Cell: ({ row }) => {
              return (
                <div className="flex">
                  <CustomRadioButton label="Yes" checked={false} />
                  <span className="w-2"></span>
                  <CustomRadioButton label="No" />
                </div>
              );
            },
          },
          {
            header: "Is Visible",
            enableEditing: false,
            Cell: ({ row }) => {
              return (
                <div className="flex">
                  <CustomRadioButton label="Yes" checked={false} />
                  <span className="w-2"></span>
                  <CustomRadioButton label="No" />
                </div>
              );
            },
          },
          {
            header: "Lesson Level",
            enableEditing: false,

            Cell: ({ row }) => {
              return (
                <div className="flex flex-col">
                  <CustomRadioButton label="All" checked={false} />
                  <CustomRadioButton label="Newbie" checked={false} />
                  <CustomRadioButton label="Intermidiate" checked={false} />
                  <CustomRadioButton label="Advanced" checked={false} />
                </div>
              );
            },
          },
          {
            header: "Course Status",
            enableEditing: false,
            accessorKey: "isVisible",
            Cell: ({ row }) => {
              return (
                <CustomSelectBox
                  options={[
                    { title: "Select Status", value: "" },
                    { title: "Publish", value: "publish" },
                    { title: "Pending", value: "pending" },
                  ]}
                />
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default LTRPodcasts;
