"use client";
import { useMemo, useState, useEffect } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useReviews } from "@/hooks/useReviews";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [selectedVariant, setSelectedVariant] = useState<"xù" | "sát">("xù");
  const [selectedWinterWhite, setSelectedWinterWhite] = useState("Sóc đen");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { reviews, addReview, loadReviews } = useReviews();

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Tất cả hooks phải gọi trước bất kỳ return nào
  const product = products.find((p) => p.slug === slug);
  const productReviews = useMemo(
    () => (product ? reviews.filter((r) => r.productId === product.id) : []),
    [reviews, product]
  );

  if (!product) {
    return <div className="container mx-auto px-4 py-10 text-center text-gray-600">Sản phẩm không tồn tại.</div>;
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const hasSale = product.salePrice && product.salePrice < product.price;
  const isBearVariantProduct = product.slug === "bear-long-hair";
  const isWinterWhiteProduct = product.slug === "winter-white";
  const bearVariantPrices = { xù: 120000, sát: 100000 } as const;
  const selectedBearPrice = isBearVariantProduct ? bearVariantPrices[selectedVariant] : product.price;

  const variantOptions = [
    { value: "xù" as const, label: "Lông xù", description: "Bộ lông dày, mềm mại và đáng yêu." },
    { value: "sát" as const, label: "Lông sát", description: "Bộ lông ngắn, bóng mượt và hiện đại." },
  ];
  const winterWhiteOptions = [
    { label: "Sóc đen", price: "60.000đ" },
    { label: "Trà sữa", price: "70.000đ" },
    { label: "Trắng sọc", price: "80.000đ" },
    { label: "Bông lan", price: "100.000đ" },
    { label: "Vàng chanh", price: "100.000đ" },
  ];

  const submitReview = async () => {
    if (!reviewText.trim() || !reviewAuthor.trim()) return;
    setIsSubmittingReview(true);
    await addReview({ productId: product.id, author: reviewAuthor.trim(), rating: reviewRating, comment: reviewText.trim() });
    setReviewText("");
    setReviewAuthor("");
    setReviewRating(5);
    setIsSubmittingReview(false);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full rounded-2xl shadow" />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-amber-800">{product.name}</h1>
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300")} />
            ))}
            <span className="text-sm text-gray-500">({product.reviewCount} đánh giá)</span>
          </div>
          <div>
            {isBearVariantProduct ? (
              <div className="space-y-2">
                <span className="text-sm text-gray-500">{product.priceLabel}</span>
                <p className="text-4xl font-bold text-amber-700">{selectedBearPrice.toLocaleString()}đ</p>
              </div>
            ) : product.priceLabel ? (
              <span className="text-4xl font-bold text-amber-700">{product.priceLabel}</span>
            ) : hasSale ? (
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-red-500">{product.salePrice!.toLocaleString()}đ</span>
                <span className="text-xl text-gray-400 line-through">{product.price.toLocaleString()}đ</span>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
                  -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
                </span>
              </div>
            ) : (
              <span className="text-4xl font-bold text-amber-700">{product.price.toLocaleString()}đ</span>
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
                      selectedWinterWhite === option.label ? "border-amber-500 bg-amber-50 shadow-sm" : "border-gray-200 bg-white hover:border-amber-300")}>
                    <div className="font-medium text-gray-800">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-sm text-gray-500">
            Còn hàng: <span className={product.stock <= 3 ? "text-red-500 font-semibold" : ""}>{product.stock} sản phẩm</span>
          </p>
          <div className="flex gap-3">
            <Button size="lg" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
              disabled={product.stock <= 0}
              onClick={() => useCart.getState().addItem(product)}>
              <ShoppingCart className="h-5 w-5 mr-2" /> {product.stock <= 0 ? "Hết hàng" : "Thêm vào giỏ"}
            </Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={() => useWishlist.getState().addItem(product)}>
              <Heart className="h-5 w-5 mr-2" /> Yêu thích
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16 rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Đánh giá khách hàng</h2>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-3">
            {productReviews.length === 0 ? (
              <p className="text-sm text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
            ) : productReviews.map((review) => (
              <div key={review.id} className="rounded-2xl border border-amber-100 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-800">{review.author}</p>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={cn("h-4 w-4", s <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200")} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                <p className="mt-2 text-xs text-gray-400">{review.createdAt}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="font-semibold text-amber-800 mb-3">Viết đánh giá</p>
            <input value={reviewAuthor} onChange={(e) => setReviewAuthor(e.target.value)} placeholder="Tên của bạn" className="w-full rounded-2xl border border-amber-200 p-2 mb-3" />
            <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className="w-full rounded-2xl border border-amber-200 p-2 mb-3">
              {[5,4,3,2,1].map((v) => <option key={v} value={v}>{v} sao</option>)}
            </select>
            <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={4} placeholder="Nội dung đánh giá" className="w-full rounded-2xl border border-amber-200 p-2 mb-3" />
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white" onClick={submitReview} disabled={isSubmittingReview}>
              {isSubmittingReview ? "Đang gửi..." : "Gửi đánh giá"}
            </Button>
          </div>
        </div>
      </section>

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
