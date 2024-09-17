import { AiFillPlusSquare } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const activeClass =
  "content-none before:w-[100%] before:bg-gold-light_400 before:h-[3px] before:absolute before:left-0 before:bottom-0 before:z-[9999] text-gold-light_400";

const MyCourses = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl text-white my-4">My courses</h2>
        <Link
          to="#"
          className="flex items-center gap-2 bg-gradient-to-t from-[#F0D785] via-[#9C7049] to-[#F0D785] shadow-xl text-blue-dark px-4 py-2 rounded-md text-base font-semibold"
        >
          <AiFillPlusSquare size={20} />
          Create a New Course
        </Link>
      </div>
      <div className="mt-8">
        <div className="w-full border-b border-b-gray-300">
          <ul className="flex items-center overflow-x-scroll scrollbar-none space-x-4 text-white text-base font-medium w-full pb-2 ml-4">
            <li>
              <NavLink
                end
                className={({ isActive }) =>
                  `relative pb-2 cursor-pointer w-max hover:text-gold-light_400 transition-all ${
                    isActive ? activeClass : ""
                  }`
                }
                to="/user-profile/settings"
              >
                Publish (0)
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative pb-2 cursor-pointer w-max hover:text-gold-light_400 transition-all ${
                    isActive ? activeClass : ""
                  }`
                }
                to="/user-profile/settings/reset-password"
              >
                Pending (0)
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `relative pb-2 cursor-pointer w-max hover:text-gold-light_400 transition-all ${
                    isActive ? activeClass : ""
                  }`
                }
                to="/user-profile/settings/withdraw"
              >
                Draft (0)
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="my-8 text-white">Course1</div>
      </div>
    </div>
  );
};

export default MyCourses;
