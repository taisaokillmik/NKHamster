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
      <CategoryPage category="food" title="" description="" />
    </div>
  );
}