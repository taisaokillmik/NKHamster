import ProductCard from "@/components/shared/ProductCard";
import type { Metadata } from "next";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Thức ăn Hamster - NK Hamster",
  description: "Thức ăn dinh dưỡng cho hamster của bạn. Thức ăn tổng hợp, snack, bánh thưởng chất lượng cao.",
  openGraph: {
    title: "Thức ăn Hamster - NK Hamster",
    description: "Thức ăn dinh dưỡng cho hamster của bạn",
  },
};

export default function FoodPage() {
  const foodProducts = products.filter(p => p.category === "food");
  return (
    <div className="container mx-auto px-4 py-10">
      <div>
        <h2 className="text-2xl font-bold text-amber-800 mb-6">🍽 Thức ăn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}