import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
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

  if (!product) return <div className="p-4">Učitavanje...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img src={product.image_url} alt={product.name} className="w-full h-60 object-cover mb-4" />
      <p className="mb-2">{product.description}</p>
      <p className="mb-2 font-semibold">Cijena: {product.price} KM</p>
      <p className="mb-4 text-sm text-gray-600">Na stanju: {product.quantity} kom</p>
      <button
        onClick={addToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Dodaj u košaricu
      </button>
    </div>
  );
}
