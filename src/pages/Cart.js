import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>購物車</h1>

      {cart.length === 0 && <p>購物車是空的</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            marginBottom: 16,
            borderBottom: "1px solid #ddd",
            paddingBottom: 12,
          }}
        >
          <h3>{item.name}</h3>
          <p>單價：${item.price}</p>

          {/* 數量控制 */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={() => decreaseQty(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>

          <p>小計：${item.price * item.quantity}</p>

          <button
            onClick={() => removeFromCart(item.id)}
            style={{ marginTop: 8 }}
          >
            刪除
          </button>
        </div>
      ))}

      {/* 總金額 + 結帳 */}
      {cart.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t-2 border-gray-200">
          <h2>總金額：${total}</h2>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-md font-bold cursor-pointer"
          >
            前往結帳
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
