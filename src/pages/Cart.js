import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ padding: 20 }}>
      <h1>購物車</h1>

      {cart.length === 0 && <p>購物車是空的</p>}

      {cart.map((item) => (
        <div key={item.id} style={{ marginBottom: 16 }}>
          <h3>{item.name}</h3>
          <p>單價：${item.price}</p>
          <p>數量：{item.quantity}</p>
          <p>小計：${item.price * item.quantity}</p>
          <button onClick={() => removeItem(item.id)}>刪除</button>
        </div>
      ))}

      {cart.length > 0 && <h2>總金額：${total}</h2>}
    </div>
  );
}

export default Cart;
