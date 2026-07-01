import type { Metadata } from "next";

export const metadata: Metadata = { title: "Liên hệ | NK Hamster" };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl text-center space-y-4">
      <h1 className="text-3xl font-bold text-amber-800">Liên hệ</h1>
      <p className="text-gray-600">Nhắn tin trực tiếp qua Zalo để được tư vấn nhanh nhất.</p>
      <a
        href="https://zalo.me/0963107703"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 text-lg transition-colors"
      >
        Nhắn Zalo ngay
      </a>
      <p className="text-sm text-gray-500">Hotline: <a href="tel:0963107703" className="text-amber-600 font-semibold">0963 107 703</a> — Hỗ trợ 9:00–21:00 mỗi ngày</p>
    </div>
  );
}
