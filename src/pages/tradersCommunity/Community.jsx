import { Link } from "react-router-dom";
import CummunityNavbar from "../../components/tradersCommunity/Navbar";
import { FaLongArrowAltRight } from "react-icons/fa";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import { getPopularGroups } from "../../redux/features/groupSlice";
import CustomBeatLoader from "../../utils/loaders/CustomBeatLoader";
import { IoLogoWechat } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { RiFilePaper2Line } from "react-icons/ri";

const JOIN_TRADERS_SOCIAL_NETWORK = [
  {
    id: 1,
    Icon: IoLogoWechat,
    title: "Meet Great People",
    description:
      "Connect with great people in the Forex trading community! Build relationships, exchange ideas, and collaborate with exprienced traders to enhance your knowledge and trading success.",
  },
  {
    id: 2,
    Icon: FaUsers,
    title: "Forum Discussion",
    description:
      "Engage in insightful discussions on our Forex forum! Share your expriences, ask questions, and participate in conversatins with fellow traders to enhance your trading startegies and stay ahead of market trends.",
  },
  {
    id: 3,
    Icon: RiFilePaper2Line,
    title: "Active Groups",
    description:
      "Explore our active Forex trading groups! Join dynamic communities where traders share real-time insights, tips, and strategies to maximize their profits. Stay engaged, learn, and grow together with experienced traders.",
  },
];

