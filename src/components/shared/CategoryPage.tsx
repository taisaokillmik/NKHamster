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
  const [sortBy, setSortBy] = useState("featured");
  const [priceMax, setPriceMax] = useState("");

  const items = useMemo(() => {
    let filtered = products.filter((p) => p.category === category);
    if (priceMax && Number(priceMax) > 0) {
      filtered = filtered.filter((p) => p.price <= Number(priceMax));
    }
    if (sortBy === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [sortBy, priceMax, category]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-amber-800">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <input
            type="number"
            placeholder="Giá tối đa (đ)"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="rounded-2xl border border-amber-200 px-3 py-2 text-sm w-40"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl border border-amber-200 px-3 py-2 text-sm"
          >
            <option value="featured">Nổi bật</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
            <option value="rating">Đánh giá cao nhất</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">Tìm thấy {items.length} sản phẩm</p>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-amber-100 bg-white p-10 text-center text-gray-500">
          Không có sản phẩm phù hợp với bộ lọc.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
