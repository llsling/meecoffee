export default function MainIntroduction() {
  const sections = [
    {
      text: "原豆挑選",
      img: "/Main_img/pdCover8.png",
      alt: "原豆挑選",
      reverse: true,
      rounded: "rounded-tr-full",
    },
    {
      text: "專業烘豆",
      img: "/Main_img/pdCover9.png",
      alt: "專業烘豆",
      reverse: false,
      rounded: "rounded-tl-full",
    },
    {
      text: "世界各地",
      img: "/Main_img/pdCover10.png",
      alt: "世界各地",
      reverse: true,
      rounded: "rounded-tr-full",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center mt-16 gap-14 mx-5 lg:mx-0">
      {sections.map(({ text, img, alt, reverse, rounded }, index) => (
        <div
          key={index}
          className={`w-full overflow-hidden m-auto flex ${
            reverse ? "flex-row-reverse" : ""
          } 
        justify-center items-center border-b-4 border-b-gray-400 shadow-[0_8px_16px_-2px_rgba(156,163,175,0.6)]`}
        >
          <span className="flex-1 min-w-0 text-center text-base md:text-2xl border-b-2">
            {text}
          </span>
          <img
            src={img}
            alt={alt}
            className={`flex-1 min-w-0 w-full h-auto object-cover  ${rounded}`}
          />
        </div>
      ))}
    </div>
  );
}
