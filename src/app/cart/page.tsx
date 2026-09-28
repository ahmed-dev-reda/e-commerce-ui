"use client";

import { useAppSelector } from "@/lib/hooks";

import EmptyCart from "./empty";
import ProductsInCart from "./products";

export default function CartPage() {
  const cart = useAppSelector((state) => state.cart);

  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>

        <p className="text-sm text-gray-500 mt-2">
          Review your items and complete your order.
        </p>
      </div>
      <ProductsInCart />
    </section>
  );
}
