import React from "react";
import { TiMessage, TiPlus, TiRefresh } from "react-icons/ti";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <div
      className="bg-white absolute top-0 flex items-center "
      style={{
        width: "calc(100% - 200px)",
        right: 0,
        height: 38,
        paddingLeft: 16,
      }}
    >
      <div className="flex items-center mr-2">
        <TiRefresh size={25} />
        <h5 className="font-bold text-sm">49</h5>
      </div>
      <div className="flex items-center mr-2">
        <TiMessage size={25} />
        <h5 className="font-bold text-sm">0</h5>
      </div>
      <Link
        to="/admin-panel/tutor/Courses/create-new-course"
        className="flex items-center mr-2 bg-[#1976d2]"
      >
        <TiPlus size={25} />
        <h5 className="font-bold text-sm mr-2">New</h5>
      </Link>
      <h5 className="font-bold text-sm mr-2">Caching</h5>
      <h5 className="font-bold text-sm mr-2">Need help?</h5>
    </div>
  );
};

export default AdminNavbar;
