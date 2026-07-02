import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const stores = [
  {
    id: 1,
    name: "NK Hamster – Chi nhánh Nhà Bè",
    address: "2137 Huỳnh Tấn Phát, KP7, Thị Trấn Nhà Bè, Huyện Nhà Bè, TP.HCM",
    phone: "0963 107 703",
    owner: "Nhật Khoa",
    zalo: "https://zalo.me/0963107703",
    hours: "9:00 – 21:00 (Tất cả các ngày)",
    mapUrl: "https://maps.google.com/?q=2137+Huynh+Tan+Phat+Nha+Be+HCM",
  },
  {
    id: 2,
    name: "NK Hamster – Chi nhánh Bình Dương",
    address: "Số 9 Lào Cai, Chánh Nghĩa, Thủ Dầu Một (kế hải sản Tư Nhớ 2)",
    phone: "0394 210 096",
    owner: "Tuấn Phạm",
    zalo: "https://zalo.me/0394210096",
    hours: "8:00 – 22:00 (Tất cả các ngày)",
    mapUrl: "https://maps.google.com/?q=9+Lao+Cai+Thu+Dau+Mot+Binh+Duong",
  },
];

export default function AddressPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-800">📍 Địa chỉ cửa hàng</h1>
        <p className="text-gray-600 mt-2">NK Hamster có 2 điểm bán tại TP.HCM và Bình Dương. Mở cửa tất cả các ngày trong tuần.</p>
      </div>

      <div className="space-y-5">
        {stores.map((store) => (
          <div key={store.id} className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-amber-800 mb-4">{store.name}</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p>{store.address}</p>
                  <a href={store.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-amber-600 hover:underline text-xs mt-1">
                    Xem trên Google Maps <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <a href={store.zalo} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-600">
                  Zalo {store.owner} — {store.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p>{store.hours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-gray-600">
        💡 Bạn có thể đến trực tiếp xem và chọn hamster, hoặc đặt hàng online giao tận nơi.
      </div>
    </div>
  );
}
