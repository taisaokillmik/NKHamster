"use client";
import Link from "next/link";
import { Search, Menu, X, PawPrint } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/hamsters", label: "Hamster" },
  { href: "/cages", label: "Lồng" },
  { href: "/foods", label: "Thức ăn" },
  { href: "/accessories", label: "Phụ kiện" },
  { href: "/blog", label: "Blog" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-soft border-b border-gray-100/50"
          : "bg-transparent"
      }`}
    >
      <div className="premium-container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="relative flex items-center gap-3 group"
          aria-label="NK Hamster - Trang chủ"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-warm group-hover:shadow-lg transition-shadow duration-300">
            <PawPrint className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-display font-bold text-gray-900 leading-tight">
              NK Hamster
            </span>
            <span className="text-[11px] font-medium text-primary-500 leading-tight tracking-wider uppercase">
              Premium Pet Shop
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  isActive
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            aria-label="Tìm kiếm"
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl text-gray-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-300"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-warm hover:shadow-lg"
          >
            Liên hệ
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-600 hover:bg-gray-100 transition-all duration-300"
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="premium-container py-6 space-y-1 border-t border-gray-100 bg-white/95 backdrop-blur-xl">
          {navLinks.map((link) => {
            const isActive = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-600 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="block px-4 py-3 rounded-xl text-sm font-medium text-primary-600 bg-primary-50 hover:bg-primary-100 transition-all duration-200"
          >
            📞 Liên hệ
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;