import React, { useEffect, useState } from "react";
import AdminSidebar from "./admin_sidebar";
import AdminNavbar from "./admin_navbar";
import { Outlet } from "react-router-dom";
// bg-[#f0f0f1]
const MainLayout = () => {
  const [showAdminSidebar, setShowAdminsidebar] = useState(false);

  return (
    <div className="flex items-start">
      {/* sidebar */}
      <AdminSidebar
        showAdminSidebar={showAdminSidebar}
        setShowAdminsidebar={setShowAdminsidebar}
      />

      <div className="w-full md:w-[calc(100%-200px)] pt-10 h-screen overflow-hidden">
        {/* navbar */}
        <AdminNavbar
          showAdminSidebar={showAdminSidebar}
          setShowAdminsidebar={setShowAdminsidebar}
        />

        {/* outlet */}
        <div className="bg-[#f0f0f1] overflow-y-scroll h-screen ml-auto relative overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
