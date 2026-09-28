import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
          404 Error
        </p>

        <h1 className="mt-4 text-6xl font-bold text-gray-900">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Product Not Found
        </h2>

        <p className="mt-3 text-gray-500 leading-relaxed">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. It
          may have been removed or the link may be incorrect.
        </p>

        <Link
          href="/"
          className="inline-flex mt-8 items-center justify-center rounded-md bg-[#1e293b] px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
