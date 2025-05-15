import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PrivateLayout from "../layout/PrivateLayout";

const PrivateRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="login\" />;

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default PrivateRoutes;
