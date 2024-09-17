import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import CummunityNavbar from "../../../components/tradersCommunity/Navbar";
import { useEffect, useState } from "react";
import MessagesAside from "../../../components/tradersCommunity/group/MessagesAside";
import SignalChannelsAside from "../../../components/tradersCommunity/group/SigalChannelsAside";
import { useDispatch, useSelector } from "react-redux";
import {
  clearGroupId,
  getGroup,
  reqeustToJoinTheGroupAction,
} from "../../../redux/features/groupSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import { clearSignalChannelId } from "../../../redux/features/signals/SignalSlice";

const activeClass =
  "content-none before:w-[100%] before:bg-blue-secondary before:h-[6px] before:absolute before:left-0 before:-bottom-full before:z-[9999] text-gray-900";

const CommunityGroup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const [activeTab, setActiveTab] = useState("home");
  const [url, setUrl] = useState("");
  const [prevLocation, setPrevLocation] = useState(location.pathname);

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { group, getGroupLoading, groupId } = useSelector(
    (state) => state.group
  );

  const requestToJoinTheGroupHandler = () => {
    dispatch(
      reqeustToJoinTheGroupAction({
        axiosPrivate,
        toast,
        data: { communitygroupId: groupId },
      })
    );
  };

  useEffect(() => {
    dispatch(getGroup({ axiosPrivate, id: groupId }));
  }, [groupId]);

  useEffect(() => {
    let subUrl = group?.title
      ?.trim()
      ?.replace(/\s+/g, "-")
      .toLowerCase()
      .trim();

    setUrl(`/traders-community/groups/${subUrl}`);
  }, [group, groupId, getGroupLoading, group?.title]);

  const pathParts = location?.pathname.split("/");
  const tab = pathParts[pathParts.length - 1];

  return (
    <div className="bg-link-water  w-full min-h-screen h-full">
     
      <div className="w-full">
        <CummunityNavbar />
        <div className=" w-full px-4 sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto">
          <div className="mt-10 w-full">
            {/* User Banner */}
            <div className="relative flex items-center md:items-end  z-50 p-4 rounded-lg shadow-lg w-full h-[240px] md:h-[300px] text-white">
              {/* background img */}
              <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden -z-[1]">
                <div className="bg-gradient-to-t  from-black via-[#00000084] to-[#00000091] absolute inset-0 z-0"></div>
                <img
                  src="/assets/community/dummy-banner.jpg"
                  alt="banner"
                  className="object-cover rounded-lg w-full h-full z-10"
                />
              </div>

              {/* content  */}

              <div className="z-50 px-4 md:px-10 flex items-start w-full gap-4">
                <div className="w-[50px] h-[50px] shrink-0 md:size-[80px] rounded-full border-4 border-collapse z-20">
                  <img
                    className="size-full rounded-full z-20 shrink-0"
                    src="/assets/mystery-group-50.png"
                    alt="group"
                  />
                </div>
                <div className="w-full">
                  <div className="leading-3">
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold capitalize">
                      {group?.title || "Group Name"}
                    </h3>
                    <span className="text-sm text-gray-400 ">NextBit</span>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-2">
                    <button
                      onClick={requestToJoinTheGroupHandler}
                      className="w-max border border-gray-500 px-2 md:px-4 py-2 hover:bg-white hover:text-gray-700 transition-all text-sm md:text-base"
                    >
                      Request to join
                    </button>
                    <div className="flex items-center flex-wrap gap-2 md:gap-4 mr-6">
                      <div className="flex items-center gap-1">
                        <span className="text-xs w-max md:text-sm text-gray-400">
                          Group Type :
                        </span>
                        <span className="text-xs w-max md:text-sm font-medium">
                          {group?.grouptypename} group
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs md:text-sm w-max text-gray-400">
                          Members :
                        </span>
                        <span className="text-xs md:text-sm w-max font-medium">
                          {group?.membercount || "---"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}
            <div className="mt-10 w-full pb-10">
              <div className="flex flex-col lg:flex-row">
                <section className="flex-[2] mb-[50px]">
                  <div className="bg-white shadow-sm rounded-lg px-8 overflow-x-scroll scrollbar-none">
                    <ul className="flex items-center overflow-x-scroll scrollbar-none space-x-4 text-gray-500 text-sm font-medium py-4 w-max overflow-y-hidden">
                      <li>
                        <NavLink
                          end
                          className={({ isActive }) =>
                            `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                              isActive ? activeClass : ""
                            }`
                          }
                          to={`${url}`}
                        >
                          Home
                        </NavLink>
                      </li>
                      <li className="cursor-pointer hover:text-gray-900 transition-all">
                        Gallery
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                              isActive ? activeClass : ""
                            }`
                          }
                          to={`${url}/messages`}
                        >
                          Messages
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                              isActive ? activeClass : ""
                            }`
                          }
                          to={`${url}/members`}
                        >
                          Members
                        </NavLink>
                      </li>
                      <li
                        className={({ isActive }) =>
                          `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                            isActive ? activeClass : ""
                          }`
                        }
                      >
                        Forums
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                              isActive ? activeClass : ""
                            }`
                          }
                          to={`${url}/signal-channels`}
                        >
                          Signal Channels
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className={({ isActive }) =>
                            `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                              isActive ? activeClass : ""
                            }`
                          }
                          to={`${url}/signals-list`}
                        >
                          Signals
                        </NavLink>
                      </li>
                      <li className="cursor-pointer hover:text-gray-900 transition-all w-max">
                        Live Meeting
                      </li>
                    </ul>
                  </div>

                  <Outlet />
                </section>

                {/* right section */}
                <section className="flex-1 pl-4">
                  <aside className="bg-white shadow-lg min-h-[500px] max-h-[60vh] overflow-y-auto rounded-lg overflow-y-scroll scrollbar-none">
                    {activeTab === name ? (
                      <MessagesAside />
                    ) : tab === "messages" ? (
                      <MessagesAside />
                    ) : tab === "signal-channels" ? (
                      <SignalChannelsAside id={groupId} />
                    ) : tab === "signals" ? (
                      <div className="p-4">Signals</div>
                    ) : tab === "members" ? (
                      <div>Members</div>
                    ) : null}
                  </aside>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityGroup;
