"use client";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const VN_PHONE_REGEX = /^(0|\+84)(3[2-9]|5[6-9]|7[0-9]|8[0-9]|9[0-9])[0-9]{7}$/;

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bank">("cod");
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!VN_PHONE_REGEX.test(phone)) {
      setPhoneError("Số điện thoại không hợp lệ (VD: 0912345678)");
      return;
    }
    setPhoneError("");
    setLoading(true);

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    await fetch("/api/orders", {
      method: "POST",
      headers,
      body: JSON.stringify({
        customerName: name,
        phone,
        address,
        note,
        paymentMethod,
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.salePrice || item.product.price,
        })),
        total: totalPrice(),
      }),
    });

    clearCart();
    setSubmitted(true);
    setLoading(false);
  };

  if (items.length === 0 && !submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">Giỏ hàng trống</h1>
        <a href="/"><Button>Tiếp tục mua sắm</Button></a>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Đặt hàng thành công!</h1>
        <p className="text-gray-600 mb-2">Cảm ơn bạn đã mua hàng tại NK Hamster.</p>
        <p className="text-gray-500 text-sm mb-6">Chúng tôi sẽ liên hệ xác nhận đơn qua số {phone} trong thời gian sớm nhất.</p>
        {paymentMethod === "bank" && (
          <div className="max-w-md mx-auto rounded-2xl border border-amber-200 bg-amber-50 p-4 mb-6 text-left text-sm">
            <p className="font-semibold text-amber-800 mb-2">Thông tin chuyển khoản:</p>
            <p>Ngân hàng: Vietcombank</p>
            <p>Số TK: 1234567890</p>
            <p>Chủ TK: NK HAMSTER</p>
            <p>Nội dung: <span className="font-semibold">{name} - {phone}</span></p>
          </div>
        )}
        <a href="/"><Button className="bg-amber-500 hover:bg-amber-600 text-white">Về trang chủ</Button></a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">Thanh toán</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên *</label>
          <Input required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại *</label>
          <Input required value={phone} onChange={(e) => { setPhone(e.target.value); setPhoneError(""); }} />
          {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ giao hàng *</label>
          <Input required value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú</label>
          <textarea rows={3} className="w-full rounded-2xl border border-amber-200 p-3 text-sm" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú thêm cho đơn hàng..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phương thức thanh toán</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Thanh toán khi nhận hàng (COD)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="payment" value="bank" checked={paymentMethod === "bank"} onChange={() => setPaymentMethod("bank")} />
              Chuyển khoản ngân hàng
            </label>
          </div>
        </div>
        <div className="border-t pt-4 space-y-1">
          <p className="text-sm text-gray-500">Số sản phẩm: {items.reduce((s, i) => s + i.quantity, 0)}</p>
          <p className="text-lg font-bold">Tổng tiền: <span className="text-amber-700">{totalPrice().toLocaleString()}đ</span></p>
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 text-lg">
          {loading ? "Đang xử lý..." : "Đặt hàng"}
        </Button>
      </form>
    </div>
  );
}
