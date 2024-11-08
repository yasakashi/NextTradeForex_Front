import { useState } from "react";

const CustomSelectBox = ({ options = [], className = "", children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return <div>{/* selected option display */}
  
    <div>
      {children[0]}
    </div>
  </div>;
};

export default CustomSelectBox;
