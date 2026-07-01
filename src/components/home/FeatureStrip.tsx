import Link from "next/link";
import { Truck, ShieldCheck, MessageCircle } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Hamster khoẻ mạnh 100%", desc: "Kiểm tra sức khoẻ trước khi giao" },
  { icon: Truck, title: "Giao hàng toàn quốc", desc: "Đóng gói an toàn, ship tận cửa" },
  { icon: MessageCircle, title: "Hỗ trợ Zalo 9–21h", desc: "Tư vấn tận tình trước và sau mua" },
];

const FeatureStrip = () => (
  <section className="container mx-auto px-4 py-6">
    <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-4">
            <div className="rounded-2xl bg-amber-100 p-3 flex-shrink-0">
              <Icon className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="font-semibold text-amber-800">{title}</p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 pt-5 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-gray-600 text-sm">Chưa biết chọn loại nào? <strong>Tư vấn miễn phí!</strong></p>
        <Link href="https://zalo.me/0963107703" target="_blank" className="inline-flex items-center justify-center rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-medium px-5 py-2 text-sm transition-colors">
          Liên hệ ngay
        </Link>
      </div>
    </div>
  </section>
);

export default FeatureStrip;
