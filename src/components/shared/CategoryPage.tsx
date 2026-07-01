"use client";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types";

interface Props {
  category: Product["category"];
  title: string;
  description: string;
}

export default function CategoryPage({ category, title, description }: Props) {
  const [sortBy, setSortBy] = useState("default");

  const items = useMemo(() => {
    const filtered = products.filter((p) => p.category === category);
    if (sortBy === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "newest") return [...filtered].sort((a, b) => b.id - a.id);
    return filtered;
  }, [sortBy, category]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-amber-800">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-2xl border border-amber-200 px-3 py-2 text-sm"
        >
          <option value="default">Mặc định</option>
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
        </select>
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
