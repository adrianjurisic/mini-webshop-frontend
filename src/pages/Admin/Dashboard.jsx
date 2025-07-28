import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Obrisati proizvod?")) {
      fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" })
        .then(() => fetchProducts())
        .catch(console.error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📦 Admin Panel — Proizvodi</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
        >
          + Novi proizvod
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">Nema proizvoda u sistemu.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-4 shadow bg-white flex flex-col justify-between h-full"
            >
              <div>
                {p.image_url && (
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-full h-48 object-contain bg-white p-2 rounded border"
                  />
                )}
                <h2 className="text-xl font-semibold mb-1">{p.name}</h2>
                <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                  {p.description}
                </p>
                <p className="text-blue-700 font-semibold mb-1">
                  {p.price.toFixed(2)} KM
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Količina: {p.quantity}
                </p>
              </div>
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded"
                >
                  Uredi
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-1 rounded"
                >
                  Obriši
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
