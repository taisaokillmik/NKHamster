"use client";
import { motion } from "framer-motion";
import { Heart, Sparkles, Award, Smile } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Yêu thương từng bé",
    desc: "Mỗi chú Hamster đều được chăm sóc với tình yêu thương và sự tận tâm cao nhất.",
  },
  {
    icon: Sparkles,
    title: "Môi trường sạch sẽ",
    desc: "Chuồng trại luôn được vệ sinh, đảm bảo môi trường sống tốt nhất cho các bé.",
  },
  {
    icon: Award,
    title: "Giống thuần chủng",
    desc: "Chúng tôi chọn lọc những giống Hamster tốt nhất từ các trại uy tín.",
  },
  {
    icon: Smile,
    title: "Khách hàng hài lòng",
    desc: "Hàng trăm khách hàng đã tin tưởng và hài lòng khi mua Hamster tại NK.",
  },
];

const FeatureStrip = () => (
  <section className="section-spacing bg-gradient-to-b from-white/50 to-primary-50/30">
    <div className="premium-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-block text-sm font-medium text-primary-500 uppercase tracking-widest mb-3">
          Tại sao chọn NK Hamster?
        </span>
        <h2 className="section-title">
          Chúng tôi yêu Hamster
        </h2>
        <p className="section-subtitle">
          NK Hamster không chỉ là cửa hàng - chúng tôi là những người yêu động vật
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="premium-card p-6 md:p-8 flex items-start gap-5 group hover:bg-white transition-all duration-500"
          >
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <feat.icon className="h-7 w-7 text-primary-500" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-gray-900 text-lg mb-2">
                {feat.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
export default FeatureStrip;