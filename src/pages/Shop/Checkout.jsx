import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    adresa: "",
    telefon: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (cart.length === 0) {
      alert("Košarica je prazna.");
      return;
    }

    const payload = {
      kupac: form,
      stavke: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      status: "Prihvaćeno",
      kreirano: new Date().toISOString(),
    };

    fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("cart");
          alert("Hvala! Narudžba je uspješno poslana.");
          navigate("/shop");
        } else {
          throw new Error("Greška u slanju narudžbe");
        }
      })
      .catch(console.error);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Plaćanje i dostava</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["ime", "prezime", "adresa", "telefon", "email"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required={field !== "email"} // email je opcionalan
          />
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Potvrdi narudžbu
        </button>
      </form>
    </div>
  );
}