const TradersCommunity = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { popularGroups, popularGroupsLoading } = useSelector(
    (state) => state.group
  );

  useEffect(() => {
    dispatch(getPopularGroups({ axiosPrivate }));
  }, []);


  return (
    <div>
      <CummunityNavbar />
      {/* Hero */}
      <div className="bg-blue-dark relative max_w_main mx-auto wrapper pt-[190px] overflow-hidden pb-[120px] z-50">
        <div className="">
          <h1 className="text-gold-light_400 font-black text-[40px] pb-3">
            Traders Community
          </h1>

          <p className="text-white w-[35%] mb-10">
            Having real social contacts can sometimes be difficult FUN,
            everything becomes much simpler!
          </p>

          <div className="text-white flex flex-col">
            <p className="text-[40px] font-bold  mb-2">10,95,219</p>
            <span className="text-sm">Connected People</span>
          </div>

          <Link
            className="mt-6 flex items-center  text-white text-base border border-gray-200 rounded-[25px] px-1 py-1 w-max group "
            to="/traders-community/groups"
          >
            <span className="group-hover:bg-blue-light pr-2 py-1 rounded-tl-[25px] rounded-bl-[25px] px-2 transition-all">
              Discover Now
            </span>
            <span className="bg-blue-light group-hover:rounded-tl-none group-hover:rounded-bl-none rounded-full transition-all p-2 mt-[1px]">
              <FaLongArrowAltRight size={17} />
            </span>
          </Link>
        </div>

        {/* image right */}
        <div className="absolute  top-1/2 z-10 -translate-y-1/2 right-10">
          <img
            className="w-[400px] xl:w-[600px]"
            src="/assets/community/shape_1.png"
            alt=""
          />
          <img
            className="w-[400px] xl:w-[600px]"
            src="/assets/community/people.png"
            alt=""
          />
        </div>

        {/* imgae bottom  */}

        <div className="absolute top-[49vh] left-0 -z-10 overflow-hidden h-full">
          <img
            className="overflow-hidden"
            src="/assets/community/map_line.png"
            alt="map"
          />
        </div>
      </div>

      {/* why traders join community from soscial media */}
      <section className="bg-[#1B2661] h-auto min-h-auto max-h-[780px] w-full pt-10 md:pt-[80px] xl:pt-[110px] pb-10 md:pb-[90px] px-4">
        <div className="w-full max_w_main mx-auto">
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
            <div className="lg:p-3 mt-auto mb-9">
              <div className="w-full mx-auto pr-4 lg:mx-0 sm:w-[90%] lg:w-[80%] lg:ml-auto xl:pr-10">
                <h2 className="text-gold-light_400 font-black mb-3 lg:mb-5 text-2xl lg:text-3xl capitalize sm:text-center lg:text-left">
                  Why Join Traders Community from social Network?
                </h2>
                <p className="text-[#797272] text-sm sm:text-center lg:text-left md:w-[80%] mx-auto lg:mx-0 md:text-base">
                  Social hen an unknown printer took a galley of type and
                  scrambled make type specimen book. It has survived not only
                  five centuries but also the leap into electronic typesetting
                  of the remaining essential unchanged they popularised with
                  release.
                </p>
              </div>
            </div>
            {/* __________________________ */}
            <div className="lg:p-3 sm:mt-7">
              <div className="md:w-[60%] lg:w-full mx-auto">
                <ul>
                  {JOIN_TRADERS_SOCIAL_NETWORK?.map(
                    ({ Icon, title, description }, i) => (
                      <li
                        key={i}
                        className={`flex items-center mb-6 md:mb-9 lg:mb-9 ${
                          i === 1 ? "pl-0 sm:pl-[80px]" : ""
                        }`}
                      >
                        <div className="size-[70px] md:size-[80px] lg:size-[90px] shrink-0 group bg-white hover:bg-gold-light_400 transition-all rounded-full mr-4 lg:mr-6 flex justify-center items-center">
                          <Icon
                            size={38}
                            className="text-blue-dark group-hover:text-white transition-all"
                          />
                        </div>
                        <div className="pr-4 sm:pr-[100px] md:pr-0 lg:pr-14">
                          <h3 className="capitalize font-bold lg:font-extrabold text-white text-[16px] md:text-[18px] lg:text-[20px] mb-1 lg:mb-2">
                            {title}
                          </h3>
                          <p className="text-[#71728c] text-xs md:text-sm lg:text-sm">
                            {description}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          <Link
            className="mt-6 mx-auto flex font-medium items-center text-white text-sm border border-gray-200 rounded-[25px] px-1 py-1 w-max group "
            to="/traders-community/groups"
          >
            <span className="group-hover:bg-blue-light pr-2 py-[6px] rounded-tl-[25px] rounded-bl-[25px] px-2 transition-all">
              Join Our Community
            </span>
            <span className="bg-blue-light group-hover:rounded-tl-none group-hover:rounded-bl-none rounded-full transition-all p-2 mt-[1px]">
              <FaLongArrowAltRight size={17} />
            </span>
          </Link>
        </div>
      </section>

      {/* the countries that the community is buit in there */}
      <section className="bg-[#112174] py-28 relative w-full z-0 overflow-hidden">
        <div className="w-full max_w_main mx-auto">
          <div className="w-full md:w-[50%] ml-auto px-4 lg:pr-[50px] xl:pr-[200px] relative z-50 max-w-[600px]">
            <p className="text-3xl font-black text-white">
              129 Countries We Build Our Largest Community in
            </p>
            <h2 className="text-xl my-3 text-[#E7E7E7]">
              Traders Community Network
            </h2>
            <p className="text-[#71728c] text-sm">
              When an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not only five
              centuries, but also leap electronic typesetting, remaining
              essentially.
            </p>
          </div>

          <img
            className="absolute overflow-hidden h-[90%] w-full top-0 left-0 md:-left-[30%] z-10 object-cover"
            src="/assets/community/map_line.png"
            alt="map"
          />
          <img
            className="absolute right-0 bottom-0 z-20 w-[300px]"
            src="/assets/community/shape_7.png"
            alt="Traders Network"
          />
        </div>
      </section>

      {/* most popular groups */}
      <section className="wrapper  bg-[#0F194E] pt-[60px] sm:pt-[80px] md:pt-[100px] lg:pt-[120px] pb-[50px] sm:pb-[70px] md:pb-[90px] lg:pb-[120px]">
        <div className="w-full max_w_main mx-auto">
          <div className="flex flex-col mb-5 items-center justify-center">
            <h1 className="text-gold-light_400 font-black text-2xl md:text-3xl xl:text-4xl pb-3">
              Most Popular Groups
            </h1>

            <p className="text-gray-500 text-sm w-[90%] md:max-w-[50%] text-center">
              When an unknown printer took a galley of type and meeting fari
              scrambled it to make a type of specific specimen book.
            </p>
          </div>

          {popularGroupsLoading ? (
            <div className="flex justify-center my-10 w-full">
              <CustomBeatLoader />
            </div>
          ) : null}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-14 sm:px-20 gap-4">
            {popularGroups?.length ? (
              popularGroups.map((item, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer w-full max-w-[250px] h-[180px] shadow-xl rounded-lg overflow-hidden group mx-auto"
                >
                  <div className="bg-black absolute w-full h-full opacity-40 group-hover:opacity-30 duration-300" />
                  <img
                    className="w-full h-full object-cover rounded-lg overflow-hidden"
                    src="/assets/community/dummy-banner.jpg"
                  />

                  <div className="absolute top-[50%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
                    <Link
                      className="text-gray-300 text-lg hover:text-gold-light_400 transition-all capitalize"
                      to="#"
                    >
                      {item?.title}
                    </Link>

                    <span className="bg-blue-light px-2 py-1 text-white text-xs rounded-[20px] w-max mt-6 translate-y-10 group-hover:translate-y-0 duration-300 font-medium">
                      {item?.membercount || 0} members
                    </span>
                  </div>
                </div>
              ))
            ) : !popularGroupsLoading ? (
              <div className="flex justify-center items-center text-center text-white text-xl">
                You don't have any popular groups
              </div>
            ) : null}
          </div>

          <Link
            className="mt-20  mx-auto flex items-center  text-white text-base border border-gray-200 rounded-[25px] px-1 py-1 w-max group "
            to="/traders-community/groups"
          >
            <span className="group-hover:bg-blue-light pr-2 py-1 rounded-tl-[25px] rounded-bl-[25px] px-2 transition-all">
              See All Groups
            </span>
            <span className="bg-blue-light group-hover:rounded-tl-none group-hover:rounded-bl-none rounded-full transition-all p-2 mt-[1px]">
              <FaLongArrowAltRight size={17} />
            </span>
          </Link>
        </div>
      </section>

      {/*  */}
      <Footer />
    </div>
  );
};

export default TradersCommunity;
