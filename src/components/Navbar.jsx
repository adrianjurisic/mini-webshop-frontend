import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import logo from "../logo.svg";

export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

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
    <nav className="bg-gray-900 text-white px-4 py-3 shadow-md relative">
      {/* Mobile Navbar */}
      <div className="flex md:hidden justify-between items-center">
        {/* Hamburger */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
          <FaBars />
        </button>

        {/* Logo */}
        <div className="cursor-pointer" onClick={handleLogoClick}>
          <img src={logo} alt="MiniWebshop logo" className="h-8 w-auto mx-auto" />
        </div>

        {/* Cart */}
        <Link to="/shop/cart" className="relative text-2xl">
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 bg-gray-800 rounded-lg shadow-md p-4 space-y-3">
          {isAdmin ? (
            <>
              <Link to="/admin/dashboard" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/admin/orders" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
                Narudžbe
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Odjava
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
                Početna
              </Link>
              <Link to="/shop/cart" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
                Korpa
              </Link>
              <Link
                to="/admin/login"
                className="block bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            </>
          )}
        </div>
      )}

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
          <img src={logo} alt="MiniWebshop logo" className="h-8 w-auto" />
        </div>

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
              <Link to="/shop/cart" className="hover:underline relative text-xl">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                    {cartCount}
                  </span>
                )}
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
      </div>
    </nav>
  );
}