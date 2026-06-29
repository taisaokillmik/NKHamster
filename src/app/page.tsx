import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductList from "@/components/home/ProductList";
import PromoBanner from "@/components/home/PromoBanner";
import TrustBar from "@/components/home/TrustBar";
import FeatureStrip from "@/components/home/FeatureStrip";
import BlogPreview from "@/components/home/BlogPreview";
import { products } from "@/data/products";
import { blogs } from "@/data/products";

export const metadata = {
  title: "NK Hamster - Cửa hàng Hamster & Phụ kiện",
  description: "Cửa hàng bán chuột Hamster, lồng mica và phụ kiện uy tín. Giao hàng toàn quốc.",
  openGraph: {
    title: "NK Hamster - Cửa hàng Hamster & Phụ kiện",
    description: "Cửa hàng bán chuột Hamster, lồng mica và phụ kiện uy tín",
    images: ["/banner.jpg"],
  },
};

export default function Home() {
  const hamsters = products.filter((p) => p.category === "hamster");
  const cages = products.filter((p) => p.category === "cage");
  const accessories = products.filter((p) => p.category === "accessory");

  return (
    <>
      <Hero />
      <TrustBar />
      <PromoBanner />
      <CategoryGrid />
      <FeatureStrip />
      <ProductList products={hamsters} title="🐹 Chuột Hamster nổi bật" />
      <ProductList products={cages} title="🏠 Lồng mica bán chạy" columns={3} />
      <ProductList products={accessories} title="🛏 Phụ kiện nổi bật" />
      <BlogPreview blogs={blogs.slice(0, 3)} />
    </>
  );
}
