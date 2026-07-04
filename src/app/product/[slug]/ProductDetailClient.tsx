"use client";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [selectedVariant, setSelectedVariant] = useState<"xù" | "sát">("xù");
  const [selectedWinterWhite, setSelectedWinterWhite] = useState("Sóc đen");
  const [selectedFoodVariant, setSelectedFoodVariant] = useState(0);
  const [selectedSnackVariant, setSelectedSnackVariant] = useState(0);
  const [selectedWheelVariant, setSelectedWheelVariant] = useState(0);
  const [selectedHouseVariant, setSelectedHouseVariant] = useState(0);
  const [selectedSandVariant, setSelectedSandVariant] = useState(0);
  const [selectedWoodVariant, setSelectedWoodVariant] = useState(0);
  const [selectedNhaTamCatVariant, setSelectedNhaTamCatVariant] = useState(0);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <div className="container mx-auto px-4 py-10 text-center text-gray-600">Sản phẩm không tồn tại.</div>;
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const hasSale = product.salePrice && product.salePrice < product.price;
  const isBearVariantProduct = product.slug === "bear-long-hair";
  const isWinterWhiteProduct = product.slug === "winter-white";
  const isFoodVariantProduct = product.slug === "thuc-an-tron-hamster" && product.variants;
  const isSnackVariantProduct = product.slug === "an-dam" && product.variants;
  const isWheelVariantProduct = product.slug === "banh-xe" && product.variants;
  const isHouseVariantProduct = (product.slug === "nha-ngu-go" || product.slug === "nha-ngu-su") && product.variants;
  const isSandVariantProduct = product.slug === "cat-tam" && product.variants;
  const isWoodVariantProduct = product.slug === "phu-kien-go-thong" && product.variants;
  const isNhaTamCatProduct = product.slug === "nha-tam-cat" && product.variants;
  const bearVariantPrices = { xù: 120000, sát: 100000 } as const;
  const selectedBearPrice = isBearVariantProduct ? bearVariantPrices[selectedVariant] : product.price;
  const selectedFoodPrice = isFoodVariantProduct ? product.variants![selectedFoodVariant].price : product.price;
  const selectedSnackPrice = isSnackVariantProduct ? product.variants![selectedSnackVariant].price : product.price;
  const selectedWheelPrice = isWheelVariantProduct ? product.variants![selectedWheelVariant].price : product.price;
  const selectedHousePrice = isHouseVariantProduct ? product.variants![selectedHouseVariant].price : product.price;
  const selectedSandPrice = isSandVariantProduct ? product.variants![selectedSandVariant].price : product.price;
  const selectedWoodPrice = isWoodVariantProduct ? product.variants![selectedWoodVariant].price : product.price;
  const selectedNhaTamCatPrice = isNhaTamCatProduct ? product.variants![selectedNhaTamCatVariant].price : product.price;
  const selectedWoodVariantData = isWoodVariantProduct ? product.variants![selectedWoodVariant] : null;
  const selectedNhaTamCatVariantData = isNhaTamCatProduct ? product.variants![selectedNhaTamCatVariant] : null;

  const variantOptions = [
    { value: "xù" as const, label: "Lông xù", description: "Bộ lông dày, mềm mại và đáng yêu.", image: "/NKHamster/bearxu.jpg" },
    { value: "sát" as const, label: "Lông sát", description: "Bộ lông ngắn, bóng mượt và hiện đại.", image: "/NKHamster/bearsat.jpg" },
  ];
  const winterWhiteOptions = [
    { label: "Sóc đen", price: "60.000đ", image: "/NKHamster/wwsocden.jpg" },
    { label: "Trà sữa", price: "70.000đ", image: "/NKHamster/wwtrasua.jpg" },
    { label: "Trắng sọc", price: "80.000đ", image: "/NKHamster/wwtrang.jpg" },
    { label: "Bông lan", price: "100.000đ", image: "/NKHamster/wwbonglan.jpg" },
    { label: "Vàng chanh", price: "100.000đ", image: "/NKHamster/wwvangchanh.jpg" },
  ];

  const selectedWinterWhiteOption = winterWhiteOptions.find((option) => option.label === selectedWinterWhite);
  const selectedFoodVariantData = isFoodVariantProduct ? product.variants![selectedFoodVariant] : null;
  const selectedSnackVariantData = isSnackVariantProduct ? product.variants![selectedSnackVariant] : null;
  
  const selectedWheelVariantData = isWheelVariantProduct ? product.variants![selectedWheelVariant] : null;
  const selectedHouseVariantData = isHouseVariantProduct ? product.variants![selectedHouseVariant] : null;
  const selectedSandVariantData = isSandVariantProduct ? product.variants![selectedSandVariant] : null;
  
  let displayImage = product.image;
  if (isBearVariantProduct) {
    displayImage = variantOptions.find(o => o.value === selectedVariant)?.image || product.image;
  } else if (isFoodVariantProduct && selectedFoodVariantData && selectedFoodVariantData.image) {
    displayImage = selectedFoodVariantData.image;
  } else if (isSnackVariantProduct && selectedSnackVariantData && selectedSnackVariantData.image) {
    displayImage = selectedSnackVariantData.image;
  } else if (isWinterWhiteProduct && selectedWinterWhiteOption) {
    displayImage = selectedWinterWhiteOption.image;
  } else if (isWheelVariantProduct && selectedWheelVariantData && selectedWheelVariantData.image) {
    displayImage = selectedWheelVariantData.image;
  } else if (isHouseVariantProduct && selectedHouseVariantData && selectedHouseVariantData.image) {
    displayImage = selectedHouseVariantData.image;
  } else if (isSandVariantProduct && selectedSandVariantData && selectedSandVariantData.image) {
    displayImage = selectedSandVariantData.image;
  } else if (isWoodVariantProduct && selectedWoodVariantData && selectedWoodVariantData.image) {
    displayImage = selectedWoodVariantData.image;
  } else if (isNhaTamCatProduct && selectedNhaTamCatVariantData && selectedNhaTamCatVariantData.image) {
    displayImage = selectedNhaTamCatVariantData.image;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 flex justify-center">
          <img src={displayImage || "https://placehold.co/300x300/999/fff?text=No+Image"} alt={isWinterWhiteProduct ? selectedWinterWhite : product.name} className="w-full max-w-md aspect-square rounded-lg object-cover shadow" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-amber-800">{product.name}</h1>
          <div>
            {isBearVariantProduct ? (
              <div className="space-y-2">
                <span className="text-sm text-gray-500">{product.priceLabel}</span>
                <p className="text-4xl font-bold text-amber-700">{selectedBearPrice.toLocaleString("vi-VN")}đ</p>
              </div>
            ) : isFoodVariantProduct ? (
              <p className="text-4xl font-bold text-amber-700">{selectedFoodPrice.toLocaleString("vi-VN")}đ</p>
            ) : isSnackVariantProduct ? (
              <p className="text-4xl font-bold text-amber-700">{selectedSnackPrice.toLocaleString("vi-VN")}đ</p>
            ) : isWheelVariantProduct ? (
              <div className="space-y-1">
                <p className="text-4xl font-bold text-amber-700">
                  {product.variants![selectedWheelVariant].priceLabel || selectedWheelPrice!.toLocaleString("vi-VN") + "đ"}
                </p>
                <span className="text-sm text-gray-500">Phạm vi: {product.priceLabel}</span>
              </div>
            ) : isHouseVariantProduct ? (
              <div className="space-y-1">
                <p className="text-4xl font-bold text-amber-700">
                  {product.variants![selectedHouseVariant].priceLabel || selectedHousePrice!.toLocaleString("vi-VN") + "đ"}
                </p>
                <span className="text-sm text-gray-500">Phạm vi: {product.priceLabel}</span>
              </div>
            ) : isSandVariantProduct ? (
              <p className="text-4xl font-bold text-amber-700">{selectedSandPrice!.toLocaleString("vi-VN")}đ</p>
            ) : isWoodVariantProduct ? (
              <p className="text-4xl font-bold text-amber-700">{selectedWoodPrice!.toLocaleString("vi-VN")}đ</p>
            ) : isNhaTamCatProduct ? (
              <div className="space-y-1">
                <p className="text-4xl font-bold text-amber-700">{selectedNhaTamCatPrice!.toLocaleString("vi-VN")}đ</p>
                <span className="text-sm text-gray-500">Phạm vi: {product.priceLabel}</span>
              </div>
            ) : product.priceLabel ? (
              <span className="text-4xl font-bold text-amber-700">{product.priceLabel}</span>
            ) : hasSale ? (
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-red-500">{product.salePrice!.toLocaleString("vi-VN")}đ</span>
                <span className="text-xl text-gray-400 line-through">{product.price.toLocaleString("vi-VN")}đ</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                  -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
                </span>
              </div>
            ) : product.price ? (
              <span className="text-4xl font-bold text-amber-700">{product.price.toLocaleString("vi-VN")}đ</span>
            ) : (
              <span className="text-4xl font-bold text-amber-700">Liên hệ</span>
            )}
          </div>
          <p className="text-gray-600">{product.description}</p>

          {isBearVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn kiểu lông:</p>
              <div className="flex flex-col gap-2">
                {variantOptions.map((option) => (
                  <button key={option.value} type="button" onClick={() => setSelectedVariant(option.value)}
                    className={cn("text-left rounded-xl border px-4 py-3 transition",
                      selectedVariant === option.value ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isWinterWhiteProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn kiểu Winter White:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {winterWhiteOptions.map((option) => (
                  <button key={option.label} type="button" onClick={() => setSelectedWinterWhite(option.label)}
                    className={cn("text-left rounded-xl border px-4 py-3 transition",
                      selectedWinterWhite === option.label ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isFoodVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn loại thức ăn:</p>
              <div className="flex flex-col gap-2">
                {product.variants!.map((variant, index) => (
                  <button key={index} type="button" onClick={() => setSelectedFoodVariant(index)}
                    className={cn("text-left rounded-xl border px-4 py-3 transition flex justify-between items-center",
                      selectedFoodVariant === index ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800">{variant.label}</div>
                    <div className="text-amber-600 font-semibold">{variant.price.toLocaleString("vi-VN")}đ</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isSnackVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn loại ăn dặm:</p>
              <div className="grid grid-cols-4 gap-2">
                {product.variants!.map((variant, index) => (
                  <button key={index} type="button" onClick={() => setSelectedSnackVariant(index)}
                    className={cn("rounded-xl border px-2 py-2 transition text-center text-sm",
                      selectedSnackVariant === index ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800">{variant.label}</div>
                    <div className="text-amber-600 font-semibold text-xs">{variant.price.toLocaleString("vi-VN")}đ</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isWheelVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn loại bánh xe:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {product.variants!.map((variant, index) => (
                  <button key={index} type="button" onClick={() => setSelectedWheelVariant(index)}
                    className={cn("rounded-xl border px-3 py-3 transition text-left",
                      selectedWheelVariant === index ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800 text-sm">{variant.label}</div>
                    <div className="text-amber-600 font-bold text-sm mt-0.5">
                      {variant.priceLabel || variant.price.toLocaleString("vi-VN") + "đ"}
                    </div>
                    {variant.wheelDetails && variant.wheelDetails.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-1.5">
                        {variant.wheelDetails.map((d, i) => (
                          <div key={i} className="text-xs text-gray-500 whitespace-nowrap">
                            {d.size}: <span className="font-medium text-gray-700">{d.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isHouseVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn loại nhà ngủ:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {product.variants!.map((variant, index) => (
                  <button key={index} type="button" onClick={() => setSelectedHouseVariant(index)}
                    className={cn("rounded-xl border px-2 py-2.5 transition text-left",
                      selectedHouseVariant === index ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800 text-xs leading-snug">{variant.label}</div>
                    <div className="text-amber-600 font-bold text-xs mt-0.5">
                      {variant.priceLabel || variant.price.toLocaleString("vi-VN") + "đ"}
                    </div>
                    {variant.wheelDetails && variant.wheelDetails.length > 0 && (
                      <div className="mt-1 space-y-0">
                        {variant.wheelDetails.map((d, i) => (
                          <div key={i} className="text-[10px] text-gray-500 leading-tight">
                            {d.size} <span className="text-gray-700 font-medium">{d.price}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isSandVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn loại cát tắm:</p>
              <div className="flex flex-col gap-2">
                {product.variants!.map((variant, index) => (
                  <button key={index} type="button" onClick={() => setSelectedSandVariant(index)}
                    className={cn("text-left rounded-xl border px-4 py-3 transition flex justify-between items-center",
                      selectedSandVariant === index ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800">{variant.label}</div>
                    <div className="text-amber-600 font-semibold">{variant.price.toLocaleString("vi-VN")}đ</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isWoodVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn phụ kiện:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.variants!.map((variant, index) => (
                  <button key={index} type="button" onClick={() => setSelectedWoodVariant(index)}
                    className={cn("rounded-xl border px-2 py-2.5 transition text-left",
                      selectedWoodVariant === index ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800 text-xs leading-snug">{variant.label}</div>
                    <div className="text-amber-600 font-bold text-xs mt-0.5">{variant.price.toLocaleString("vi-VN")}đ</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isNhaTamCatProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-amber-800">Chọn loại nhà tắm cát:</p>
              <div className="grid grid-cols-4 gap-2">
                {product.variants!.map((variant, index) => (
                  <button key={index} type="button" onClick={() => setSelectedNhaTamCatVariant(index)}
                    className={cn("rounded-xl border px-2 py-2.5 transition text-center",
                      selectedNhaTamCatVariant === index ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800 text-xs leading-snug">{variant.label}</div>
                    <div className="text-amber-600 font-bold text-xs mt-0.5">{variant.price.toLocaleString("vi-VN")}đ</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-amber-800 mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}






