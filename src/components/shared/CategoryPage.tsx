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
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const items = useMemo(() => {
    let filtered = products.filter((p) => p.category === category);
    
    // Price range filter
    if (priceMin && Number(priceMin) > 0) {
      filtered = filtered.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax && Number(priceMax) > 0) {
      filtered = filtered.filter((p) => p.price <= Number(priceMax));
    }
    
    // Stock filter
    if (inStockOnly) {
      filtered = filtered.filter((p) => p.stock > 0);
    }
// Sorting
    if (sortBy === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);    if (sortBy === "newest") return [...filtered].sort((a, b) => b.id - a.id);
    
    return filtered;
  }, [sortBy, priceMin, priceMax, inStockOnly, category]);

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
            placeholder="Giá tối thiểu (đ)"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            className="rounded-2xl border border-amber-200 px-3 py-2 text-sm w-32"
          />
          <input
            type="number"
            placeholder="Giá tối đa (đ)"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            className="rounded-2xl border border-amber-200 px-3 py-2 text-sm w-32"
          />
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded border-amber-300"
            />
            Còn hàng
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-2xl border border-amber-200 px-3 py-2 text-sm"
          >
            <option value="featured">Nổi bật</option>
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá thấp → cao</option>
            <option value="price-desc">Giá cao → thấp</option>
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

