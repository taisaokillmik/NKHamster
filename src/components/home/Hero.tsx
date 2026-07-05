"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Sparkles, Heart, Shield } from "lucide-react";

const Hero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-[#fefcf5] via-[#fff7ed] to-[#fefcf5]">
    {/* Organic background shapes */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="organic-shape w-[600px] h-[600px] -top-48 -right-48 bg-gradient-to-br from-primary-200/40 to-secondary-200/30 animate-float" />
      <div className="organic-shape w-[400px] h-[400px] -bottom-32 -left-32 bg-gradient-to-tr from-primary-100/50 to-beige-200/40 animate-float-delayed" />
      <div className="organic-shape w-[300px] h-[300px] top-1/3 left-1/4 bg-gradient-to-r from-secondary-100/30 to-primary-100/30 animate-pulse-soft" />
    </div>

    {/* Floating decorative elements */}
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-8 h-8 rounded-full bg-primary-200/40 blur-sm"
      />
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-[10%] w-6 h-6 rounded-full bg-secondary-200/40 blur-sm"
      />
      <motion.div
        animate={{ y: [-15, 5, -15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-[20%] w-10 h-10 rounded-full bg-primary-100/50 blur-md"
      />
    </div>

    <div className="premium-container relative z-10 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left pt-24 lg:pt-0"
        >
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-primary-50 border border-primary-100/80 shadow-sm"
          >
            <Shield className="h-4 w-4 text-primary-500" />
            <span className="text-sm font-medium text-primary-700">
              Uy tín & Chất lượng
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-heading-1 md:text-hero font-display text-gray-900 mb-6 text-balance"
          >
            Yêu thương
            <br />
            <span className="text-gradient">bắt đầu</span> từ
            <br />
            những điều{" "}
            <span className="relative">
              nhỏ bé
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-primary-300 -z-10"
                viewBox="0 0 200 12"
                fill="currentColor"
                preserveAspectRatio="none"
              >
                <path d="M0 10 Q50 0 100 10 Q150 20 200 10 L200 12 L0 12 Z" />
              </svg>
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 text-balance"
          >
            Chào mừng bạn đến với thế giới chuột Hamster. 
            Chúng tôi mang đến những chú Hamster khỏe mạnh nhất, 
            lồng mica cao cấp và phụ kiện chính hãng.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/hamsters">
              <Button size="lg" className="group bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full shadow-warm hover:shadow-lg transition-all duration-300 text-base">
                <span>Khám phá Hamster</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/accessories">
              <Button size="lg" variant="outline" className="px-8 py-4 rounded-full border-2 border-gray-200 hover:border-primary-200 text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 transition-all duration-300 text-base">
                <Sparkles className="mr-2 h-5 w-5" />
                Phụ kiện
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap items-center gap-6 mt-12 justify-center lg:justify-start"
          >
            {[
              { icon: Heart, text: "Khỏe mạnh 100%" },
              { icon: Shield, text: "Bảo hành trọn đời" },
              { text: "Giao toàn quốc" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                {item.icon && <item.icon className="h-4 w-4 text-primary-400" />}
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Main image container */}
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-100/40 to-secondary-100/40 blur-2xl transform scale-110" />
            
            {/* Image frame */}
            <div className="relative w-[480px] h-[480px] rounded-full overflow-hidden shadow-elevated">
              <div className="absolute inset-0 bg-gradient-to-t from-primary-500/10 to-transparent z-10" />
              <img
                src="/NKHamster/banner.jpg"
                alt="NK Hamster - Cửa hàng thú cưng"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-soft border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-sm font-medium text-gray-700">Khỏe mạnh</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-2 -left-6 bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-soft border border-gray-100"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-700">Chất lượng cao</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);
export default Hero;