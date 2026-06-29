"use client";
import Link from "next/link";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/Toast";
import { Button } from "@/components/ui/Button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const addToCart = useCart((s) => s.addItem);
  const { showToast } = useToast();

  const handleAddToCart = (product: typeof items[0]) => {
    addToCart(product);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng ✓`);
  };

  const handleRemove = (id: number, name: string) => {
    removeItem(id);
    showToast(`Đã xóa "${name}" khỏi yêu thích`, "info");
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-amber-800 mb-4">Danh sách yêu thích trống</h1>
        <p className="text-gray-600 mb-6">Bạn chưa lưu sản phẩm nào vào mục yêu thích.</p>
        <Link href="/">
          <Button>Quay lại cửa hàng</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">💛 Sản phẩm yêu thích</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((product) => (
          <div key={product.id} className="flex items-center gap-4 rounded-2xl border border-amber-100 bg-white p-4 shadow-sm">
            <img src={product.image} alt={product.name} className="h-24 w-24 rounded-xl object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{product.description}</p>
              <p className="mt-2 font-semibold text-amber-700">{product.price.toLocaleString()}đ</p>
            </div>
            <div className="flex flex-col gap-2">
              <Button size="sm" onClick={() => handleAddToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Thêm vào giỏ
              </Button>
              <Button size="sm" variant="outline" onClick={() => handleRemove(product.id, product.name)}>
                <Trash2 className="mr-2 h-4 w-4" /> Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
