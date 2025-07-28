import { useEffect, useState, useCallback } from "react";
import BASE_URL from "../../config";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchProducts = async () => {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    const map = {};
    data.forEach((p) => {
      map[p.id] = p.name;
    });
    setProducts(map);
  };

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (statusFilter) query.append("status", statusFilter);
      query.append("sort", sortOrder);

      const res = await fetch(`${BASE_URL}/orders?${query.toString()}`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Greška pri dohvaćanju narudžbi:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, sortOrder]);

  useEffect(() => {
    fetchProducts().then(fetchOrders);
  }, [fetchOrders]);

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

  const statusStyle = {
    Prihvaćeno: "text-green-600 font-semibold",
    Odbijeno: "text-red-600 font-semibold",
    Završeno: "text-gray-600 font-semibold",
  };

  if (loading) return <div className="p-4">Učitavanje narudžbi...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📦 Sve narudžbe</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="">Sve narudžbe</option>
          <option value="Prihvaćeno">Prihvaćene</option>
          <option value="Odbijeno">Odbijene</option>
          <option value="Završeno">Završene</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="desc">Najnovije</option>
          <option value="asc">Najstarije</option>
        </select>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-600">Trenutno nema narudžbi.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order.id}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <div className="font-semibold text-lg mb-1">
                    #{order.id} — {order.kupac.ime} {order.kupac.prezime}
                  </div>
                  <div className="text-sm text-gray-600">✉️ {order.kupac.email}</div>
                  <div className="text-sm text-gray-600">📞 {order.kupac.telefon}</div>
                  <div className="text-sm text-gray-600 mt-1">🏠 {order.kupac.adresa}</div>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={["Odbijeno", "Završeno"].includes(order.status)}
                  className={`border px-3 py-1 rounded disabled:opacity-50 ${statusStyle[order.status]}`}
                >
                  <option value="Prihvaćeno">Prihvaćeno</option>
                  <option value="Odbijeno">Odbijeno</option>
                  <option value="Završeno">Završeno</option>
                </select>
              </div>

              <hr className="my-3" />

              <div className="text-sm pl-2">
                <p className="font-medium mb-1">🧾 Stavke:</p>
                <ul className="list-disc ml-6">
                  {order.stavke.map((item, idx) => (
                    <li key={idx}>
                      {products[item.product_id] || `Proizvod #${item.product_id}`} — {item.quantity} kom
                    </li>
                  ))}
                </ul>

                <div className="text-xs text-gray-500 mt-3">
                  📅 Kreirano: {new Date(order.kreirano).toLocaleString()}
                </div>
                {order.obrada && (
                  <div className="text-xs text-gray-500">
                    ✅ Obrada: {new Date(order.obrada).toLocaleString()}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}