import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Carousel() {
  const images = [
    "/Carousel/banner1.png",
    "/Carousel/banner2.png",
    "/Carousel/banner3.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  //自動播放
  useEffect(() => {
    const intervalDuration = 4000;
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, intervalDuration);
      return () => clearInterval(interval);
    }
  }, [images.length, isPaused]);
  return (
    <div
      className="relative max-w-[1024px] m-auto overflow-hidden my-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/*輪播圖*/}
      <div
        className="flex transition-transform duration-700 ease-in "
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <Link to="/Products" key={index} className="min-w-full">
            <img
              src={process.env.PUBLIC_URL + src}
              alt="精品咖啡豆"
              className="w-full"
            />
          </Link>
        ))}
      </div>
      {/*圓點導覽*/}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full transition-all duration-300 lg:h-3 lg:w-3 hover:bg-white/70 hover:scale-150 ${
              currentIndex === index ? "bg-white scale-150" : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
