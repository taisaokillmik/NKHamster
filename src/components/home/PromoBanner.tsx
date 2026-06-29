import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PromoBanner() {
  return (
    <section className="container mx-auto px-4 py-6">
      <div className="rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-100 to-orange-50 p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">Ưu đãi đặc biệt</p>
            <h2 className="text-2xl font-bold text-amber-800">Giảm 10% cho đơn hàng đầu tiên</h2>
            <p className="text-gray-600 mt-1">Đăng ký tài khoản để nhận ưu đãi và theo dõi đơn hàng dễ dàng.</p>
          </div>
          <Link href="/promotions">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white">Xem khuyến mãi</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
