"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Phone } from "lucide-react";

const orderPets = [
  { name: "Nhím", emoji: "🦔", price: "500.000đ – 1.500.000đ", description: "Nhím châu Phi cỡ nhỏ, hiền lành, ít cần chăm sóc, không gây dị ứng.", traits: ["Ít mùi", "Độc lập", "Không cần tắm"] },
  { name: "Bọ Việt", emoji: "🐛", image: "/bọ ú việt.jpg.webp", price: "200.000đ – 800.000đ", description: "Bọ que Việt Nam, sinh vật độc đáo và lạ mắt, rất dễ nuôi.", traits: ["Ăn lá cây", "Thân thiện", "Ít tốn kém"] },
  { name: "Sóc Bay", emoji: "🐿️", price: "1.200.000đ – 3.000.000đ", description: "Sóc bay Sugar Glider năng động, gắn bó với chủ, có thể lướt trong phòng.", traits: ["Gắn bó với chủ", "Hoạt động ban đêm", "Sống theo đàn"] },
  { name: "Thỏ Việt", emoji: "🐰", price: "300.000đ – 1.000.000đ", description: "Thỏ Việt Nam mềm mại, hiền lành, thích hợp cho gia đình có trẻ nhỏ.", traits: ["Thân thiện", "Dễ thuần hoá", "Thích được vuốt ve"] },
];

export default function OrderPetPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", note: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-600 font-semibold">Order Pet</p>
        <h1 className="text-4xl font-bold text-amber-800 mt-3">Đặt thú nuôi đặc biệt</h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">Ngoài Hamster, NK Hamster còn nhận order các loài thú cưng đặc biệt theo yêu cầu. Chọn loài bạn muốn và để lại thông tin.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-12">
        {orderPets.map((pet) => (
          <button
            key={pet.name}
            onClick={() => setSelected(selected === pet.name ? null : pet.name)}
            className={`group text-left rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${selected === pet.name ? "border-amber-500 bg-amber-50" : "border-amber-100 bg-white"}`}
          >
            <div className="mb-4 h-36 rounded-2xl bg-amber-50 flex items-center justify-center overflow-hidden">
              {(pet as any).image ? (
                <img src={(pet as any).image} alt={pet.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-7xl">{pet.emoji}</span>
              )}
            </div>
            <h2 className="text-xl font-semibold text-amber-800">{pet.name}</h2>
            <p className="text-sm text-amber-600 font-medium mt-1">{pet.price}</p>
            <p className="mt-2 text-gray-600 text-sm">{pet.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {pet.traits.map((t) => (
                <span key={t} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-amber-800 mb-1">Đặt hàng ngay</h2>
          <p className="text-sm text-gray-500 mb-6">Để lại thông tin, chúng tôi sẽ liên hệ tư vấn và báo giá trong vòng 24h.</p>

          {submitted ? (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-6 text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className="font-semibold text-green-700">Đã ghi nhận yêu cầu!</p>
              <p className="text-sm text-gray-600 mt-1">Chúng tôi sẽ liên hệ qua số <strong>{form.phone}</strong> sớm nhất.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Loài muốn đặt</label>
                <select
                  className="w-full rounded-2xl border border-amber-200 px-3 py-2 text-sm"
                  value={selected || ""}
                  onChange={(e) => setSelected(e.target.value)}
                  required
                >
                  <option value="">-- Chọn loài --</option>
                  {orderPets.map((p) => <option key={p.name} value={p.name}>{p.emoji} {p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Họ tên *</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Số điện thoại / Zalo *</label>
                <Input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="0912 345 678" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Ghi chú thêm</label>
                <textarea rows={3} className="w-full rounded-2xl border border-amber-200 p-3 text-sm" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Màu sắc, giới tính, số lượng..." />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">Gửi yêu cầu đặt hàng</Button>
            </form>
          )}

          <div className="mt-6 pt-5 border-t border-amber-100 flex items-center gap-3 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-amber-500 flex-shrink-0" />
            <span>Hoặc liên hệ trực tiếp: <a href="tel:0963107703" className="font-semibold text-amber-700">0963 107 703</a> (Zalo Nhật Khoa)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
