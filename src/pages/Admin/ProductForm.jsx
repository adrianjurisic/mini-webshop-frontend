import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    quantity: "",
    created_at: new Date().toISOString(),
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`http://localhost:8000/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setForm({
            ...data,
            price: data.price.toString(),
            quantity: data.quantity.toString(),
          });
        })
        .catch(console.error);
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit
      ? `http://localhost:8000/products/${id}`
      : "http://localhost:8000/products";

    const data = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image_url: form.image_url,
      quantity: parseInt(form.quantity),
      created_at: form.created_at || new Date().toISOString(),
    };

    if (isEdit) {
      data.id = parseInt(id);
    }

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          navigate("/admin/dashboard");
        } else {
          return res.text().then((msg) => Promise.reject(msg));
        }
      })
      .catch((err) => {
        console.error("Greška pri slanju:", err);
        alert("Neuspješno slanje proizvoda.");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">
        {isEdit ? "Uredi proizvod" : "Dodaj novi proizvod"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["name", "description", "image_url", "price", "quantity"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            type={field === "price" || field === "quantity" ? "number" : "text"}
            className="w-full border rounded p-2"
            required
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {isEdit ? "Spremi promjene" : "Dodaj proizvod"}
        </button>
      </form>
    </div>
  );
}

