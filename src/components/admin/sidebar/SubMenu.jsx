import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const SubMenu = ({ ...link }) => {
  const { pathname } = useLocation();
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const handleSubMenuClick = (index) => {
    setOpenSubMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <ul className="bg-blue-dark">
      {link.subtitle.map((user, index) => (
        <Link key={index} to={user.route}>
          <li
            className={`rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-gold-light_400 hover:scale-105 px-2 py-4 ${
              pathname.includes(user.route) && "text-blue-900 font-semibold"
            }`}
            onClick={() => handleSubMenuClick(index)}
          >
            {user.name}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SubMenu;
