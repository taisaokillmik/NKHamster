"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

const Hero = () => (
  <section className="bg-gradient-to-r from-amber-100 via-amber-50 to-pastel-blue py-16 md:py-24">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="flex-1 text-center md:text-left">
        <Link href="/order-pet" className="inline-flex items-center gap-4 rounded-3xl border border-amber-200 bg-white/80 px-5 py-3 mb-6 shadow-sm hover:border-amber-300 hover:bg-amber-50 transition">
          <div className="rounded-full bg-amber-500 text-white px-4 py-2 text-sm font-semibold">Order Pet</div>
          <div className="text-left text-sm text-gray-600">
            Order thú khác: <span className="font-semibold text-amber-800">Nhím, Bọ, Sóc bay, Thỏ</span>
          </div>
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
          NK Hamster <br /><span className="text-amber-500">Dễ thương nhất</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-lg">
          Chuột Hamster khỏe mạnh, lồng mica cao cấp, phụ kiện đầy đủ. Giao hàng toàn quốc.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link href="/hamsters"><Button size="lg" className="bg-amber-500 hover:bg-amber-600 px-8 py-3 rounded-full text-white">Mua ngay</Button></Link>
          <Link href="/accessories"><Button size="lg" variant="outline" className="px-8 py-3 rounded-full">Xem phụ kiện</Button></Link>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 mt-10 md:mt-0 flex justify-center">
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden">
          <Image src="/assets/images/banner.jpg" alt="Banner NK Hamster" fill className="object-cover" />
        </div>
      </motion.div>
    </div>
  </section>
);
export default Hero;
