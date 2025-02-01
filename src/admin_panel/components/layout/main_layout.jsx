import React, { useState } from "react";
import AdminSidebar from "./admin_sidebar";
import AdminNavbar from "./admin_navbar";
import { Outlet } from "react-router-dom";
// bg-[#f0f0f1]
const MainLayout = () => {

  const [showAdminSidebar, setShowAdminsidebar] = useState(false);

  return (
    <div className="flex items-start">
      <AdminSidebar
        showAdminSidebar={showAdminSidebar}
        setShowAdminsidebar={setShowAdminsidebar}
      />

      <div className="w-full">
        <AdminNavbar
          showAdminSidebar={showAdminSidebar}
          setShowAdminsidebar={setShowAdminsidebar}
        />

        <div className="bg-[#f0f0f1] overflow-y-scroll h-screen w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
