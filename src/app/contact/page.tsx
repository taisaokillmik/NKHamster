import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = { title: "Liên hệ | NK Hamster" };

const branches = [
  {
    name: "Chi nhánh 1 — Nhà Bè",
    address: "2137 Huỳnh Tấn Phát, KP7, Thị Trấn Nhà Bè, Huyện Nhà Bè, TPHCM",
    phone: "0963 107 703",
    zalo: "0963107703",
    contact: "Nhật Khoa",
    hours: "9:00 - 21:00",
  },
  {
    name: "Chi nhánh 2 — Thủ Dầu Một",
    address: "Số 9 Lào Cai, Chánh Nghĩa, Thủ Dầu Một (kế Hải Sản Tư Nhớ 2)",
    phone: "0394 210 096",
    zalo: "0394210096",
    contact: "Tuấn Phạm",
    hours: "8:00 - 22:00",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fefcf5] via-[#fff7ed] to-[#fefcf5] pt-28 pb-20">
      <div className="premium-container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-heading-1 font-display text-gray-900 mb-4">Liên hệ</h1>
          <p className="text-body-lg text-gray-500 max-w-xl mx-auto">
            Nhắn tin trực tiếp qua Zalo để được tư vấn nhanh nhất.
          </p>
        </div>

        {/* Branches */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {branches.map((branch, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-600" />
                </div>
                <h2 className="text-xl font-display font-semibold text-gray-900">
                  {branch.name}
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{branch.address}</span>
                </div>

                <a
                  href={`https://zalo.me/${branch.zalo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary-500 flex-shrink-0" />
                  <span>
                    {branch.phone} (Zalo - {branch.contact})
                  </span>
                </a>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span>{branch.hours}</span>
                </div>
              </div>

              <a
                href={`https://zalo.me/${branch.zalo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center w-full rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 text-sm transition-all duration-300 shadow-warm hover:shadow-lg"
              >
                Nhắn Zalo — {branch.contact}
              </a>
            </div>
          ))}
        </div>

        {/* Direct Zalo links backup */}
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-4">Hoặc liên hệ trực tiếp:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://zalo.me/0963107703"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-primary-200 text-gray-700 hover:text-primary-600 font-medium px-8 py-3 text-sm transition-all duration-300"
            >
              Zalo Nhật Khoa — 0963 107 703
            </a>
            <a
              href="https://zalo.me/0394210096"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white border border-gray-200 hover:border-primary-200 text-gray-700 hover:text-primary-600 font-medium px-8 py-3 text-sm transition-all duration-300"
            >
              Zalo Tuấn Phạm — 0394 210 096
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
