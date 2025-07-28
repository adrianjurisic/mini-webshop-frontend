import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

export default function Checkout() {
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    adresa: "",
    telefon: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.ime.trim()) newErrors.ime = "Ime je obavezno.";
    if (!form.prezime.trim()) newErrors.prezime = "Prezime je obavezno.";
    if (!form.adresa.trim()) newErrors.adresa = "Adresa je obavezna.";
    if (!form.telefon.trim()) newErrors.telefon = "Telefon je obavezan.";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email nije validan.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Košarica je prazna.");
      return;
    }

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    const payload = {
      kupac: form,
      stavke: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
      status: "Prihvaćeno",
      kreirano: new Date().toISOString(),
    };

    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          localStorage.removeItem("cart");
          alert("Narudžba je uspješno poslana!");
          navigate("/shop");
        } else {
          throw new Error("Greška u slanju narudžbe");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Došlo je do greške prilikom slanja.");
      })
      .finally(() => setLoading(false));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      <button
        onClick={() => navigate("/shop/cart")}
        className="text-blue-600 hover:underline flex items-center mb-6"
      >
        <span className="text-xl mr-1">←</span> Nazad na korpu
      </button>

      <div className="grid md:grid-cols-2 gap-8">

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Podaci za dostavu</h2>
          {["ime", "prezime", "adresa", "telefon", "email"].map((field) => (
            <div key={field} className="flex flex-col">
              <input
                name={field}
                placeholder={field}
                value={form[field]}
                onChange={handleChange}
                className={`w-full border rounded p-2 ${
                  errors[field] ? "border-red-500" : ""
                }`}
              />
              {errors[field] && (
                <span className="text-red-600 text-sm mt-1">
                  {errors[field]}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
            } text-white px-4 py-2 rounded w-full transition`}
          >
            {loading ? "Šalje se..." : "Potvrdi narudžbu"}
          </button>
        </form>

        <div>
          <h2 className="text-2xl font-bold mb-4">Pregled narudžbe</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Košarica je prazna.</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {cart.map((item, idx) => (
                <li key={idx} className="border p-3 rounded shadow bg-white">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span>
                      {item.quantity} x {item.price.toFixed(2)} KM
                    </span>
                  </div>
                  <div className="text-sm text-right text-gray-600">
                    Ukupno: {(item.quantity * item.price).toFixed(2)} KM
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="text-xl font-bold text-right">
            Ukupno za platiti: {getTotal()} KM
          </div>
        </div>
      </div>
    </div>
  );
}
