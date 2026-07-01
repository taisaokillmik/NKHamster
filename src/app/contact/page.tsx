import type { Metadata } from "next";

export const metadata: Metadata = { title: "Liên hệ | NK Hamster" };

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl text-center space-y-6">
      <h1 className="text-3xl font-bold text-amber-800">Liên hệ</h1>
      <p className="text-gray-600">Nhắn tin trực tiếp qua Zalo để được tư vấn nhanh nhất. Hỗ trợ 9:00–21:00 mỗi ngày.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://zalo.me/0963107703"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 text-base transition-colors"
        >
          Zalo Nhật Khoa — 0963 107 703
        </a>
        <a
          href="https://zalo.me/0394210096"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 text-base transition-colors"
        >
          Zalo Tuấn Phạm — 0394 210 096
        </a>
      </div>
    </div>
  );
}
