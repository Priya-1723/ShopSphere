import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, role }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/products" replace />;
  }

  return children;
};

export default ProtectedRoute;
