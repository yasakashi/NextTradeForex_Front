import DashboardView from "../../components/admin/templates/DashboardView";
import Sidebar from "../../components/admin/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = ({children}) => {
  return (
    <div className="flex ">
      <Sidebar showSidebar={true} />
      <div className="max-w-6xl w-full lg:w-[calc(100%-14rem)] mr-0 mx-auto  flex flex-col flex-wrap text-gray-700">
        <DashboardView />
        {children}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
