import React from "react";
import AdminSidebar from "./admin_sidebar";
import AdminNavbar from "./admin_navbar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <AdminSidebar />
      <div
        style={{
          position: "absolute",
          width: "calc(100% - 200px)",
          right: 0,
          // height: "calc(100% - 38px)",
          overflow: "auto",
          top: 38,
        }}
      >
        
        <Outlet />
      </div>
      <AdminNavbar />
    </div>
  );
};

export default MainLayout;
