import { useEffect, useState } from "react";
import Search from "../../components/market_pulse/search";
import SelectInput from "../../components/market_pulse/SelectInput";
import { http_instanse_level_2 } from "../../axios/auth_full_http_instanse";
import TradingViewWidget from "react-tradingview-widget";

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

      <div className="flex mt-[40px]">
        <div className="flex-1">
          <h1 className="text-2xl text-white font-bold mb-[10px]">Market Sentiments</h1>

          <div>
            <h1 className="text-4xl text-gold-light_400 font-medium">Euro vs US Dollar-EURUSD</h1>

            <div className="grid grid-cols-2 mt-[20px] gap-[35px]">
              <div>
                <h1 className="text-3xl text-gold-light_400 font-bold">COUNTRIES:</h1>
                <p className="text-white text-xl">Eurozone/United States</p>
              </div>
              <div>
                <h1 className="text-3xl text-gold-light_400 font-bold">COUNTRIES:</h1>
                <p className="text-white text-xl">Eurozone/United States</p>
              </div>
              <div>
                <h1 className="text-3xl text-gold-light_400 font-bold">COUNTRIES:</h1>
                <p className="text-white text-xl">Eurozone/United States</p>
              </div>
              <div>
                <h1 className="text-3xl text-gold-light_400 font-bold">COUNTRIES:</h1>
                <p className="text-white text-xl">Eurozone/United States</p>
              </div>
              <div>
                <h1 className="text-3xl text-gold-light_400 font-bold">COUNTRIES:</h1>
                <p className="text-white text-xl">Eurozone/United States</p>
              </div>
            </div>

            <div className="mt-[40px] w-[500px] h-[500px]">
              <div>
                <h1 className="text-3xl text-gold-light_400 font-bold">ONE-YEAR CHART:</h1>
                <p className="text-white text-xl">EUR/USD Chart</p>
              </div>

              <div style={{ width: "200px", height: "200px" }}>
                <iframe
                  title="Google"
                  src="https://www.google.com"
                  style={{ width: "200px", height: "200px", border: "none" }}
          
                />
              </div>

              <TradingViewWidget symbol="NASDAQ:AAPL" />
            </div>
          </div>
        </div>

        <div className="w-[400px] bg-blue-light p-[20px]">
          <h1 className="text-2xl text-white font-bold mb-[10px]">Currencies</h1>
          <p className="text-gold-light_400">Euro vs US Dollar-EURUSD</p>
        </div>
      </div>
    </div>
  );
}

export default Forex;
