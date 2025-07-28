import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../config";

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
      fetch(`${BASE_URL}/products/${id}`)
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
      ? `${BASE_URL}/products/${id}`
      : `${BASE_URL}/products`;

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
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-md shadow-inner">
          {isEdit ? "✏️ Uredi proizvod" : "➕ Dodaj novi proizvod"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: "name", label: "Naziv proizvoda" },
            { name: "description", label: "Opis" },
            { name: "image_url", label: "URL slike" },
            { name: "price", label: "Cijena (KM)", type: "number", min: 0.1, step: 0.1 },
            { name: "quantity", label: "Količina", type: "number", min: 1 },
          ].map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                type={field.type || "text"}
                min={field.min}
                step={field.step}
                className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              {field.name === "image_url" && form.image_url && (
                <div className="mt-4">
                  <img
                    src={form.image_url}
                    alt="Pregled slike"
                    className="w-full max-h-60 object-contain border rounded-md shadow-sm"
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition text-white font-semibold py-2 px-4 rounded-md shadow"
          >
            {isEdit ? "💾 Spremi promjene" : "✅ Dodaj proizvod"}
          </button>
        </form>
      </div>
    </div>
  );
}



