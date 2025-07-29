import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
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
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md">
      {/* Mobile: samo korpa */}
      <div className="md:hidden">
        <Link to="/shop/cart" className="text-2xl">
          <FaShoppingCart />
        </Link>
      </div>

      {/* Desktop: logo + linkovi */}
      <div className="hidden md:flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
        <img src={logo} alt="MiniWebshop logo" className="h-8 w-auto" />
      </div>

      <div className="hidden md:flex gap-4 items-center">
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
            <Link to="/shop/cart" className="hover:underline text-xl">
              <FaShoppingCart />
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