import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("admin") === "true";
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
}
