"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Phone, MessageCircle, Rabbit, Bug, Bird, Dog, Fish } from "lucide-react";
import Link from "next/link";

const DragonIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-4 0-7 3-7 7 0 2 1 4 2.5 5.5L12 19l4.5-4.5C18 13 19 11 19 9c0-4-3-7-7-7z" />
    <path d="M12 2v17" />
    <path d="M9 9h6" />
    <circle cx="9" cy="8" r="0.5" fill="currentColor" />
    <circle cx="15" cy="8" r="0.5" fill="currentColor" />
  </svg>
);

const petTypes = [
  { icon: Rabbit, name: "Thỏ Việt", color: "from-pink-400 to-rose-500", bg: "bg-pink-50", image: "/thoviet.webp" },
  { icon: Bug, name: "Bọ Ú Việt", color: "from-amber-400 to-orange-500", bg: "bg-amber-50", image: "/bou.webp" },
  { icon: Bird, name: "Nhím Cảnh", color: "from-stone-400 to-stone-600", bg: "bg-stone-50", image: "/nhimcanh.jpg" },
  { icon: Dog, name: "Sóc Bay", color: "from-sky-400 to-blue-500", bg: "bg-sky-50", image: "/socbay.webp" },
  { icon: Fish, name: "Thằn Lằn", color: "from-lime-400 to-green-500", bg: "bg-lime-50", image: "/thanlan.jpg" },
  { icon: DragonIcon, name: "Rồng Úc", color: "from-emerald-400 to-teal-500", bg: "bg-emerald-50", image: "/ronguc.jpg" },
];

const steps = [
  {
    step: "1",
    title: "Chọn thú cưng yêu thích",
  },
  {
    step: "2",
    title: "Liên hệ đặt cọc (30% giá trị)",
  },
  {
    step: "3",
    title: "Nhận bé tại nhà",
  },
];

const PetOrder = () => (
  <section className="section-spacing bg-gradient-to-b from-primary-50/50 to-white">
    <div className="premium-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <span className="inline-block text-sm font-medium text-primary-500 uppercase tracking-widest mb-3">
          Đa dạng thú cưng
        </span>
        <h2 className="section-title">
          Các loài thú cưng có thể đặt
        </h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Chúng tôi cung cấp nhiều loại thú cưng độc đáo và đáng yêu
        </p>
      </motion.div>

      {/* Pet Types Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
        {petTypes.map((pet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card p-4 text-center group hover:bg-white transition-all duration-500 cursor-pointer"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-3 group-hover:scale-105 transition-transform duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br ${pet.color} opacity-20`} />
              <img
                src={pet.image}
                alt={pet.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-display font-semibold text-gray-900 text-sm">
              {pet.name}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <span className="inline-block text-sm font-medium text-primary-500 uppercase tracking-widest mb-3">
          Quy trình đặt hàng
        </span>
        <h2 className="section-title">
          Cách đặt mua thú cưng
        </h2>
        <p className="section-subtitle max-w-2xl mx-auto">
          Chỉ 3 bước đơn giản để bạn có ngay một bé thú cưng đáng yêu
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {steps.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card p-8 text-center relative group hover:bg-white transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-warm">
              <span className="text-2xl font-bold text-white">{item.step}</span>
            </div>
            <h3 className="font-display font-semibold text-gray-900 text-lg">
              {item.title}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center"
      >
        <p className="text-gray-500 mb-6 text-sm">
          Còn thắc mắc? Liên hệ ngay để được tư vấn miễn phí!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://www.tiktok.com/@nkhamster" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="group bg-black hover:bg-gray-800 text-white px-8 py-4 !rounded-full shadow-warm hover:shadow-lg transition-all duration-300 text-base">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
              <span>TikTok</span>
            </Button>
          </a>
          <a href="https://zalo.me/0963107703" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="px-8 py-4 !rounded-full border-2 border-primary-200 text-primary-600 hover:bg-primary-50 transition-all duration-300 text-base">
              <Phone className="mr-2 h-5 w-5" />
              <span>Liên hệ Zalo</span>
            </Button>
          </a>
          <a href="https://www.facebook.com/share/1GwUyKBdWY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="px-8 py-4 !rounded-full border-2 border-gray-200 text-gray-600 hover:border-primary-200 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-300 text-base">
              <MessageCircle className="mr-2 h-5 w-5" />
              <span>Facebook</span>
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);
export default PetOrder;