import React from "react";
import { Outlet, useParams } from "react-router-dom";
import HeroTemp from "../../../components/HeroTemp";
import MainBannerTitle from "../../../common/MainBannerTitle";
import Footer from "../../../components/Footer";

const LearnToTradeScreen = () => {
  const params = useParams();
  const subRoute = params["*"];

  return (
    <>
      <div className="text-white">
        <HeroTemp>
          <MainBannerTitle title="Learn to trade" subRoute={subRoute} />
        </HeroTemp>
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LearnToTradeScreen;
