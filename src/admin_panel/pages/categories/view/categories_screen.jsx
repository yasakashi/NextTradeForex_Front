import React, { useEffect, useRef, useState } from "react";
import AddNewCategoryComponent from "./components/add_new_category_component";
import BorderedButtonPrimary from "../../../../common/bordered_button_primary";
import CustomRadioButton from "./components/customRadioButton";
import { useNavigate } from "react-router-dom";
import MAterialTable from "../../../components/table/material_table";
import toast from "react-hot-toast";
import AdminPanelTitle from "../../../components/AdminPanelTitle";
import {
  useRemoveCategoryMutation,
  useGetSubCategoriesByInfoMutation,
  useGetMainCategoriesByInfoMutation,
} from "../../../../redux/features/categories/categoriesApi";
import useClickOutside from "../../../../hooks/useClickOutside";

import { IoTrashOutline } from "react-icons/io5";

const CategoriesScreen = () => {
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [rowId, setRowId] = useState("");
  const [showRowTools, setShowRowTools] = useState(false);

  const [mainCategory, setMainCategory] = useState({});

  const [searchCategory, setSearchCategory] = useState("");

  const removeModalRef = useRef(null);

  const navigate = useNavigate();

  const [
    getMainCategoriesByInfo,
    { data: maincategories, error, isLoading: getCategoriesLoading },
  ] = useGetMainCategoriesByInfoMutation();

  const [
    getSubCategoriesByInfo,
    {
      data,
      isLoading: getSubCategoriesLoading,
      isSuccess: subCategeoriesSucces,
    },
  ] = useGetSubCategoriesByInfoMutation();

  const [removeCategory, { isLoading: removeLoading }] =
    useRemoveCategoryMutation();

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
            name: searchCategory || null,
          }).unwrap();
        }
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    fetchSubCategories();
  }, [mainCategory, searchCategory]);

  useClickOutside(removeModalRef, () => {
    setShowRemoveModal(false);
  });

  const removeCategoryHandler = async (id) => {
    try {
      const res = await removeCategory({ data: { Id: id } }).unwrap();
      if (res?.messageCode === 200) {
        toast.success("Category Removed.");
        setShowRemoveModal(false);
        await getMainCategoriesByInfo({ parentId: 770 }).unwrap();
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to fetch categories");
    }
  };

  return (
    <div className="w-full h-ful px-8">
      <AdminPanelTitle title="Categories" />

      <div className="flex flex-col md:flex-row mt-4">
        <div className="w-full md:w-2/5">
          <AddNewCategoryComponent />
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
            rows={subCategeoriesSucces ? [mainCategory, ...subCategories] : []}
            loading={getSubCategoriesLoading}
            search={searchCategory}
            setSearch={setSearchCategory}
            columns={[
              {
                header: "Name",
                accessorKey: "name",
                Cell: ({ row, rowRef, table }) => {
                  return (
                    <div
                      className="relative min-w-20"
                      style={{ minWidth: 190 }}
                      onMouseOver={() => {
                        setShowRowTools(true);
                        setRowId(row?.original?.id);
                      }}
                      onMouseLeave={() => {
                        setShowRowTools(false);
                        setRowId("");
                      }}
                    >
                      <h5 className="text-[#2271b1] font-bold text-sm">
                        {row.original.name}
                      </h5>
                      {showRowTools && rowId === row?.original?.id ? (
                        <div className="flex items-center relative">
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
                            className="text-nowrap"
                          />

                          <BorderedButtonPrimary
                            title="View"
                            onClick={() => {
                              navigate(`/learn_to_trade`);
                              // navigate(
                              //   `/admin-panel/lesson/categories/${row.original.slug}`
                              // );
                            }}
                            style={{ padding: 4, border: "none" }}
                          />
                          <BorderedButtonPrimary
                            title="Delete"
                            style={{ color: "red", padding: 4, border: "none" }}
                            onClick={() => {
                              setShowRemoveModal(true);
                              setRowId(row?.original?.id);
                            }}
                          />

                          {showRemoveModal && rowId === row?.original?.id ? (
                            <div
                              ref={removeModalRef}
                              className="absolute -top-5 right-0 z-[10000] rounded-md shadow-md w-[210px] h-auto py-2 bg-[#212327] border border-[#212327]"
                            >
                              <li className="px-2 py-[6px] flex items-center gap-2 hover:bg-[#41454f] cursor-pointer transition-colors text-red-500">
                                <button
                                  onClick={() =>
                                    removeCategoryHandler(row?.original?.id)
                                  }
                                  disabled={removeLoading}
                                  type="button"
                                  className="flex gap-2 disabled:cursor-not-allowed items-center border-none outline-none"
                                >
                                  <IoTrashOutline size={14} />
                                  Remove Permanently
                                </button>
                              </li>
                            </div>
                          ) : null}
                        </div>
                      ) : null}
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
