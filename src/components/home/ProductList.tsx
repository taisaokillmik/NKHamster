import { Product } from "@/types";
import ProductCard from "@/components/shared/ProductCard";

const ProductList = ({ products, title, columns = 4 }: { products: Product[]; title: string; columns?: number }) => {
  const gridCols = columns === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-amber-800 mb-10">{title}</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-6`}>
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
};
export default ProductList;
