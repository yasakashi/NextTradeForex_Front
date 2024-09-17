import React from "react";
import SingleCategory from "./SingleCategory";
import MainTitle from "../../../common/MainTitle";

const TopCategories = () => {
  return (
    <div className="wrapper mt-16 mb-16 md:mb-20 md:mt-20 lg:mt-24 lg:mb-24">
      <div>
        <MainTitle title="top categories" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SingleCategory />
          <SingleCategory />
          <SingleCategory />
        </div>
      </div>
    </div>
  );
};

export default TopCategories;
