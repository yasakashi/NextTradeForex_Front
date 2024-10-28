import { useEffect, useState } from "react";
import Search from "../../components/market_pulse/search";
import SelectInput from "../../components/market_pulse/SelectInput";
import { http_instanse_level_2 } from "../../axios/auth_full_http_instanse";

function Forex() {
  const [topCategories, setTopCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedTopCategory, setSelectedTopCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Fetch top categories
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const res = await http_instanse_level_2.post(
          "api/marketpuls/gettopcategories",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        setTopCategories(res.data.messageData);
      } catch (error) {
        console.error("Failed to fetch top categories:", error);
      }
    };

    fetchTopCategories();
  }, []);

  // Fetch subcategories based on the selected top category
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await http_instanse_level_2.post(
          "api/marketpuls/getcategories",
          {},
          { headers: { "Content-Type": "application/json" } }
        );

        // Filter subcategories to only include those with a parentId matching the selected top category's id
        const filteredSubCategories = res.data.messageData.filter(
          (subcategory) => subcategory.parentId === +selectedTopCategory
        );

        setSubCategories(filteredSubCategories);
      } catch (error) {
        console.error("Failed to fetch subcategories:", error);
      }
    };

    // Only fetch subcategories if a top category is selected
    if (selectedTopCategory) {
      fetchSubCategories();
    } else {
      setSubCategories([]); // Reset subcategories if no top category is selected
    }
  }, [selectedTopCategory]);

  return (
    <div>
      <div className="mx-auto w-fit">
        <Search />

        <div className="flex gap-x-[10px]">
          {/* Top Category Select Input */}
          <SelectInput
            options={topCategories}
            value={selectedTopCategory}
            onChange={(category) => {
              setSelectedTopCategory(category);
              setSelectedSubCategory(null); // Reset subcategory when top category changes
              setSubCategories([]);
            }}
            placeholder="Select Top Category"
          />
          {/* Subcategory Select Input - Only shows when a top category is selected */}
          {selectedTopCategory && (
            <SelectInput
              options={subCategories}
              value={selectedSubCategory}
              onChange={setSelectedSubCategory}
              placeholder="Select Sub Category"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Forex;
