import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import News from "./pages/News";
import About from "./pages/About";
import Cart from "./pages/Cart"; //購物車
import Checkout from "./pages/Checkout"; //結帳頁
import CheckoutSuccess from "./pages/CheckoutSuccess";
import LoginRegister from "./pages/LoginRegister"; //註冊登入
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/loginregister" element={<LoginRegister />} />
          <Route path="*" element={<Home />} /> {/*出現錯誤回首頁 */}
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}
