import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-4xl w-full mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">🛒 Vaša korpa</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 space-y-4">
          <p className="text-xl">Nemate artikala u korpi.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Nazad u kupovinu
          </button>
        </div>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border p-5 rounded-lg shadow bg-white"
              >
                <div className="flex flex-col w-full sm:w-2/3">
                  <span className="font-semibold text-lg">{item.name}</span>
                  <span className="text-sm text-gray-500">
                    {item.price.toFixed(2)} KM / kom
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(idx, -1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold"
                  >
                    −
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(idx, 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="text-right w-full sm:w-32">
                  <span className="font-medium text-blue-700 text-lg block">
                    {(item.quantity * item.price).toFixed(2)} KM
                  </span>
                  <button
                    onClick={() => removeItem(idx)}
                    className="text-red-600 text-sm underline hover:text-red-800"
                  >
                    Ukloni
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-10 text-2xl font-bold">
            Ukupno: {getTotal()} KM
          </div>

          <div className="text-right mt-6">
            <button
              onClick={() => navigate("/shop/checkout")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded text-lg transition"
            >
              Nastavi na plaćanje
            </button>
          </div>
        </>
      )}
    </div>
  );
}