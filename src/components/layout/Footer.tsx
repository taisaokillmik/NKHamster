import Link from "next/link";
import { Facebook, Instagram, Youtube, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-amber-50 border-t border-amber-200 mt-auto">
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
          <span className="text-2xl">🐹</span> NK Hamster
        </h4>
        <p className="text-sm text-gray-600">Cửa hàng bán chuột Hamster, lồng mica và phụ kiện uy tín.</p>
      </div>
      <div>
        <h5 className="font-semibold text-amber-800 mb-3">Liên kết nhanh</h5>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><Link href="/about" className="hover:text-amber-600">Giới thiệu</Link></li>
          <li><Link href="/blog" className="hover:text-amber-600">Blog</Link></li>
          <li><Link href="/promotions" className="hover:text-amber-600">Khuyến mãi</Link></li>
          <li><Link href="/contact" className="hover:text-amber-600">Liên hệ</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold text-amber-800 mb-3">Hỗ trợ</h5>
        <ul className="space-y-2 text-sm text-gray-600">
          <li><Link href="/shipping" className="hover:text-amber-600">Chính sách vận chuyển</Link></li>
          <li><Link href="/returns" className="hover:text-amber-600">Đổi trả hàng</Link></li>
          <li><Link href="/faq" className="hover:text-amber-600">FAQ</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="font-semibold text-amber-800 mb-3">Kết nối</h5>
        <div className="flex gap-3 text-amber-600 mb-3">
          <Facebook className="h-5 w-5 cursor-pointer hover:text-amber-800" />
          <Instagram className="h-5 w-5 cursor-pointer hover:text-amber-800" />
          <Youtube className="h-5 w-5 cursor-pointer hover:text-amber-800" />
        </div>
        <p className="flex items-center gap-1 text-sm"><Phone className="h-4 w-4" /> 0963 107 703</p>
        <p className="flex items-center gap-1 text-sm"><Phone className="h-4 w-4" /> 0394 210 096</p>
        <p className="flex items-center gap-1 text-sm"><Mail className="h-4 w-4" /> info@hamsternhaminh.vn</p>
      </div>
    </div>
    <div className="border-t border-amber-200 py-4 text-center text-sm text-gray-500">
      © 2025 NK Hamster. All rights reserved.
    </div>
  </footer>
);
export default Footer;

