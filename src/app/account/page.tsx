"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Order } from "@/types";
import Link from "next/link";
import { Check } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  pending: "⏳ Chờ xác nhận",
  confirmed: "✅ Đã xác nhận",
  shipping: "🚚 Đang giao",
  completed: "🎉 Hoàn thành",
  cancelled: "❌ Đã hủy",
};

const STATUS_STEPS = ["pending", "confirmed", "shipping", "completed"] as const;

function OrderTimeline({ status }: { status: string }) {
  if (status === "cancelled") {
    return <span className="text-sm text-red-500 font-medium">Đơn hàng đã bị hủy</span>;
  }

  const currentStepIndex = STATUS_STEPS.indexOf(status as any);
  const isCompleted = status === "completed";

  return (
    <div className="flex items-center gap-2 mt-3">
      {STATUS_STEPS.map((step, index) => {
        const isPast = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isFuture = index > currentStepIndex;

        return (
          <div key={step} className="flex items-center gap-2 flex-1">
            <div className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
              isPast || isCurrent ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {isPast ? <Check className="h-3 w-3" /> : index + 1}
            </div>
            <span className={`text-xs ${
              isPast || isCurrent ? "text-amber-700 font-medium" : "text-gray-400"
            }`}>
              {STATUS_LABELS[step]?.replace(/[^\w\s]/g, "").trim()}
            </span>
            {index < STATUS_STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 ${isPast ? "bg-amber-500" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AccountPage() {
  const { user, token, registerUser, loginUser, logout, updateProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [message, setMessage] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user && token) {
      fetch("/api/orders", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((d) => setOrders(d.orders || []));
    }
  }, [user, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      const result = await registerUser(form);
      setMessage(result.message);
    } else {
      const result = await loginUser(form.email, form.password);
      setMessage(result.message);
    }
  };

  if (user) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-800">Xin chào, {user.name}</h1>
              <p className="text-gray-600 mt-1">Quản lý thông tin tài khoản của bạn.</p>
            </div>
            <div className="flex gap-2">
              {user.role === "admin" && (
                <Link href="/admin"><Button variant="outline">🛠 Admin</Button></Link>
              )}
              <Button variant="outline" onClick={logout}>Đăng xuất</Button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-amber-50 p-5">
              <h2 className="font-semibold text-amber-800">Thông tin cá nhân</h2>
              <p className="mt-2 text-sm text-gray-700">Email: {user.email}</p>
              <p className="text-sm text-gray-700">Số điện thoại: {user.phone || "Chưa cập nhật"}</p>
              <p className="text-sm text-gray-700">Địa chỉ: {user.address || "Chưa cập nhật"}</p>
              {user.role === "admin" && <span className="mt-2 inline-block text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full">Admin</span>}
            </div>

            <div className="rounded-2xl border border-amber-100 p-5">
              <h2 className="font-semibold text-amber-800">Cập nhật hồ sơ</h2>
              <div className="mt-3 space-y-3">
                <Input placeholder="Tên" defaultValue={user.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Số điện thoại" defaultValue={user.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input placeholder="Địa chỉ" defaultValue={user.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                <Button className="w-full" disabled={updating} onClick={async () => {
                  setUpdating(true);
                  await updateProfile({ name: form.name || user.name, phone: form.phone || user.phone || "", address: form.address || user.address || "" });
                  setMessage("Cập nhật thông tin thành công.");
                  setUpdating(false);
                }}>{updating ? "Đang lưu..." : "Lưu thay đổi"}</Button>
                {message && <p className="text-sm text-amber-700">{message}</p>}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-100 p-5">
            <h2 className="font-semibold text-amber-800">Đơn hàng của bạn</h2>
            {orders.length === 0 ? (
              <p className="mt-3 text-sm text-gray-500">Bạn chưa có đơn hàng nào.</p>
            ) : (
              <div className="mt-4 space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-2xl bg-amber-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">Đơn #{order.id}</p>
                        <p className="text-xs text-gray-500">{order.createdAt}</p>
                      </div>
                      <span className="text-sm text-amber-700">{STATUS_LABELS[order.status] || order.status}</span>
                    </div>
                    <OrderTimeline status={order.status} />
                    <div className="mt-2 text-sm text-gray-600 space-y-0.5">
                      {order.items.map((item, i) => (
                        <p key={i}>{item.name} × {item.quantity}</p>
                      ))}
                    </div>
                    <p className="mt-2 font-semibold text-amber-700">{order.total.toLocaleString()}đ</p>
                    {order.note && <p className="text-xs text-gray-400 mt-1">Ghi chú: {order.note}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="rounded-3xl border border-amber-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-amber-800">Tài khoản</h1>
        <p className="text-gray-600 mt-2">Đăng nhập hoặc tạo tài khoản để theo dõi đơn hàng.</p>

        <div className="mt-6 flex gap-3">
          <Button variant={isRegister ? "outline" : "default"} onClick={() => { setIsRegister(false); setMessage(""); }}>Đăng nhập</Button>
          <Button variant={isRegister ? "default" : "outline"} onClick={() => { setIsRegister(true); setMessage(""); }}>Đăng ký</Button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isRegister && <Input placeholder="Họ tên" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />}
          <Input placeholder="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Mật khẩu" type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          {isRegister && (
            <>
              <Input placeholder="Số điện thoại" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              <Input placeholder="Địa chỉ" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </>
          )}
          <Button type="submit" className="w-full">{isRegister ? "Tạo tài khoản" : "Đăng nhập"}</Button>
        </form>

        {message && <p className="mt-4 text-sm text-amber-700">{message}</p>}
      </div>
    </div>
  );
}
