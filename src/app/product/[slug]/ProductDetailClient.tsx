"use client";
import { useState } from "react";
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

  // Helper to render price display consistently
  const renderPrice = () => {
    if (isBearVariantProduct) {
      return (
        <div className="space-y-1">
          <span className="text-sm text-gray-500">Giá: {product.priceLabel}</span>
          <p className="text-4xl font-bold text-amber-700">{selectedBearPrice.toLocaleString("vi-VN")}₫</p>
        </div>
      );
    }
    if (isFoodVariantProduct) {
      return <p className="text-4xl font-bold text-amber-700">{selectedFoodPrice.toLocaleString("vi-VN")}₫</p>;
    }
    if (isSnackVariantProduct) {
      return <p className="text-4xl font-bold text-amber-700">{selectedSnackPrice.toLocaleString("vi-VN")}₫</p>;
    }
    if (isWheelVariantProduct || isHouseVariantProduct) {
      const selectedIdx = isWheelVariantProduct ? selectedWheelVariant : selectedHouseVariant;
      const variants = product.variants!;
      const label = variants[selectedIdx].priceLabel;
      const price = variants[selectedIdx].price;
      return (
        <div className="space-y-1">
          <p className="text-4xl font-bold text-amber-700">{label || price.toLocaleString("vi-VN") + "₫"}</p>
          <span className="text-sm text-gray-500">Phạm vi giá: {product.priceLabel}</span>
        </div>
      );
    }
    if (isSandVariantProduct) {
      return <p className="text-4xl font-bold text-amber-700">{selectedSandPrice!.toLocaleString("vi-VN")}₫</p>;
    }
    if (isWoodVariantProduct) {
      return <p className="text-4xl font-bold text-amber-700">{selectedWoodPrice!.toLocaleString("vi-VN")}₫</p>;
    }
    if (isNhaTamCatProduct) {
      return (
        <div className="space-y-1">
          <p className="text-4xl font-bold text-amber-700">{selectedNhaTamCatPrice!.toLocaleString("vi-VN")}₫</p>
          <span className="text-sm text-gray-500">Phạm vi giá: {product.priceLabel}</span>
        </div>
      );
    }
    if (product.priceLabel) {
      return <span className="text-4xl font-bold text-amber-700">{product.priceLabel}</span>;
    }
    if (hasSale) {
      return (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-4xl font-bold text-red-500">{product.salePrice!.toLocaleString("vi-VN")}₫</span>
          <span className="text-xl text-gray-400 line-through">{product.price.toLocaleString("vi-VN")}₫</span>
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
            -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
          </span>
        </div>
      );
    }
    if (product.price) {
      return <span className="text-4xl font-bold text-amber-700">{product.price.toLocaleString("vi-VN")}₫</span>;
    }
    return <span className="text-4xl font-bold text-amber-700">Liên hệ</span>;
  };

  // Helper to render variant buttons (grid with optional images)
  const renderVariantGrid = (
    variants: { label: string; price: number; image?: string }[],
    selected: number,
    onSelect: (i: number) => void,
    cols: string = "grid-cols-4",
  ) => (
    <div className={cn("grid", cols, "gap-3")}>
      {variants.map((v, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            "group rounded-xl border-2 px-3 py-3 transition-all duration-200 text-center",
            "hover:shadow-md hover:-translate-y-0.5",
            selected === i
              ? "border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200"
              : "border-gray-200 bg-white hover:border-amber-300"
          )}
        >
          {v.image && (
            <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={v.image}
                alt={v.label}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="font-medium text-gray-800 text-xs leading-snug">{v.label}</div>
          <div className="text-amber-600 font-bold text-xs mt-1 bg-amber-50 rounded-full px-2 py-0.5 inline-block">
            {v.price.toLocaleString("vi-VN")}₫
          </div>
        </button>
      ))}
    </div>
  );

  // Helper to render vertical list variants
  const renderVariantList = (
    variants: { label: string; price: number; image?: string }[],
    selected: number,
    onSelect: (i: number) => void,
  ) => (
    <div className="flex flex-col gap-2">
      {variants.map((v, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            "group text-left rounded-xl border-2 px-4 py-3 transition-all duration-200",
            "hover:shadow-md hover:-translate-y-0.5",
            selected === i
              ? "border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200"
              : "border-gray-200 bg-white hover:border-amber-300"
          )}
        >
          <div className="flex justify-between items-center">
            <div className="font-medium text-gray-800">{v.label}</div>
            <div className="text-amber-600 font-semibold bg-amber-50 px-3 py-0.5 rounded-full">
              {v.price.toLocaleString("vi-VN")}₫
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
        <a href="/" className="underline-offset-2 hover:underline">
          Trang chủ
        </a>
        <span className="mx-2">/</span>
        <span aria-current="page" className="font-medium text-gray-900">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section aria-label="Hình ảnh sản phẩm">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <img
              src={displayImage || "https://placehold.co/300x300/999/fff?text=No+Image"}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {hasSale && (
              <span className="rounded border border-red-200 bg-red-50 px-2 py-1 text-red-700">
                Giảm {Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
              </span>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="rounded border border-orange-200 bg-orange-50 px-2 py-1 text-orange-700">Sắp hết</span>
            )}
            {product.stock === 0 && (
              <span className="rounded border border-gray-300 bg-gray-50 px-2 py-1 text-gray-700">Hết hàng</span>
            )}
            {product.stock > 5 && (
              <span className="rounded border border-green-200 bg-green-50 px-2 py-1 text-green-700">Còn hàng</span>
            )}
          </div>
        </section>

        <section aria-label="Thông tin sản phẩm" className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {product.category === "hamster"
                ? "Hamster"
                : product.category === "cage"
                  ? "Lồng"
                  : product.category === "food"
                    ? "Thức ăn"
                    : "Phụ kiện"}
            </p>
            <h1 className="text-2xl font-semibold text-gray-900">{product.name}</h1>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">{renderPrice()}</div>


          {/* Variant Selectors */}
          {isBearVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn kiểu lông:
              </p>
              <div className="flex flex-col gap-2">
                {variantOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedVariant(option.value)}
                    className={cn(
                      "group text-left rounded-xl border-2 px-4 py-3 transition-all duration-200",
                      "hover:shadow-md hover:-translate-y-0.5",
                      selectedVariant === option.value
                        ? "border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200"
                        : "border-gray-200 bg-white hover:border-amber-300"
                    )}
                  >
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isWinterWhiteProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn kiểu Winter White:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {winterWhiteOptions.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setSelectedWinterWhite(option.label)}
                    className={cn(
                      "group rounded-xl border-2 px-4 py-3 transition-all duration-200 text-center",
                      "hover:shadow-md hover:-translate-y-0.5",
                      selectedWinterWhite === option.label
                        ? "border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200"
                        : "border-gray-200 bg-white hover:border-amber-300"
                    )}
                  >
                    <div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden bg-gray-50 ring-1 ring-gray-200">
                      <img src={option.image} alt={option.label} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-medium text-gray-800 text-sm">{option.label}</div>
                    <div className="text-amber-600 font-semibold text-xs mt-1">{option.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isFoodVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn loại thức ăn:
              </p>
              {renderVariantList(product.variants!, selectedFoodVariant, setSelectedFoodVariant)}
            </div>
          )}

          {isSnackVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn loại ăn dặm:
              </p>
              {renderVariantGrid(product.variants!, selectedSnackVariant, setSelectedSnackVariant, "grid-cols-4")}
            </div>
          )}

          {isWheelVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn loại bánh xe:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {product.variants!.map((variant, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedWheelVariant(index)}
                    className={cn(
                      "group rounded-xl border-2 px-3 py-3 transition-all duration-200 text-left",
                      "hover:shadow-md hover:-translate-y-0.5",
                      selectedWheelVariant === index
                        ? "border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200"
                        : "border-gray-200 bg-white hover:border-amber-300"
                    )}
                  >
                    <div className="font-medium text-gray-800 text-sm">{variant.label}</div>
                    <div className="text-amber-600 font-bold text-sm mt-0.5">
                      {variant.priceLabel || variant.price.toLocaleString("vi-VN") + "₫"}
                    </div>
                    {variant.wheelDetails && variant.wheelDetails.length > 0 && (
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-2 pt-2 border-t border-gray-100">
                        {variant.wheelDetails.map((d, i) => (
                          <div key={i} className="text-xs text-gray-500">
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
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn loại nhà ngủ:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {product.variants!.map((variant, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedHouseVariant(index)}
                    className={cn(
                      "group rounded-xl border-2 px-2 py-3 transition-all duration-200 text-left",
                      "hover:shadow-md hover:-translate-y-0.5",
                      selectedHouseVariant === index
                        ? "border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200"
                        : "border-gray-200 bg-white hover:border-amber-300"
                    )}
                  >
                    {variant.image && (
                      <div className="w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gray-50">
                        <img src={variant.image} alt={variant.label} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="font-medium text-gray-800 text-xs leading-snug">{variant.label}</div>
                    <div className="text-amber-600 font-bold text-xs mt-0.5">
                      {variant.priceLabel || variant.price.toLocaleString("vi-VN") + "₫"}
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
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn loại cát tắm:
              </p>
              {renderVariantList(product.variants!, selectedSandVariant, setSelectedSandVariant)}
            </div>
          )}

          {isWoodVariantProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn phụ kiện:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {product.variants!.map((variant, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedWoodVariant(index)}
                    className={cn(
                      "group rounded-xl border-2 px-2 py-3 transition-all duration-200 text-left",
                      "hover:shadow-md hover:-translate-y-0.5",
                      selectedWoodVariant === index
                        ? "border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200"
                        : "border-gray-200 bg-white hover:border-amber-300"
                    )}
                  >
                    {variant.image && (
                      <div className="w-full aspect-square mb-2 rounded-lg overflow-hidden bg-gray-50">
                        <img src={variant.image} alt={variant.label} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="font-medium text-gray-800 text-xs leading-snug">{variant.label}</div>
                    <div className="text-amber-600 font-bold text-xs mt-0.5">
                      {variant.price.toLocaleString("vi-VN")}₫
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isNhaTamCatProduct && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <span>🎨</span> Chọn loại nhà tắm cát:
              </p>
              {renderVariantGrid(product.variants!, selectedNhaTamCatVariant, setSelectedNhaTamCatVariant, "grid-cols-4")}
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-900">Liên hệ đặt mua qua Zalo</h2>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <a
                href="https://zalo.me/0963107703"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Nhật Khoa — 0963 107 703
              </a>
              <a
                href="https://zalo.me/0394210096"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-gray-300 bg-white px-4 py-3 text-center font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                Tuấn Phạm — 0394 210 096
              </a>
            </div>
          </div>

        </section>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-amber-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">Sản phẩm liên quan</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}