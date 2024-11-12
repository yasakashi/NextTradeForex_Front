import React, { useEffect, useState } from 'react';

const SearchBox = ({
  currencies,
  setCurrencies,
  setCurrencyId,
  fetchForexItems,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(currencies); // State for filtered results
  const [initialData] = useState(currencies); // State to store initial data

  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === '') {
      // If search box is empty, reset to initial data
      setResults(initialData);
    } else {
      // Filter data based on query
      const filteredResults = initialData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  const onClickHandler = (item) => {
    setCurrencyId(item.id);
    fetchForexItems(item.id);
  };
  
  useEffect(() => {
    console.log(results);
    
    setCurrencies(results);
  }, [results]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search by name..."
        className="border p-2 rounded-md w-full max-w-md mb-4"
      />

      <ul>
        {results.map((item) => (
          <li
            onClick={() => onClickHandler(item)}
            key={item.id}
            className="p-2 text-gold-light_400 cursor-pointer hover:font-bold hover:font-weight-800"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
