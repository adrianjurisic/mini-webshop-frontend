import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Webshop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded p-4 shadow cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/shop/product/${p.id}`)}
          >
            <img src={p.image_url} alt={p.name} className="w-full h-40 object-cover mb-2" />
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-600">{p.price} KM</div>
          </div>
        ))}
      </div>
    </div>
  );
}
