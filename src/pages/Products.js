import { useMemo } from "react";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [kinds, setKinds] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedKindId = Number(searchParams.get("kindId")) || 0;
  const selectedKind = useMemo(() => {
    return kinds.find((k) => k.id === selectedKindId);
  }, [kinds, selectedKindId]);

  useEffect(() => {
    fetch("https://meecoffee-backend.onrender.com/api/products")
      // fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("products API 回傳：", data);

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("products 格式錯誤", data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("載入 products 失敗：", err);
        setProducts([]);
      });
  }, []);

  useEffect(() => {
    fetch("https://meecoffee-backend.onrender.com/api/kinds")
      // fetch("http://localhost:3001/api/kinds")
      .then((res) => res.json())
      .then((data) => {
        console.log("kinds API 回傳：", data);

        if (Array.isArray(data)) {
          setKinds([{ id: 0, name: "全部產品" }, ...data]);
        } else if (Array.isArray(data.kinds)) {
          setKinds([{ id: 0, name: "全部產品" }, ...data.kinds]);
        } else if (Array.isArray(data.data)) {
          setKinds([{ id: 0, name: "全部產品" }, ...data.data]);
        } else {
          console.error("kinds 格式錯誤", data);
          setKinds([{ id: 0, name: "全部產品" }]);
        }
      })
      .catch((err) => {
        console.error("載入 kinds 失敗", err);
        setKinds([{ id: 0, name: "全部產品" }]);
      });
  }, []);

  useEffect(() => {
    if (!searchParams.has("kindId")) {
      navigate("/products?kindId=0", { replace: true });
    }
  }, [searchParams, navigate]);

  const filteredProducts = Array.isArray(products)
    ? selectedKindId === 0
      ? products
      : products.filter((p) => p.kind_id === selectedKindId)
    : [];

  // 打開 modal 的函式，例如點選商品時
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="w-full bg-[#f9f9f9] pb-72">
      <div className="w-full px-5 py-2 bg-gray-200 text-sm">
        <div className="max-w-screen-lg italic mx-auto flex items-center gap-1">
          <Link to="/">首頁</Link>
          <span className="mx-0.5 text-gray-400">/</span>
          <span>
            {kinds.length === 0
              ? "載入中..."
              : selectedKind?.name || "全部產品"}
          </span>
        </div>
      </div>
      <div className="max-w-screen-lg flex flex-col sm:flex-row justfity-center items-start gap-6 mx-auto px-4 py-8">
        <div className="w-full sm:w-48 border-r border-gray-300 pr-4">
          <h3 className="text-lg font-semibold text-[#0d1b2a] mb-4 border-b pb-2">
            商品分類
          </h3>
          <ul className="flex flex-col gap-4 text-base font-medium cursor-pointer text-gray-700">
            {kinds.map((k) => {
              return (
                <li
                  key={k.id}
                  onClick={() => {
                    navigate(`/products?kindId=${k.id}`);
                  }}
                  className="transition-all hover:text-[#0d1b2a] hover:translate-x-1"
                >
                  {k.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col items-start w-full gap-6">
          <h2 className="text-xl font-bold text-gray-800 ml-6">
            {kinds.length === 0
              ? "載入中...資料載入速度不快，請稍等"
              : selectedKind?.name || "全部產品"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-9 w-full">
            {filteredProducts.map((p) => {
              return (
                <div key={p.id} className="rounded-md">
                  <div
                    onClick={() => handleOpenModal(p)}
                    className="cursor-pointer"
                  >
                    <div className="relative">
                      <div className="w-full aspect-square overflow-hidden rounded-md">
                        <img
                          src={process.env.PUBLIC_URL + p.img}
                          alt={p.name}
                          className="transform transition-transform duration-500 hover:scale-105 ease-in-out"
                        />
                      </div>
                      <div className="absolute bottom-2 -left-1 flex flex-col gap-2 text-xs text-gray-800">
                        <span className="bg-yellow-200 px-2 rounded-r-md">
                          {p.country}
                        </span>
                        <span className="bg-orange-300 px-2 rounded-r-md">
                          {p.process}
                        </span>
                        <span className="bg-green-200 px-2 rounded-r-md">
                          {p.roast}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="text-sm md:text-base">{p.name}</span>
                      <span className="text-center text-base font-medium md:text-lg">
                        ${parseFloat(p.price).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ProductModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        p={selectedProduct}
      />
    </div>
  );
}
