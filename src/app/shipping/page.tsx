import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Chính sách vận chuyển | NK Hamster" };

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-amber-800">🚚 Chính sách vận chuyển</h1>

      <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-amber-800 text-lg">Phí vận chuyển</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-amber-50">
                <th className="text-left p-3 rounded-tl-xl">Khu vực</th>
                <th className="text-left p-3">Thời gian</th>
                <th className="text-left p-3 rounded-tr-xl">Phí ship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-50">
              <tr><td className="p-3">Nội thành TP.HCM</td><td className="p-3">2–4 giờ</td><td className="p-3 text-green-600 font-medium">Theo app Grab / Ahamove</td></tr>
              <tr><td className="p-3">Ngoại thành TP.HCM & Bình Dương</td><td className="p-3">–</td><td className="p-3 text-amber-600 font-medium">Liên hệ để báo giá</td></tr>
              <tr><td className="p-3">Miền Trung / Miền Bắc</td><td className="p-3">–</td><td className="p-3 text-amber-600 font-medium">Liên hệ để báo giá</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm space-y-3">
        <h2 className="font-semibold text-amber-800 text-lg">Lưu ý khi vận chuyển thú cưng</h2>
        <ul className="space-y-2 text-gray-700 text-sm">
          <li className="flex gap-2"><span className="text-amber-500">•</span> Hamster được đóng gói trong hộp thoáng khí với thức ăn và chất độn.</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> Ưu tiên giao trong khung giờ <strong>7:00 – 11:00</strong> hoặc <strong>17:00 – 20:00</strong> để tránh nắng nóng.</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> Khuyến nghị <strong>không ship thú cưng</strong> vào các tỉnh xa (trên 500km) vào mùa hè.</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> Khi nhận hàng, kiểm tra ngay và quay video unbox để đảm bảo quyền lợi.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm space-y-3">
        <h2 className="font-semibold text-amber-800 text-lg">Đơn vị vận chuyển</h2>
        <p className="text-sm text-gray-600">NK Hamster sử dụng GHN, GHTK và grab/be theo yêu cầu cho đơn nội thành. Khách hàng có thể chọn đơn vị ship khi liên hệ đặt hàng.</p>
      </div>

      <p className="text-sm text-gray-500">Câu hỏi về vận chuyển? <Link href="/contact" className="text-amber-600 hover:underline">Liên hệ chúng tôi</Link>.</p>
    </div>
  );
}
