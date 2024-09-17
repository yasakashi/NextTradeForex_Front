import { NavLink, Outlet } from "react-router-dom";

const activeClass =
  "content-none before:w-[100%] before:bg-gold-light_400 before:h-[3px] before:absolute before:left-0 before:bottom-0 before:z-[9999] text-gold-light_400";

const Settings = () => {
  return (
    <div>
      <div className="my-10">
        <ul className="flex items-center overflow-x-scroll scrollbar-none space-x-4 text-white text-base font-medium w-full pb-2 ">
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
              Profile
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
              Password
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
              Withdraw
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) =>
                `relative pb-2 cursor-pointer w-max hover:text-gold-light_400 transition-all ${
                  isActive ? activeClass : ""
                }`
              }
              to="/user-profile/settings/social-profile"
            >
              Social Profile
            </NavLink>
          </li>
        </ul>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Settings;
