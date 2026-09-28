import Hero from "@/components/layout/hero";
import ProductsList from "@/components/layout/products-list";
import Spinner from "@/components/layout/spinner";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Hero />
      </Suspense>
      <ProductsList />
    </>
  );
}
