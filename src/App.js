import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import News from "./pages/News";
import About from "./pages/About";
import Cart from "./pages/Cart";
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
          <Route path="*" element={<Home />} /> {/*出現錯誤回首頁 */}
        </Routes>
        <Footer />
      </div>
    </CartProvider>
  );
}
