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
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-96 object-cover"
        />

        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3 text-gray-900">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-lg font-semibold text-blue-600 mb-2">
              {product.price.toFixed(2)} KM
            </p>
            <p className="text-sm text-gray-500">
              Na stanju: {product.quantity} kom
            </p>
          </div>

          <button
            onClick={addToCart}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-3 rounded-lg transition"
          >
            Dodaj u košaricu
          </button>
        </div>
      </div>
    </div>
  );
}

