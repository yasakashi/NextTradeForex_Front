import { useEffect, useState } from "react";
import { useGetMainCategoriesByInfoMutation } from "../../redux/features/api/categories/categoriesApi";
import toast from "react-hot-toast";

const SearchFilter = ({ mainCategories }) => {
  const [categoryId, setCategoryId] = useState("");

  const [
    getMainCategoriesByInfo,
    { data, error, isLoading: getCategoriesLoading },
  ] = useGetMainCategoriesByInfoMutation();

  useEffect(() => {
    async function fetchCategories() {
      try {
        await getMainCategoriesByInfo({ parentId: categoryId }).unwrap();
      } catch (err) {
        toast.error("Failed to fetch categories: ");
      }
    }
    if (categoryId) {
      fetchCategories();
    }
  }, [categoryId]);

  return (
    <div className="wrapper flex items-center justify-center w-full my-4">
      {console.log({ data })}
      <div className="w-full sm:w-[400px] md:w-[500px] space-y-4">
        {/* search box */}
        <div className="w-full">
          <input
            type="text"
            className="bg-[#f5d48b] border border-gray-900 rounded px-3 py-[4px] text-black w-full placeholder:text-black"
            placeholder="Search"
          />
        </div>

        {/* select box */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="bg-[#f5d48b] text-black py-1 pl-1 rounded text-sm"
          >
            <option>Select Category</option>
            {mainCategories?.length > 0 ? (
              mainCategories?.map((category, index) => (
                <option value={category?.id} key={index}>
                  {category?.name}
                </option>
              ))
            ) : (
              <option>Data not found!</option>
            )}
          </select>

          {categoryId ? (
            <select className="bg-[#f5d48b] text-black py-1 pl-1 rounded text-sm">
              <option>Select Category</option>
              {data?.length > 0 ? (
                data?.map((category, index) => (
                  <option value={category?.id} key={index}>
                    {category?.name}
                  </option>
                ))
              ) : (
                <option>Data not found!</option>
              )}
            </select>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
