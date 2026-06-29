"use client";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/utils";

const ProductCard = ({ product }: { product: Product }) => {
  const hasSale = product.salePrice && product.salePrice < product.price;
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const addToCart = useCart((s) => s.addItem);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    if (product.stock <= 0) { showToast("Sản phẩm đã hết hàng", "error"); return; }
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng ✓`);
  };

  const handleWishlist = () => {
    if (isWishlisted) { removeFromWishlist(product.id); showToast("Đã xóa khỏi yêu thích", "info"); }
    else { addToWishlist(product); showToast("Đã thêm vào yêu thích ♥"); }
  };

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
        </div>
      </Link>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.slug}`}><h3 className="font-semibold text-gray-800 truncate">{product.name}</h3></Link>
          <button onClick={handleWishlist}>
            <Heart className={cn("h-5 w-5", isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500")} />
          </button>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
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
          <Button size="sm" onClick={handleAddToCart} disabled={product.stock <= 0}>
            {product.stock <= 0 ? "Hết hàng" : "Mua"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
