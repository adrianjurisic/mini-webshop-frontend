import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import Orders from "./pages/Admin/Orders";
import ProductForm from "./pages/Admin/ProductForm";
import Home from "./pages/Shop/Home";
import ProductDetails from "./pages/Shop/ProductDetails";
import Cart from "./pages/Shop/Cart";
import Checkout from "./pages/Shop/Checkout";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products/new"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop/product/:id" element={<ProductDetails />} />
        <Route path="/shop/cart" element={<Cart />} />
        <Route path="/shop/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}