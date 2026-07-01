"use client";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types";

interface Props {
  category: Product["category"];
  title: string;
  description: string;
}

export default function CategoryPage({ category, title, description }: Props) {
  const items = products.filter((p) => p.category === category);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-800">{title}</h1>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-amber-100 bg-white p-10 text-center text-gray-500">
          Không có sản phẩm nào.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
