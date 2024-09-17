import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const MobileInput = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "United States",
    code: "+1",
  });
  const [mobileNumber, setMobileNumber] = useState("");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
    
  };

  const countries = [
    { name: "United States", code: "+1" },
    { name: "Germany", code: "+49" },
    { name: "Italy", code: "+39" },
    { name: "China", code: "+86" },
  ];

  return (
    <div className="relative flex mt-1">
      <div className="">
        <button
          id="country-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-300 bg-transparent border border-gray-400 rounded-l-lg focus:outline-none"
          type="button"
          onClick={toggleDropdown}
        >
          {/* Placeholder for country icon */}
          <div className="h-4 w-4 mr-2 bg-gray-400 rounded-full"></div>
          {selectedCountry.code}
          <FaChevronDown className="w-2.5 h-2.5 ml-2.5" />
        </button>
        {dropdownOpen && (
          <div
            id="dropdown-countries"
            ref={dropdownRef}
            className="absolute z-10 divide-y divide-gray-300 rounded-lg shadow  bg-white text-gray-700 w-full"
          >
            <ul className="py-2 text-sm text-gray-700 d">
              {countries.map((country) => (
                <li key={country.code}>
                  <button
                    type="button"
                    className="inline-flex w-full outline-none border-none px-4 py-2 text-sm text-gray-800"
                    onClick={() => handleCountrySelect(country)}
                  >
                    <div className="inline-flex items-center">
                      {/* Placeholder for country icon */}
                      <div className="h-4 w-4 mr-2 bg-gray-400 rounded-full">
                       
                      </div>
                      {country.name} ({country.code})
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <input
        type="tel"
        value={mobileNumber}
        onChange={handleMobileNumberChange}
        className="bg-transparent border border-gray-400 text-gray-200 text-sm rounded-r-lg  block w-full p-2.5 outline-none placeholder:text-gray-400"
        placeholder="Enter mobile number"
      />
    </div>
  );
};

export default MobileInput;
