import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Về NK Hamster | Cửa hàng Hamster uy tín",
  description: "NK Hamster – cửa hàng hamster và phụ kiện uy tín tại TP.HCM và Bình Dương, được sáng lập bởi Nhật Khoa.",
};

const stats = [
  { value: "2018", label: "Năm thành lập" },
  { value: "500+", label: "Khách hàng hài lòng" },
  { value: "2", label: "Chi nhánh" },
  { value: "4.9★", label: "Đánh giá trung bình" },
];

const values = [
  { icon: "✅", title: "Sản phẩm chuẩn", desc: "Mỗi chú hamster được kiểm tra sức khoẻ trước khi đến tay khách hàng." },
  { icon: "🚚", title: "Giao hàng an toàn", desc: "Đóng gói đặc biệt, ưu tiên giao trong khung giờ mát để đảm bảo sức khoẻ thú cưng." },
  { icon: "💬", title: "Hỗ trợ tận tâm", desc: "Tư vấn miễn phí trước và sau khi mua, hỗ trợ qua Zalo 8:00–21:00 mỗi ngày." },
  { icon: "🔄", title: "Đổi trả minh bạch", desc: "Chính sách đổi trả rõ ràng trong 7 ngày nếu sản phẩm có lỗi từ cửa hàng." },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl space-y-10">

      {/* Hero */}
      <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">Về NK Hamster</p>
        <h1 className="text-3xl font-bold text-amber-800 mt-2">Cửa hàng Hamster & Phụ kiện uy tín</h1>
        <p className="text-gray-600 leading-7 mt-4">
          NK Hamster được sáng lập năm 2018 bởi <strong>Nhật Khoa</strong> — một người yêu thú cưng với niềm đam mê nuôi hamster từ nhỏ.
          Từ một cửa hàng nhỏ tại Nhà Bè, NK Hamster đã mở rộng thêm chi nhánh tại Bình Dương và phục vụ hàng trăm gia đình trên toàn quốc.
        </p>
        <p className="text-gray-600 leading-7 mt-3">
          Chúng tôi chuyên cung cấp hamster thuần chủng khoẻ mạnh, lồng mica cao cấp, thức ăn dinh dưỡng và đầy đủ phụ kiện chăm sóc.
          Mỗi sản phẩm đều được lựa chọn kỹ lưỡng với tiêu chí: <em>chất lượng thật, giá hợp lý, dịch vụ tận tâm.</em>
        </p>
      </div>

      {/* Số liệu */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-amber-100 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-bold text-amber-700">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Giá trị cốt lõi */}
      <div>
        <h2 className="text-2xl font-bold text-amber-800 mb-5">Cam kết của chúng tôi</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-2xl border border-amber-100 bg-white p-5 flex gap-4">
              <span className="text-3xl flex-shrink-0">{v.icon}</span>
              <div>
                <h3 className="font-semibold text-amber-800">{v.title}</h3>
                <p className="text-sm text-gray-600 mt-1 leading-6">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-amber-800">Muốn tìm hiểu thêm?</h3>
          <p className="text-gray-600 text-sm mt-1">Xem địa chỉ cửa hàng hoặc liên hệ trực tiếp với chúng tôi.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/address" className="inline-flex items-center justify-center rounded-2xl border border-amber-500 text-amber-700 hover:bg-amber-50 font-medium px-5 py-2.5 text-sm transition-colors">
            Địa chỉ
          </Link>
          <Link href="/contact" className="inline-flex items-center justify-center rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2.5 text-sm transition-colors">
            Liên hệ ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
