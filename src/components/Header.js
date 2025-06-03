import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import throttle from "lodash/throttle";

export default function Header() {
  const listName = [
    ["最新消息", "/"],
    ["精品咖啡豆", "/Products", 1],
    ["精選禮盒", "/Products", 2],
    ["即期優惠", "/Products", 0],
    ["關於我們", "/"],
  ];
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 450);
    }, 100);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
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
                    if (item[1] === "/Products") {
                      navigate(`/Products?kindId=${item[2]}`);
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
          <a
            href="/login"
            aria-label="會員中心"
            className="hover:brightness-150 transition duration-300"
          >
            <img
              src={process.env.PUBLIC_URL + "/user-icon.png"}
              alt="會員中心"
              className="w-6 h-6"
            />
          </a>
          <a
            href="/cart"
            aria-label="購物車"
            className="flex items-end hover:brightness-150 transition duration-300"
          >
            <img
              src={process.env.PUBLIC_URL + "/cart-icon.png"}
              alt="購物車"
              className="w-6 h-6"
            />
            <span className="text-sm ml-0.5 relative top-[2px]">0</span>
          </a>
          <button
            type="button"
            aria-label="搜尋"
            className="hover:brightness-150 transition duration-300"
          >
            <img
              src={process.env.PUBLIC_URL + "/search-icon.png"}
              alt="搜尋"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
