import { categories } from "@/data/products";
import { products } from "@/data/products";
import Link from "next/link";

const CategoryGrid = () => {
  const counts: Record<string, number> = {
    hamsters: products.filter((p) => p.category === "hamster").length,
    cages: products.filter((p) => p.category === "cage").length,
    foods: products.filter((p) => p.category === "food").length,
    accessories: products.filter((p) => p.category === "accessory").length,
  };

  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-amber-800 mb-10">Danh mục sản phẩm</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/${cat.slug}`}
            className="group flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-amber-100 hover:shadow-md hover:border-amber-300 transition-all">
            <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">{cat.icon}</span>
            <span className="font-semibold text-gray-700 group-hover:text-amber-600">{cat.name}</span>
            <span className="text-xs text-gray-400 mt-1">{counts[cat.slug] || 0} sản phẩm</span>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default CategoryGrid;
