import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const updateQuantity = (id, delta) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Košarica</h1>
      {cart.length === 0 ? (
        <p>Košarica je prazna.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="border p-4 rounded shadow">
                <div className="font-semibold">{item.name}</div>
                <div className="text-sm">Cijena: {item.price} KM</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-200 rounded">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-200 rounded">+</button>
                  <button onClick={() => removeItem(item.id)} className="text-red-600 ml-4 underline">
                    Ukloni
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <p className="font-bold">Ukupno: {total.toFixed(2)} KM</p>
            <button
              onClick={() => navigate("/shop/checkout")}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Nastavi na plaćanje
            </button>
          </div>
        </>
      )}
    </div>
  );
}
