import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/shop");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">
        MiniWebshop
      </Link>

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
            <Link to="/shop" className="hover:underline">
              Početna
            </Link>
            <Link to="/shop/cart" className="hover:underline">
              Košarica
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

