"use client";
import { Phone } from "lucide-react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const orderPets = [
  { name: "Nhím Cảnh", emoji: "🦔", image: `${BASE}/nhimcanh.jpg`, price: "500.000đ – 1.500.000đ", description: "Tưởng gai góc mà lại hiền khô — nhím châu Phi cuộn tròn vừa lọt lòng bàn tay, sạch bóng, không mùi. Nhìn một lần là muốn rước về ngay.", traits: ["Ít mùi", "Độc lập", "Không cần tắm"] },
  { name: "Bọ Ú Việt", emoji: "🐛", image: `${BASE}/bou.webp`, price: "200.000đ – 800.000đ", description: "Sinh vật kỳ lạ nhất bạn từng thấy — trông như cành cây biết đi, nhưng lại hiền và thân thiện đến bất ngờ. Chỉ cần vài chiếc lá mỗi ngày là đủ hạnh phúc.", traits: ["Ăn lá cây", "Thân thiện", "Ít tốn kém"] },
  { name: "Sóc Bay", emoji: "🐿️", image: `${BASE}/socbay.webp`, price: "1.200.000đ – 3.000.000đ", description: "Nhỏ bằng nắm tay, nhưng tình cảm thì vô cùng — Sugar Glider nhận ra giọng chủ, chui vào túi áo ngủ ngon lành và lướt qua không khí như siêu anh hùng thu nhỏ.", traits: ["Gắn bó với chủ", "Hoạt động ban đêm", "Sống theo đàn"] },
  { name: "Thỏ Việt", emoji: "🐰", image: `${BASE}/thoviet.webp`, price: "300.000đ – 1.000.000đ", description: "Mềm như bông, hiền như mưa xuân — thỏ Việt nhảy lăng xăng khắp nhà, tai vểnh lên nghe ngóng rồi lại dụi đầu vào tay xin vuốt. Ai nhìn cũng tan chảy.", traits: ["Thân thiện", "Dễ thuần hoá", "Thích được vuốt ve"] },
];

export default function OrderPetPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-600 font-semibold">Order Pet</p>
        <h1 className="text-4xl font-bold text-amber-800 mt-3">Đặt thú nuôi đặc biệt</h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">Ngoài Hamster, NK Hamster còn nhận order các loài thú cưng đặc biệt theo yêu cầu. Chọn loài bạn muốn và liên hệ trực tiếp qua Zalo.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-12">
        {orderPets.map((pet) => (
          <div key={pet.name} className="text-left rounded-3xl border border-amber-100 bg-white p-6 shadow-sm">
            <div className="mb-4 w-full aspect-square rounded-2xl overflow-hidden bg-amber-50">
              <img src={pet.image} alt={pet.name} className="w-full h-full object-cover object-center" />
            </div>
            <h2 className="text-xl font-semibold text-amber-800">{pet.name}</h2>
            <p className="text-sm text-amber-600 font-medium mt-1">{pet.price}</p>
            <p className="mt-2 text-gray-600 text-sm">{pet.description}</p>
            <div className="mt-3 flex flex-wrap gap-1">
              {pet.traits.map((t) => (
                <span key={t} className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm space-y-4 text-center">
          <h2 className="text-xl font-bold text-amber-800">Liên hệ đặt hàng</h2>
          <p className="text-sm text-gray-500">Nhắn tin trực tiếp qua Zalo để được tư vấn và báo giá nhanh nhất.</p>
          <div className="flex flex-col gap-3">
            <a href="https://zalo.me/0963107703" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 text-sm transition-colors">
              <Phone className="h-4 w-4" /> 0963 107 703 (Nhật Khoa)
            </a>
            <a href="https://zalo.me/0394210096" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 text-sm transition-colors">
              <Phone className="h-4 w-4" /> 0394 210 096 (Tuấn Phạm)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
