import { useEffect, useState } from "react";
import BASE_URL from "../../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    const map = {};
    data.forEach((p) => {
      map[p.id] = p.name;
    });
    setProducts(map);
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/orders`);
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error("Greška pri dohvaćanju narudžbi:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts().then(fetchOrders);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => {
        if (res.ok) fetchOrders();
        else throw new Error("Neuspješno ažuriranje statusa.");
      })
      .catch((err) => {
        console.error("Greška pri promjeni statusa:", err);
        alert("Nije moguće promijeniti status.");
      });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Prihvaćeno":
        return "bg-green-100 text-green-800";
      case "Odbijeno":
        return "bg-red-100 text-red-800";
      case "Završeno":
        return "bg-gray-200 text-gray-700";
      default:
        return "";
    }
  };

  if (loading) return <div className="p-4">Učitavanje narudžbi...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Sve narudžbe</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">Trenutno nema narudžbi.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded shadow p-4 space-y-2 bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-semibold">
                    #{order.id} — {order.kupac.ime} {order.kupac.prezime}
                  </div>
                  <div className="text-sm text-gray-600">{order.kupac.email}</div>
                  <div className="text-sm text-gray-600">{order.kupac.telefon}</div>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={["Odbijeno", "Završeno"].includes(order.status)}
                  className={`border px-3 py-1 rounded ${getStatusClass(order.status)} ${
                    ["Odbijeno", "Završeno"].includes(order.status)
                      ? "opacity-60 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <option value="Prihvaćeno">Prihvaćeno</option>
                  <option value="Odbijeno">Odbijeno</option>
                  <option value="Završeno">Završeno</option>
                </select>
              </div>

              <div className="pl-4 text-sm">
                <p className="text-gray-700 font-medium">
                  Adresa: {order.kupac.adresa}
                </p>
                <p className="text-gray-700 mt-2">Stavke:</p>
                <ul className="list-disc ml-4">
                  {order.stavke.map((item, idx) => (
                    <li key={idx}>
                      {products[item.product_id] || `Proizvod #${item.product_id}`} — količina: {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Kreirano: {new Date(order.kreirano).toLocaleString()}
                </p>
                {order.obrada && (
                  <p className="text-xs text-gray-500">
                    Obrada: {new Date(order.obrada).toLocaleString()}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

