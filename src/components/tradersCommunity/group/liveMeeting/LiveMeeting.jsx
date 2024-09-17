
import LiveGroupItem from "./LiveGroupItem";
// import CummunityNavbar from "../../../../../components/tradersCommunity/Navbar";
import { LiaPencilAltSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import CummunityNavbar from "../../Navbar";

const LiveMeeting = () => {
  return (
    <div>
      <CummunityNavbar />

      <section className="relative w-full h-[40vh]">
        <img
          className="w-full h-full absolute inset-0 -z-10"
          src="/assets/slider-bg.png"
          alt=""
        />

        <div className="z-50 flex justify-between items-center p-2 h-full">
          <div className="flex justify-center w-full">
            <h4 className="text-4xl text-white">Live Meeting</h4>
          </div>

          <div className="h-full w-full">
            <img
              className="size-full object-cover"
              src="/assets/breadcrumb_img.png"
              alt="breadcrumb"
            />
          </div>
        </div>
      </section>
      <main className="bg-white py-20">
        <div className="h-[620px] flex border border-[#d7d8db] w-max mx-auto">
          {/* left side */}
          <div className="w-[320px] flex flex-col h-full">
            <div className="flex items-center gap-5 mt-2 w-[90%] mx-auto">
              <div>
                <LiaPencilAltSolid size={20} className="text-blue-600" />
              </div>
              <input
                className="outline-none border border-[#d7d8dbc1] px-3 py-1 rounded-sm placeholder:text-xs w-full text-sm text-gray-600"
                type="text"
                placeholder="Search ..."
              />
            </div>

            {/* ************* */}
            <div className="border border-[#d7d8db] flex-grow mt-1">
              <input
                type="text"
                placeholder="Search ..."
                className="outline-none border-b border-b-[#d7d8dbc1] px-3 py-2 rounded-sm placeholder:text-xs w-full text-sm text-gray-600"
              />

              <div className="flex flex-col space-y-2 mt-4 mb-4">
                <LiveGroupItem />
                <LiveGroupItem />
                <LiveGroupItem />
                <LiveGroupItem />
                <LiveGroupItem />
              </div>
            </div>

            {/* ************* */}
            <div className="py-2 px-2 border-r border-r-[#d7d8db]">
              <div className="flex items-center justify-between ">
                <IoSettingsOutline size={20} className="text-[#2d5be3]" />
                <div className="flex items-center gap-2 hover:bg-slate-200 px-1 py-2 cursor-pointer transition-all rounded-sm">
                  <img
                    className="size-[26px]"
                    src="/assets/bp-avatar.png"
                    alt="User"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-gray-700">admin1</span>
                    <HiMiniCheckBadge size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right side */}
          <div className="w-[400px]">
            <div className="flex items-center gap-8 justify-end py-2 pb-3 px-6">
              <BsArrowsAngleExpand
                size={16}
                className="text-[#21759b] cursor-pointer font-bold"
              />
              <FaRegStar size={20} className="text-[#21759b] cursor-pointer" />
            </div>

            <div className="border-t border-t-[#d7d8db] flex items-center justify-center h-full">
              <div className="flex flex-col items-center justify-center space-y-3 h-full px-8 text-center">
                <div className="flex items-center gap-2">
                  <FiMessageCircle className="text-gray-500" size={34} />
                  <span className="text-gray-600">Select a conversation to dispaly messages</span>
                </div>
                <span className="text-gray-600 text-sm"> or</span>
                <span className="text-blue-600 text-base underline cursor-pointer">Start a new Conversation</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LiveMeeting;
