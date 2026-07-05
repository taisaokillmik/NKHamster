"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types";

const ProductCard = ({ product, i = 0 }: { product: Product; i?: number }) => {
  const hasSale = product.salePrice && product.price && product.salePrice < product.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.slug}`} className="group block premium-card overflow-hidden hover:shadow-elevated transition-all duration-500">
        <div className="aspect-square bg-gray-50 relative overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {hasSale && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              -{Math.round(((product.price! - product.salePrice!) / product.price!) * 100)}%
            </span>
          )}
          <button
            aria-label="Yêu thích"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300"
          >
            <Heart className="h-4 w-4 text-gray-400 hover:text-red-400" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 truncate">
            {product.name}
          </h3>
          <div className="mt-2">
            {product.priceLabel ? (
              <span className="text-primary-500 font-semibold">{product.priceLabel}</span>
            ) : hasSale ? (
              <div className="flex items-center gap-2">
                <span className="text-primary-500 font-semibold">{product.salePrice!.toLocaleString("vi-VN")}đ</span>
                <span className="text-sm line-through text-gray-400">{product.price!.toLocaleString("vi-VN")}đ</span>
              </div>
            ) : product.price ? (
              <span className="text-primary-500 font-semibold">{product.price.toLocaleString("vi-VN")}đ</span>
            ) : (
              <span className="text-primary-500 font-semibold">Liên hệ</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
export default ProductCard;

