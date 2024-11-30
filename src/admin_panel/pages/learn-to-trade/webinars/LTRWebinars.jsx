import React, { useEffect, useState } from "react";
import MAterialTable from "../../../components/table/material_table";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import DeleteMenuModal from "../../categories/view/components/delete_menu_modal";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { useNavigate } from "react-router-dom";

const LTRWebinars = () => {
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
      <h1 className="font-semibold text-2xl text-white mb-4">Webinars</h1>

      <div>
        <CustomButton
          onClick={() =>
            navigate("/admin-panel/learn-to-trade/webinars/add-new-webinar")
          }
          className=" mb-10 mt-6"
          variant="outlined"
        >
          Add New Webinar
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
                  <p className="capitalize text-[#2271b1] font-bold">
                    {row.original?.title}
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
            header: "Date",
            Cell: ({ row }) => {
              return (
                <div className="flex flex-col text-[#50575e]">
                  <p>Published</p>
                  <p>{new Date().toLocaleString()}</p>
                </div>
              );
            },
          },
          {
            header: "Category",

            Cell: ({ row }) => {
              return (
                <p
                  className="text-blue-800 cursor-pointer"
                  style={{ color: "#2271b1" }}
                >
                  {row?.original?.category}
                </p>
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
            header: "Lesson Category",
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
            header: "Shortcode ",
            enableEditing: false,
            accessorKey: "isVisible",
            Cell: ({ row }) => {
              return (
                <code className="text- cursor-pointer text-[#50575e] w-[100px] bg-[#00000012] break-words">
                  {row?.original?.shortCode}
                </code>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default LTRWebinars;
