"use client";
import { Product } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ProductList = ({ products, title, columns = 4 }: { products: Product[]; title: string; columns?: number }) => {
  const gridCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <section className="section-spacing bg-white">
      <div className="premium-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <span className="inline-block text-sm font-medium text-primary-500 uppercase tracking-widest mb-2">
              Sản phẩm
            </span>
            <h2 className="section-title !mb-0">{title}</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors group"
          >
            Xem tất cả
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Product Grid */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 ${gridCols} gap-4 md:gap-6`}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Mobile View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center sm:hidden"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-50 text-primary-600 font-medium text-sm hover:bg-primary-100 transition-all"
          >
            Xem tất cả sản phẩm
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
export default ProductList;