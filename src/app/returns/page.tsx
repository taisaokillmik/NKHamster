import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Chính sách đổi trả | NK Hamster" };

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold text-amber-800">🔄 Chính sách đổi trả</h1>

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-sm text-green-800">
        <p className="font-semibold mb-1">✅ Cam kết của NK Hamster</p>
        <p>Nếu sản phẩm có lỗi từ phía cửa hàng hoặc không đúng mô tả, chúng tôi sẽ đổi mới hoặc hoàn tiền 100% sau khi xác minh.</p>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-amber-800 text-lg">Phụ kiện & thức ăn</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-amber-500">•</span> Đổi trả trong vòng <strong>7 ngày</strong> kể từ ngày nhận hàng.</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> Sản phẩm còn nguyên tem, hộp, chưa qua sử dụng.</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> Lỗi do vận chuyển: liên hệ trong <strong>24 giờ</strong> sau khi nhận, kèm video/ảnh.</li>
          <li className="flex gap-2 text-red-500"><span>✗</span> Không áp dụng cho thức ăn đã mở bao bì.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm space-y-4">
        <h2 className="font-semibold text-amber-800 text-lg">Hamster & thú cưng sống</h2>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex gap-2"><span className="text-amber-500">•</span> Hỗ trợ <strong>trong 3 ngày</strong> nếu hamster có biểu hiện bệnh do lỗi từ cửa hàng.</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> Yêu cầu quay video unbox ngay khi nhận hàng để đảm bảo quyền lợi.</li>
          <li className="flex gap-2"><span className="text-amber-500">•</span> Liên hệ qua Zalo kèm video để được xem xét đổi/hoàn tiền nhanh nhất.</li>
          <li className="flex gap-2 text-red-500"><span>✗</span> Không áp dụng nếu hamster bị tai nạn hoặc chăm sóc không đúng cách sau khi nhận.</li>
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-amber-800 text-lg mb-3">Quy trình đổi trả</h2>
        <ol className="space-y-3 text-sm text-gray-700">
          {["Liên hệ Zalo hoặc hotline trong thời hạn quy định", "Gửi ảnh/video chứng minh lỗi sản phẩm", "Chúng tôi xác minh và phản hồi trong 24 giờ", "Đổi sản phẩm mới hoặc hoàn tiền qua chuyển khoản"].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="text-sm text-gray-500">Cần hỗ trợ? <a href="https://zalo.me/0963107703" target="_blank" className="text-amber-600 hover:underline">Liên hệ Zalo</a> hoặc gọi <a href="tel:0963107703" className="text-amber-600 hover:underline">0963 107 703</a>.</p>
    </div>
  );
}
