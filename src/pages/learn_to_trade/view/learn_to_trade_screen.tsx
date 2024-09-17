import React from "react";
import Navbar from "../../../components/Navbar";
import CategoriesDetailsView from "../../../admin_panel/pages/categories/view/category_details_view_screen";
import { Outlet, useNavigate, useParams } from "react-router-dom";
const LearnToTradeScreen = () => {
  const { coursename } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-blue-dark w-full min-h-screen pb-20">
      <Navbar />
      <div
        className="pb-8  w-full relative h-52 bg-blue-light justify-center items-center flex flex-col "
        style={{
          borderBottomLeftRadius: "100%",
          borderBottomRightRadius: "100%",
          boxSizing: "border-box",
        }}
      >
        <h4 className="font-semibold text-4xl text-white">
          {coursename || "Learn To Trade"}
        </h4>
        <div className="flex mt-4">
          <p
            className="text-sm cursor-pointer text-yellow-500 mr-2"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </p>
          <p className="text-sm text-gray-500"> / {coursename || "Learn To Trade"}</p>
        </div>
      </div>
      <Outlet />
      {/* <CategoriesDetailsView /> */}
    </div>
  );
};

export default LearnToTradeScreen;
