import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import logo from "../logo.svg";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
    setMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md relative">
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div
        className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none md:left-auto cursor-pointer"
        onClick={handleLogoClick}
      >
        <img src={logo} alt="MiniWebshop logo" className="h-8 w-auto" />
      </div>

      <div className="hidden md:flex gap-4 items-center ml-auto">
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

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 flex flex-col items-start gap-3 p-4 z-50 md:hidden">
          {isAdmin ? (
            <>
              <Link to="/admin/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/orders" onClick={() => setMenuOpen(false)}>
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
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Početna
              </Link>
              <Link to="/shop/cart" onClick={() => setMenuOpen(false)}>
                Korpa <FaShoppingCart className="inline ml-1" />
              </Link>
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                Admin Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}