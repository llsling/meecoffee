import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  //定義表單狀態，姓名、電話、地址
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  //總額
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  //購物車為空，強制返回
  if (cart.length === 0) {
    return (
      <div className="p-10">
        <h2>購物車是空的</h2>
        <button onClick={() => navigate("/products")}>返回商品頁</button>
      </div>
    );
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("請填寫完整結帳資訊");
      return;
    }
    //結帳成功：清空購物車
    clearCart();
    //前往結帳成功頁
    navigate("/checkout-success");
  };
  return (
    <div className="p-10 max-w-[800px] mx-auto">
      <h1>結帳</h1>
      {/* 購物清單 */}
      <h2 className="mt-6">訂單內容</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex justify-between py-2 border-b border-gray-200"
        >
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>NT${item.price * item.quantity}</span>
        </div>
      ))}
      <h3 className="text-right mt-3">總金額：NT${total}</h3>
      {/* 結帳表單 */}
      <h2 className="mt-8">結帳資訊</h2>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          name="name"
          placeholder="收件人姓名"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="聯絡電話"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="收件地址"
          value={form.address}
          onChange={handleChange}
        />
      </div>
      {/* 提交 */}
      <div className="text-right mt-8">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-3 px-7 rounded-md font-bold cursor-pointer"
        >
          確認結帳
        </button>
      </div>
    </div>
  );
}
