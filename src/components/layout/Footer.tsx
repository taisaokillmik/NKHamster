import Link from "next/link";
import { Facebook, Phone, Mail, MapPin, PawPrint, Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300">
    <div className="premium-container py-4 lg:py-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-gradient-to-br from-primary-500 to-primary-600">
              <PawPrint className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-display font-bold text-white">NK Hamster</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-2 max-w-[180px]">
            Cửa hàng Hamster, lồng mica & phụ kiện uy tín tại TP.HCM.
          </p>
          <div className="flex gap-1">
            <a href="https://facebook.com/nkhamster" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300" aria-label="Facebook">
              <Facebook className="h-3.5 w-3.5 text-gray-500 hover:text-primary-400" />
            </a>
            <a href="https://zalo.me/0963107703" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300" aria-label="Zalo">
              <Phone className="h-3.5 w-3.5 text-gray-500 hover:text-primary-400" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-white/80 mb-1.5 text-[11px] uppercase tracking-wider">Danh mục</h4>
          <ul className="space-y-1">
            {[
              { href: "/hamsters", label: "Hamster" },
              { href: "/cages", label: "Lồng" },
              { href: "/foods", label: "Thức ăn" },
              { href: "/accessories", label: "Phụ kiện" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-gray-500 hover:text-primary-400 transition-colors duration-200">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-semibold text-white/80 mb-1.5 text-[11px] uppercase tracking-wider">Hỗ trợ</h4>
          <ul className="space-y-1">
            {[
              { href: "/about", label: "Giới thiệu" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Liên hệ" },
              { href: "/shipping", label: "Vận chuyển" },
              { href: "/returns", label: "Đổi trả" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-xs text-gray-500 hover:text-primary-400 transition-colors duration-200">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white/80 mb-1.5 text-[11px] uppercase tracking-wider">Liên hệ</h4>
          <ul className="space-y-1.5">
            <li className="flex items-start gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary-400 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 text-[11px] text-gray-500">
                <span className="font-medium text-gray-300">CN1: Nhà Bè</span>
                <span className="leading-tight">2137 Huỳnh Tấn Phát, KP7, TT Nhà Bè, TPHCM</span>
                <a href="https://zalo.me/0963107703" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">0963 107 703 (Zalo - Nhật Khoa)</a>
                <span className="text-gray-600">9:00-21:00</span>
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary-400 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-0.5 text-[11px] text-gray-500">
                <span className="font-medium text-gray-300">CN2: Thủ Dầu Một</span>
                <span className="leading-tight">Số 9 Lào Cai, Chánh Nghĩa, Thủ Dầu Một</span>
                <a href="https://zalo.me/0394210096" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">0394 210 096 (Zalo - Tuấn Phạm)</a>
                <span className="text-gray-600">8:00-22:00</span>
              </div>
            </li>
            <li className="flex items-start gap-1.5">
              <Mail className="h-3.5 w-3.5 text-primary-400 flex-shrink-0 mt-0.5" />
              <span className="text-[11px] text-gray-500 break-all">info@hamsternhaminh.vn</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800/50">
      <div className="premium-container py-2.5 flex items-center justify-center">
        <p className="text-[10px] text-gray-600">© 2025 NK Hamster</p>
      </div>
    </div>
    </footer>
  );
  export default Footer;
