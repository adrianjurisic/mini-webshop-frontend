import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Obrisati proizvod?")) {
      fetch(`http://localhost:8000/products/${id}`, { method: "DELETE" })
        .then(() => fetchProducts())
        .catch(console.error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => navigate("/admin/products/new")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Novi proizvod
        </button>
      </div>

      <ul className="space-y-3">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded shadow">
            <div className="text-lg font-semibold">{p.name}</div>
            <div>Cijena: {p.price} KM</div>
            <div>Količina: {p.quantity}</div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                className="text-blue-600 underline"
              >
                Uredi
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-600 underline"
              >
                Obriši
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
