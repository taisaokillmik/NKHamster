"use client";
import { useState } from "react";
import { X, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  const handleQuantityChange = (productId: number, delta: number) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + delta);
    }
  };

  return (
    <>
      {/* Cart Button in Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Xem giỏ hàng"
      >
        <ShoppingBag className="h-5 w-5 text-gray-500 hover:text-amber-600" />
        {totalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {totalItems()}
          </span>
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-amber-100">
            <h2 className="text-xl font-bold text-amber-800">Giỏ hàng ({totalItems()})</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-amber-50 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="h-16 w-16 mb-4 text-gray-300" />
                <p>Giỏ hàng trống</p>
                <Link
                  href="/hamsters"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
                >
                  Mua sắm ngay
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-3 bg-amber-50 rounded-xl">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="font-semibold text-gray-800 hover:text-amber-600 line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {(item.product.salePrice || item.product.price).toLocaleString()}đ
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, -1)}
                          className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, 1)}
                          className="w-6 h-6 rounded-full bg-amber-100 hover:bg-amber-200 flex items-center justify-center transition-colors"
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-amber-100 p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tạm tính:</span>
                <span className="text-lg font-bold text-amber-800">{totalPrice().toLocaleString()}đ</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <Button className="w-full" size="lg">
                  Thanh toán ngay
                </Button>
              </Link>
              <button
                onClick={() => {
                  clearCart();
                  setIsOpen(false);
                }}
                className="w-full text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Xóa giỏ hàng
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
