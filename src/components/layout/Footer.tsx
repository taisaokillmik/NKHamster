import Link from "next/link";
import { Facebook, Mail, MapPin, PawPrint } from "lucide-react";

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
            <a href="https://www.facebook.com/share/1GwUyKBdWY/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300" aria-label="Facebook">
              <Facebook className="h-3.5 w-3.5 text-gray-500 hover:text-primary-400" />
            </a>
            <a href="https://zalo.me/0963107703" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300" aria-label="Zalo">
              <svg className="h-3.5 w-3.5 text-gray-500 hover:text-primary-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.164 17.156h-.01c-.5 0-.992-.24-1.296-.652L5.848 10.62c-.264-.356-.072-.788.364-.788.384 0 .74.128 1.012.364l3.942 3.112c.2.156.464.156.664 0l3.942-3.112c.272-.236.628-.364 1.012-.364.436 0 .628.432.364.788l-5.01 5.884c-.304.412-.796.652-1.296.652z"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@nhatkhoahamster?_r=1&_t=ZS-97mXwUS3Dex" target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-white/5 hover:bg-primary-500/20 flex items-center justify-center transition-all duration-300" aria-label="TikTok">
              <svg className="h-3.5 w-3.5 text-gray-500 hover:text-primary-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
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
