import Link from "next/link";
import { Facebook, Phone, Mail, MapPin, PawPrint, Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    {/* Main Footer */}
    <div className="premium-container py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600">
              <PawPrint className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-display font-bold text-white leading-tight">
                NK Hamster
              </span>
              <span className="text-[11px] font-medium text-primary-400 leading-tight tracking-wider uppercase block">
                Premium Pet Shop
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
            Cửa hàng bán chuột Hamster, lồng mica và phụ kiện uy tín tại TP.HCM. 
            Yêu thương bắt đầu từ những điều nhỏ bé.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com/nkhamster"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300 group"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-gray-400 group-hover:text-primary-400" />
            </a>
            <a
              href="https://zalo.me/0963107703"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300 group"
              aria-label="Zalo"
            >
              <Phone className="h-5 w-5 text-gray-400 group-hover:text-primary-400" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5">Danh mục</h4>
          <ul className="space-y-3">
            {[
              { href: "/hamsters", label: "Hamster" },
              { href: "/cages", label: "Lồng" },
              { href: "/foods", label: "Thức ăn" },
              { href: "/accessories", label: "Phụ kiện" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5">Hỗ trợ</h4>
          <ul className="space-y-3">
            {[
              { href: "/about", label: "Giới thiệu" },
              { href: "/blog", label: "Blog & Hướng dẫn" },
              { href: "/contact", label: "Liên hệ" },
              { href: "/shipping", label: "Chính sách vận chuyển" },
              { href: "/returns", label: "Đổi trả hàng" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5">Liên hệ</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400">
                TP. Hồ Chí Minh
              </span>
            </li>
            <li>
              <a
                href="https://zalo.me/0963107703"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span>0963 107 703 (Nhật Khoa)</span>
              </a>
            </li>
            <li>
              <a
                href="https://zalo.me/0394210096"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span>0394 210 096 (Tuấn Phạm)</span>
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-400 break-all">
                info@hamsternhaminh.vn
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800">
      <div className="premium-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © 2025 NK Hamster. Made with{" "}
          <Heart className="h-3.5 w-3.5 inline-block text-red-400 fill-red-400" />{" "}
          for hamster lovers.
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span>Premium Pet Shop</span>
          <span className="w-1 h-1 rounded-full bg-gray-700" />
          <span>Uy tín & Chất lượng</span>
        </div>
      </div>
    </div>
  </footer>
);
export default Footer;