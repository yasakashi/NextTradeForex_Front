import React, { useState, useEffect } from 'react';

const SearchBox = ({
  currencies,
  placeholder = 'Search for Currencies...',
  setCurrencies,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  // const [debouncedQuery, setDebouncedQuery] = useState(query);

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, delay);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [query, delay]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value === '') {
      setResults(initialData);
    } else {
      const filteredResults = initialData.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    }
  };
  
  useEffect(() => {
    handleSearch(query);
  }, [query]);

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder={placeholder}
      className="w-full p-2 focus:outline-none rounded-sm "
    />
  );
};

export default SearchBox;
