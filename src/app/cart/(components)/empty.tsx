import Link from "next/link";

export default function EmptyCart() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold">Your Cart Is Empty</h1>

        <p className="text-gray-500 mt-2">
          Add some products to your cart first.
        </p>

        <Link
          href="/products"
          className="mt-6 bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
