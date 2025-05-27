import { useNavigate } from "react-router-dom";
import MainPdCarousel from "./MainPdCarousel";
import MainIntroduction from "./MainIntroduction";

export default function Main() {
  const images = [
    ["/Main_img/pdCover1.png", "精品咖啡豆", 1],
    ["/Main_img/pdCover2.png", "精選禮盒", 2],
    ["/Main_img/pdCover3.png", "大師系列｜濾掛", 3],
    ["/Main_img/pdCover4.png", "訂購表單", 0],
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap justify-center items-center max-w-screen-lg mx-auto mt-6 mb-72 px-4 ">
      {/* 小美咖啡 配方豆｜單品豆｜精選豆 */}
      <div>
        <div className="flex justify-center items-end w-full space-x-4">
          <span className="text-3xl font-semibold md:text-4xl ">小美咖啡</span>
          <span className="text-base md:text-lg lg:text-xl font-semibold text-gray-900">
            配方豆｜單品豆｜精選豆
          </span>
        </div>
        <p className="w-full font-light text-center my-8">
          來自世界各地的精品咖啡豆，多種選擇搭配，讓您每一天都有如漫遊世界。
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mx-4 sm:mx-0">
          {images.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                navigate("/Products", { state: { kindId: item[2] } })
              }
              className="group block"
            >
              <div className="relative w-full overflow-hidden rounded-tr-full transform transition duration-700 ease-in-out group-hover:scale-105 group-hover:-translate-y-1">
                <img
                  src={item[0]}
                  alt={item[1]}
                  className="w-full h-auto rounded-tr-full transition duration-700 "
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/70 transition duration-700" />
                <div className="absolute inset-0 flex justify-center items-center">
                  <span className="text-white text-lg lg:text-xl font-semibold">
                    {item[1]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 熱門商品 */}
      <div>
        <div className="flex justify-center items-center w-full mt-16 md:mt-24 gap-4">
          <div className="flex-1 h-[3px] rounded-full bg-gradient-to-r from-[#a3b18a] to-transparent" />
          <p className="text-xl md:text-2xl font-medium text-nowrap">
            熱門商品
          </p>
          <div className="flex-1 h-[3px] rounded-full bg-gradient-to-l from-[#a3b18a] to-transparent" />
        </div>
        <MainPdCarousel />
        <div className="flex justify-center items-center w-full mt-32 gap-4">
          <div className="flex-1 h-[3px] rounded-full bg-gradient-to-r from-[#a3b18a] to-transparent" />
          <p className="text-base md:text-2xl font-medium text-nowrap">
            雙倍用心 只為打造一杯好咖啡
          </p>
          <div className="flex-1 h-[3px] rounded-full bg-gradient-to-l from-[#a3b18a] to-transparent" />
        </div>
      </div>
      {/* 雙倍用心介紹圖 */}
      <MainIntroduction />
      {/* 地址 */}
      <div className="w-32 mt-32 mb-11">
        <div className="h-[3px] rounded-full bg-[linear-gradient(90deg,#ff00cc,#00ffff,#ff00cc)] bg-[length:200%_100%] bg-right animate-flow-right-to-left" />
        <p className="text-xl md:text-2xl font-medium text-nowrap text-center my-1">
          我們在這裡
          <span className="text-pink-500 animate-bounce">{`(ﾉ>ω<)ﾉ`}</span>
          <span className=" text-2xl mt-1 animate-ping text-pink-400">⬇</span>
        </p>
        <div className="h-[3px] rounded-full bg-[linear-gradient(90deg,#ff00cc,#00ffff,#ff00cc)] bg-[length:200%_100%] bg-right animate-flow-left-to-right" />
      </div>
      <div className="w-full flex flex-col md:flex-row justify-center items-center relative mr-0 md:mr-10 gap-4 md:gap-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.305447398989!2d120.48946822819572!3d22.67550293652341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e179a8dfb27cf%3A0x8903295b6b83b6b7!2z5bGP5p2x5YWs5ZyS!5e0!3m2!1szh-TW!2stw!4v1747382941463!5m2!1szh-TW!2stw"
          className="md:absolute md:top-36 lg:top-24 left-16 sm:w-[350px] md:w-[250px] lg:w-[350px] sm:h-[300px] md:h-[200px] lg:h-[300px] shadow-xl md:shadow-2xl hover:scale-105 transition-transform duration-300 rounded-2xl"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="hidden md:block w-full h-80 bg-slate-300 mt-36" />
        <div className="md:absolute bottom-36 md:left-44 lg:left-56 px-6 py-4 bg-white ">
          <span className="text-2xl md:text-3xl lg:text-4xl font-semibold italic">
            Pingtung Coffee
          </span>
          <span className="block mt-2 italic">Good Coffee</span>
        </div>
        <img
          src="/Main_img/store1.png"
          className="w-[350px] md:w-auto md:h-[700px]"
        />
      </div>
    </div>
  );
}
