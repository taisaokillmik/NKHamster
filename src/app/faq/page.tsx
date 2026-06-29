"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

const faqs = [
  {
    q: "Hamster có dễ chăm sóc không?",
    a: "Khá dễ nếu bạn chuẩn bị đầy đủ: lồng sạch, thức ăn đúng loại, nước uống mỗi ngày và chất độn chuồng dày. Hamster không cần tắm nước, tự vệ sinh bằng cát tắm.",
  },
  {
    q: "NK Hamster có giao hàng toàn quốc không?",
    a: "Có, chúng tôi giao hàng toàn quốc qua các đơn vị vận chuyển uy tín. Riêng hamster sống được đóng gói đặc biệt và ưu tiên giao trong ngày hoặc sáng hôm sau.",
  },
  {
    q: "Các phương thức thanh toán được chấp nhận?",
    a: "Hiện tại NK Hamster nhận COD (thanh toán khi nhận hàng) và chuyển khoản ngân hàng. Thông tin tài khoản sẽ hiển thị sau khi đặt hàng.",
  },
  {
    q: "Hamster mua về bị bệnh thì sao?",
    a: "Nếu hamster có dấu hiệu bệnh trong vòng 3 ngày kể từ khi nhận hàng do lỗi của cửa hàng, chúng tôi sẽ hỗ trợ đổi hoặc hoàn tiền. Vui lòng liên hệ Zalo kèm video/ảnh.",
  },
  {
    q: "Hamster Bear và Winter White khác nhau thế nào?",
    a: "Hamster Bear (Teddy Bear) to hơn, lông dài hoặc ngắn, tính cách hiền lành. Winter White nhỏ hơn, có thể đổi màu lông theo mùa, nhanh nhẹn hơn. Cả hai đều dễ nuôi.",
  },
  {
    q: "Nên chọn lồng mica hay lồng nhựa?",
    a: "Lồng mica trong suốt đẹp hơn, giữ chất độn chuồng tốt hơn nhưng giá cao hơn. Lồng nhựa mini tiện lợi, giá rẻ, phù hợp người mới bắt đầu. Diện tích đáy tối thiểu nên đạt 900cm².",
  },
  {
    q: "Hamster có cần tiêm phòng không?",
    a: "Hamster không cần tiêm phòng như chó mèo. Tuy nhiên bạn nên đưa đến bác sĩ thú y nếu thấy hamster có biểu hiện lờ đờ, lông xù, ăn ít hoặc tiêu chảy.",
  },
  {
    q: "Có thể nuôi 2 hamster chung lồng không?",
    a: "Không nên. Hầu hết các giống hamster (Bear, Campbell, Winter White) có tính lãnh thổ cao, dễ cắn nhau khi nuôi chung. Mỗi hamster nên có lồng riêng.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-amber-100 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-amber-50 transition-colors"
      >
        <span className="font-semibold text-amber-800 pr-4">{q}</span>
        <ChevronDown className={cn("h-5 w-5 text-amber-500 flex-shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="px-5 pb-4 text-gray-600 text-sm leading-7 border-t border-amber-50">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-800">❓ Câu hỏi thường gặp</h1>
        <p className="text-gray-600 mt-2">Những thắc mắc phổ biến về hamster và dịch vụ của NK Hamster.</p>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <FaqItem key={i} q={faq.q} a={faq.a} />
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-gray-600">
        Không tìm thấy câu trả lời? <a href="/contact" className="font-semibold text-amber-700 hover:underline">Liên hệ với chúng tôi</a> để được hỗ trợ trực tiếp.
      </div>
    </div>
  );
}
