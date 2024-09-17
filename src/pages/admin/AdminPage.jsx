import UserManagement from "../../components/admin/UserManagement";
import AdminLayout from "./AdminLayout";

const AdminPage = () => {
  return (
    <div>
      <AdminLayout>
        <UserManagement />
      </AdminLayout>
    </div>
  );
};

export default AdminPage;
