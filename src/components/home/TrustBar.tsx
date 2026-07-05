"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Leaf, HeartHandshake } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Cam kết chất lượng",
    desc: "Hamster khỏe mạnh, được chăm sóc tốt nhất",
  },
  {
    icon: Truck,
    title: "Giao hàng toàn quốc",
    desc: "Đóng gói an toàn, giao nhanh chóng",
  },
  {
    icon: Leaf,
    title: "Sản phẩm tự nhiên",
    desc: "Phụ kiện từ vật liệu an toàn, thân thiện",
  },
  {
    icon: HeartHandshake,
    title: "Tư vấn tận tâm",
    desc: "Hỗ trợ chu đáo cho bé Hamster của bạn",
  },
];

const TrustBar = () => (
  <section className="relative -mt-20 z-20">
    <div className="premium-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="premium-card p-8 md:p-10"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 mb-4">
                <item.icon className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-1 text-sm">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
export default TrustBar;