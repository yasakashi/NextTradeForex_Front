import React, { useState, useEffect } from 'react';

const SearchBox = ({
  currencies,
  placeholder = 'Search for Currencies...',
  setCurrencies,
}) => {
  const [query, setQuery] = useState('');

  // const [debouncedQuery, setDebouncedQuery] = useState(query);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, delay);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [query, delay]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    handleSearch(query);
  }, [query]);

  const handleSearch = (searchTerm) => {
    const newCurrencies = currencies.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setCurrencies(newCurrencies);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleInputChange}
      placeholder={placeholder}
      className="w-full p-2 focus:outline-none rounded-sm "
    />
  );
};

export default SearchBox;
