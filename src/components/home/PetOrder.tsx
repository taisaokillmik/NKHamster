"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    step: "1",
    title: "Chọn thú cưng yêu thích",
    desc: "Thỏ Việt, Bọ Ú Việt, Nhím Cảnh, Sóc Bay, Thằn Lằn, Rồng Úc và nhiều loại khác.",
  },
  {
    step: "2",
    title: "Liên hệ đặt cọc",
    desc: "Gọi hoặc nhắn tin qua Zalo/Facebook để đặt cọc giữ bé (500k).",
  },
  {
    step: "3",
    title: "Nhận bé tại nhà",
    desc: "Chúng tôi sẽ giao bé tận nơi hoặc bạn có thể đến cửa hàng để đón bé.",
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
            {/* Step number */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-warm">
              <span className="text-2xl font-bold text-white">{item.step}</span>
            </div>
            <h3 className="font-display font-semibold text-gray-900 text-lg mb-3">
              {item.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {item.desc}
            </p>
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
          <Link href="/hamsters">
            <Button size="lg" className="group bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 !rounded-full shadow-warm hover:shadow-lg transition-all duration-300 text-base">
              <ShoppingCart className="mr-2 h-5 w-5" />
              <span>Xem thú cưng</span>
            </Button>
          </Link>
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