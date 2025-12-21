import { Link } from "react-router-dom"; //頁面跳轉不刷新
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext"; //匯入購物車的共享狀態上下文
import throttle from "lodash/throttle"; //匯入節流函數，限制滾動事件觸發頻率以提高效能

export default function Header() {
  const { totalQty } = useContext(CartContext); //拿CartContext的值
  //定義導航欄列表
  const listName = [
    ["最新消息", "/news"],
    ["精品咖啡豆", "/products", 1],
    ["精選禮盒", "/products", 2],
    ["即期優惠", "/products", 0],
    ["關於我們", "/about"],
  ];
  const navigate = useNavigate(); //宣告導航工具
  const [isScrolled, setIsScrolled] = useState(false); //滾動是否超過450px
  useEffect(() => {
    //使用 throttle 限制每 100ms 才執行一次判斷，避免滾動時過度消耗效能
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 450);
    }, 100);
    handleScroll(); //初始化時先執行一次判斷
    window.addEventListener("scroll", handleScroll, { passive: true }); //開始監聽, passive: true直接滾不卡/不會呼叫 preventDefault()
    //清除函式：組件卸載時移除監聽器，避免記憶體洩漏
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "bg-[#f4f6f7]" : "bg-[#f4f6f7]/40 backdrop-blur-md"
      } `}
    >
      <div
        className={`flex justify-start items-center max-w-6xl w-full px-8 m-auto transition-all duration-300 ${
          isScrolled ? "py-2" : "py-4"
        } lg:justify-center`}
      >
        <Link to="/" className="max-w-20 lg:max-w-24 lg:mr-16">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="小美咖啡" />
        </Link>
        <nav aria-label="主導覽列" className="hidden lg:block">
          <ul className="flex justify-center space-x-16 text-xl text-gray-700">
            {listName.map((item, index) => (
              <li key={index} className="relative">
                <div
                  onClick={() => {
                    if (item[1] === "/products") {
                      navigate(`/products?kindId=${item[2]}`);
                    } else {
                      navigate(item[1]);
                    }
                  }}
                  className={`cursor-pointer transition-colors duration-300 hover:text-black inline-block
                   after:content-[''] after:absolute after:left-0 after:bottom-0
                   after:h-[2px] after:w-0 hover:after:w-full after:bg-black
                   after:transition-all after:duration-300`}
                >
                  {item[0]}
                </div>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={`flex absolute right-5 space-x-5 text-gray-700 transition-all duration-300 ${
            isScrolled ? "bottom-3 lg:bottom-5" : "bottom-4 lg:bottom-8"
          }`}
        >
          <Link
            to="/LoginRegister"
            aria-label="會員中心"
            className="hover:brightness-150 transition duration-300"
          >
            <img
              src={process.env.PUBLIC_URL + "/user-icon.png"}
              alt="會員中心"
              className="w-6 h-6"
            />
          </Link>
          <Link
            to="/cart"
            aria-label="購物車"
            className="flex items-end hover:brightness-150 transition duration-300 cursor-pointer"
          >
            <img
              src={process.env.PUBLIC_URL + "/cart-icon.png"}
              alt="購物車"
              className="w-6 h-6"
            />
            {totalQty > 0 && (
              <span className="relative text-sm ml-0.5 top-[2px]">
                {totalQty}
              </span>
            )}
          </Link>
          {/* <button
            type="button"
            aria-label="搜尋"
            className="hover:brightness-150 transition duration-300"
          >
            <img
              src={process.env.PUBLIC_URL + "/search-icon.png"}
              alt="搜尋"
              className="w-6 h-6"
            />
          </button> */}
        </div>
      </div>
    </header>
  );
}
