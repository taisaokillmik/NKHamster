"use client";
import Link from "next/link";
import { Heart, ShoppingCart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Header = () => {
  const totalItems = useCart((s) => s.totalItems());
  const wishlistCount = useWishlist((s) => s.items.length);
  const user = useAuth((s) => s.user);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-amber-100 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2 text-2xl font-bold text-amber-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl">🐹</span>
            <span>NK Hamster</span>
          </Link>
          <Link href="/address" className="text-sm font-semibold text-amber-700 hover:text-amber-600">Địa chỉ</Link>
        </div>

        <nav className="hidden md:flex gap-8">
          <Link href="/hamsters" className="text-gray-600 hover:text-amber-600 font-medium">Hamster</Link>
          <Link href="/cages" className="text-gray-600 hover:text-amber-600 font-medium">Lồng</Link>
          <Link href="/foods" className="text-gray-600 hover:text-amber-600 font-medium">Thức ăn</Link>
          <Link href="/accessories" className="text-gray-600 hover:text-amber-600 font-medium">Phụ kiện</Link>
          <Link href="/blog" className="text-gray-600 hover:text-amber-600 font-medium">Blog</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/search" aria-label="Tìm kiếm sản phẩm" className="text-gray-500 hover:text-amber-600">
            <Search className="h-5 w-5" />
          </Link>
          <Link href="/wishlist" className="relative">
            <Heart className="h-5 w-5 text-gray-500 hover:text-amber-600" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5 text-gray-500 hover:text-amber-600" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/account" className="hidden md:inline-flex">
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" /> {user ? user.name.split(" ").pop() : "Tài khoản"}
            </Button>
          </Link>
          {user?.role === "admin" && (
            <Link href="/admin" className="hidden md:inline-flex">
              <Button variant="ghost" size="sm">🛠 Admin</Button>
            </Link>
          )}
          <Menu
            className="h-5 w-5 md:hidden cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-amber-100 p-4 space-y-3">
          <Link href="/hamsters" className="block text-gray-600 py-1">🐹 Hamster</Link>
          <Link href="/cages" className="block text-gray-600 py-1">🏠 Lồng</Link>
          <Link href="/foods" className="block text-gray-600 py-1">🍽 Thức ăn</Link>
          <Link href="/accessories" className="block text-gray-600 py-1">🛏 Phụ kiện</Link>
          <Link href="/blog" className="block text-gray-600 py-1">📖 Blog</Link>
          <Link href="/promotions" className="block text-gray-600 py-1">🎉 Khuyến mãi</Link>
          <div className="border-t border-amber-100 pt-3 flex gap-3">
            <Link href="/wishlist" className="flex-1 text-center text-sm text-gray-600 py-1">❤️ Yêu thích {wishlistCount > 0 && `(${wishlistCount})`}</Link>
            <Link href="/account" className="flex-1 text-center text-sm text-amber-700 font-medium py-1">{user ? user.name.split(" ").pop() : "Đăng nhập"}</Link>
          </div>
          {user?.role === "admin" && (
            <Link href="/admin" className="block text-amber-700 font-medium py-1">🛠 Trang Admin</Link>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
