import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isAdmin") === "true";
  return isLoggedIn ? children : <Navigate to="/admin/login" />;
}