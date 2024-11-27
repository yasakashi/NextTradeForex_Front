import React from "react";
import AdminSidebar from "./admin_sidebar";
import AdminNavbar from "./admin_navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="w-full h-full flex">
        <div className="h-screen w-[200px]">
          <AdminSidebar />
        </div>
        <main className="h-screen w-[calc(100%-200px)] right-0">
          <AdminNavbar />
          <div className="w-full h-full mt-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

{
  /* <AdminSidebar />
      <div
        style={{
          position: "absolute",
          width: "calc(100% - 200px)",
          right: 0,
          // height: "calc(100% - 38px)",
          overflow: "auto",
          top: 38,
        }}
        className="absolute"
      >
        <Outlet />
      </div>
      <AdminNavbar /> */
}
