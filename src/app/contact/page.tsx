"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">Liên hệ</h1>
      <div className="space-y-4 mb-8">
        <p className="flex items-center gap-2"><Phone className="h-5 w-5 text-amber-600"/> Hotline: 0900 123 456</p>
        <p className="flex items-center gap-2"><Mail className="h-5 w-5 text-amber-600"/> Email: info@hamsternhaminh.vn</p>
        <p className="flex items-center gap-2"><MapPin className="h-5 w-5 text-amber-600"/> Địa chỉ: 123 Đường ABC, TP.HCM</p>
      </div>
      {submitted ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-green-700">
          Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
        </div>
      ) : (
        <form
          className="space-y-4 bg-white p-6 rounded-2xl shadow-sm border border-amber-100"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <Input placeholder="Họ tên" required />
          <Input placeholder="Email" type="email" required />
          <textarea rows={4} className="w-full rounded-2xl border border-amber-200 p-3" placeholder="Nội dung" required></textarea>
          <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">Gửi liên hệ</Button>
        </form>
      )}
    </div>
  );
}
