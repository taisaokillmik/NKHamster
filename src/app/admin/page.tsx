"use client";
import { useEffect, useMemo, useState } from "react";
import { useOrders } from "@/hooks/useOrders";
import { Order, Product } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Trash2, PackageCheck, Pencil, Search, UserRound, Percent, XCircle, RefreshCw, Download } from "lucide-react";

type NewProductForm = {
  name?: string;
  price?: number | string;
  image?: string;
  category?: string;
  description?: string;
  stock?: number | string;
};

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [newProduct, setNewProduct] = useState<NewProductForm>({});
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");
  const [promotions, setPromotions] = useState([{ id: 1, title: "Giảm 10% đơn đầu tiên", description: "Dành cho khách mới", discountPercent: 10, active: true }]);
  const [promotionTitle, setPromotionTitle] = useState("");
  const [promotionDescription, setPromotionDescription] = useState("");
  const [promotionPercent, setPromotionPercent] = useState(10);
  const { orders, loadOrders, updateOrderStatus } = useOrders();

  useEffect(() => {
    setHydrated(true);
    if (user && user.role !== "admin") {
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    fetchProducts();
    loadOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data.products || []);
    setLoadingProducts(false);
  };

  const filteredProducts = useMemo(() =>
    products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    ), [products, search]);

  const filteredOrders = useMemo(() =>
    statusFilter === "all" ? orders : orders.filter((o) => o.status === statusFilter),
    [orders, statusFilter]);

  const totalRevenue = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders]);
  const pendingCount = useMemo(() => orders.filter((o) => o.status === "pending").length, [orders]);
  const completedCount = useMemo(() => orders.filter((o) => o.status === "completed").length, [orders]);
  const cancelledCount = useMemo(() => orders.filter((o) => o.status === "cancelled").length, [orders]);

  // Revenue by month
  const revenueByMonth = useMemo(() => {
    const months: Record<string, number> = {};
    orders.forEach((order) => {
      if (order.status === "completed") {
        const date = new Date(order.createdAt);
        const monthKey = `${date.getMonth() + 1}/${date.getFullYear()}`;
        months[monthKey] = (months[monthKey] || 0) + order.total;
      }
    });
    return Object.entries(months).sort((a, b) => {
      const [aMonth, aYear] = a[0].split("/").map(Number);
      const [bMonth, bYear] = b[0].split("/").map(Number);
      if (aYear !== bYear) return aYear - bYear;
      return aMonth - bMonth;
    });
  }, [orders]);

  // Top selling products
  const topProducts = useMemo(() => {
    const productSales: Record<number, { name: string; quantity: number; revenue: number }> = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (!productSales[item.productId]) {
          productSales[item.productId] = { name: item.name, quantity: 0, revenue: 0 };
        }
        productSales[item.productId].quantity += item.quantity;
        productSales[item.productId].revenue += item.price * item.quantity;
      });
    });
    return Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [orders]);

  // Average order value
  const avgOrderValue = useMemo(() => {
    if (orders.length === 0) return 0;
    return totalRevenue / orders.length;
  }, [totalRevenue, orders.length]);

  // Conversion rate (completed / total)
  const conversionRate = useMemo(() => {
    if (orders.length === 0) return 0;
    return Math.round((completedCount / orders.length) * 100);
  }, [completedCount, orders.length]);

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price) return;
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({});
    fetchProducts();
  };

  const deleteProduct = async (id: number) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setNewProduct({ name: product.name, price: product.price, image: product.image, category: product.category, description: product.description, stock: product.stock });
  };

  const saveEdit = async () => {
    if (!editingId || !newProduct.name || !newProduct.price) return;
    await fetch(`/api/products/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    setEditingId(null);
    setNewProduct({});
    fetchProducts();
  };

  const addPromotion = () => {
    if (!promotionTitle) return;
    setPromotions([{ id: Date.now(), title: promotionTitle, description: promotionDescription, discountPercent: promotionPercent, active: true }, ...promotions]);
    setPromotionTitle("");
    setPromotionDescription("");
    setPromotionPercent(10);
  };

  const togglePromotion = (id: number) =>
    setPromotions(promotions.map((p) => p.id === id ? { ...p, active: !p.active } : p));

  const addDemoOrder = () => {
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Khách hàng demo",
        phone: "0900000000",
        address: "TP.HCM",
        items: [{ productId: 1, name: "Hamster Bear", quantity: 1, price: 100000 }],
        total: 100000,
        status: "pending",
      }),
    }).then(() => loadOrders());
  };

  const exportOrdersToCSV = () => {
    const headers = ["ID", "Khách hàng", "Số điện thoại", "Địa chỉ", "Sản phẩm", "Tổng tiền", "Trạng thái", "Ngày tạo"];
    const rows = filteredOrders.map((order) => [
      order.id,
      order.customerName,
      order.phone,
      order.address,
      order.items.map((item) => `${item.name} x${item.quantity}`).join(", "),
      order.total.toLocaleString() + "đ",
      order.status,
      order.createdAt,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `don-hang-${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!hydrated) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Đang tải...</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-amber-800">Bạn không có quyền truy cập trang này.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">🛠 Quản trị viên</h1>

      {/* Thêm / Sửa sản phẩm */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{editingId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</h2>
          {editingId && <Button variant="outline" onClick={() => { setEditingId(null); setNewProduct({}); }}>Hủy</Button>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Tên sản phẩm" value={newProduct.name || ""} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input placeholder="Giá" type="number" value={newProduct.price || ""} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
          <Input placeholder="Hình ảnh URL" value={newProduct.image || ""} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
          <select className="rounded-2xl border border-amber-200 p-2 text-sm" value={newProduct.category || "hamster"} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}>
            <option value="hamster">Hamster</option>
            <option value="cage">Lồng</option>
            <option value="food">Thức ăn</option>
            <option value="accessory">Phụ kiện</option>
          </select>
          <textarea className="col-span-2 rounded-2xl border border-amber-200 p-2" placeholder="Mô tả" value={newProduct.description || ""} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <Input placeholder="Số lượng" type="number" value={newProduct.stock || ""} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        </div>
        <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white" onClick={editingId ? saveEdit : addProduct}>
          {editingId ? "Lưu thay đổi" : "Thêm sản phẩm"}
        </Button>
      </div>

      {/* Thống kê */}
      <div className="grid gap-4 md:grid-cols-6 mb-10">
        {[
          { label: "Sản phẩm", value: products.length },
          { label: "Đơn hàng", value: orders.length },
          { label: "Doanh thu", value: totalRevenue.toLocaleString() + "đ" },
          { label: "Chờ duyệt", value: pendingCount },
          { label: "Hoàn thành", value: completedCount },
          { label: "Đã hủy", value: cancelledCount },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-amber-800">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Advanced Analytics */}
      <div className="grid gap-6 md:grid-cols-2 mb-10">
        {/* Revenue by Month */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">Doanh thu theo tháng</h3>
          {revenueByMonth.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {revenueByMonth.map(([month, revenue]) => (
                <div key={month} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tháng {month}</span>
                  <span className="font-semibold text-amber-700">{revenue.toLocaleString()}đ</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Products */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">Sản phẩm bán chạy</h3>
          {topProducts.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa có dữ liệu</p>
          ) : (
            <div className="space-y-3">
              {topProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.quantity} đã bán</p>
                  </div>
                  <span className="font-semibold text-amber-700">{product.revenue.toLocaleString()}đ</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Metrics */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">Chỉ số hiệu quả</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Giá trị đơn trung bình</span>
              <span className="font-semibold text-amber-700">{Math.round(avgOrderValue).toLocaleString()}đ</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tỷ lệ hoàn thành đơn</span>
              <span className="font-semibold text-green-600">{conversionRate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Đơn hàng */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 mb-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
          <h2 className="text-xl font-semibold">Đơn hàng</h2>
          <div className="flex flex-wrap gap-2">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)} className="rounded-2xl border border-amber-200 px-3 py-2 text-sm">
              <option value="all">Tất cả</option>
              <option value="pending">Chờ duyệt</option>
              <option value="confirmed">Đã duyệt</option>
              <option value="shipping">Đang giao</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            <Button variant="outline" onClick={() => loadOrders()}>
              <RefreshCw className="mr-2 h-4 w-4" /> Tải lại
            </Button>
            <Button variant="outline" onClick={addDemoOrder}>
              <PackageCheck className="mr-2 h-4 w-4" /> Tạo đơn mẫu
            </Button>
            <Button variant="outline" onClick={exportOrdersToCSV}>
              <Download className="mr-2 h-4 w-4" /> Xuất CSV
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {filteredOrders.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa có đơn hàng nào.</p>
          ) : filteredOrders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-amber-100 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800">{order.customerName}</p>
                  <p className="text-sm text-gray-500">{order.phone} • {order.address}</p>
                  {order.note && <p className="text-sm text-gray-400 italic">Ghi chú: {order.note}</p>}
                  <p className="text-xs text-gray-400 mt-1">Thanh toán: {order.paymentMethod === "bank" ? "Chuyển khoản" : "COD"}</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700 whitespace-nowrap">{order.total.toLocaleString()}đ</span>
              </div>
              <div className="mt-2 text-sm text-gray-500 space-y-0.5">
                {order.items.map((item, i) => (
                  <p key={i}>{item.name} × {item.quantity}</p>
                ))}
              </div>
              <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-gray-500">{order.createdAt}</p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant={order.status === "confirmed" ? "default" : "outline"} onClick={() => updateOrderStatus(order.id, "confirmed")}>Duyệt</Button>
                  <Button size="sm" variant={order.status === "shipping" ? "default" : "outline"} onClick={() => updateOrderStatus(order.id, "shipping")}>Đang giao</Button>
                  <Button size="sm" variant={order.status === "completed" ? "default" : "outline"} onClick={() => updateOrderStatus(order.id, "completed")}>Hoàn thành</Button>
                  <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "cancelled")}><XCircle className="mr-1 h-4 w-4" />Hủy</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Khách hàng */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 mb-10">
        <h2 className="text-xl font-semibold mb-4">Khách hàng</h2>
        <CustomerList />
      </div>

      {/* Khuyến mãi */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100 mb-10">
        <h2 className="text-xl font-semibold mb-4">Khuyến mãi</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Input placeholder="Tên chương trình" value={promotionTitle} onChange={(e) => setPromotionTitle(e.target.value)} />
            <Input placeholder="Mô tả" value={promotionDescription} onChange={(e) => setPromotionDescription(e.target.value)} />
            <Input type="number" placeholder="Phần trăm giảm" value={promotionPercent} onChange={(e) => setPromotionPercent(Number(e.target.value))} />
            <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={addPromotion}>Thêm khuyến mãi</Button>
          </div>
          <div className="space-y-3">
            {promotions.map((item) => (
              <div key={item.id} className="rounded-2xl border border-amber-100 p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">{item.discountPercent}%</span>
                  <button onClick={() => togglePromotion(item.id)} className={item.active ? "text-green-600" : "text-gray-400"}>
                    <Percent className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bảng sản phẩm */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 mb-6 flex items-center gap-3">
        <Search className="h-4 w-4 text-gray-400" />
        <Input placeholder="Tìm sản phẩm theo tên hoặc danh mục" value={search} onChange={(e) => setSearch(e.target.value)} className="border-0 shadow-none px-0" />
        <Button variant="outline" size="sm" onClick={fetchProducts}><RefreshCw className="h-4 w-4" /></Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden">
        {loadingProducts ? (
          <p className="p-6 text-sm text-gray-500">Đang tải sản phẩm...</p>
        ) : (
          <table className="w-full">
            <thead className="bg-amber-50">
              <tr>
                <th className="text-left p-4">Ảnh</th>
                <th className="text-left p-4">Tên</th>
                <th className="text-left p-4">Giá</th>
                <th className="text-left p-4">Danh mục</th>
                <th className="text-left p-4">Tồn kho</th>
                <th className="text-left p-4">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-amber-100">
                  <td className="p-4"><img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" /></td>
                  <td className="p-4 font-medium">{product.name}</td>
                  <td className="p-4">{product.price.toLocaleString()}đ</td>
                  <td className="p-4 capitalize">{product.category}</td>
                  <td className="p-4">
                    <span className={product.stock <= 3 ? "text-red-500 font-semibold" : "text-gray-700"}>{product.stock}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(product)} className="text-amber-600 hover:text-amber-700"><Pencil className="h-5 w-5" /></button>
                      <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-5 w-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function CustomerList() {
  const { token } = useAuth();
  const [customers, setCustomers] = useState<Array<{ id: number; name: string; email: string; phone?: string; role?: string }>>([]);

  useEffect(() => {
    if (!token) return;
    fetch("/api/auth/customers", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : { users: [] })
      .then((d) => setCustomers(d.users || []))
      .catch(() => null);
  }, [token]);

  if (customers.length === 0) return <p className="text-sm text-gray-500">Chưa có khách hàng nào.</p>;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {customers.map((u) => (
        <div key={u.id} className="rounded-2xl border border-amber-100 p-4 flex items-center gap-3">
          <div className="rounded-full bg-amber-100 p-2"><UserRound className="h-5 w-5 text-amber-700" /></div>
          <div>
            <p className="font-semibold text-gray-800">{u.name} {u.role === "admin" && <span className="text-xs text-amber-600">(Admin)</span>}</p>
            <p className="text-sm text-gray-500">{u.email}</p>
            {u.phone && <p className="text-xs text-gray-400">{u.phone}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
