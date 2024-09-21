import CummunityNavbar from "../../../../components/tradersCommunity/Navbar";
import { useEffect, useState } from "react";
import MessagesAside from "../../../../components/tradersCommunity/group/MessagesAside";
import SignalChannelsAside from "../../../../components/tradersCommunity/group/SigalChannelsAside";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import toast from "react-hot-toast";
import CustomBeatLoader from "../../../../utils/loaders/CustomBeatLoader";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SideBar from "../../../../components/tradersCommunity/SideBar";
import { FaRegCopy } from "react-icons/fa6";
import {
  getGroup,
  getGroupCoverImg,
  getGroupImage,
  reqeustToJoinTheGroupAction,
} from "../../../../redux/features/groupSlice";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import ImageComponent from "../../../../common/ImageComponent";

const activeClass =
  "content-none before:w-[100%] before:bg-blue-secondary before:h-[6px] before:absolute before:left-0 before:-bottom-full before:z-[999] text-gray-900";

const CommunityGroup = () => {
  const location = useLocation();
  const { name } = useParams();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("loginToken");

  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const {
    group,
    getGroupLoading,
    groupId,
    editGroupLoading,
    groupImg,
    groupCoverImg,
    groupDetail,
  } = useSelector((state) => state.group);

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
  }, [groupId, groupDetail, groupImg, groupCoverImg]);

  // useEffect(() => {
  //   // dispatch(getGroupImage({ axiosPrivate, id: groupId }));
  //   dispatch(getGroupCoverImg({ axiosPrivate, id: groupId }));
  //   dispatch(getGroupImage({ axiosPrivate, id: groupId }));
  // }, [groupCoverImg, groupImg, dispatch, groupId]);

  useEffect(() => {
    let subUrl = group?.title
      ?.trim()
      ?.replace(/\s+/g, "-")
      .toLowerCase()
      .trim();

    setUrl(`/traders-community/groups/${subUrl}`);
    localStorage.setItem("groupname", subUrl);
  }, [group, editGroupLoading]);

  const pathParts = location?.pathname.split("/");
  const tab = pathParts[pathParts.length - 1];

  const copyGroupLinkHandler = () => {
    const fullUrl = `${window.location.origin}${url}`; // Construct full URL
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        toast.success("Group link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy group link.");
      });
  };

  return (
    <>
      <SideBar />

      <div className="bg-link-water  w-full min-h-screen h-full">
        <div className="w-full">
          <CummunityNavbar />

          <div className="w-full sm:w-[calc(100%-60px)] ml-auto">
            <div className="px-4 sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl mx-auto">
              <div className="mt-10 w-full">
                {/* User Banner */}
                <div className="relative flex items-center md:items-end  z-50 p-4 rounded-lg shadow-lg w-full h-[240px] md:h-[300px] text-white">
                  {/* background img */}
                  <div className="absolute inset-0 w-full h-full rounded-lg overflow-hidden -z-[1]">
                    <div className="group_banner_gradient absolute inset-0 z-0"></div>

                    {groupCoverImg ? (
                      <ImageComponent
                        className="object-cover w-full h-full"
                        src={groupCoverImg}
                        alt="Group Cover"
                      />
                    ) : (
                      <img
                        src="/assets/community/dummy-banner.jpg"
                        alt="banner"
                        className="object-cover rounded-lg w-full h-full z-10"
                      />
                    )}
                  </div>

                  {/* content  */}

                  <div className="z-50 px-4 md:px-10 flex items-start w-full gap-4">
                    <div className="w-[70px] h-[70px] shrink-0 md:size-[80px] rounded-full border-4 border-collapse z-20">
                      {groupImg ? (
                        <ImageComponent
                          className="object-cover object-center w-full h-full overflow-hidden rounded-full"
                          src={groupImg}
                          alt="Group Profile"
                        />
                      ) : (
                        <img
                          className="size-full rounded-full z-20 shrink-0"
                          src="/assets/mystery-group-50.png"
                          alt="group"
                        />
                      )}
                    </div>
                    <div className="w-full">
                      <div className="leading-3">
                        <h3 className="text-base sm:text-lg md:text-2xl font-bold capitalize">
                          {/* getGroupLoading */}
                          {getGroupLoading ? (
                            <SkeletonTheme
                              baseColor="#1c1c3c"
                              highlightColor="#444"
                              width="100px"
                              height="14px"
                              borderRadius="12px"
                            >
                              <p>
                                <Skeleton />
                              </p>
                            </SkeletonTheme>
                          ) : (
                            group?.title
                          )}
                        </h3>
                        <span className="text-sm text-gray-400 ">
                          {getGroupLoading ? (
                            <SkeletonTheme
                              baseColor="#1c1c3c"
                              highlightColor="#444"
                              width="70px"
                              height="10px"
                              borderRadius="12px"
                            >
                              <p>
                                <Skeleton />
                              </p>
                            </SkeletonTheme>
                          ) : (
                            group?.ownerusername
                          )}
                        </span>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 gap-2">
                        <div>
                          <div>
                            {group?.ownerusername ? (
                              user?.username !== group?.ownerusername ? (
                                <button
                                  onClick={requestToJoinTheGroupHandler}
                                  className="w-max border border-gray-500 px-2 md:px-4 py-2 hover:bg-white hover:text-gray-700 transition-all text-sm md:text-base"
                                >
                                  Request to join
                                </button>
                              ) : (
                                <div></div>
                              )
                            ) : null}
                            <button
                              onClick={copyGroupLinkHandler}
                              className="w-max flex items-center gap-2 text-xs border border-gray-500 px-2 py-2 hover:bg-white hover:text-gray-700 transition-all"
                            >
                              <FaRegCopy size={16} />
                              Copy Group Link
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center flex-wrap gap-2 md:gap-4 mr-6">
                          <div className="flex items-center gap-1">
                            <span className="text-xs w-max md:text-sm text-gray-400">
                              Group Type :
                            </span>
                            <span className="text-xs capitalize w-max md:text-sm font-medium">
                              {getGroupLoading ? (
                                <CustomBeatLoader color="#fff" />
                              ) : (
                                group?.grouptypename + " group"
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs md:text-sm w-max text-gray-400">
                              Members :
                            </span>
                            <span className="text-xs md:text-sm w-max font-medium">
                              {getGroupLoading ? (
                                <CustomBeatLoader color="#fff" />
                              ) : group?.membercount ? (
                                group?.membercount
                              ) : (
                                0
                              )}
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
                        <ul className="flex items-center overflow-x-scroll scrollbar-none space-x-4 text-gray-500 text-xs font-medium py-4 w-max overflow-y-hidden">
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
                          <li>
                            <NavLink
                              className={({ isActive }) =>
                                `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                                  isActive ? activeClass : ""
                                }`
                              }
                              to={`${url}/mediapress/all-galleries`}
                            >
                              Gallery
                            </NavLink>
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
                              to={`${url}/live-meeting`}
                            >
                              Live Meeting
                            </NavLink>
                          </li>

                          <li>
                            {group?.owneruserid === user?.userid ? (
                              <NavLink
                                className={({ isActive }) =>
                                  `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                                    isActive ? activeClass : ""
                                  }`
                                }
                                to={`${url}/admin/edit-details`}
                              >
                                Manage
                              </NavLink>
                            ) : null}
                          </li>
                        </ul>
                      </div>

                      {token ? (
                        <Outlet />
                      ) : (
                        <div className="bg-white p-8 rounded-lg my-10 text-center">
                          You are not loged in to access this part. Please
                          <Link
                            className="text-blue-dark text-base mx-1 font-semibold"
                            to="/login"
                          >
                            Login .
                          </Link>
                        </div>
                      )}
                    </section>

                    {/* right section */}
                    {token && (
                      <section className="flex-1 pl-4 mt-14 lg:mt-0">
                        <aside className="bg-white shadow-lg min-h-[500px] max-h-[60vh] rounded-lg overflow-y-scroll scrollbar-none">
                          {tab === name ? (
                            <MessagesAside />
                          ) : tab === "messages" ? (
                            <MessagesAside />
                          ) : tab === "signal-channels" ? (
                            <SignalChannelsAside id={groupId} />
                          ) : tab === "members" ? (
                            <div>Members</div>
                          ) : tab === "admin/" ? (
                            <MessagesAside />
                          ) : null}
                        </aside>
                      </section>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityGroup;
