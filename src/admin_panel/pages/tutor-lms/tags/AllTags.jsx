import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
 

import AdminPanelTitle from "../../../components/AdminPanelTitle";
import AddNewTag from "./AddNewTag";
import useClickOutside from "../../../../hooks/useClickOutside";
import { CustomButton } from "../../../../components/ui/CustomButton";

const AllTags = () => {
  const removeModalRef = useRef(null);

  const navigate = useNavigate();

  // const [
  //   getMainCategoriesByInfo,
  //   { data: maincategories, error, isLoading: getCategoriesLoading },
  // ] = useGetMainCategoriesByInfoMutation();

  // const [
  //   getSubCategoriesByInfo,
  //   {
  //     data,
  //     isLoading: getSubCategoriesLoading,
  //     isSuccess: subCategeoriesSucces,
  //   },
  // ] = useGetSubCategoriesByInfoMutation();

  // const [removeCategory, { isLoading: removeLoading }] =
  //   useRemoveCategoryMutation();

  useEffect(() => {
    async function fetchCategories() {
      try {
        // await getMainCategoriesByInfo({ parentId: 770 }).unwrap();
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    fetchCategories();
  }, []);

  useClickOutside(removeModalRef, () => {
    setShowRemoveModal(false);
  });

  const removeCategoryHandler = async (id) => {
    try {
      // const res = await removeCategory({ data: { Id: id } }).unwrap();
      // if (res?.messageCode === 200) {
      //   toast.success("Category Removed.");
      //   setShowRemoveModal(false);
      //   await getMainCategoriesByInfo({ parentId: 770 }).unwrap();
      // }
    } catch (error) {
      console.log(error);
      toast.error("Faild to fetch tags");
    }
  };

  return (
    <div className="w-full h-ful px-8">
      <AdminPanelTitle title="Tags" />

      <div className="flex flex-col md:flex-row mt-4">
        <div className="w-full md:w-2/5">
          <AddNewTag />
        </div>
        <div
          className="w-full md:w-3/5"
          style={{ paddingLeft: 16, height: 800 }}
        >
          <div>
            <div className="flex flex-col items-start sm:flex-row md:flex-col lg:flex-row gap-2 justify-between my-4">
              <div className="flex items-center gap-2">
                <select className="border-gray-400 rounded-md bg-white border text-sm outline-[#2271b1] active:text-[#0a4b78] hover:text-[#0a4b78] active:border-[#2271b1] cursor-pointer text-[#2c3338] pl-4 py-[6px] pr-[2px]">
                  <option>Bulk actions</option>
                  <option>Delete Permanently</option>
                </select>
                <CustomButton variant="outlined" size="sm">
                  Apply
                </CustomButton>
              </div>

              <div className="text-sm text-gray-600">3 Items</div>
            </div>
            <div className="w-full overflow-x-scroll scrollbar-thin">
              <table className="w-full min-w-[600px] rounded-xl border border-gray-300">
                <thead>
                  <tr className="bg-[#f4f6f9]  border-b border-b-gray-300 font-normal text-sm text-[#2271b1] py-2 px-4 rounded-t-lg">
                    <td className="py-3 px-2">
                      <input type="checkbox" className="bg-white" />
                    </td>
                    <td className="py-3 px-2 text-center">Name</td>
                    <td className="py-3 px-2 text-center">Description</td>
                    <td className="py-3 px-2 text-center">Slug</td>
                    <td className="py-3 px-2 text-center">Count</td>
                  </tr>
                </thead>
                <tbody className="">
                  {[1, 2, 3, 4].map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b border-b-gray-300 py-2 px-2"
                    >
                      <td className="text-gray-500 py-4 px-2">
                        <input type="checkbox" className="bg-white" />
                      </td>
                      <td className="text-center py-4 px-2 text-[#2271b1] font-semibold">
                        xaussd
                      </td>
                      <td className="text-gray-500 text-center py-4 px-2">
                        ---
                      </td>
                      <td className="text-gray-500 text-center py-4 px-2">1</td>
                      <td className="text-gray-500 text-center py-4 px-2">0</td>
                    </tr>
                  ))}
                  {/* <tr>
                  <td
                    colSpan={4}
                    className="text-center text-gray-500 text-base py-2"
                  >
                    No Data
                  </td>
                </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTags;
