import { ShieldCheck, Truck, HeadphonesIcon, Star } from "lucide-react";

const stats = [
  { icon: ShieldCheck, value: "100%", label: "Sản phẩm chính hãng", sub: "Cam kết chất lượng" },
  { icon: Truck, value: "Toàn quốc", label: "Giao hàng nhanh", sub: "24–48h nội thành" },
  { icon: HeadphonesIcon, value: "24/7", label: "Hỗ trợ khách hàng", sub: "Zalo & hotline" },
  { icon: Star, value: "4.9★", label: "Đánh giá trung bình", sub: "Từ 500+ khách hàng" },
];

const TrustBar = () => (
  <section className="container mx-auto px-4 py-8">
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {stats.map(({ icon: Icon, value, label, sub }) => (
        <div key={label} className="rounded-2xl border border-amber-100 bg-white p-4 text-center shadow-sm hover:shadow-md hover:border-amber-200 transition-all">
          <Icon className="h-6 w-6 text-amber-500 mx-auto mb-2" />
          <p className="text-xl font-bold text-amber-700">{value}</p>
          <p className="text-sm font-medium text-gray-700">{label}</p>
          <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TrustBar;
