import Link from "next/link";
import CategoryPage from "@/components/shared/CategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thức ăn Hamster - NK Hamster",
  description: "Thức ăn dinh dưỡng cho hamster của bạn. Thức ăn tổng hợp, snack, bánh thưởng chất lượng cao.",
  openGraph: {
    title: "Thức ăn Hamster - NK Hamster",
    description: "Thức ăn dinh dưỡng cho hamster của bạn",
  },
};

export default function FoodPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">🍽 Thức ăn cho Hamster</h1>
        <p className="text-gray-600">Thức ăn dinh dưỡng cho hamster của bạn.</p>
      </div>

      {/* Mixed Food Category Card */}
      <div className="max-w-4xl mx-auto mb-12">
        <Link 
          href="/foods/tron"
          className="block bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-sm border-2 border-amber-200 p-8 hover:shadow-lg hover:border-amber-300 transition-all group"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-6xl group-hover:scale-110 transition-transform duration-200">🍚</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-amber-800 mb-2">Thức ăn trộn cho Hamster</h2>
              <p className="text-gray-600 mb-4">Thức ăn trộn bình thường, trộn ngon, thức ăn hãng H1, H2 chuyên hamster Bear</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Trộn bình thường: 25.000đ</span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Trộn ngon: 35.000đ</span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Hãng H1: 110.000đ</span>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">Hãng H2: 120.000đ</span>
              </div>
            </div>
            <div className="text-amber-600 group-hover:translate-x-2 transition-transform">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Other Food Products */}
      <div className="border-t border-amber-100 pt-10">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">Các loại thức ăn khác</h2>
        <CategoryPage category="food" title="" description="" />
      </div>
    </div>
  );
}