"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";

interface ProductCardProps {
  slug: string;
  name: string;
  images: string[];
  price: string;
  i: number;
}

const ProductCard = ({ slug, name, images, price, i }: ProductCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  >
    <Link
      href={`/product/${slug}`}
      className="group block premium-card overflow-hidden hover:shadow-elevated transition-all duration-500"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={images?.[0] || "/NKHamster/hhamster.jpg"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          aria-label="Yêu thích"
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-300"
        >
          <Heart className="h-4 w-4 text-gray-400 hover:text-red-400" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-1">
          {name}
        </h3>
        <p className="text-primary-500 font-semibold mt-2 text-sm">
          {price}
        </p>
      </div>
    </Link>
  </motion.div>
);
export default ProductCard;