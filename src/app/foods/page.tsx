import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Thức ăn Hamster - NK Hamster",
  description: "Thức ăn dinh dưỡng cho hamster của bạn. Thức ăn tổng hợp, snack, bánh thưởng chất lượng cao.",
  openGraph: {
    title: "Thức ăn Hamster - NK Hamster",
    description: "Thức ăn dinh dưỡng cho hamster của bạn",
  },
};

export default function FoodPage() {
  const foodProducts = products.filter(p => p.category === "food");
  const mainFood = foodProducts.filter(p => p.slug === "thuc-an-tron-hamster" || p.slug === "an-dam");
  return (
    <div className="container mx-auto px-4 py-10">
      <div>
        <h2 className="text-2xl font-bold text-amber-800 mb-6">🍽 Thức ăn</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainFood.map(product => (
            <Link key={product.id} href={`/product/${product.slug}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <span className="text-amber-600 font-bold text-lg">{product.price.toLocaleString()}đ</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-amber-800 mb-6">🐶🐱 Thức ăn chó mèo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Hạt Royal Canin", desc: "Thức ăn cao cấp cho chó mèo, đầy đủ dinh dưỡng.", img: "https://placehold.co/400x400/FCE7F3/9D174D?text=Royal+Canin" },
            { name: "Hạt Whiskas", desc: "Thức ăn cho mèo vị cá biển, mèo rất thích.", img: "https://placehold.co/400x400/FCE7F3/9D174D?text=Whiskas" },
            { name: "Hạt Pedigree", desc: "Thức ăn cho chó trưởng thành, giàu dinh dưỡng.", img: "https://placehold.co/400x400/FCE7F3/9D174D?text=Pedigree" },
            { name: "Pate cho mèo", desc: "Pate tươi thơm ngon, bổ sung nước cho mèo.", img: "https://placehold.co/400x400/FCE7F3/9D174D?text=Pate+Meo" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={item.img} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
                <p className="text-amber-600 font-semibold mt-2">Liên hệ</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}