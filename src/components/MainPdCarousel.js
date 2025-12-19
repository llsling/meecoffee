import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function MainPdCarousel() {
  const pdCard = [
    [
      process.env.PUBLIC_URL + "/Main_img/pdCard1.png",
      "印尼",
      "半水洗",
      "淺中焙",
      "印尼 蘇門答臘 加幼 超級黃金曼特寧",
      "$250",
    ],
    [
      process.env.PUBLIC_URL + "/Main_img/pdCard2.png",
      "衣索比亞",
      "日曬",
      "淺中焙",
      "衣索比亞 班奇馬吉 寶貝露西 藝伎 酒香日曬處理 1361 批次 G1",
      "$325",
    ],
    [
      process.env.PUBLIC_URL + "/Main_img/pdCard3.png",
      "瓜地馬拉",
      "水洗",
      "中焙",
      "杯測93分 瓜地馬拉 安提瓜 花神-貝拉卡摩娜莊園 水洗",
      "$190",
    ],
    [
      process.env.PUBLIC_URL + "/Main_img/pdCard4.png",
      "哥倫比亞",
      "水洗",
      "淺中焙",
      "哥倫比亞 聖荷西莊園 水洗蘭姆酒桶發酵 *濃烈威士忌香氣",
      "$315",
    ],
    [
      process.env.PUBLIC_URL + "/Main_img/pdCard5.png",
      "印尼",
      "半水洗",
      "中深焙",
      "超級黃金經典曼巴",
      "$180",
    ],
    [
      process.env.PUBLIC_URL + "/Main_img/pdCard6.png",
      "肯亞",
      "水洗",
      "中焙",
      "肯亞 麒麟雅嘉 水洗 AA FAQ",
      "$195",
    ],
  ];
  const [startIndex, setStartIndex] = useState(0); //哪張開始
  const [cardShow, setCardShow] = useState(4); //卡片數量
  const [scrollInterval, setScrollInterval] = useState(null);
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardShow(4);
      } else if (window.innerWidth >= 768) {
        setCardShow(3);
      } else {
        setCardShow(2);
      }
    };
    updateCardsToShow(); //載入時先執行一次
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);
  const visibleCards = pdCard.slice(startIndex, startIndex + cardShow);
  const scrollLeft = () => {
    //如果已經在最左邊，就跳到最後一組；否則索引 -1
    setStartIndex((prev) => (prev === 0 ? pdCard.length - cardShow : prev - 1));
  };
  const scrollRight = () => {
    //如果已經在最右邊，就回到 0；否則索引 +1
    setStartIndex((prev) => (prev >= pdCard.length - cardShow ? 0 : prev + 1));
  };
  const handleLeftHoverStart = () => {
    if (scrollInterval) return;
    setTimeout(() => {
      setScrollInterval(setInterval(scrollLeft, 600));
    }, 200);
  };
  const handleRightHoverStart = () => {
    if (scrollInterval) return;
    setTimeout(() => {
      setScrollInterval(setInterval(scrollRight, 600));
    }, 200);
  };
  const handleHoverEnd = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };
  return (
    <div className="relative flex justify-center items-start mt-16">
      <div
        className="mt-20"
        onMouseEnter={handleLeftHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <button
          // onClick={scrollLeft}
          className={`w-8 h-8 md:w-16 md:h-16 flex justify-center items-center 
                transition-all duration-300 hover:scale-110 ${
                  pdCard.length <= cardShow ? "hidden" : ""
                }`}
        >
          <div className="w-0 h-0 border-y-[18px] border-r-[24px] border-y-transparent border-r-gray-500" />
        </button>
      </div>
      <div className="flex justify-center items-start gap-6 md:gap-8 lg:gap-10">
        {visibleCards.map(([img, country, process, roast, title, price], i) => (
          <div key={i} className="max-w-[200px] h-auto rounded-md">
            <Link to="/products">
              <div className="relative">
                <div className="w-full aspect-square overflow-hidden rounded-md">
                  <img
                    src={img}
                    className="transform transition-transform duration-500 hover:scale-105 ease-in-out"
                  />
                </div>
                <div className="absolute bottom-2 -left-1 flex flex-col gap-2 text-xs text-gray-800 ">
                  <span className="bg-yellow-200 px-2 rounded-r-md">
                    {country}
                  </span>
                  <span className="bg-orange-300 px-2 rounded-r-md">
                    {process}
                  </span>
                  <span className="bg-green-200 px-2 rounded-r-md">
                    {roast}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-sm md:text-base">{title}</span>
                <span className="text-center text-base font-medium md:text-lg">
                  {price}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div
        className="mt-20"
        onMouseEnter={handleRightHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        <button
          // onClick={scrollRight}
          className={`w-8 h-8 md:w-16 md:h-16 flex justify-center items-center 
                transition-all duration-300 hover:scale-110 ${
                  pdCard.length <= cardShow ? "hidden" : ""
                }`}
        >
          <div className="w-0 h-0 border-y-[18px] border-l-[24px] border-y-transparent border-l-gray-500" />
        </button>
      </div>
    </div>
  );
}
