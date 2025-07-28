import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../config";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      alreadyInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Dodano u košaricu!");
  };

  if (!product) return <div className="p-6 text-center">Učitavanje...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Slika proizvoda */}
        <div className="flex items-center justify-center p-4 md:p-6 bg-gray-50">
          <img
            src={product.image_url}
            alt={product.name}
            className="max-h-96 w-full object-contain rounded-lg border shadow-sm"
          />
        </div>

        {/* Detalji proizvoda */}
        <div className="flex flex-col justify-between p-4 md:p-6 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="mb-4">
              <span className="text-2xl font-semibold text-blue-600">
                {product.price.toFixed(2)} KM
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Dostupno:{" "}
              <span className="font-medium text-gray-800">
                {product.quantity} kom
              </span>
            </p>
          </div>

          <button
            onClick={addToCart}
            className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Dodaj u košaricu
          </button>
        </div>
      </div>
    </div>
  );
}