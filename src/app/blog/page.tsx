import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog & Hướng dẫn | NK Hamster",
  description: "Bài viết hướng dẫn nuôi hamster, chọn lồng, thức ăn và chăm sóc thú cưng",
};
import { blogs } from "@/data/products";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-amber-800 mb-8">📖 Blog & Hướng dẫn</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="bg-white rounded-2xl shadow-sm border border-amber-100 overflow-hidden hover:shadow-md transition-shadow">
            <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-amber-800">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{post.excerpt}</p>
              <span className="text-xs text-gray-400 mt-2 block"></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
