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


      {/* Other Food Products */}
      <div className="border-t border-amber-100 pt-10">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">Các loại thức ăn khác</h2>
        <CategoryPage category="food" title="" description="" />
      </div>
    </div>
  );
}