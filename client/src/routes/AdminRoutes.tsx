import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layout/AdminLayout";

const AdminRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user || user?.role !=="admin") return <Navigate to="/login" />;

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminRoutes;
