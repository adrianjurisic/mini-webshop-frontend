import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../components/CartIcon";
import logo from "../logo.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const handleLogoClick = () => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <button onClick={handleLogoClick} className="flex items-center gap-2">
        <img src={logo} alt="MiniWebshop logo" className="h-8 w-auto" />
      </button>

      <div className="flex gap-4 items-center">
        {isAdmin ? (
          <>
            <Link to="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/admin/orders" className="hover:underline">
              Narudžbe
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Odjava
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">
              Početna
            </Link>
            <Link to="/shop/cart" className="hover:underline">
              <CartIcon />
            </Link>
            <Link
              to="/admin/login"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Admin Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
