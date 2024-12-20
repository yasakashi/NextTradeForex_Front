import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../Loading';

const SearchBox = ({
  currencies,
  setCurrencies,
  setCurrencyId,
  fetchForexItems,
  query,
}) => {
  const [results, setResults] = useState(currencies); // State for filtered results
  const [initialData] = useState(currencies); // State to store initial data

  const handleSearch = () => {
    if (query === '') {
      // If search box is empty, reset to initial data
      setResults(initialData);
    } else {
      // Filter data based on query
      const filteredResults = initialData.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  const onClickHandler = (item) => {
    setCurrencyId(item.id);
    fetchForexItems(item.id);
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  return (
    <div>
      <ul className="max-h-[calc(100vh-130px)] overflow-y-auto">
        {results.length > 0 ? (
          results?.map((item) => (
            <li
              onClick={() => onClickHandler(item)}
              key={item.id}
              className="p-2 text-gold-light_400 cursor-pointer hover:font-bold hover:font-weight-800"
            >
              {item.name}
            </li>
          ))
        ) : (
          <div>
            <p>No data found! </p>
          </div>
        )}
      </ul>
    </div>
  );
};

export default SearchBox;
