import React from "react";
import MaterialTable from "../../../components/table/material_table";
import DeleteMenuModal from "../../categories/view/components/delete_menu_modal";
import { MRT_Row } from "material-react-table";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import { useNavigate } from "react-router-dom";
import CustomRadioButton from "../../categories/view/components/customRadioButton";

const AllBooksScreen = () => {
  const [open_delete_dialog, set_open_delete_dialog] = React.useState<{
    open: boolean;
    row?: MRT_Row<any>;
  }>({ open: false });
  const navigate = useNavigate();
  return (
    <div className="flex flex-col px-8 py-8">
      <h1 className="font-semibold text-2xl text-white mb-4">PDF Book</h1>
      <MaterialTable
        rows={[
          { id: 0, title: "Cyprus Securities and Exchange Commission (CySEC)" },
          { id: 2,title:"Monetary Authority of Singapore" },
        ] as any[]}
        columns={[
          {
            header: "Title",
            accessorKey: "title",
            Cell: ({ row, table }) => {
              return (
                <div className="flex flex-col w-48">
                  <p style={{ color: "#2271b1", fontWeight: "bold" }}>
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
            header: "Category",
            Cell: () => {
              return (
                <div className="w-64">
                  Capital Markets Authority (CMA) - Kenya, Regulation Agencies
                  Forex, Financial regulation
                </div>
              );
            },
          },
          {
            header: "Is Free",
            enableEditing: false,
            accessorKey: "isVisible",
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
            accessorKey: "isVisible",
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
            accessorKey: "isVisible",
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
            header: "Shortcode",
            enableEditing: false,
            accessorKey: "isVisible",
            Cell: ({ row }) => {
              return (
                <div className="flex flex-col">[dflip id="59710"][/dflip]</div>
              );
            },
          },
        ]}
      />
    </div>
  );
};

export default AllBooksScreen;
