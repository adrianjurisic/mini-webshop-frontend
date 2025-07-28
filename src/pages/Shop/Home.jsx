import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [toastVisible, setToastVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleDetails = (id) => {
    navigate(`/shop/product/${id}`);
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      alreadyInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen py-10 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10 text-[#111827]">
          Naša ponuda
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col"
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="w-full h-48 object-contain bg-white p-2 rounded border"
                />
              )}
              <h2 className="text-lg font-semibold mb-1 text-[#111827]">
                {p.name}
              </h2>
              <p className="text-sm text-gray-600 mb-2">{p.description}</p>
              <p className="text-blue-700 font-bold text-lg mb-4">
                {p.price.toFixed(2)} KM
              </p>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleDetails(p.id)}
                  className="flex-1 bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200"
                >
                  Detalji
                </button>
                <button
                  onClick={() => addToCart(p)}
                  className="flex-1 bg-[#2563eb] text-white py-2 rounded hover:bg-blue-700"
                >
                  U korpu
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in-out">
          ✅ Proizvod dodat u korpu
        </div>
      )}
    </div>
  );
}

