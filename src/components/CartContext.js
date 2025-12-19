import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  //{children}指被包在組件中間的所有內容(在App.js)
  const [cart, setCart] = useState([]);

  // 初始讀取 localStorage
  useEffect(() => {
    //JSON.parse(...)：把字串變回「陣列」
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);
  // 同步回 localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]); //依賴陣列放cart 有動作就更新

  const addToCart = (product, qty) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      //已存在商品
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      //新商品
      return [...prev, { ...product, quantity: qty }];
    });
  };
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //數量+
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  //數量- (<=0 自動移除）
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  // 清空購物車（結帳成功用）
  const clearCart = () => {
    setCart([]);
  };

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
