import React from "react";
import HeroTemp from "../../components/HeroTemp";
import MainBannerTitle from "../../common/MainBannerTitle";
import { Link, useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { GoArrowUpRight } from "react-icons/go";
import CustomTextArea from "../../components/ui/CustomTextArea";

const DailyReport = () => {
  const params = useParams();
  const subRoute = params["*"];

  return (
    <>
      <div className="text-white">
        <HeroTemp>
          <MainBannerTitle title="Report" subRoute={subRoute} />
        </HeroTemp>
      </div>
      <div className="wrapper mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-6">
          {/* left side */}
          <div className="col-span-1 md:col-span-2 w-full">
            <div>
              <h1 className="text-white font-semibold text-3xl">USD/JPY</h1>
              <p className="text-[15px] font-normal text-gray-400 my-4">
                By{" "}
                <Link
                  to="#"
                  className="text-[#bb914a] hover:cursor-pointer hover:underline transition-all"
                >
                  Maria Markova
                </Link>
              </p>
            </div>

            <div>
              {/* information */}
              <div>
                <div className="flex items-center flex-wrap space-x-2 text-white">
                  <span>Major Currency Pairs ,</span>
                  <span>1 day</span>
                  <div className="text-xs gap-1 bg-[#22ab94] text-white px-2 py-1 rounded-sm w-max flex items-center">
                    <GoArrowUpRight size={18} />
                    long
                  </div>
                </div>

                <ul className="flex flex-wrap items-center gap-2 my-2">
                  <li className="bg-gold-light_400 rounded-[20px] px-2 text-xs cursor-pointer w-max text-white py-1">
                    #Technical
                  </li>
                  <li className="bg-gold-light_400 rounded-[20px] px-2 text-xs cursor-pointer w-max text-white py-1">
                    #Consolidation
                  </li>
                </ul>
              </div>

              {/* chart */}
              <div className="w-full mt-10 mb-6">
                <div className="w-full aspect-video bg-cover">
                  <img
                    src="https://www.nexttradeforex.com/wp-content/uploads/2024/02/USDJPY-Technical-Analysis_id_3255b3b0-3a93-436c-b8e1-0f8377ccacfb_size775-1.jpg"
                    alt="Chart"
                  />
                </div>
              </div>

              {/* range */}

              <div>
                <h4 className="text-white text-xl font-semibold pb-2">Range</h4>
                <ul className="w-full max-w-[500px]">
                  <li className="flex items-center justify-between bg-blue-light py-3 px-2 shadow-md">
                    <span className="text-gold-light_400 font-normal">
                      Resistance 1
                    </span>
                    <span className="text-white font-semibold text[15px]">
                      151.919
                    </span>
                  </li>

                  <li className="flex items-center justify-between bg-[#bb914a] py-3 px-2 shadow-md">
                    <span className="text-blue-light font-semibold">
                      Quote Price
                    </span>
                    <span className="text-black font-semibold text[15px]">
                      150.590
                    </span>
                  </li>

                  <li className="flex items-center justify-between bg-[#081257] py-3 px-2 shadow-md">
                    <span className="text-gold-light_400 font-normal">
                      Support 1
                    </span>
                    <span className="text-white font-semibold text[15px]">
                      148.919
                    </span>
                  </li>

                  <li className="flex items-center justify-between bg-[#091346] py-3 px-2 shadow-md">
                    <span className="text-gold-light_400 font-normal">
                      Support 2
                    </span>
                    <span className="text-white font-semibold text[15px]">
                      146.614
                    </span>
                  </li>
                </ul>
              </div>

              {/* description */}
              <div className="mt-10">
                <p className="text-gray-400 text-justify">
                  On the daily chart, we can see that USDJPY is getting closer
                  and closer to the cycle high around the 151.90 level. We’ve
                  been stuck in a consolidation since the hot US CPI release and
                  despite more strong US data, the pair hasn’t managed to
                  sustain a rally. We can see that we have a trendline defining
                  the current uptrend and we can expect the buyers to lean on it
                  to position for a rally into the cycle high. The sellers, on
                  the other hand, will want to see the price breaking lower to
                  position for a drop into the 148.80 support.
                </p>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="col-span-1">
            <div className="w-full bg-blue-light p-4 shadow-md rounded">
              <h4 className="text-white font-semibold text-xl mb-4">
                Leave a Reply
              </h4>
              <p className="text-gray-400 text-[15px]">
                Logged in as Next trade.{" "}
                <Link className="text-gold-light_400" to="#">
                  Edit your profile.
                </Link>{" "}
                <br />
                <Link className="text-gold-light_400 px-1" to="#">
                  Log out?
                </Link>
                Required fields are marked *
              </p>

              <div className="mt-6">
                <form>
                  <label className="text-white text-base">Comment *</label>
                  <CustomTextArea
                    className="h-[140px]"
                    placeholder="Leave your comment here ..."
                  />

                  <button className="btn-bg-gradient_2 shadow-md mt-2 text-[#030c3b] font-semibold rounded-[3px] p-2.5">
                    Post Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DailyReport;
