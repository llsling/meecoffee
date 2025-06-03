import { Facebook } from "lucide-react";

function Footer() {
  return (
    <div className="flex justify-center items-start gap-12 bg-[#fdf0d5] text-black p-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">聯絡我們</h3>
        <p>aazz55233@gmail.com</p>
        <p>0912345678</p>
        <p>週一至週五 9AM - 6PM</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">關注我們</h3>
        <div className="flex items-center space-x-3 ">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110"
          >
            <Facebook className="w-5 h-5 stroke-black" />
          </a>
          <a
            href="https://www.line.me/tw/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform transform hover:scale-110"
          >
            <img
              src={process.env.PUBLIC_URL + "/line.svg"}
              alt="Line Icon"
              className="w-[24px]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
