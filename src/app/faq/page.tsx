import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "FAQ | NK Hamster" };

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl text-center">
      <p className="text-gray-600">Bạn có thắc mắc? <Link href="/contact" className="font-semibold text-amber-700 hover:underline">Liên hệ với chúng tôi</Link> để được hỗ trợ trực tiếp.</p>
    </div>
  );
}
