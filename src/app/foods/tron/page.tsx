import CategoryPage from "@/components/shared/CategoryPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thức ăn trộn cho Hamster - NK Hamster",
  description: "Thức ăn trộn bình thường, trộn ngon, thức ăn hãng H1, H2 chuyên hamster Bear. Giá từ 25.000đ.",
  openGraph: {
    title: "Thức ăn trộn cho Hamster - NK Hamster",
    description: "Thức ăn trộn bình thường, trộn ngon, thức ăn hãng H1, H2 chuyên hamster Bear",
  },
};

export default function MixedFoodPage() {
  return (
    <CategoryPage 
      category="food" 
      title="🍽 Thức ăn trộn cho Hamster" 
      description="Thức ăn trộn bình thường, trộn ngon, thức ăn hãng H1, H2 chuyên hamster Bear"
    />
  );
}