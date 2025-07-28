import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "adrian" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin/dashboard");
    } else {
      alert("Pogrešni podaci");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-20">
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Admin Prijava
        </h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="text"
            placeholder="Korisničko ime"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          >
            Prijavi se
          </button>
        </form>
      </div>
    </div>
  );
}


