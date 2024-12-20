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
        <main className="min-h-screen h-full w-[calc(100%-200px)] right-0 mt-4">
          <AdminNavbar />
          <div className="w-full z-[100] relative h-full mt-4 bg-[#f0f0f1] min-h-screen">
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
