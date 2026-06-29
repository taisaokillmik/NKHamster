import Link from "next/link";
import { BlogPost } from "@/types";

export default function BlogPreview({ blogs }: { blogs: BlogPost[] }) {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold text-amber-800">📖 Blog & Hướng dẫn</h2>
        <Link href="/blog" className="text-sm font-medium text-amber-600 hover:text-amber-800 hover:underline">
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}
            className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
            <img src={post.image} alt={post.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-1">{post.date}</p>
              <h3 className="font-semibold text-amber-800 leading-snug">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
