"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-amber-500 hover:bg-amber-600 text-white p-3 shadow-lg transition-all"
      aria-label="Cuộn lên đầu trang"
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
