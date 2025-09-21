import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PrivateRoute;
