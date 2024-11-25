import { useEffect, useState } from 'react';
import Search from '../../components/market_pulse/search';
import SelectInput from '../../components/market_pulse/SelectInput';
import { http_instanse_level_2 } from '../../axios/auth_full_http_instanse';
import Story from '../../components/market_pulse/Indice/Story';

function Indice() {
  const [topCategories, setTopCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [secondCategory, setSecondCategory] = useState([]);
  const [selectedSecondCategory, setSelectedSecondCategory] = useState(null);
  const [selectedTopCategory, setSelectedTopCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Fetch top categories
  const fetchTopCategories = async () => {
    try {
      const res = await http_instanse_level_2.post(
        'api/marketpuls/getindicecategories',
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );

      setTopCategories(res.data.messageData);
    } catch (error) {
      console.error('Failed to fetch top categories:', error);
    }
  };

  useEffect(() => {
    fetchTopCategories();
  }, []);

  // Fetch subcategories based on the selected top category
  const fetchSubCategories = async () => {
    try {
      const res = await http_instanse_level_2.post(
        'api/marketpuls/getindicesubcategories',
        { categoryid: selectedTopCategory },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Filter subcategories to only include those with a parentId matching the selected top category's id
      const filteredSubCategories = res.data.messageData.filter(
        (subcategory) => subcategory.parentId === +selectedTopCategory
      );

      setSubCategories(filteredSubCategories);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };

  const fetchSecondSubCategories = async () => {
    try {
      const res = await http_instanse_level_2.post(
        'api/marketpuls/getindicesubcategories',
        { categoryid: selectedSubCategory },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Filter subcategories to only include those with a parentId matching the selected top category's id
      const filteredSubCategories = res.data.messageData.filter(
        (subcategory) => subcategory.parentId === +selectedTopCategory
      );

      setSecondCategory(filteredSubCategories);
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
    }
  };
  useEffect(() => {
    // Only fetch subcategories if a top category is selected
    if (selectedTopCategory) {
      if (selectedTopCategory != 1175) {
        fetchSubCategories();
      }
    } else {
      setSubCategories([]); // Reset subcategories if no top category is selected
    }
  }, [selectedTopCategory]);

  useEffect(() => {
    // Only fetch subcategories if a top category is selected
    if (selectedSubCategory) {
      fetchSecondSubCategories();
    } else {
      setSubCategories([]); // Reset subcategories if no top category is selected
    }
  }, [selectedSubCategory]);

  return (
    <div>
      <div className="mx-auto w-fit ">
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
          {selectedTopCategory && selectedTopCategory != 1175 ? (
            <SelectInput
              options={subCategories}
              value={selectedSubCategory}
              onChange={setSelectedSubCategory}
              placeholder="Select Sub Category"
            />
          ) : null}
          {selectedTopCategory &&
            selectedSubCategory &&
            selectedTopCategory != 1175 &&
            selectedSubCategory != 1194 && (
              <SelectInput
                options={secondCategory}
                value={selectedSecondCategory}
                onChange={setSelectedSecondCategory}
                placeholder="Select Second Sub Category"
              />
            )}
        </div>
      </div>
      {!selectedTopCategory && (
        <div>
          <p className="text-gray-light text-center my-16">
            Please select a category
          </p>
        </div>
      )}
      {selectedTopCategory && !selectedSubCategory && (
        <div>
          <p className="text-gray-light text-center my-16">
            Please select a category
          </p>
        </div>
      )}

      {/* {isLoading && <LoadingSpinner />} */}
      {selectedTopCategory && (
        <Story
          selectedTopCategory={selectedTopCategory}
          selectedSubCategory={selectedSubCategory}
          setSecondCategory={setSecondCategory}
        />
      )}
    </div>
  );
}

export default Indice;
