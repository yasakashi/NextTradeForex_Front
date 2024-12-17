import React from "react";
import Hero from "../components/home/Hero";
import Provisions from "../components/home/provisions/Provisions";
import PopularCourses from "../components/home/popularCourses/PopularCourses";
import MarketPulse from "../components/home/marketPulse/MarketPulse";
import AnalystEstimates from "../components/home/analystEstimates/AnalystEstimates";
import BecomeAnInstructor from "../components/home/BecomeAnInstructor";
import Testimonials from "../components/home/testimonials/Testimonials";
import TopCategories from "../components/home/topCategories/TopCategories";
import LearnAny from "../components/home/learnany/LearnAny";
import MoversAndShakers from "../components/home/moversandshakers/MoversAndShakers";
import BodyFixedModal from "../common/BodyFixedModal";
import CustomCalendaar from "../components/Calendar/CustomCalendar";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div className="bg-blue-dark w-full h-full">
      <div className="w-full h-full">
        <div className="w-full mx-auto">
          <BodyFixedModal />
          {/* <Header /> */}
          <Hero />
          <Provisions />
          <CustomCalendaar />
          <PopularCourses />
          <MarketPulse />
          <MoversAndShakers />
          <AnalystEstimates />
          <LearnAny />
          <TopCategories />
          <BecomeAnInstructor />
          <Testimonials />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
