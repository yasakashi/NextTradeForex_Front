import React from "react";
import AddNewCategoryComponent from "./components/add_new_category_component";

import useCategories from "../hook/use_categories";
import DeleteMenuModal from "./components/delete_menu_modal";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import CustomRadioButton from "./components/customRadioButton";
import { useNavigate } from "react-router-dom";
import { MRT_Row } from "material-react-table";
import MAterialTable, {
  data_list,
} from "../../../components/table/material_table";

const CategoriesScreen = () => {
  const { categories } = useCategories({make_id_tree:true});
  const navigate = useNavigate();
  const [open_delete_dialog, set_open_delete_dialog] = React.useState<{
    open: boolean;
    row?: MRT_Row<any>;
  }>({ open: false });
  return (
    <div className="w-full h-ful text-white px-8 pt-8">
      <h1 className="font-semibold text-2xl">Categories</h1>

      <div className="flex mt-4">
        <div className="sm:w-full md:w-2/5">
          <AddNewCategoryComponent
            categories={categories}
             
          />
        </div>
        <div
          className="sm:w-full md:w-3/5"
          style={{ paddingLeft: 16, height: 800 }}
        >
          <MAterialTable
            rows={categories}
            // rows={categories}
            columns={[
              {
                header: "Name",
                accessorKey: "name",
                Cell: ({ row, rowRef, table }) => {
                  return (
                    <div
                      className="relative min-w-20"
                      style={{ minWidth: 190 }}
                    >
                      <h5 className="text-blue-600">{row.original.name}</h5>
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
                            navigate(
                              `/admin-panel/lesson/cateogies/edit/${row.original.name}`
                            );
                          }}
                          style={{ padding: 4, border: "none" }}
                        />
                        <BorderedButtonPrimary
                          title="Quick Edit"
                          onClick={() => {
                            table.setEditingRow(row);
                          }}
                          style={{ padding: 4, border: "none" }}
                        />

                        <BorderedButtonPrimary
                          title="View"
                          onClick={() => {
                            navigate(
                              `/learn_to_trade/courses/${row.original.name}`
                            );
                            // navigate(
                            //   `/admin-panel/lesson/cateogies/${row.original.slug}`
                            // );
                          }}
                          style={{ padding: 4, border: "none" }}
                        />
                        <BorderedButtonPrimary
                          title="Delete"
                          onClick={() => {
                            set_open_delete_dialog({ open: true, row });
                          }}
                          style={{ color: "red", padding: 4, border: "none" }}
                        />
                      </div>
                    </div>
                  );
                },
              },
              {
                header: "Description",
                accessorKey: "description",
                enableEditing: false,
              },
              { header: "Slug", accessorKey: "slug" },
              { header: "Count", accessorKey: "count", enableEditing: false },
              {
                header: "IsVisible",
                enableEditing: false,
                accessorKey: "isVisible",
                Cell: ({ row }) => {
                  return (
                    <div className="flex">
                      <CustomRadioButton
                        label="Yes"
                        checked={false}
                      />
                      <span className="w-2"></span>
                      <CustomRadioButton label="No" />
                    </div>
                  );
                },
              },
              {
                header: "Visible in dropdown",
                accessorKey: "visible_to_dropdown",
                enableEditing: false,
                Cell: ({ row }) => {
                  return (
                    <div className="flex">
                      <CustomRadioButton label="Yes" />
                      <span className="w-2"></span>
                      <CustomRadioButton
                        label="No"
                        checked={false}
                      />
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

export default CategoriesScreen;
