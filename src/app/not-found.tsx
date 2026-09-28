import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 bg-white">
      <div className="text-center max-w-lg">
        <p className="text-sm font-semibold tracking-widest uppercase text-gray-400">
          404 Error
        </p>

        <h1 className="mt-4 text-7xl font-bold tracking-tight text-gray-900">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-500 leading-relaxed">
          Sorry, the page you are looking for doesn&apos;t exist or may have
          been moved.
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
