import React, { useState } from "react";
import MAterialTable from "../../../components/table/material_table";
import CustomRadioButton from "../../categories/view/components/customRadioButton";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import DeleteMenuModal from "../../categories/view/components/delete_menu_modal";
import { CustomButton } from "../../../../components/ui/CustomButton";
import { useNavigate } from "react-router-dom";
import AdminPanelTitle from "../../../components/AdminPanelTitle";
import { FaPlus } from "react-icons/fa6";
import { useGetLTREBooksQuery } from "../../../../redux/features/api/learnToTrade/LearnToTradeApi";

const LTREBooks = ({ page }) => {
  const [open_delete_dialog, set_open_delete_dialog] = useState({
    open: false,
  });

  const navigate = useNavigate();

  const { data: { messageData: books } = { messageData: [] }, isLoading } =
    useGetLTREBooksQuery({
      data: {
        id: null,
        title: null,
        lessonCategoryLevelId: null,
        categoryid: null,
      },
    });

  return (
    <div className="flex flex-col px-8 py-10">
      {/* <h1 className="font-semibold text-2xl text-white mb-4">Videos</h1> */}
     
      <div className="flex items-center gap-4 mb-8">
        <AdminPanelTitle title="Books" />
        <CustomButton
          onClick={() =>
            navigate(
              `/admin-panel/${
                page === "tools" ? "tools" : "learn-to-trade"
              }/e-books/add-new-book`,
              {
                state: {
                  page: page,
                },
              }
            )
          }
          className="group gap-1"
          variant="outlined"
          size="sm"
        >
          <FaPlus
            size={16}
            className="text-blue-accent group-hover:text-white"
          />
          <span>Add New Book</span>
        </CustomButton>
      </div>

      <MAterialTable
        loading={isLoading}
        // setSearchCourses={setSearchLesson}
        rows={books}
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
                        //   `/admin-panel/lesson/categories/edit/${row.original.title}`
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
                        //   `/admin-panel/lesson/categories/${row.original.slug}`
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
                <div
                  className="flex items-center flex-wrap gap-3"
                  style={{ color: "#2271b1" }}
                >
                  {row?.original?.categories?.map((category) => (
                    <span
                      className="bg-slate-200 px-2 py-[3px] rounded-xl text-gray-600 shadow-sm"
                      key={category?.id}
                    >
                      {category?.name}
                    </span>
                  ))}
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

export default LTREBooks;
