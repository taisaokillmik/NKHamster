"use client";
import Link from "next/link";
import { Star, AlertTriangle } from "lucide-react";
import { Product } from "@/types";

const ProductCard = ({ product }: { product: Product }) => {
  const hasSale = product.salePrice && product.salePrice < product.price;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/product/${product.slug}`}>
        <div className="aspect-square bg-amber-50 relative overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          {hasSale && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{Math.round(((product.price - product.salePrice!) / product.price) * 100)}%
            </span>
          )}
          {isLowStock && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Chỉ còn {product.stock}
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">{product.rating} ({product.reviewCount})</span>
        </div>
        {isLowStock && (
          <p className="text-xs text-orange-600 font-medium mt-1 flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            Sắp hết hàng - Chỉ còn {product.stock} sản phẩm
          </p>
        )}
        <div className="mt-2">
          {product.priceLabel ? (
            <span className="text-lg font-bold text-amber-700">{product.priceLabel}</span>
          ) : hasSale ? (
            <>
              <span className="text-lg font-bold text-amber-700">{product.salePrice!.toLocaleString()}đ</span>
              <span className="ml-2 text-sm line-through text-gray-400">{product.price.toLocaleString()}đ</span>
            </>
          ) : (
            <span className="text-lg font-bold text-amber-700">{product.price.toLocaleString()}đ</span>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
