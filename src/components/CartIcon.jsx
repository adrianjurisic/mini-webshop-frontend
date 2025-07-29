import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCount(total);
  };

  useEffect(() => {
    updateCount();
    const interval = setInterval(updateCount, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link to="/shop/cart" className="relative group">
      <div className="relative">
        <svg
          className="w-7 h-7 text-white group-hover:text-gray-300 transition"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.8 19M17 13l1.2 6M6 19a2 2 0 104 0 2 2 0 00-4 0zm10 0a2 2 0 104 0 2 2 0 00-4 0z"
          />
        </svg>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] px-1.5 py-0.5 rounded-full font-semibold shadow-md">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}