import React, { useEffect, useState } from "react";
import AddNewCategoryComponent from "./components/add_new_category_component";

import useCategories from "../hook/use_categories";
import DeleteMenuModal from "./components/delete_menu_modal";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import CustomRadioButton from "./components/customRadioButton";
import { useNavigate } from "react-router-dom";
import MAterialTable from "../../../components/table/material_table";
import {
  useGetMainCategoriesByInfoMutation,
  useGetSubCategoriesByInfoMutation,
} from "../../../../redux/features/categories/categoriesApi";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import AdminPanelTitle from "../../../components/AdminPanelTitle";

const CategoriesScreen = () => {
  const { categories } = useCategories({ make_id_tree: true });

  const [mainCategory, setMainCategory] = useState({});

  const navigate = useNavigate();
  const [open_delete_dialog, set_open_delete_dialog] = useState({
    open: false,
  });

  const [
    getMainCategoriesByInfo,
    { data: maincategories, error, isLoading: getCategoriesLoading },
  ] = useGetMainCategoriesByInfoMutation();

  const [getSubCategoriesByInfo, { data, isLoading: getSubCategoriesLoading }] =
    useGetSubCategoriesByInfoMutation();

  const subCategories = data || [];

  useEffect(() => {
    async function fetchCategories() {
      try {
        await getMainCategoriesByInfo({ parentId: 770 }).unwrap();
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchSubCategories() {
      try {
        if (mainCategory?.id) {
          await getSubCategoriesByInfo({
            parentId: mainCategory?.id || "",
          }).unwrap();
        }
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    fetchSubCategories();
  }, [mainCategory]);

  return (
    <div className="w-full h-ful px-8">
      <AdminPanelTitle title="Categories" />

      <div className="flex flex-col md:flex-row mt-4">
        <div className="w-full md:w-2/5">
          <AddNewCategoryComponent categories={categories} />
        </div>
        <div
          className="w-full md:w-3/5"
          style={{ paddingLeft: 16, height: 800 }}
        >
          <div className="w-full md:w-full mt-8 mb-4">
            <select
              value={JSON.stringify(mainCategory)}
              onChange={(e) => {
                const selectedCategory = JSON.parse(e.target.value); // Parse the selected object
                setMainCategory(selectedCategory);
              }}
              className="w-full border border-gray-300 pl-2 py-[6px] rounded-md shadow-sm bg-slate-200 outline-blue-500"
            >
              <option value="{}" disabled>
                Select Category
              </option>
              {maincategories?.length > 0 ? (
                maincategories?.map((categoryItem, index) => (
                  <option value={JSON.stringify(categoryItem)} key={index}>
                    {categoryItem?.name}
                  </option>
                ))
              ) : getCategoriesLoading ? (
                <option>Loading ...</option>
              ) : (
                <option>Categories not found!</option>
              )}
            </select>
          </div>

          <MAterialTable
            rows={[mainCategory, ...subCategories] || []}
            // rows={categories}
            loading={getSubCategoriesLoading}
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
                              `/admin-panel/lesson/categories/edit/${row.original.id}`
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
                            //   `/admin-panel/lesson/categories/${row.original.slug}`
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
                Cell: ({ row }) => <div>{row?.original?.description}</div>,
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
                      <CustomRadioButton label="Yes" checked={false} />
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
                      <CustomRadioButton label="No" checked={false} />
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
