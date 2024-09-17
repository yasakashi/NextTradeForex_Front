import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { getGroup } from "../../../../../redux/features/groupSlice";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";

const activeClass =
  "content-none before:w-[100%] before:bg-blue-secondary before:h-[6px] before:absolute before:left-0 before:-bottom-full before:z-[999] text-gray-900";

const Gallery = () => {
  const groupId = localStorage.getItem("groupId");

  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { group } = useSelector((state) => state.group);

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
  }, [group]);
  return (
    <div className="mt-8">
      <section className="flex-[2] mb-[50px]">
        <div className="bg-white flex justify-center shadow-sm rounded-lg px-8 mb-6 overflow-x-scroll scrollbar-none ">
          <ul className="flex items-center justify-center overflow-x-scroll scrollbar-none space-x-4 text-gray-500 text-xs font-medium py-4 w-max overflow-y-hidden">
            <li>
              <NavLink
                end
                className={({ isActive }) =>
                  `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                    isActive ? activeClass : ""
                  }`
                }
                to={`${url}/mediapress/all-galleries`}
              >
                All Galleries
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                    isActive ? activeClass : ""
                  }`
                }
                to={`${url}/mediapress/my-gallery`}
              >
                My Galleries
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative cursor-pointer w-max hover:text-gray-900 transition-all ${
                    isActive ? activeClass : ""
                  }`
                }
                to={`${url}/mediapress/create`}
              >
                Create Gallery
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default Gallery;
