import { products } from "@/data/temporaryData";
import Categories from "./categories";
import ProductCard from "./product-card";
import { Suspense } from "react";

export default function ProductsList() {
  return (
    <section className="py-10">
      <Suspense fallback={null}>
        <Categories />
      </Suspense>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
