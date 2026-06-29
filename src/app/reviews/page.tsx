"use client";
import { useReviews } from "@/hooks/useReviews";
import { products } from "@/data/products";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const SAMPLE_REVIEWS = [
  { id: -1, productId: 1, author: "Minh Anh", rating: 5, comment: "Hamster rất khỏe và dễ thương, ship nhanh, đóng gói cẩn thận.", createdAt: "15/01/2025" },
  { id: -2, productId: 6, author: "Quang Huy", rating: 5, comment: "Lồng mica đẹp, chất lượng tốt, bố trí dễ nhìn, hamster rất thích.", createdAt: "20/02/2025" },
  { id: -3, productId: 3, author: "Thu Hà", rating: 5, comment: "Winter White lông trắng muốt, hiền và thân thiện. Rất ưng!", createdAt: "05/03/2025" },
  { id: -4, productId: 9, author: "Bảo Long", rating: 4, comment: "Thức ăn tổng hợp hamster rất thích, ăn hết nhanh lắm.", createdAt: "12/03/2025" },
];

export default function ReviewsPage() {
  const userReviews = useReviews((s) => s.reviews);
  const allReviews = [...userReviews, ...SAMPLE_REVIEWS];

  const avgRating = allReviews.length
    ? (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1)
    : "5.0";

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8 flex items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-800">⭐ Đánh giá khách hàng</h1>
          <p className="text-gray-600 mt-1">Phản hồi thực tế từ khách hàng đã mua tại NK Hamster.</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-4xl font-bold text-amber-700">{avgRating}</p>
          <div className="flex gap-0.5 mt-1">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{allReviews.length} đánh giá</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {allReviews.map((review) => {
          const product = products.find((p) => p.id === review.productId);
          return (
            <div key={review.id} className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">{review.author}</p>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={cn("h-4 w-4", s <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-200")} />
                  ))}
                </div>
              </div>
              {product && (
                <p className="text-xs text-amber-600 mb-2">→ {product.name}</p>
              )}
              <p className="text-gray-700 text-sm leading-6">&ldquo;{review.comment}&rdquo;</p>
              <p className="text-xs text-gray-400 mt-2">{review.createdAt}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
