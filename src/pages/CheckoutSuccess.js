import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex justify-center items-center">
      <div className="text-center max-w-[500px]">
        <h1 className="text-[28px] mb-4">🎉 訂單成立成功</h1>
        <p className="text-gray-600 mb-6">
          感謝您的訂購，我們已收到您的訂單，將盡快為您安排出貨。
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="py-2.5 px-5 rounded-md border border-gray-300 cursor-pointer"
          >
            回到首頁
          </button>
          <button
            onClick={() => navigate("/products")}
            className="py-2.5 px-5 rounded-md bg-yellow-400 font-bold cursor-pointer border-0"
          >
            繼續購物
          </button>
        </div>
      </div>
    </div>
  );
}
