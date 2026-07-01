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
  const bearVariantPrices = { xù: 120000, sát: 100000 } as const;
  const selectedBearPrice = isBearVariantProduct ? bearVariantPrices[selectedVariant] : product.price;
  const selectedFoodPrice = isFoodVariantProduct ? product.variants![selectedFoodVariant].price : product.price;
  const selectedSnackPrice = isSnackVariantProduct ? product.variants![selectedSnackVariant].price : product.price;

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
  
  let displayImage = product.image;
  if (isBearVariantProduct) {
    displayImage = variantOptions.find(o => o.value === selectedVariant)?.image || product.image;
  } else if (isFoodVariantProduct && selectedFoodVariantData && selectedFoodVariantData.image) {
    displayImage = selectedFoodVariantData.image;
  } else if (isSnackVariantProduct && selectedSnackVariantData && selectedSnackVariantData.image) {
    displayImage = selectedSnackVariantData.image;
  } else if (isWinterWhiteProduct && selectedWinterWhiteOption) {
    displayImage = selectedWinterWhiteOption.image;
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
            ) : (
              <span className="text-4xl font-bold text-amber-700">{product.price.toLocaleString("vi-VN")}đ</span>
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






