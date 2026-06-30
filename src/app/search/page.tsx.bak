"use client";
import { useMemo, useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { Input } from "@/components/ui/Input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [minRating, setMinRating] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let results = products;

    // Search query
    const keyword = query.toLowerCase().trim();
    if (keyword) {
      results = results.filter((product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.category.toLowerCase().includes(keyword)
      );
    }

    // Price range
    if (priceMin && Number(priceMin) > 0) {
      results = results.filter((p) => p.price >= Number(priceMin));
    }
    if (priceMax && Number(priceMax) > 0) {
      results = results.filter((p) => p.price <= Number(priceMax));
    }

    // Rating
    if (minRating && Number(minRating) > 0) {
      results = results.filter((p) => p.rating >= Number(minRating));
    }

    // Category
    if (category !== "all") {
      results = results.filter((p) => p.category === category);
    }

    // Sort
    if (sortBy === "price-asc") return [...results].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...results].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...results].sort((a, b) => b.rating - a.rating);
    if (sortBy === "newest") return [...results].sort((a, b) => b.id - a.id);

    return results;
  }, [query, priceMin, priceMax, minRating, category, sortBy]);

  const hasActiveFilters = query || priceMin || priceMax || minRating || category !== "all";

  const clearFilters = () => {
    setQuery("");
    setPriceMin("");
    setPriceMax("");
    setMinRating("");
    setCategory("all");
    setSortBy("featured");
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">🔎 Tìm kiếm sản phẩm</h1>
      
      {/* Search Bar */}
      <div className="relative mb-6 max-w-2xl">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm theo tên sản phẩm, danh mục hoặc mô tả"
          className="pl-10"
          autoFocus
        />
      </div>

      {/* Filter Toggle */}
      <Button
        variant="outline"
        onClick={() => setShowFilters(!showFilters)}
        className="mb-6"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
      </Button>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-amber-100 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá tối thiểu (đ)</label>
              <Input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá tối đa (đ)</label>
              <Input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
                placeholder="Không giới hạn"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Đánh giá tối thiểu</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full rounded-2xl border border-amber-200 px-3 py-2 text-sm"
              >
                <option value="">Tất cả</option>
                <option value="4">4+ sao</option>
                <option value="4.5">4.5+ sao</option>
                <option value="4.8">4.8+ sao</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl border border-amber-200 px-3 py-2 text-sm"
              >
                <option value="all">Tất cả</option>
                <option value="hamster">Hamster</option>
                <option value="cage">Lồng</option>
                <option value="food">Thức ăn</option>
                <option value="accessory">Phụ kiện</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp theo</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full rounded-2xl border border-amber-200 px-3 py-2 text-sm"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá thấp → cao</option>
                <option value="price-desc">Giá cao → thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="newest">Mới nhất</option>
              </select>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="mt-6">
                <X className="h-4 w-4 mr-2" />
                Xóa bộ lọc
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Results */}
      {!hasActiveFilters ? (
        <div className="rounded-2xl border border-amber-100 bg-white p-10 text-center text-gray-400">
          <Search className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>Nhập từ khoá hoặc sử dụng bộ lọc để tìm kiếm sản phẩm</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-amber-200 bg-white p-8 text-center text-gray-600">
          Không tìm thấy sản phẩm phù hợp.
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters} className="mt-2">
              Xóa bộ lọc
            </Button>
          )}
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">Tìm thấy {filteredProducts.length} sản phẩm</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
