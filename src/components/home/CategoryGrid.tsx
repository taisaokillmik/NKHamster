"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rabbit, Home, Apple, Puzzle } from "lucide-react";

const categories = [
  {
    name: "Hamster",
    slug: "hamsters",
    icon: Rabbit,
    desc: "Giống thuần chủng, khỏe mạnh",
    image: "/NKHamster/bearsat.jpg",
    color: "from-primary-50 to-secondary-50",
    textColor: "text-primary-600",
  },
  {
    name: "Lồng",
    slug: "cages",
    icon: Home,
    desc: "Đa dạng kích thước, cao cấp",
    image: "https://placehold.co/400x400/D1FAE5/065F46?text=Cage",
    color: "from-pastel-green to-emerald-50",
    textColor: "text-emerald-600",
  },
  {
    name: "Thức ăn",
    slug: "foods",
    icon: Apple,
    desc: "Dinh dưỡng cao cấp, tự nhiên",
    image: "/NKHamster/tronngon.jpg",
    color: "from-pastel-pink to-rose-50",
    textColor: "text-rose-600",
  },
  {
    name: "Phụ kiện",
    slug: "accessories",
    icon: Puzzle,
    desc: "Bánh xe, nhà ngủ, đồ chơi",
    image: "/NKHamster/wcandytrong.jpg",
    color: "from-pastel-blue to-sky-50",
    textColor: "text-sky-600",
  },
];

const CategoryGrid = () => (
  <section className="section-spacing bg-white/50">
    <div className="premium-container">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-block text-sm font-medium text-primary-500 uppercase tracking-widest mb-3">
          Danh mục
        </span>
        <h2 className="section-title">
          Khám phá thế giới Hamster
        </h2>
        <p className="section-subtitle">
          Mọi thứ bạn cần cho một chú Hamster khỏe mạnh và hạnh phúc
        </p>
      </motion.div>

      {/* Category Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/${cat.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-gray-200 shadow-soft hover:shadow-elevated transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-60 group-hover:opacity-70 transition-opacity duration-500`} />
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <cat.icon className="h-6 w-6 text-primary-500" />
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
                <h3 className={`font-display font-semibold text-gray-900 text-lg ${cat.textColor}`}>
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">{cat.desc}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default CategoryGrid;