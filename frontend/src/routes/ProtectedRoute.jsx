import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" replace />;
    }

    return <Navigate to="/" replace />;
  }

  if (adminOnly && !user?.is_staff) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;