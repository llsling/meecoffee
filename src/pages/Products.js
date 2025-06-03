import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductModal from "../components/ProductModal";

export default function Products() {
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [kinds, setKinds] = useState([]);

  useEffect(() => {
    fetch("https://meecoffee-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("從資料庫取得的商品資料：", data);
        setProducts(data);
      })
      .catch((err) => console.error("載入資料失敗：", err));
  }, []);
  useEffect(() => {
    fetch("https://meecoffee-backend.onrender.com/api/kinds")
      .then((res) => res.json())
      .then((data) => {
        setKinds([{ id: 0, name: "全部產品" }, ...data]);
      });
  }, []);

  const [selectedKindId, setSelectedKindId] = useState(0);
  useEffect(() => {
    const kindId = Number(searchParams.get("kindId")) || 0;
    setSelectedKindId(kindId);
  }, [searchParams]);

  const filteredProducts =
    selectedKindId === 0
      ? products
      : products.filter((p) => p.kind_id === selectedKindId);

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
          <span>{kinds.find((k) => k.id === selectedKindId)?.name}</span>
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
                  onClick={() => navigate(`/Products?kindId=${k.id}`)}
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
            {kinds.find((k) => k.id === selectedKindId)?.name}
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
