import { useEffect, useState, useContext } from "react";
import { CartContext } from "../components/CartContext";

export default function ProductModal({ isOpen, onClose, p }) {
  const { addToCart } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQty(1);
      setAdded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const increment = () => setQty((q) => q + 1);
  const decrement = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(p, qty);
    setAdded(true);

    // 1 秒後自動關閉加入購物車的頁面
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        <div className="flex flex-col items-center text-start">
          <img
            src={process.env.PUBLIC_URL + p.img}
            alt={p.name}
            className="w-48 h-48 object-contain"
          />

          <h2 className="text-lg font-semibold mt-4">{p.name}</h2>

          <p className="text-gray-700 font-bold text-2xl mb-4">
            NT${parseFloat(p.price).toFixed(0)}
          </p>

          {/* 數量控制 */}
          <div className="w-full flex items-center justify-end mt-1">
            <div className="flex gap-8">
              <button
                onClick={decrement}
                className="w-8 h-8 border rounded text-lg font-bold hover:bg-gray-100"
                disabled={added}
              >
                -
              </button>
              <span className="text-lg font-medium w-6 text-center">{qty}</span>
              <button
                onClick={increment}
                className="w-8 h-8 border rounded text-lg font-bold hover:bg-gray-100"
                disabled={added}
              >
                +
              </button>
            </div>

            <button
              className={`px-8 py-2 ml-10 rounded transition
                ${
                  added
                    ? "bg-green-500 text-white cursor-default"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? "已加入購物車 ✓" : "加入購物車"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
