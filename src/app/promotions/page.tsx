import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Khuyến mãi | NK Hamster",
  description: "Các chương trình ưu đãi và khuyến mãi mới nhất từ NK Hamster",
};

const promotions = [
  {
    id: 1,
    badge: "🎁 Khách mới",
    title: "Giảm 10% cho đơn hàng đầu tiên",
    description: "Đăng ký tài khoản và mua hàng lần đầu để nhận ngay ưu đãi 10% cho toàn bộ đơn hàng.",
    condition: "Áp dụng cho tài khoản mới đăng ký. Không giới hạn giá trị đơn hàng.",
    color: "bg-amber-50 border-amber-200",
  },
  {
    id: 2,
    badge: "🚚 Freeship",
    title: "Miễn phí vận chuyển đơn từ 1.000.000đ",
    description: "Mua sắm từ 1 triệu đồng trở lên sẽ được miễn phí toàn bộ phí vận chuyển trong nội thành.",
    condition: "Áp dụng nội thành TP.HCM và Bình Dương. Không cần mã giảm giá.",
    color: "bg-green-50 border-green-200",
  },
  {
    id: 3,
    badge: "🐹 Combo",
    title: "Mua combo Hamster + Lồng giảm 50.000đ",
    description: "Khi mua cùng lúc 1 chú hamster và 1 lồng bất kỳ, bạn sẽ được giảm ngay 50.000đ.",
    condition: "Liên hệ trực tiếp qua Zalo hoặc hotline để được áp dụng.",
    color: "bg-pink-50 border-pink-200",
  },
  {
    id: 4,
    badge: "👥 Giới thiệu bạn bè",
    title: "Nhận 30.000đ khi giới thiệu bạn mua hàng",
    description: "Giới thiệu bạn bè mua hàng tại NK Hamster, cả bạn và bạn bè đều nhận được ưu đãi.",
    condition: "Liên hệ để nhận mã giới thiệu cá nhân hóa.",
    color: "bg-blue-50 border-blue-200",
  },
];

export default function PromotionsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-800">🎉 Khuyến mãi & Ưu đãi</h1>
        <p className="text-gray-600 mt-2">Cập nhật các chương trình ưu đãi mới nhất để mua sắm tiết kiệm hơn.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {promotions.map((promo) => (
          <div key={promo.id} className={`rounded-3xl border p-6 ${promo.color}`}>
            <span className="text-sm font-semibold text-gray-600">{promo.badge}</span>
            <h2 className="text-xl font-bold text-amber-800 mt-2">{promo.title}</h2>
            <p className="text-gray-600 mt-2 text-sm leading-6">{promo.description}</p>
            <p className="text-xs text-gray-400 mt-3 italic">{promo.condition}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-100 to-orange-50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-amber-800">Muốn nhận ưu đãi?</h2>
          <p className="text-gray-600 mt-1 text-sm">Liên hệ trực tiếp để được tư vấn và áp dụng khuyến mãi.</p>
        </div>
        <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-2.5 transition-colors">
          Liên hệ ngay
        </Link>
      </div>
    </div>
  );
}
