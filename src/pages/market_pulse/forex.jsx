import { useEffect, useState } from 'react';
import Search from '../../components/market_pulse/search';
import SelectInput from '../../components/market_pulse/SelectInput';
import { http_instanse_level_2 } from '../../axios/auth_full_http_instanse';
import { getforexitems, getForexCurrencies, getRelatedContent } from './api';
import Story from '../../components/market_pulse/forex/Story';
import { startLoading, stopLoading } from '../../redux/features/loading';
import LoadingSpinner from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';

function Forex() {
  const [topCategories, setTopCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedTopCategory, setSelectedTopCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [forexItems, setForexItems] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(null);
  const [relatedContent, setRelatedContent] = useState();

  const isLoading = useSelector((state) => state.loading.isLoading);
  const dispatch = useDispatch();
  // Fetch top categories
  const fetchTopCategories = async () => {
    try {
      dispatch(startLoading());
      const res = await http_instanse_level_2.post(
        'api/marketpuls/gettopcategories',
        {},
        { headers: { 'Content-Type': 'application/json' } }
      );
      dispatch(stopLoading());
      setTopCategories(res.data.messageData);
    } catch (error) {
      console.error('Failed to fetch top categories:', error);
    }
  };
  const getRelatedSources = async (id) => {
    try {
      if (id) {
        const res = await getRelatedContent(id);
        setRelatedContent(res.messageData);
      }
    } catch (error) {
      console.error('Failed to fetch related contents', error);
    }
  };
  const getCurrencies = async () => {
    try {
      if (selectedSubCategory) {
        const res = await getForexCurrencies(selectedSubCategory);
        setCurrencies(res.messageData);
      }
    } catch (error) {
      console.error('Failed to fetch Currencies:', error);
    }
  };

  const fetchForexItems = async (id) => {
    try {
      dispatch(startLoading());
      if (id) {
        const res = await getforexitems({
          categoryId: id,
          id: null,
        });
        dispatch(stopLoading());
        setForexItems(res.messageData);
      }
    } catch (error) {
      console.error('Failed to fetch forex items:', error);
    }
  };

  useEffect(() => {
    fetchTopCategories();
  }, []);

  useEffect(() => {
    if (currencyId) {
      fetchForexItems(currencyId);
    }
  }, [currencyId]);

  useEffect(() => {
    fetchForexItems(selectedSubCategory);
    getRelatedSources(selectedSubCategory);
    getCurrencies();
  }, [selectedTopCategory, selectedSubCategory]);

  // Fetch subcategories based on the selected top category
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        dispatch(startLoading());
        const res = await http_instanse_level_2.post(
          'api/marketpuls/getcategories',
          {},
          { headers: { 'Content-Type': 'application/json' } }
        );

        // Filter subcategories to only include those with a parentId matching the selected top category's id
        const filteredSubCategories = res.data.messageData.filter(
          (subcategory) => subcategory.parentId === +selectedTopCategory
        );
        dispatch(stopLoading());
        setSubCategories(filteredSubCategories);
      } catch (error) {
        console.error('Failed to fetch subcategories:', error);
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

      {isLoading && <LoadingSpinner />}
      {forexItems.length > 0 && !isLoading && (
        <Story
          forexItems={forexItems}
          currencies={currencies}
          setCurrencies={setCurrencies}
          setCurrencyId={setCurrencyId}
          relatedContent={relatedContent}
        />
      )}
    </div>
  );
}

export default Forex;
