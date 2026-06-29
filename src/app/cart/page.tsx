"use client";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  const originalTotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const savedAmount = originalTotal - totalPrice();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-amber-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-amber-800 mb-2">Giỏ hàng đang trống</h1>
        <p className="text-gray-500 mb-6">Hãy thêm sản phẩm vào giỏ để bắt đầu mua sắm!</p>
        <Link href="/"><Button className="bg-amber-500 hover:bg-amber-600 text-white">Tiếp tục mua sắm</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">🛒 Giỏ hàng ({items.reduce((s, i) => s + i.quantity, 0)} sản phẩm)</h1>
      <div className="space-y-4">
        {items.map((item) => {
          const unitPrice = item.product.salePrice || item.product.price;
          const hasSale = item.product.salePrice && item.product.salePrice < item.product.price;
          return (
            <div key={item.product.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-amber-100">
              <Link href={`/product/${item.product.slug}`}>
                <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover hover:opacity-90 transition" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product.slug}`}>
                  <h3 className="font-semibold text-gray-800 hover:text-amber-700 truncate">{item.product.name}</h3>
                </Link>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-amber-700 font-medium">{unitPrice.toLocaleString()}đ</p>
                  {hasSale && (
                    <p className="text-xs text-gray-400 line-through">{item.product.price.toLocaleString()}đ</p>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">Còn {item.product.stock} sản phẩm</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.product.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.product.id, item.quantity + 1)} disabled={item.quantity >= item.product.stock}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-right ml-2 min-w-[80px]">
                <p className="font-bold text-amber-800">{(unitPrice * item.quantity).toLocaleString()}đ</p>
                <button onClick={() => removeItem(item.product.id)} className="text-red-400 hover:text-red-600 mt-1 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white p-6 rounded-2xl shadow-sm border border-amber-100">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tạm tính</span>
            <span>{originalTotal.toLocaleString()}đ</span>
          </div>
          {savedAmount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Tiết kiệm</span>
              <span>-{savedAmount.toLocaleString()}đ</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-500">
            <span>Phí vận chuyển</span>
            <span className="text-green-600">{totalPrice() >= 1000000 ? "Miễn phí" : "Tính khi thanh toán"}</span>
          </div>
          <div className="border-t pt-3 flex justify-between">
            <span className="font-semibold text-gray-700">Tổng cộng</span>
            <span className="text-2xl font-bold text-amber-700">{totalPrice().toLocaleString()}đ</span>
          </div>
        </div>
        {totalPrice() < 1000000 && (
          <p className="text-xs text-gray-400 mb-4">Mua thêm <span className="text-amber-600 font-medium">{(1000000 - totalPrice()).toLocaleString()}đ</span> để được miễn phí vận chuyển</p>
        )}
        <div className="flex gap-3">
          <Link href="/" className="flex-1"><Button variant="outline" className="w-full">Tiếp tục mua</Button></Link>
          <Link href="/checkout" className="flex-1"><Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">Thanh toán ngay</Button></Link>
        </div>
      </div>
    </div>
  );
}
