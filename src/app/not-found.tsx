import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <p className="text-7xl mb-4">🐹</p>
      <h1 className="text-4xl font-bold text-amber-800 mb-3">404 - Không tìm thấy trang</h1>
      <p className="text-gray-600 mb-8">Trang bạn đang tìm không tồn tại hoặc đã bị xóa.</p>
      <Link href="/"><Button className="bg-amber-500 hover:bg-amber-600 text-white">Về trang chủ</Button></Link>
    </div>
  );
}
